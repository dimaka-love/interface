import { useMemo } from 'react'
import { useMedia } from 'react-use'
import { Except } from 'type-fest'
import createStore, { GetState, SetState } from 'zustand'
import { StoreApiWithSubscribeWithSelector, subscribeWithSelector } from 'zustand/middleware'
import { getInterfaceEmitter } from '../../controller/emitEvent'
import { ControllerAPI, ControllerSetters, ControllerState, OverriadbleState, PassinArgs } from '../../controller/types'
import { ArrayPoint, coordinateComponents } from '../vec3'

export const getInitialState = (): Except<ControllerState, keyof PassinArgs> => ({
    uiCustomization: {
        /** if true, touch controls will be used */
        forceTouchControls: false,
        touchButtonSize: 50,
        touchButtonsGap: 0,
        hotbarSlotsGap: 0,
        maxHotbarSlotSize: 45,
        touchTimeToDropItem: 600,
        touchTimeToDropItemStack: 1500,
    },
    movement: {
        x: 0,
        y: 0,
        z: 0,
    },
    hotbar: {
        selectedSlot: 0,
        slots: [],
    },
    isFlying: {
        // TODO disallow these defaults
        current: false,
        updatable: true,
        enabled: true,
    },
    openedUI: null,
    usingRawInput: null,
})

export const useInterfaceState = createStore<
    ControllerState,
    SetState<ControllerState>,
    GetState<ControllerState>,
    StoreApiWithSubscribeWithSelector<ControllerState>
>(subscribeWithSelector(() => getInitialState() as ControllerState))

export const initInterfaceState = (data: PassinArgs & OverriadbleState) => {
    useInterfaceState.setState(data as any)
}

export const registerEventEmitters = (controller: ControllerAPI) => {
    const emitter = getInterfaceEmitter(controller)
    useInterfaceState.subscribe(
        ({ movement }) => movement,
        movement => {
            let movementStopped = true
            for (const coord of coordinateComponents) {
                if (movement[coord] !== 0) {
                    movementStopped = false
                    break
                }
            }

            if (movementStopped) emitter.movementStopped()
            emitter.movementUpdated(...(coordinateComponents.map(coord => movement[coord]) as ArrayPoint))
        },
    )
    useInterfaceState.subscribe(
        // TODO ensure is changing
        ({ isFlying }) => isFlying.current,
        isFlying => {
            void emitter.isFlyingChanged(isFlying)
        },
    )
    useInterfaceState.subscribe(
        ({ hotbar }) => hotbar.selectedSlot,
        selectedSlot => {
            void emitter.slotSelectChanged(selectedSlot, useInterfaceState.getState().hotbar.slots[selectedSlot]!)
        },
    )
    useInterfaceState.subscribe(
        ({ hotbar }) => hotbar.slots,
        slots => {
            // TODO
            // void emitter.slotUpdated(index, slot)
        },
    )
}

// type PickUpdaters<T extends Record<string, any>> = {
//     [K in keyof T as T[K] extends Record<string, any>
//         ? T[K] extends any[]
//             ? never
//             : K
//         : K extends `update${string}`
//         ? PickUpdaters<T[K]> extends {} | Record<never, any>
//             ? never
//             : K
//         : never]: T[K] extends Record<string, any> ? PickUpdaters<T[K]> : T[K]
// }

export const registerControllerSetters = () => {
    // controller.hotbar
    const registered: ControllerSetters = {
        hotbar: {
            replaceSlots(newSlots) {
                useInterfaceState.setState(state => ({
                    hotbar: {
                        ...state.hotbar,
                        slots: newSlots,
                    } as any,
                }))
            },
        },
        registerCameraMoveHandler(handler) {
            useInterfaceState.setState({
                cameraMoveHandler: handler,
            })
        },
        setIsFlying(s) {
            useInterfaceState.setState(state => ({
                isFlying: {
                    ...state.isFlying,
                    ...s,
                },
            }))
        },
    }
    return registered
}

export const useUsingTouch = (): boolean => {
    const { forceTouchControls } = useInterfaceState(state => state.uiCustomization)
    // TODO-HIGH RESOLVE CHROMIUM BUG
    const touchSupportedQuery = useMedia(`(pointer: coarse)`) // do we need to check 'ontouchstart' in window?
    // todo remove useMemo
    return useMemo(
        () =>
            forceTouchControls ||
            touchSupportedQuery ||
            // workaround for chromium bug. Just try to comment this line and use select element feature (CTRL+SHIFT+C) with active mobile view
            navigator.userAgent.includes('Mobile'),
        [forceTouchControls, touchSupportedQuery],
    )
}
