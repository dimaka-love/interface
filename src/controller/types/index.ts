import { Except, ReadonlyDeep } from 'type-fest'
import { SlotData } from '../../react/low-level/components/GameHUD/ItemSlot'
import { CoordinateComponent } from '../../react/vec3'
import { MaybePromise } from '../../react/types'
import { SettingsStore } from './settingsStore'
import { DimakaInterfaceEvents } from './events'
import { UiConfig, UiCustomization } from './components'
import { DeepPartial } from 'ts-essentials'
import { OpenUI } from './openedUI'

export type Slot = SlotData

interface SlotManipulator {
    readonly slots: Slot[]
    // updateSlots(slots: Slot[], startIndex?: number /* = 0 */): void
    replaceSlots(slots: Slot[]): void
}

type InventoryMatrix = {
    /** @default 4 */
    readonly rows: number
    /** @default 9 */
    readonly itemsPerRow: number
}

// TODO rename state from user with no defaults
export type PassinArgs = {
    uiConfig: UiConfig
}
export type OverriadbleState = DeepPartial<Pick<ControllerState, 'uiCustomization'>>

// TODO
// type ControllerWithSetters

export type ControllerState = ReadonlyDeep<
    {
        uiCustomization: UiCustomization
        movement: Record<CoordinateComponent, number>
        // inventory:
        hotbar: {
            selectedSlot: number
            slots: SlotData[]
        }
        /** @setter */
        isFlying: {
            enabled: boolean
            // todo rename
            updatable: boolean
            current: boolean
        }
        // isFlying: {
        //     current: boolean
        // } | false
        // hardwareInfo: [] as HardwareInfo[],
        /** if not null - UI is open. playing game in all cases except mainMenu */
        openedUI: OpenUI | null
        usingRawInput: true | false | null
        cameraMoveHandler?: (delta: Record<'x' | 'y', number>) => MaybePromise<void>
    } & PassinArgs
>

// TODO fix suggestions for this tsdoc
/** @extends ControllerState */
export type ControllerSetters = ReadonlyDeep<{
    hotbar: {
        replaceSlots(newSlots: Array<Slot | undefined>): void
    }
    setIsFlying(s: Partial<ControllerState['isFlying']>): void
    registerCameraMoveHandler(newHandler: ControllerState['cameraMoveHandler']): void
    /**
     * @param newSlot undefined to remove slot data
     */
    // updateSlot(index: number, newSlot: Slot | undefined): void
}>

/**
 * @publicName DimakaInterfaceControllerAPI
 */
export interface ControllerAPIInit {
    /** @internal */
    // _settingsStoreProvider: SettingsStore['provider']
    /**
     * settings - internal only
     * @internal
     *  */
    _initSubscribers: Record<'app' | 'settings', Array<() => any>>

    events: {
        [K in keyof DimakaInterfaceEvents]: Array<DimakaInterfaceEvents[K]>
    }
    // provider shouldn't be accessible
    settingsStore: Except<SettingsStore, 'provider' | 'getValue' | 'schema'>
    init: boolean
    registerEventListener<T extends keyof DimakaInterfaceEvents>(event: T, listener: DimakaInterfaceEvents[T]): void

    // This will be reused in dimaka API
    // inventory: {
    //     readonly matrix: InventoryMatrix

    //     updateMatrix(newMatrix: InventoryMatrix): void
    //     setRows(rows: number): void
    //     getRow(row: number): SlotManipulator
    //     /** Update all slots */
    // } & SlotManipulator

    inventory: {
        hotbar: {
            slots: Slot[]
            replaceSlots(slots: Slot[]): void
        }
    }

    /** @internal */
    _onDidSettingsInit(cb: () => any)

    /** Functions added after init will be executed emmideately */
    // onDidInit(fn: () => any): void
    // TODO special promise type
}
// TODO enable state
export type ControllerAPI = ControllerAPIInit & ControllerSetters

// export type DimakaInterfaceControllerAfterInit = Pick<ControllerAPI, never>
// export type DimakaInterfaceControllerBeforeInit = Except<
//     ControllerAPI,
//     keyof DimakaInterfaceControllerAfterInit
// >

export interface CreateControllerParams extends PassinArgs, OverriadbleState {
    settingsStore?: Pick<SettingsStore, 'provider' | 'schema'>
}
