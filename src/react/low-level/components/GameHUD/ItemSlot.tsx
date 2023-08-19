import React, { useMemo } from 'react'

import { css } from '@emotion/css'

import { pixelatedImage } from '../../styles'
import HotbarBlockModel, { BlockSide, blockSides } from './HotbarBlockModel'

export type SlotData = {
    count: number
} & (
    | {
          type: 'item'
          texture: string
      }
    | {
          // doesn't support models for a moment
          type: 'block'
          getTexture(side: (typeof blockSides)[number]): string
      }
)

type ComponentProps = {
    data: SlotData | null
    blocksPadding: number
}

const ItemSlot: React.FC<ComponentProps> = ({ blocksPadding, data: rawSlotData }) => {
    // todo refactor
    const fontSize = useMemo(() => (blocksPadding <= 6 ? 10 : 15), [blocksPadding])

    const slotData = useMemo(() => {
        if (!rawSlotData) return null
        if (rawSlotData.type === 'item') return rawSlotData

        return {
            ...rawSlotData,
            sideTextures: Object.fromEntries(blockSides.map(side => [side, rawSlotData.getTexture(side)])) as Record<BlockSide, string>,
        }
    }, [rawSlotData])

    return (
        slotData && (
            <div
                style={{
                    padding: slotData.type === 'block' ? blocksPadding : '',
                }}
                className={css`
                    overflow: hidden;
                    position: relative;
                    width: 100%;
                    height: 100%;
                `}
            >
                {slotData.type === 'item' ? (
                    <img
                        alt="Item"
                        src={slotData.texture}
                        className={css`
                            ${pixelatedImage}
                            width: 100%;
                            height: 100%;
                        `}
                    />
                ) : (
                    <HotbarBlockModel sideTextures={slotData.sideTextures} />
                )}
                <span
                    className={css`
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        font-size: ${fontSize}px;
                        color: white;
                    `}
                >
                    {slotData.count !== 1 && slotData.count.toString()}
                </span>
            </div>
        )
    )
}

export default ItemSlot
