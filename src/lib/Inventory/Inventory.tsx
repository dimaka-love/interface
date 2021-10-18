import React from "react";

import clsx from "clsx";
import _ from "lodash-es";
import useEventListener from "use-typed-event-listener";

import { css } from "@emotion/css";
import { ArrowRightAlt as ArrowRightAltIcon } from "@material-ui/icons";

import { dirtBlockTextureUrl } from "../../example/App";
import ItemSlot from "../CoreHUD/ItemSlot";
import { useUserState } from "../state";
import { modalStyles } from "../styles";

interface ComponentProps {
}

// fixed for a moment
const inventoryConfig = {
    rows: 3,
    columns: 9
};

const slotSize = 40;

interface InventorySlotsProps {
    direction?: "row" | "row-reverse" | "column" | "column-reverse";
    size: number;
}

const InventorySlots: React.FC<InventorySlotsProps> = ({ direction = "row", size }) => {
    return <div
        className={css`
            /* display: grid;
            grid-auto-columns: 1fr;
            grid-auto-rows: 1fr; */
            display: flex;
            flex-direction: ${direction};
            justify-content: flex-end;
            ${direction === "column" ? "height: 100%;" : ""}
        `}
    >
        {
            _.times(size, index => {
                return <div
                    key={index}
                    data-name="InventorySlot"
                    className={css`
                        width: ${slotSize}px;
                        height: ${slotSize}px;
                        position: relative;
                        &:hover::before {
                            content: "";
                            z-index: 1;
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background-color: rgba(255 255 255 / 25%);
                        }
                    `}
                >
                    <ItemSlot
                        data={{
                            type: "block",
                            getTexture: () => dirtBlockTextureUrl,
                            count: 2
                        }}
                        blocksPadding={9}
                    />
                </div>;
            })
        }
    </div>;
};

const ArmorSlots: React.FC<{ side: "left" | "right"; }> = ({ side }) => {
    return <InventorySlots
        direction="column"
        size={4}
    />;
};

let Inventory: React.FC<ComponentProps> = () => {
    const openedUI = useUserState(s => s.openedUI);

    const inventoryOpened = openedUI?.type === "inventory";

    useEventListener(window, "keydown", ({ code }) => {
        if (code !== "KeyE") return;
        if (openedUI && !inventoryOpened) return;
        if (inventoryOpened) {
            useUserState.setState({ openedUI: null });
        } else {
            useUserState.setState({ openedUI: { type: "inventory" } });
        }
    });

    return !inventoryOpened ? null : <div
        className={css`
            ${modalStyles}
        `}
    >
        <div
            className={clsx("InventoryWindow", css`
                height: 400px;
                width: 600px;
                padding: 5px;
                border: 1px solid rgb(0, 248, 248);
                box-shadow: 0 0 10px rgb(0, 248, 248);
                /* background-color: #073d3e; */
                background-color: #001435;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            `)}
        >
            <div>
                <div
                    data-name="InventoryTopPart"
                    className={css`
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                `}
                >
                    <div
                        data-name="InventoryPlayer"
                        className={css`
                            display: flex;
                        `}
                    >
                        <div
                            data-name="InventoryArmorLeft"
                        >
                            <ArmorSlots side="left" />
                        </div>
                        <div data-name="InventoryPlayerModel" className={css`
                            background-color: black;
                            width: 100px;
                    `}>
                        </div>
                        <div
                            data-name="InventoryArmorRight"
                        >
                            <InventorySlots
                                direction="column"
                                size={1}
                            />
                        </div>
                    </div>
                    <div
                        data-name="PlayerCrafting"
                        className={css`
                            display: flex;
                            align-items: center;
                    `}
                    >
                        <div className={css`
                            display: flex;
                            flex-direction: column;
                    `}>
                            <InventorySlots size={2} />
                            <InventorySlots size={2} />
                        </div>
                        <ArrowRightAltIcon style={{ width: slotSize, height: slotSize }} color="action" />
                        <div className={css`
                            display: flex;
                            flex-direction: column;
                    `}>
                            <InventorySlots size={1} />
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    </div>;
};

export default Inventory;
