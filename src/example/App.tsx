import React, { useEffect, useState } from "react";

import { css } from "@emotion/css";
import { MenuList } from "@material-ui/core";

// import backgroundTestingSrc from "../"; TODO! FIX SNOWPACK!!
import AppProvider from "../lib/AppProvider";
import ErrorBoundary from "../lib/ErrorBoundary";
import PauseMenu, { PauseSchema } from "../lib/PauseMenu/PauseMenu";
import { getSettingValue, initSettingsStore, useSettingsLoaded } from "../lib/settingsStore";
import { tabsSchema } from "./settings";

interface ComponentProps {
}

const TestOverlay: React.FC<{ type: "test" | "nteTest"; }> = () => {
    useEffect(() => {

    }, []);

    return <div
        className={css`
            position: fixed;
            top: 0;
            right: 0;
        `}
    ></div>;
};

const TestKeyboard: React.FC = () => {
    const [pressed, setPressed] = useState(false);

    useEffect(() => {
        const log = (e: KeyboardEvent) => console.log(e.type, e.code);

        window.addEventListener("keydown", log);
        window.addEventListener("keypress", log);
        window.addEventListener("keyup", log);
    }, []);

    return <div>pressed: {pressed.toString()}</div>;
};

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

const TestButton = (props) => <button
    className={css`
                padding: 5px 8px;
                &:focus {
                    outline: 1px solid dodgerblue;
                }
            `}
    {...props}
>Hey There</button>;

const TestMenu: React.FC = () => {
    return <MenuList>
        <TestButton autoFocus className="Mui-focusVisible" />
        <TestButton />
        {/* <ListItem button>
            <ListItemText primary="Hey There!" />
        </ListItem>
        <ListItem button>
            <ListItemText primary="Hey There!" />
        </ListItem> */}
    </MenuList>;
};

initSettingsStore({
    localStorageKey: "dimaka-local-settings",
    settingsTabsSchema: tabsSchema
});


let App: React.FC<ComponentProps> = ({ }) => {
    const settingsLoaded = useSettingsLoaded();

    useEffect(() => {
        if (!settingsLoaded) return;
        const resolution = getSettingValue(tabsSchema, "video", "general", "resolution");
        console.log("value", resolution);
    }, [settingsLoaded]);

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
            {/* <HUD /> */}
            {
                !settingsLoaded ? <p>Settings are loading</p> : <PauseMenu schema={pauseSchema} />
            }
            {/* <TestMenu /> */}
            {/* <TestKeyboard /> */}
            {/* <Dialogs /> */}
        </AppProvider>
    </ErrorBoundary>;
};

export default App;
