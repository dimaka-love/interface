import { useMemo } from "react";

import _ from "lodash-es";
import { useMedia } from "react-use";
import createStore from "zustand";
import { combine } from "zustand/middleware";

import { SlotData } from "./CoreHUD/Hotbar";

/** controls GUI appereance */
export const useTheme = createStore(() => ({
    /** if true, touch controls will be used */
    forceTouchControls: false,
    touchButtonSize: 50,
    touchButtonsGap: 0,
    hotbarSlotsGap: 0,
    maxHotbarSlotSize: 50,
    githubRepo: null as string | null
}));

export const useUsingTouch = (): boolean => {
    const forceUsingTouch = useTheme(state => state.forceTouchControls);
    // TODO-HIGH RESOLVE CHROMIUM BUG
    const touchSupportedQuery = useMedia(`(pointer: coarse)`);// do we need to check 'ontouchstart' in window?
    return useMemo(() => {
        return forceUsingTouch || touchSupportedQuery ||
            // workaround for chrome bug. Just try to comment this line and use select element feature (CTRL+SHIFT+C) with active mobile view
            navigator.userAgent.includes("Mobile");
    }, [forceUsingTouch, touchSupportedQuery]);
};

export const useTouchMovement = createStore(() => ({
    x: 0,
    y: 0,
    z: 0,
}));

type SlotsData = (null | SlotData)[];

// i'll probably remove this
export const useLocalGameState = createStore(
    combine(
        {
            slots: _.times(9, () => null) as SlotsData,
            isFlying: false
        },
        set => ({ set })
    )
);

export type SettingsMenus =
    | "video"
    | "world"
    | "controls"
    | "sound"
    | "other"
    | "social";

export type PauseMenus =
    | "root"
    | `settings-${SettingsMenus}`
    | "social";

export type OpenedUI = {
    type: "pause";
    menu: PauseMenus;
} | {
    type: "inventory";
} | {
    type: "block-ui";
    blockName: string; //make typed
} | {
    type: "item-ui";
    itemName: string;
} | {
    type: "custom";
    mod: string;
    uiName: string;
};

type HardwareInfo = {
    icon?: JSX.Element;
} & ({
    state: "loading" | "errored";
} | {
    state: "loaded";
    value: string;
});


export const useUserState = createStore(() => ({
    /** if not null - UI is open */
    openedUI: { type: "pause", menu: "root" } as OpenedUI | null,
    usingRawInput: null as true | false | null,
    // todo implement this
    // hardwareInfo: [] as HardwareInfo[],

    // useUserLocalSettingsStore: null,
    userSettingLoaded: false,
}));
