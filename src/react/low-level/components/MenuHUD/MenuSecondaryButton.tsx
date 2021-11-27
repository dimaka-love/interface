import React from 'react'

import clsx from 'clsx'

import { css } from '@emotion/css'

import { buttonStyles } from '../../styles'

type ComponentProps = {
    children?: void
    label: string
    keyboardKey: string
} & React.ComponentProps<'button'>

/** "raw" component */
export const MenuSecondaryButton: React.FC<ComponentProps> = ({
    keyboardKey,
    label,
    ...buttonProps
}) => (
    <button
        className={clsx(
            css`
                ${buttonStyles}
                letter-spacing: 1px;
                padding: 3px;
                display: flex;
                align-items: center;
                font-weight: 500;
                font-size: 1rem;
                outline: none;
                border-radius: 2px;
                border: 1px solid transparent;

                &:hover {
                    border: 1px solid rgba(255, 255, 255, 0.4);
                }
                &:active {
                    transform: scale(0.9);
                }
            `,
            buttonProps.className,
        )}
        tabIndex={-1}
        {...buttonProps}
        type="button"
    >
        <div
            className={css`
                text-overflow: clip;
                padding: 10px;
                background: rgba(0, 0, 0, 0.5);
                font-size: 0.8em;
                text-transform: inherit;
            `}
        >
            {keyboardKey}
        </div>
        <div
            className={css`
                padding: 0 10px;
                text-shadow: 0 0 5px black;
            `}
        >
            {label}
        </div>
    </button>
)

export default MenuSecondaryButton
