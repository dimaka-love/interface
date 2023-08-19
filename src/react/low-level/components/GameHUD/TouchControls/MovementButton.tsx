import React from 'react'

import clsx from 'clsx'

import { css } from '@emotion/css'

import { useInterfaceState } from '../../../state'
import _MovementButtonSvgr from './svg/MovementButton.svgr.svg'
import _CircleButtonSvgr from './svg/CircleButton.svgr.svg'
import { useFixedPointerEvents } from './util'

const MovementButtonSvgr = _MovementButtonSvgr.ReactComponent ? _MovementButtonSvgr.ReactComponent : _MovementButtonSvgr
const CircleButtonSvgr = _CircleButtonSvgr.ReactComponent ? _CircleButtonSvgr.ReactComponent : _CircleButtonSvgr

type CoordinateComponent = 'x' | 'y' | 'z'
export type MovementAction = [coordinate: CoordinateComponent, step: number]
type ComponentProps = {
    action: MovementAction | MovementAction[] | ((newState: boolean) => unknown)
    /** @default true */
    borderOnTouch?: boolean
    DivProps?: React.ComponentProps<'div'>
    Image?:
        | null
        | ({
              type: 'bundled'
              src: 'arrow' | 'circle'
          } & React.ComponentProps<'svg'>)
        | ({
              type: 'external'
              src: string
          } & React.ComponentPropsWithRef<'img'>)
}

const touchingButtonClass = css`
    background-color: rgba(255, 255, 255, 0.1);
`

const MovementButton: React.FC<ComponentProps> = ({ action, children, DivProps, Image = null }) => {
    const [pointerEvents, touching] = useFixedPointerEvents({
        updateTouching:
            typeof action === 'function'
                ? action
                : newState => {
                      // unstable
                      const movementActions = typeof action[0] === 'string' ? [action as MovementAction] : (action as MovementAction[])

                      const coordsToUpdate = Object.fromEntries(movementActions.map(([coord, step]) => [coord, newState ? step : 0])) as Record<
                          MovementAction[0],
                          number
                      >
                      //   todo document or change impl
                      //@ts-ignore
                      useInterfaceState.getState().updateCoord?.(Object.entries(coordsToUpdate)[0])
                      useInterfaceState.setState({ movement: coordsToUpdate })
                  },
    })

    // todo-high! use HOC

    const imageClassName = Image
        ? clsx(
              css`
                  opacity: 0.9;
              `,
              Image.className,
          )
        : undefined

    return (
        <div
            data-name="MovementButton"
            {...DivProps}
            className={clsx(
                css`
                    width: 100%;
                    height: 100%;
                    & > * {
                        pointer-events: none;
                        width: 100%;
                        height: 100%;
                    }
                `,
                {
                    [touchingButtonClass]: touching,
                },
                DivProps?.className,
            )}
            {...pointerEvents}
        >
            {Image && Image.type === 'bundled' ? (
                Image.src === 'arrow' ? (
                    <MovementButtonSvgr
                        className={clsx(
                            css`
                                background: rgba(128, 128, 128, 0.8);
                            `,
                            imageClassName,
                        )}
                    />
                ) : (
                    <CircleButtonSvgr className={imageClassName} />
                )
            ) : (
                // TODO
                //@ts-ignore
                <img {...Image} className={imageClassName} />
            )}
            {children}
        </div>
    )
}

export default MovementButton
