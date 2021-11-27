import React from 'react'

import _, { times } from 'lodash-es'
import useEventListener from 'use-typed-event-listener'

import { css } from '@emotion/css'

import { useModalState, ErrorBoundary } from '@zardoy/react-util'

// import ItemSlot, { SlotData } from '@dimaka/interface/CoreHUD/ItemSlot'
// import { PauseSchema } from '@dimaka/interface/PauseMenu/PauseMenu'
// import { initSettingsStore } from '@dimaka/interface/settingsStore'
import { dirtBlockTextureUrl } from '@dimaka/interface/react/low-level/components/GameHUD/BlockModel/textureSamples'
import { AppProvider, MainMenuScreen } from '@dimaka/interface/react/high-level'

import { createDimakaInterfaceController } from '@dimaka/interface/controller'
import { pauseSchema, settingsSchema } from './schemas'
import { settingsProvider } from './settings'
import { useInterfaceState } from '@dimaka/interface/react/low-level/state'
import { SlotData } from '@dimaka/interface/react/low-level/components/GameHUD/ItemSlot'

const controller = createDimakaInterfaceController({
    settingsStore: {
        schema: settingsSchema,
        provider: settingsProvider,
    },
    uiConfig: {
        pauseSchema,
    },
})

const testSlots = _.times(
    9,
    (): SlotData => ({
        type: 'block',
        count: 1,
        getTexture: () => dirtBlockTextureUrl,
    }),
)
// slots: _.times(9, (): SlotData => ({
//     type: "item",
//     count: 64,
//     texture: bowItemTextureUrl
// }))

// const slotWidth = window.innerWidth / slotsCount

controller.hotbar.replaceSlots(testSlots)

const App: React.FC = () => {
    const show = useModalState()

    useEventListener(window, 'keydown', ({ code }) => {
        if (code !== 'KeyE') return
        show.toggle()
    })

    return (
        <ErrorBoundary>
            <AppProvider
                controller={controller}
                rootClassName={css`
                    background: url('src/background-testing.png') no-repeat 50% 50% / cover fixed black;
                `}
                canvasEl={<></>}
            />
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
        </ErrorBoundary>
    )
}

export default App
