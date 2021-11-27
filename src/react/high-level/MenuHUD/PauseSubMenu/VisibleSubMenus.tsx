import React, { useMemo } from 'react'

import { useInterfaceState } from 'low-level/state'
import FullScreenSubMenu from './FullScreenSubMenu'
import Settings from './Settings'

interface ComponentProps {}

const VisibleSubMenus: React.FC<ComponentProps> = () => {
    const openedUI = useInterfaceState(s => s.openedUI)

    const subMenuComponent = useMemo(() => {
        if (openedUI?.type !== 'pause' || openedUI.menu === 'root') return null
        if (openedUI.menu.startsWith('settings')) return <Settings />
        return null
    }, [openedUI])

    return subMenuComponent && <FullScreenSubMenu>{subMenuComponent}</FullScreenSubMenu>
}

export default VisibleSubMenus
