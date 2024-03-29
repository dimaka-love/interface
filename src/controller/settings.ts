// using custom schema provider because ajv doesn't allow to define strictly-typed schemas easily

type SettingLabel = string | ((/*  | Promise<string> */) => string)

type SettingSchemaFieldTypes =
    | {
          type: 'menu'
          values: Record<string, SettingLabel | true>
          defaultValue: string
          /** overrides label for **every** menu item, so when this is specified pass true in values */
          getMenuItemLabel?: (label: any) => string
      }
    | {
          type: 'slider'
          defaultValue: number
          /** @default 0 */
          min?: number
          /** @default 100 */
          max?: number
      }
    | {
          type: 'toggle'
          defaultValue: boolean
      }
    | {
          type: 'text'
          text: string
      } /*  | {
    type: "button",
    text: string;
    onClick?: () => unknown;
}; */
// TODO uncomment above

type CommonSettingFields = {
    /** @default settingLabel is displayed as label. Used if need to save backward compatibility but change setting label */
    displayLabel?: string
    // not supported yet
    // disabled: boolean | (() => boolean)
    // hint: string;
}

export type SettingField = CommonSettingFields & SettingSchemaFieldTypes

export type SettingsSchema = {
    [tab: string]: TabSettingsSchema
}

export type TabSettingsSchema = {
    [settingsGroup: string]: {
        [settingLabel: string]: SettingField
    }
}

export const createSettingsSchema = <T extends TabSettingsSchema>(params: T) => params

export const menuField = <K extends Record<string, SettingLabel | true>, T extends keyof K>(
    valuesToLabelMap: K,
    defaultValue: T,
    additionalProperties: CommonSettingFields & {
        getMenuItemLabel?: (label: keyof K) => string
    } = {},
) => ({
    type: 'menu' as const,
    values: valuesToLabelMap,
    defaultValue,
    ...additionalProperties,
})
