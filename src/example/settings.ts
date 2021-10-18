import { startCase } from 'lodash-es'

import { createSettingsSchema, menuField } from '../lib/createSettings'

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

export const tabsSchema = {
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
