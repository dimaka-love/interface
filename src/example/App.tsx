import React from 'react'

import _, { times } from 'lodash-es'
import useEventListener from 'use-typed-event-listener'

import { css } from '@emotion/css'

// import backgroundTestingSrc from "../"; TODO! FIX SNOWPACK!!
import AppProvider from '../lib/AppProvider'
import ItemSlot, { SlotData } from '../lib/CoreHUD/ItemSlot'
import ErrorBoundary from '../lib/ErrorBoundary'
import PauseMenu, { PauseSchema } from '../lib/PauseMenu/PauseMenu'
import { useModalState } from '../lib/react-util'
import { initSettingsStore } from '../lib/settingsStore'
import { useLocalGameState } from '../lib/state'
import { tabsSchema } from './settings'

interface ComponentProps {}

export const pauseSchema: PauseSchema = {
    buttons: [
        {
            label: 'CONTINUE PLAYING',
            action: 'close-pause',
        },
        {
            label: 'OPTIONS',
            action: 'open-menu',
            menu: 'settings-video',
        },
        {
            label: 'LEAVE WORLD',
            action: 'disabled',
        },
    ],
}

initSettingsStore({
    localStorageKey: 'dimaka-local-settings',
    settingsTabsSchema: tabsSchema,
})

export const dirtBlockTextureUrl = `https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/master/data/1.16.4/blocks/dirt.png`
export const bowItemTextureUrl = `https://github.com/InventivetalentDev/minecraft-assets/blob/1.16.5/assets/minecraft/textures/item/bow.png?raw=true`

useLocalGameState.setState({
    slots: _.times(
        9,
        (): SlotData => ({
            type: 'block',
            count: 1,
            getTexture: () => dirtBlockTextureUrl,
        }),
    ),
    // slots: _.times(9, (): SlotData => ({
    //     type: "item",
    //     count: 64,
    //     texture: bowItemTextureUrl
    // }))
})

const slotData = useLocalGameState.getState().slots[0]!

const slotsCount = 9

const slotWidth = window.innerWidth / slotsCount

let App: React.FC<ComponentProps> = ({}) => {
    const show = useModalState()

    useEventListener(window, 'keydown', ({ code }) => {
        if (code !== 'KeyE') return
        show.toggle()
    })

    return (
        <ErrorBoundary>
            <AppProvider
                rootClassName={css`
                    background: url('background-testing.png') no-repeat 50% 50% /
                        cover fixed black;
                `}
            >
                {/* <MainMenu buttons={[
                {
                    text: "OPEN FOLDER WORLD",
                },
                {
                    text: "OPEN REMOTE WORLD",
                    disabled: true
                },
                {
                    text: "SETTINGS",
                }
            ]} /> */}
                {/* <div style={{
                width: 200,
                height: 200,
                padding: 50
            }}>
                <HotbarBlockModel
                    RootDivProps={{
                        style: { overflow: "visible" }
                    }}
                    sideTextures=""
                />
            </div> */}
                {/* <BlockModelNew /> */}
                {
                    <div
                        style={{ display: show.isOpen ? 'flex' : 'none' }}
                        className={css`
                            height: ${slotWidth}px;
                        `}
                    >
                        {times(slotsCount, index => (
                            <div key={index} style={{ width: slotWidth }}>
                                <ItemSlot blocksPadding={9} data={slotData} />
                            </div>
                        ))}
                    </div>
                }
                {/* <Inventory />
            <CoreHUD />
            <PauseMenu schema={pauseSchema} /> */}
            </AppProvider>
        </ErrorBoundary>
    )
}

export default App
