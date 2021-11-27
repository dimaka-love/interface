export type SettingsMenus =
    | 'video'
    | 'world'
    | 'controls'
    | 'sound'
    | 'other'
    | 'social'

export type PauseMenus = 'root' | `settings-${SettingsMenus}` | 'social'

export type OpenedUI =
    | {
          type: 'mainMenu'
          submenu?: string
      }
    | {
          type: 'pause'
          menu: PauseMenus
      }
    | {
          type: 'inventory'
      }
    | {
          type: 'block-ui'
          blockName: string //make typed
      }
    | {
          type: 'item-ui'
          itemName: string
      }
    | {
          type: 'custom'
          mod: string
          uiName: string
      }
