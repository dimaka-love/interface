import React from 'react'

import { css } from '@emotion/css'

import { useInterfaceState, useUsingTouch } from 'low-level/state'
import {
    LeftTouchArea,
    RightTouchArea,
} from 'low-level/components/GameHUD/TouchControls'
import Hotbar from './Hotbar'

interface ComponentProps {}

const GameHUD: React.FC<ComponentProps> = () => {
    const usingTouch = useUsingTouch()
    const openedUI = useInterfaceState(s => s.openedUI)

    if (openedUI?.type === 'mainMenu') return null

    return (
        <div
            className={css`
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
            `}
        >
            {/* <BlockInfo data={{ mod: "Core", title: "Dirt", state: "10290 / 324 " }} /> */}
            <div />
            <div />
            <div
                className={css`
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                    align-items: flex-end;
                `}
            >
                {usingTouch ? <LeftTouchArea /> : <div />}
                <Hotbar />
                {usingTouch ? <RightTouchArea /> : <div />}
            </div>
        </div>
    )
}

// lib-export
export default GameHUD
