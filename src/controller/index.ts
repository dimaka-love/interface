import { defaultsDeep, mapValues, omitBy } from 'lodash-es'
import tempCreateStore from 'zustand'
import { initInterfaceState, registerControllerSetters, registerEventEmitters } from '../react/low-level/state'
import { CreateControllerParams, ControllerAPI, ControllerAPIInit } from './types'
import { filterValues } from './util'

// Todo make augmentable !
export interface SlotDataType {}

// TODO remove type and make inline generic

/** I was thinking about it for a long time and decided that one page should be able to init only one game (<Interface> component) */
export const createDimakaInterfaceController = ({ settingsStore, ...requriedConfig }: CreateControllerParams): ControllerAPI => {
    // TODO use ttypescript when ready
    const eventsEmpty: ControllerAPI['events'] = {
        movementStopped: [],
        movementUpdated: [],
        slotSelectChanged: [],
        slotUpdated: [],
        isFlyingChanged: [],
    }

    const controllerInit: ControllerAPIInit = {
        events: eventsEmpty,
        /** doesn't guarantee that settings are loaded */
        init: false,
        _initSubscribers: {
            app: [],
            settings: [],
        },
        // onDidInit(cb /* , needSettings = false */) {
        //     if (controllerInit.init) cb()
        //     else controllerInit._initSubscribers.app.push(cb)
        // },
        _onDidSettingsInit(cb) {
            // already got it
            if (controllerInit.settingsStore.resolvedConfig) cb()
            else controllerInit._initSubscribers.settings.push(cb)
        },
        // _settingsStoreProvider: settingsStore.provider,
        inventory: {
            hotbar: {
                slots: [],
                replaceSlots(slots) {
                    controllerInit.inventory.hotbar.slots = slots
                },
            },
        },
        // lodash-marker
        settingsStore: {
            resolvedConfig: undefined,
            useSettingsStore: tempCreateStore(() => ({})),
            // ...Object.fromEntries(Object.entries(settingsStore).filter(([key]) => key !== 'provider')),
        },
        registerEventListener(event, listener) {
            controllerInit.events[event].push(listener as any)
        },
    }

    controllerInit.settingsStore.useSettingsStore.subscribe(tabsSettings => {
        const settignsGroupsParsed = mapValues(tabsSettings, (groupedSettings, tabName) =>
            mapValues(groupedSettings, (settingsList, groupName) =>
                filterValues(settingsList, (key, value) => {
                    //@ts-ignore todo
                    const settingSchema = controllerInit.settingsStore.schema[tabName]![groupName]![key]!
                    if (!('defaultValue' in settingSchema)) return false
                    return settingSchema.defaultValue !== value
                }),
            ),
        )
        // remove groups with no settings
        const newUserConfig = omitBy(settignsGroupsParsed, group => Object.keys(group).length === 0)
        // controllerInit._settingsStoreProvider.saveConfig?.(newUserConfig)
        // TODO save property
    })

    // void (async () => {
    //     const data = await settingsStore.provider.load()
    //     controllerInit.settingsStore.resolvedConfig = data
    //     controllerInit.settingsStore.useSettingsStore.setState(data)
    //     // TODO
    //     for (const cb of controllerInit._initSubscribers.settings) {
    //         cb()
    //     }
    // })()

    initInterfaceState(requriedConfig)
    Object.assign(controllerInit, registerControllerSetters())
    registerEventEmitters(controllerInit as ControllerAPI)

    return controllerInit as ControllerAPI
}
