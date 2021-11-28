import { OpenUI, PauseMenus } from '../../../../controller/types/openedUI'
import { useInterfaceState } from '../../state'

export const openPauseMenu = () => {
    useInterfaceState.setState({ openedUI: { type: 'pause', menu: 'root' } })
}

export const closePauseMenu = () => {
    useInterfaceState.setState({ openedUI: null })
    document.documentElement.requestPointerLock()
}

export type PauseSchemaButton = {
    label: string
    autoFocus?: boolean
} & (
    | {
          action: 'close-pause'
      }
    | {
          action: 'open-menu'
          menu: Exclude<PauseMenus, 'root'>
      }
    | {
          action: 'open-ui'
          menu: OpenUI
      }
    | {
          action: 'custom'
          closePause: boolean
          onClick: (event: React.MouseEvent<HTMLElement>) => void
      }
    | {
          action: 'disabled'
      }
)
