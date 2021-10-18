import React, { useEffect, useMemo, useRef } from 'react'

import anime from 'animejs'
import clsx from 'clsx'
import reactUseMeasure from 'react-use-measure'

import { css } from '@emotion/css'
import { ResizeObserver } from '@juggle/resize-observer'

import type { Except } from 'type-fest'
// UNMAINTAINED! Original Version of HotbarBlockModel

// You can apply this cool filter if you use this component in documentation: boxShadow: "inset 0 0 10px gray";

interface StylesProps {
    /** BlockModel uses content-box so the final size for elem is `size + size/2 + 15` */
    // size: number,
    /** pass `none` to disable perspective for the cube */
    perspective?: number | 'none'
    rotateY?: number | 'animate'
    rotateX?: number
}

const blockSides = ['front', 'back', 'right', 'left', 'top', 'bottom'] as const

type BlockSide = typeof blockSides[number]

// you need to workaround this for now
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
    right: 'rotateY(90deg)',
    top: 'rotateX(90deg)',
    bottom: 'rotateX(-90deg)',
    back: 'rotateY(180deg)',
}

const makeBlockSides = (texture: string): [BlockSide, string][] =>
    blockSides.map(side => [side, texture])

// Not used in Dimaka. Todo: make benchmarks. I'll replace DOM HUD with native (canvas)

/** You **must** ensure that `height` is **always equal** to `width` of the container, otherwise you'd get *broken* cube */
let BlockModel: React.FC<ComponentProps> = ({
    sideTextures: sidesTexture,
    RootDivProps = {},
    RotatbleDivProps = {},
    rotateX = -30,
    rotateY = -45,
    perspective = 600,
}) => {
    // todo combine refs
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

    useEffect(() => {
        console.log('Change width', width)
    }, [width])

    // TS still normalizes values
    const sidesTextureNormalized = useMemo(
        () =>
            typeof sidesTexture === 'string'
                ? makeBlockSides(sidesTexture)
                : Object.entries(sidesTexture),
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
                    perspective: ${perspective}px;
                    /* padding: ${width / 4 + 15}px; */
                    overflow: hidden;
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
                    return (
                        <div
                            key={side}
                            className={css`
                                transform: ${rotateFunctions[side]}
                                    translateZ(${width / 2}px);
                                position: absolute;
                                width: 100%;
                                height: 100%;
                            `}
                        >
                            <img
                                src={textureUrl}
                                alt={`block side`}
                                draggable="false"
                                className={css`
                                    width: 100%;
                                    height: 100%;
                                    image-rendering: crisp-edges;
                                    image-rendering: pixelated;
                                `}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
