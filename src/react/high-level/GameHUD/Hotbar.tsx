import React, { useMemo } from 'react'

import reactUseMeasure from 'react-use-measure'

import { css } from '@emotion/css'
import { ResizeObserver } from '@juggle/resize-observer'

// import BlockModel from "./BlockModelOld.tsx.ignore";
import { MoreHoriz } from '../../low-level/mui'
import HotbarSlot from './HotbarSlot'
import { useInterfaceState, useUsingTouch } from 'low-level/state'

interface ComponentProps {}

const Hotbar: React.FC<ComponentProps> = () => {
    const [hotbarRef, { width }] = reactUseMeasure({ polyfill: ResizeObserver })

    const usingTouch = useUsingTouch()
    const { hotbarSlotsGap, maxHotbarSlotSize } = useInterfaceState(s => s.uiCustomization)
    const slots = useInterfaceState(s => s.hotbar.slots)
    
    // rewrite everything

    // resize observer is still bugged :(
    const { blocksPadding } = useMemo(() => {
        const blocksPadding = width < 200 ? 0 : width < 350 ? 5 : 8
        return { blocksPadding }
    }, [width])

    return (
        <div
            ref={hotbarRef}
            className={css`
                width: 100%;
                max-width: ${maxHotbarSlotSize * slots.length}px;
                display: grid;
                grid-auto-columns: 1fr;
                grid-auto-flow: column;
                gap: ${hotbarSlotsGap}px;
                pointer-events: ${usingTouch ? 'initial' : 'none'};
            `}
        >
            {slots.map((_, index) => (
                <HotbarSlot
                    key={index}
                    slotIndex={index}
                    style={{ blocksPadding }}
                />
            ))}
            {usingTouch && (
                <div
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
                    onTouchStart={() => {
                        useInterfaceState.setState({
                            openedUI: { type: 'inventory' },
                        })
                    }}
                >
                    <MoreHoriz color="action" />
                </div>
            )}
        </div>
    )
}

export default Hotbar