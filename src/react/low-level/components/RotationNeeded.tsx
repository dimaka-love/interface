import React from 'react'

import { css } from '@emotion/css'

import { modalStyles } from '../styles'
import { ScreenRotation } from '../mui'

interface ComponentProps {}

const RotationNeeded: React.FC<ComponentProps> = () => (
    <div
        className={css`
            ${modalStyles}
            pointer-events: none;
        `}
    >
        <ScreenRotation
            color="action"
            style={{
                width: '50%',
                height: '50%',
            }}
        />
    </div>
)

export default RotationNeeded
