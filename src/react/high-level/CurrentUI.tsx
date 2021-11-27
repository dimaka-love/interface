import { useInterfaceState } from 'low-level/state'
import React from 'react'
import useEventListener from 'use-typed-event-listener'
import GameHUD from './GameHUD/GameHUD'
import PauseMenu, { openPauseMenu } from './GameHUD/PauseMenu'

interface ComponentProps {}

// TODO rename component. hf

// needs some kind of routing for displaying current UI

const CurrentUI: React.FC = () => {
    const openedUI = useInterfaceState(s => s.openedUI)

    useEventListener(window, 'keydown', ({ code }) => {
        const inventoryOpened = openedUI?.type === 'inventory'
        if (code !== 'KeyE') return
        if (openedUI && !inventoryOpened) return
        if (inventoryOpened) useInterfaceState.setState({ openedUI: null })
        else useInterfaceState.setState({ openedUI: { type: 'inventory' } })
    })

    useEventListener(document, 'pointerlockchange', () => {
        if (document.pointerLockElement) return
        openPauseMenu()
    })

    return (
        <>
            <PauseMenu />
            <GameHUD />
        </>
    )
}

export default CurrentUI
