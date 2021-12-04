// reference https://static.wikia.nocookie.net/minecraft_ru_gamepedia/images/8/80/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82_China_Version.png/revision/latest?cb=20200201193911

import React, { useMemo, useState } from 'react'

import { css } from '@emotion/css'

import MovementButton, { MovementAction } from './MovementButton'
import { useInterfaceState } from '../../../state'

interface ComponentProps {}

interface TouchAreaProps {
    templateAreas: string[]
}

// IOS safari bug: select element dev feature fires touch/pointer events and doesn't fire cancel/end event! So, it's posiible to accomplish the state where app thinks that user holds button but he's actually not!
// there is no workaround for this now.

const TouchMovementArea: React.FC<TouchAreaProps> = ({ templateAreas, children }) => {
    const touchSize = useInterfaceState(store => store.uiCustomization.touchButtonSize)
    const touchButtonsGap = useInterfaceState(store => store.uiCustomization.touchButtonsGap)

    // todo memoizing
    const gridTemplateAreas = useMemo(() => templateAreas.map(s => `"${s}"`).join(''), [templateAreas])

    return (
        <div
            data-name="TouchMovementArea"
            className={css`
                display: grid;
                grid-template-areas: ${gridTemplateAreas};
                gap: ${touchButtonsGap}px;
                grid-auto-columns: ${touchSize}px;
                grid-auto-rows: ${touchSize}px;
            `}
        >
            {children}
        </div>
    )
}

const pauseButtonSize = 45

export const PauseButton: React.FC = () => (
    <img
        style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: pauseButtonSize,
            height: pauseButtonSize,
            padding: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
        onTouchStart={() => {
            window.dispatchEvent(
                new KeyboardEvent('keydown', {
                    code: 'Escape',
                }),
            )
        }}
        // src={pauseButtonSrc}
    />
)

export const LeftTouchArea: React.FC<ComponentProps> = () => {
    const [showForwardAuxButtons, setShowForwardAuxButtons] = useState(false)

    return (
        <TouchMovementArea templateAreas={['wa w wd', 'a . d', '. s .']}>
            {leftControlsConfig.map(
                ([label, rotate, action]) =>
                    (Math.abs(rotate) !== 45 || showForwardAuxButtons) && (
                        <MovementButton
                            key={label}
                            action={action}
                            DivProps={{
                                className: css`
                                    /* border: ${Math.abs(rotate) !== 45 ? '1px solid rgba(255, 255, 255, 0.2)' : ''}; */
                                    grid-area: ${label};
                                `,
                            }}
                            Image={{
                                type: 'bundled',
                                src: 'arrow',
                                className: css`
                                    transform: rotate(${rotate}deg);
                                `,
                            }}
                        />
                    ),
            )}
        </TouchMovementArea>
    )
}

const rightControlsConfig: ControlsConfig = [
    ['u', 0, ['y', 1]],
    ['d', 180, ['y', -1]],
]

export const RightTouchArea: React.FC<ComponentProps> = () => {
    const isFlying = useInterfaceState(state => state.isFlying)

    return (
        <TouchMovementArea templateAreas={['u .', 'c .', 'd .']}>
            {isFlying ? (
                rightControlsConfig.map(([label, rotate, action]) => (
                    <MovementButton
                        key={label}
                        action={action}
                        // updateTouching={moving => updateMoving(moving, index)}
                        DivProps={{
                            className: css`
                                grid-area: ${label};
                            `,
                        }}
                        Image={{
                            type: 'bundled',
                            src: 'arrow',
                            className: css`
                                transform: rotate(${rotate}deg);
                            `,
                        }}
                    />
                ))
            ) : (
                <MovementButton
                    action={['y', 1]}
                    DivProps={{
                        className: css`
                            grid-area: c;
                            height: 100%;
                        `,
                    }}
                    Image={{
                        type: 'bundled',
                        src: 'circle',
                    }}
                />
            )}
        </TouchMovementArea>
    )
}
