import { css } from '@emotion/css'
import inventorySlots from './inventorySlots'
import { useInterfaceState } from 'low-level/state'
import chestImage from 'mineflayer-web-inventory/client/public/windows/chest.png'
import craftingTablePng from 'mineflayer-web-inventory/client/public/windows/crafting-table.png'
import inventoryImage from 'mineflayer-web-inventory/client/public/windows/inventory.png'
import SlotMovable, { DraggingSlot } from './SlotMovable'

const slotsPos = inventorySlots()

export type UiType = 'inventory' | 'chest' | 'large-chest' | 'crafting-table' | 'furnace'

export default ({ onClose = undefined as any, slots, action, ui = 'inventory' as UiType }) => {
    return (
        <div
            className={css`
                position: fixed;
                inset: 0;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
            `}
        >
            <div
                onClick={e => e.target === e.currentTarget && onClose?.(e)}
                className={css`
                    background-image: url(${ui === 'inventory' ? inventoryImage : ui === 'crafting-table' ? craftingTablePng : chestImage});
                    background-size: cover;
                    width: 352px;
                    height: 332px;
                    position: relative;
                `}
            >
                {Object.entries(slotsPos[ui]).map(([slot, [x, y]], i) => (
                    <div
                        key={i}
                        className={css`
                            position: absolute;
                            inset: ${y + 1}px 0 0 ${x + 1}px;
                            width: 32px;
                            height: 32px;
                            &:hover {
                                background-color: rgba(255, 255, 255, 0.5);
                            }
                        `}
                    >
                        <SlotMovable
                            item={slots[i]}
                            action={{
                                drag: {
                                    onMoved: action,
                                    index: i,
                                },
                            }}
                        />
                    </div>
                ))}
            </div>
            <DraggingSlot />
        </div>
    )
}
