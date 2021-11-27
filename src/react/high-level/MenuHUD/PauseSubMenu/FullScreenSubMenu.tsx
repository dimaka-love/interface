import React from 'react'

import useEventListener from 'use-typed-event-listener'

import { css } from '@emotion/css'

import MenuBackButton from '../../../low-level/components/MenuHUD/MenuBackButton'
import { focusLastElem } from 'low-level/private-state'
import { useInterfaceState } from 'low-level/state'

interface ComponentProps {
    /** @default true */
    closable?: boolean
}

const FullScreenSubMenu: React.FC<ComponentProps> = ({ children, closable = true }) => {
    useEventListener(window, 'keydown', ({ code }) => {
        if (code !== 'Escape' || !closable) return
        useInterfaceState.setState({ openedUI: { type: 'pause', menu: 'root' } })
        focusLastElem()
    })

    return (
        <>
            <div
                className={css`
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.75);
                `}
            >
                {children}
            </div>
            {/* {closable && <MenuBackButton />} */}
            <MenuBackButton />
        </>
    )
}

export default FullScreenSubMenu
