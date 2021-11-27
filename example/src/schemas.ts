import {
    createSettingsSchema,
    menuField,
} from '@dimaka/interface/controller/settings'
import { PauseSchema } from '@dimaka/interface/react/high-level/GameHUD/PauseMenu'
import { useInterfaceState } from '@dimaka/interface/react/low-level/state'
import { startCase } from 'lodash-es'

const resolutionSettingsField = menuField(
    {
        reduced: true,
        normal: true,
        scaled: true,
    },
    'normal',
    {
        getMenuItemLabel(label) {
            const m =
                label === 'reduced'
                    ? 0.5
                    : label === 'normal'
                    ? 1
                    : window.devicePixelRatio
            const { availWidth, availHeight } = window.screen
            const mr = (n: number) => Math.floor(n * m)
            return `${startCase(label)} (${mr(availWidth)} X ${mr(
                availHeight,
            )})`
        },
    },
)

export const settingsSchema = {
    video: createSettingsSchema({
        general: {
            resolution: resolutionSettingsField,
        },
    }),
    sound: createSettingsSchema({
        general: {
            masterVolume: {
                type: 'slider',
                defaultValue: 50,
            },
        },
    }),
}

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
            action: 'custom',
            // we're already updating openUI
            closePause: false,
            onClick() {
                useInterfaceState.setState({ openedUI: { type: 'mainMenu' } })
            },
        },
    ],
}

export const mainMenuSchema = {
    buttons: [
        {
            // text: 'OPEN FOLDER WORLD',
            text: 'ENTER GAME',
            onClick: () => useInterfaceState.setState({ openedUI: null }),
        },
        {
            text: 'OPEN REMOTE WORLD',
            disabled: true,
        },
        {
            text: 'SETTINGS',
            onClick: () =>
                useInterfaceState.setState({
                    openedUI: { type: 'mainMenu' },
                }),
        },
    ],
}
