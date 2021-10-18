import React, { useEffect, useMemo, useRef } from 'react'

import anime from 'animejs'
import clsx from 'clsx'
import reactUseMeasure from 'react-use-measure'

import { css } from '@emotion/css'
import { ResizeObserver } from '@juggle/resize-observer'

import { pixelatedImage } from '../styles'

import type { Except } from 'type-fest'
interface StylesProps {
    rotateY?: number | 'animate'
    rotateX?: number
}

export const blockSides = ['front', 'left', 'top'] as const

export type BlockSide = typeof blockSides[number]

type DivProps = Except<React.ComponentProps<'div'>, 'className'>

type ComponentProps = StylesProps & {
    /** `url` to images, each one will be set to `<img>` `src` attribute  */
    sideTextures: Record<BlockSide, string> | string
    RotatbleDivProps?: DivProps
    RootDivProps?: DivProps
}

const rotateFunctions: Record<BlockSide, string> = {
    front: '',
    left: 'rotateY(-90deg)',
    top: 'rotateX(90deg)',
}

const sidesBrightness: Record<BlockSide, number> = {
    front: 0.5,
    left: 0.7,
    top: 1,
}

export const makeBlockSides = (texture: string): [BlockSide, string][] =>
    blockSides.map(side => [side, texture])

/** Special version of BlockModel for hotbar with only 3 sides and dimmings on sides */
let HotbarBlockModel: React.FC<ComponentProps> = ({
    sideTextures: sidesTexture,
    RootDivProps = {},
    RotatbleDivProps = {},
    rotateX = 327,
    rotateY = 405,
}) => {
    const [rootRef, { width }] = reactUseMeasure({ polyfill: ResizeObserver })

    const rotatingBlockRef = useRef<HTMLDivElement>(null!)

    useEffect(() => {
        const rotatingBlock = rotatingBlockRef.current
        anime.set(rotatingBlock, {
            rotateX,
            // scale: sizeFactor
        })
        if (rotateY !== 'animate') {
            anime.set(rotatingBlock, {
                rotateY,
            })
            return
        }
        anime({
            targets: rotatingBlock,
            rotateY: '360deg',
            duration: 6000,
            easing: 'linear',
            loop: true,
        })
    }, [])

    // TS still normalizes values
    const sidesTextureNormalized = useMemo(
        () =>
            typeof sidesTexture === 'string'
                ? makeBlockSides(sidesTexture)
                : (Object.entries(sidesTexture) as [BlockSide, string][]),
        [sidesTexture],
    )

    return (
        <div
            {...RootDivProps}
            className={clsx(
                'BlockModel',
                css`
                    width: 100%;
                    height: 100%;
                    box-sizing: content-box;
                    position: relative;
                `,
            )}
            ref={rootRef}
        >
            <div
                {...RotatbleDivProps}
                ref={rotatingBlockRef}
                className={css`
                    transform-style: preserve-3d;
                    width: 100%;
                    height: 100%;
                `}
            >
                {sidesTextureNormalized.map(([side, textureUrl]) => {
                    if (side !== 'top' && side !== 'front' && side !== 'left')
                        return null
                    return (
                        <div
                            key={side}
                            style={{
                                transform: `${
                                    rotateFunctions[side]
                                } translateZ(${width / 2}px)`,
                            }}
                            className={css`
                                filter: brightness(${sidesBrightness[side]});
                                position: absolute;
                                width: 100%;
                                height: 100%;
                            `}
                        >
                            <img
                                src={textureUrl}
                                alt=""
                                draggable="false"
                                className={css`
                                    width: 100%;
                                    height: 100%;
                                    ${pixelatedImage}
                                `}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default HotbarBlockModel
