import { UseBoundStore } from 'zustand'
import { MaybePromise } from '../../react/types'
import { SettingsSchema } from '../settings'

export interface SettingsStore {
    /** merged with default values from config */
    resolvedConfig: SettingsSchema | undefined
    schema: SettingsSchema
    provider: {
        load(): MaybePromise<SettingsSchema>
        /**
         * @param newUserConfig default values removed
         */
        saveConfig?(newUserConfig: SettingsSchema): MaybePromise<void>
        /** Can be used as alternative to `saveSchema` */
        saveProperty?(
            group: string,
            name: string,
            value: any,
        ): MaybePromise<void>
    }
    useSettingsStore: UseBoundStore<SettingsSchema>
    getValue: any
    // getValue: <
    //     TS extends RootSettingsSchema,
    //     T extends keyof TS,
    //     G extends keyof TS[T],
    //     SS extends keyof TS[T][G],
    //     U extends boolean = false,
    // >(
    //     tabsSchema: TS,
    //     tab: T,
    //     group: G,
    //     setting: SS,
    //     //@ts-expect-error I don't know
    //     userValue: U = false,
    // ) => TS[T][G][SS] extends { type: 'menu' }
    //     ? keyof TS[T][G][SS]['values']
    //     : TS[T][G][SS] extends { defaultValue: infer U }
    //     ? U
    //     : void
    // updateSettingValue(tab, group, setting): Promise<void>
}
