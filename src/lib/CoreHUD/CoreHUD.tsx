import React from 'react'

import { css } from '@emotion/css'

import { useUsingTouch } from '../state'
import { LeftTouchArea, RightTouchArea } from '../TouchControls'
import Hotbar from './Hotbar'

interface ComponentProps {}

let CoreHUD: React.FC<ComponentProps> = () => {
    const usingTouch = useUsingTouch()

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

//lib-export
export default CoreHUD
