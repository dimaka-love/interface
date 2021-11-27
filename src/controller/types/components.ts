// components of Controller API

import { PauseSchema } from '../../react/high-level/GameHUD/PauseMenu'

export type UiConfig = {
    pauseSchema: PauseSchema
    // todo move to UiCustomization
    hideHudIfDeviceNeedsRotation?: boolean
    /** Pass repo url to enable `report button or request feature` button */
    githubRepo?: string
}

export interface UiCustomization {
    forceTouchControls: boolean
    touchButtonSize: number
    touchButtonsGap: number
    hotbarSlotsGap: number
    maxHotbarSlotSize: number
}

// Future API
// type HardwareInfo = {
//     icon?: JSX.Element
// } & (
//     | {
//           state: 'loading' | 'errored'
//       }
//     | {
//           state: 'loaded'
//           value: string
//       }
// )
