import React, { useMemo } from 'react'

import clsx from 'clsx'

import { css } from '@emotion/css'

import ItemSlot from 'low-level/components/GameHUD/ItemSlot'
import { useInterfaceState } from 'low-level/state'

interface ComponentProps {
    slotIndex: number
    style: Record<'blocksPadding', number>
}

const selectedSlotClass = css`
    border-color: white !important;
`

const HotbarSlot: React.FC<ComponentProps> = ({ slotIndex, style: { blocksPadding } }) => {
    const slotsData = useInterfaceState(state => state.hotbar.slots)
    const selectedSlot = useInterfaceState(state => state.hotbar.selectedSlot)

    const slotData = useMemo(() => slotsData[slotIndex], [slotsData, slotIndex])

    return (
        <div
            className={clsx(
                'HotbarSlot',
                css`
                    background-color: rgba(0, 0, 0, 0.5);
                    border: 4px solid rgba(128, 128, 128, 0.8);
                    width: 100%;
                    display: inline-block;
                    position: relative;
                `,
                {
                    [selectedSlotClass]: slotIndex === selectedSlot,
                },
            )}
        >
            <div
                className={css`
                    margin-top: 100%;
                `}
            />
            {slotData && (
                <div
                    className={css`
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                    `}
                >
                    <ItemSlot data={slotData} blocksPadding={blocksPadding} />
                </div>
            )}
        </div>
    )
}

export default HotbarSlot
