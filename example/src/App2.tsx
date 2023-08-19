import React, { useEffect } from 'react'
import { LeftTouchArea, RightTouchArea, useUsingTouch, useInterfaceState } from '../../build'
import { css } from '@emotion/css'

export default () => {
    const usingTouch = useUsingTouch()

    useEffect(() => {
        useInterfaceState.subscribe(
            ({ movement }) => movement,
            movement => {
                console.log(movement)
            },
        )
    }, [])

    return (
        <div
            onTouchMove={() => console.log('test')}
            className={css`
                position: fixed;
                inset: 0;
                height: 100%;
                display: flex;
                width: 100%;
                justify-content: space-between;
                align-items: flex-end;
            `}
        >
            {usingTouch ? <LeftTouchArea /> : <div />}
            <div />
            {usingTouch ? <RightTouchArea /> : <div />}
        </div>
    )
}
