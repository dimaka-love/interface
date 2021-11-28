import { css } from '@emotion/css'
import React, { useCallback } from 'react'
import { addElemToFocus } from '../../private-state'
import { useInterfaceState } from '../../state'
import { buttonStyles, focusableElemOutline } from '../../styles'
import { closePauseMenu, PauseSchemaButton } from './pauseMenu'

const PauseButton: React.FC<PauseSchemaButton> = props => {
    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            switch (props.action) {
                case 'close-pause':
                    closePauseMenu()
                    break
                case 'open-menu':
                    addElemToFocus(e.currentTarget)
                    useInterfaceState.setState({
                        openedUI: { type: 'pause', menu: props.menu },
                    })
                    break
                case 'custom':
                    props.onClick(e)
                    if (props.closePause) closePauseMenu()
                    break
                case 'open-ui':
                    useInterfaceState.setState({ openedUI: props.menu })
                    break
                case 'disabled':
                    break
            }
        },
        [props],
    )

    return (
        <button
            className={css`
                ${buttonStyles}
                width: 300px;
                padding: 8px;
                margin: 3px;
                font-size: 1.2rem;
                font-weight: 500;
                background: rgba(0, 0, 0, 0.6);
                cursor: ${props.action === 'disabled' ? 'not-allowed' : 'default'};

                &:hover {
                    background: rgba(0, 0, 0, 0.7);
                }
                &:focus {
                    ${focusableElemOutline}
                }
            `}
            autoFocus={props.autoFocus}
            type="button"
            onClick={handleClick}
        >
            {props.label}
        </button>
    )
}

export default PauseButton
