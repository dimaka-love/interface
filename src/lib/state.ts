import { useMemo } from "react";

import _ from "lodash-es";
import { useMedia } from "react-use";
import createStore from "zustand";
import { combine } from "zustand/middleware";

import { SlotData } from "./CoreHUD/Hotbar";

export const useTheme = createStore(() => ({
    forceUsingTouch: false,
    touchButtonSize: 50,
    touchButtonsGap: 0,
    hotbarSlotsGap: 0,
    maxHotbarSlotSize: 50,
    githubRepo: null as string | null
}));

export const useUsingTouch = (): boolean => {
    const forceUsingTouch = useTheme(state => state.forceUsingTouch);
    // TODO-HIGH111 RESOLVE CHROMIUM BUG
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

export const useUserState = createStore(
    combine(
        {
            /** if not null - UI is open */
            openedUI: { type: "pause", menu: "root" } as OpenedUI | null,
            usingRawInput: null as true | false | null
        },
        set => ({ set })
    )
);

type Stats = Array<{
    icon?: JSX.Element;
} & ({
    state: "loading" | "errored";
} | {
    state: "loaded";
    value: string;
})>;

export const useDeviceStats = createStore(
    combine(
        {
            stats: [] as Stats
        },
        set => ({ set })
    )
);
