import { css } from '@emotion/css'
import inventorySlots from './inventorySlots'
import { useInterfaceState } from 'low-level/state'
import chestImage from 'mineflayer-web-inventory/client/public/windows/chest.png'
import inventoryImage from 'mineflayer-web-inventory/client/public/windows/inventory.png'

const slotsPos = inventorySlots()

export default ({ onClose = undefined }) => {
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
                className={css`
                    background-image: url(${inventoryImage});
                    background-size: cover;
                    width: 352px;
                    height: 332px;
                    position: relative;
                `}
            >
                {Object.entries(slotsPos.inventory).map(([slot, [x, y]], i) => (
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
                    ></div>
                ))}
            </div>
        </div>
    )
}
