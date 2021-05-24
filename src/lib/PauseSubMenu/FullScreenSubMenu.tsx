import React from "react";

import useEventListener from "use-typed-event-listener";

import { css } from "@emotion/css";

import MenuBackButton from "../PauseMenu/MenuBackButton";
import { focusLastElem } from "../private-state";
import { useUserState } from "../state";

interface ComponentProps {
    /** @default true */
    closable?: boolean;
}

let FullScreenSubMenu: React.FC<ComponentProps> = ({ children, closable = true }) => {
    useEventListener(window, "keydown", ({ code }) => {
        if (code !== "Escape" || !closable) return;
        useUserState.setState({ openedUI: { type: "pause", menu: "root" } });
        focusLastElem();
    });

    return <>
        <div className={css`
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.75);
        `}>
            {children}
        </div>
        {/* {closable && <MenuBackButton />} */}
        <MenuBackButton />
    </>;
};

export default FullScreenSubMenu;
