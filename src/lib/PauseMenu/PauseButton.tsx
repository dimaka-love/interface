import React, { useCallback } from "react";

import { css } from "@emotion/css";

import { addElemToFocus } from "../private-state";
import { PauseMenus, useUserState } from "../state";
import { closePauseMenu } from "./PauseMenu";
import { buttonStyles, focusableElemOutline } from "./styles";

type ComponentProps = {
    label: string;
    autoFocus?: boolean;
} & ({
    action: "close-pause";
} | {
    action: "open-menu",
    menu: Exclude<PauseMenus, "root">;
} | {
    action: "custom",
    closePause: boolean;
    onClick: (event: React.MouseEvent<HTMLElement>) => {};
} | {
    action: "disabled";
});

const PauseButton: React.FC<ComponentProps> = (props) => {
    const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
        switch (props.action) {
            case "close-pause":
                closePauseMenu();
                break;
            case "open-menu":
                addElemToFocus(e.currentTarget);
                useUserState.setState({ openedUI: { type: "pause", menu: props.menu } });
                break;
            case "custom":
                props.onClick(e);
                if (props.closePause) closePauseMenu();
                break;
        }
    }, [props.action]);

    return <button
        className={css`
            ${buttonStyles}
            width: 300px;
            padding: 8px;
            margin: 3px;
            font-size: 1.2rem;
            font-weight: 500;
            background: rgba(0, 0, 0, 0.6);
            cursor: ${props.action === "disabled" ? "not-allowed" : "default"};

            &:hover {
                background: rgba(0, 0, 0, 0.7);
            }
            &:focus {  
            ${focusableElemOutline}
            }
        `}
        onClick={handleClick}
        autoFocus={props.autoFocus}
    >{props.label}</button>;
};

export default PauseButton;
