import React, { useMemo } from "react";

import reactUseMeasure from "react-use-measure";

import { css } from "@emotion/css";
import { ResizeObserver } from "@juggle/resize-observer";
import { MoreHoriz } from "@material-ui/icons";

// import BlockModel from "./BlockModelOld.tsx.ignore";
import { useLocalGameState, useTheme, useUserState, useUsingTouch } from "../state";
import HotbarBlockModel, { blockSides } from "./HotbarBlockModel";
import HotbarSlot from "./HotbarSlot";

export type SlotData = {
    type: "item",
    texture: string;
} | {
    // doesn't support models for a moment
    type: "block";
    getTexture(side: (typeof blockSides)[number]): string;
};

interface ComponentProps { }

let Hotbar: React.FC<ComponentProps> = () => {
    const [hotbarRef, { width }] = reactUseMeasure({ polyfill: ResizeObserver });

    const usingTouch = useUsingTouch();
    const hotbarSlotsGap = useTheme(state => state.hotbarSlotsGap);
    const maxHotbarSlotSize = useTheme(state => state.maxHotbarSlotSize);
    const slots = useLocalGameState(state => state.slots);

    // rewrite everything

    // resize observer is still bugged :(
    const { blocksPadding } = useMemo(() => {
        const blocksPadding = width < 200 ? 0 :
            width < 350 ? 5 : 8;
        return { blocksPadding };
    }, [width]);

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
        ref={hotbarRef}
    >
        {
            slots.map((_, index) => (
                <HotbarSlot
                    key={index}
                    slotIndex={index}
                    style={{ blocksPadding }}
                />
            ))
        }
        {
            usingTouch && <div
                className={css`
                    background-color: rgba(0, 0, 0, 0.5);
                    border: 3px solid rgba(128, 128, 128, 0.8);
                    width: 100%;
                    display: inline-block;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                `}
                onClick={() => {
                    useUserState.setState({ openedUI: { type: "pause", menu: "root" } });
                }}
            >
                <MoreHoriz color="action" />
            </div>
        }
    </div>;
};

export default Hotbar;
