import React, { useMemo } from "react";

import clsx from "clsx";

import { css } from "@emotion/css";

import { useLocalGameState } from "../state";
import HotbarBlockModel, { BlockSide, blockSides } from "./HotbarBlockModel";

interface ComponentProps {
    slotIndex: number,
    style: Record<"blocksPadding", number>;
}

const selectedSlotClass = css`
    border: 4px solid white !important;
`;

let HotbarSlot: React.FC<ComponentProps> = ({ slotIndex, style: { blocksPadding } }) => {
    const slotsData = useLocalGameState(state => state.slots);
    const selectedSlot = useLocalGameState(state => state.selectedSlot);

    const slotData = useMemo(() => {
        const slotData = slotsData[slotIndex];
        if (!slotData) return null;
        if (slotData.type === "item") {
            return slotData;
        } else {
            return {
                ...slotData,
                sideTextures: Object.fromEntries(blockSides.map(side => [side, slotData.getTexture(side)])) as Record<BlockSide, string>
            };
        }
    }, [slotsData]);

    return <div
        className={clsx("HotbarSlot", css`
                background-color: rgba(0, 0, 0, 0.5);
                border: 3px solid rgba(128, 128, 128, 0.8);
                width: 100%;
                display: inline-block;
                position: relative;
            `, {
            [selectedSlotClass]: slotIndex === selectedSlot
        })}
    >
        <div
            className={css`
                margin-top: 100%;
            `}
        />
        {
            !slotData ? null :
                slotData.type === "item" ? <img alt={"Item"} src={slotData.texture} style={{ width: "100%", height: "100%" }} /> :
                    <div
                        className={css`
                        position: absolute;
                        top: 0;left: 0;right: 0;bottom: 0;
                        padding: ${blocksPadding}px;
                        overflow: hidden;
                    `}
                    >
                        <HotbarBlockModel
                            RootDivProps={{
                                style: {
                                    overflow: "visible"
                                }
                            }}
                            sideTextures={slotData.sideTextures}
                        />
                    </div>
        }
    </div>;
};

export default HotbarSlot;