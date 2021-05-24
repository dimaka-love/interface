import React from "react";

import { Animator } from "@arwes/animation";
import { Button, FrameHexagon, Text } from "@arwes/core";
import { css } from "@emotion/css";

import { zIndexes } from "../AppProvider";
import { useTheme } from "../state";
import Screen from "./Screen";

type ButtonProps = {
    text: string;
    color?: string;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLElement>) => unknown;
};

interface ComponentProps {
    buttons: ButtonProps[];
}

const RedLine = () => <div style={{ width: "100%", height: 1, backgroundColor: "red" }} />;

// TODO: MAKE ACTUAL GROUPS
let MainMenu: React.FC<ComponentProps> = ({ buttons }) => {
    const githubRepo = useTheme(store => store.githubRepo);

    return <Screen className={css`
        z-index: ${zIndexes.pauseMenu};
        /* background: url("https://playground.arwes.dev/assets/images/wallpaper-large.jpg") no-repeat center center/cover; */
    `}>
        <h1
            className={css`
                text-align: center;
                margin: 0;
                margin-top: 50px;
                letter-spacing: 4px;
            `}
        >DIMAKA.LOVE</h1>
        <div className={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            width: 400px;
        `}>
            <Animator animator={{ animate: true }}>
                {buttons.map(({ text, color, ...buttonProps }) => (
                    <Button
                        key={text}
                        palette={color}
                        FrameComponent={FrameHexagon}
                        {...buttonProps}
                        className={css`
                            margin: 5px;
                    `}>
                        <Text>{text}</Text>
                    </Button>
                ))}
            </Animator>
        </div>
        <div
            className={css`
                width: 100%;
                display: flex;
                justify-content: space-between;
                font-size: 0.7em;
                opacity: 0.7;
                transition: opacity .2s;
                &:hover {
                    opacity: 1;
                }
            `}
        >
            <span>
                Design by <a href="https://arwes.dev" target="__blank">Arwes</a>
            </span>
            <div />
            {!githubRepo ? <div /> :
                <a>Report bug or request feature</a>
            }
        </div>
    </Screen>;
};

export default MainMenu;
