import React from "react";

import { css } from "@emotion/css";

// import BlockModel from "./BlockModelOld.tsx.ignore";
import { useLocalGameState, useTheme, useUsingTouch } from "../state";

export type SlotData = {
    blockTextures: {};
};

interface ComponentProps { }

let BlockMiniature: React.FC<Pick<React.ComponentProps</* typeof BlockModel */any>, "sidesTexture" | "DivProps">> = (props) => {
    return null;
    // return <BlockModel
    //     rotateX={327}
    //     rotateY={315}
    //     perspective="none"
    //     sizeFactor={0.2}
    //     {...props}
    // />;
};

const DirtBlock = () => <BlockMiniature
    sidesTexture="https://github.com/InventivetalentDev/minecraft-assets/blob/1.16.5/assets/minecraft/textures/block/dirt.png?raw=true"
    DivProps={{
        style: {
            margin: -32
        }
    }}
/>;

let Hotbar: React.FC<ComponentProps> = () => {
    const usingTouch = useUsingTouch();
    const hotbarSlotsGap = useTheme(state => state.hotbarSlotsGap);
    const maxHotbarSlotSize = useTheme(state => state.maxHotbarSlotSize);
    const slots = useLocalGameState(state => state.slots);

    return <div
        className={css`
            width: 100%;
            max-width: ${maxHotbarSlotSize * slots.length}px;
            display: grid;
            grid-auto-columns: 1fr;
            grid-auto-flow: column;
            gap: ${hotbarSlotsGap}px;
            pointer-events: ${usingTouch ? "initial" : "none"};
        `}
    >
        {
            slots.map((_, index) => (
                <div
                    key={index}
                    className={css`
                        border: 10px solid white;
                        background-color: rgba(0, 0, 0, 0.5);
                        border: 3px solid rgba(128, 128, 128, 0.8);
                        width: 100%;
                        // setting height the same as width
                        height: 0;
                        //minus bottom border width
                        padding-bottom: calc(100% - 5px);
                    `}
                >
                    <DirtBlock />
                </div>
            ))
        }
    </div>;
};

export default Hotbar;
