import React from "react";

import _ from "lodash-es";

import { css } from "@emotion/css";

// import backgroundTestingSrc from "../"; TODO! FIX SNOWPACK!!
import AppProvider from "../lib/AppProvider";
import CoreHUD from "../lib/CoreHUD/CoreHUD";
import { SlotData } from "../lib/CoreHUD/Hotbar";
import ErrorBoundary from "../lib/ErrorBoundary";
import Inventory from "../lib/Inventory/Inventory";
import PauseMenu, { PauseSchema } from "../lib/PauseMenu/PauseMenu";
import { initSettingsStore, useSettingsLoaded } from "../lib/settingsStore";
import { useLocalGameState } from "../lib/state";
import { tabsSchema } from "./settings";

interface ComponentProps {
}

export const pauseSchema: PauseSchema = {
    buttons: [
        {
            label: "CONTINUE PLAYING",
            action: "close-pause"
        },
        {
            label: "OPTIONS",
            action: "open-menu",
            menu: "settings-video"
        },
        {
            label: "LEAVE WORLD",
            action: "disabled"
        },
    ]
};

initSettingsStore({
    localStorageKey: "dimaka-local-settings",
    settingsTabsSchema: tabsSchema
});

useLocalGameState.setState({
    slots: _.times(9, (): SlotData => ({
        type: "block",
        getTexture: () => `https://github.com/InventivetalentDev/minecraft-assets/blob/1.16.5/assets/minecraft/textures/block/dirt.png?raw=true`
    }))
});

let App: React.FC<ComponentProps> = ({ }) => {
    const settingsLoaded = useSettingsLoaded();

    return <ErrorBoundary>
        <AppProvider
            rootClassName={css`
                background: url("background-testing.png") no-repeat 50% 50%/cover fixed black;
        `}
        >
            {/* <MainMenu buttons={[
                {
                    text: "OPEN FOLDER WORLD",
                },
                {
                    text: "OPEN REMOTE WORLD",
                    disabled: true
                },
                {
                    text: "SETTINGS",
                }
            ]} /> */}
            {/* <div style={{
                width: 200,
                height: 200,
                padding: 50
            }}>
                <HotbarBlockModel
                    RootDivProps={{
                        style: { overflow: "visible" }
                    }}
                    sideTextures=""
                />
            </div> */}
            <Inventory />
            <CoreHUD />
            {/* <TestMenu /> */}
            {/* <TestKeyboard /> */}
            {/* <Dialogs /> */}
        </AppProvider>
    </ErrorBoundary>;
};

export default App;
