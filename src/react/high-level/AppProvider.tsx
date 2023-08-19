import type { ArwesThemeProvider } from '@arwes/core'
import styled from '@emotion/styled'
import { useModalState } from '@zardoy/react-util'
import GlobalStyles from 'low-level/components/GlobalStyles'
import { useDeviceNeedsRotation } from 'low-level/reactUtil'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { ControllerAPI } from '../../controller/types'
import RotationNeeded from '../low-level/components/RotationNeeded'
import ArwesProvider from '../low-level/wrappers/ArwesProvider'
import { createMuiTheme, MuiThemeProvider } from '../low-level/mui'
import CurrentUI from './CurrentUI'
import LoadingScreen from './Views/LoadingScreen'
import { useInterfaceState } from 'low-level/state'

export interface AppProviderProps {
    controller: ControllerAPI
    rootClassName?: string
    /** override default Arwes theme settings */
    // arwesThemeSettings?: Pick<
    //     React.ComponentProps<typeof ArwesThemeProvider>,
    //     'themeSettings'
    // >
    // TODO pass as children
    canvasEl: JSX.Element
    // check rerender with global prop
    // no selected prop. it is controlled by the component itself
}

const muiTheme = createMuiTheme({
    palette: {
        mode: 'dark',
    },
})

const RootWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`

/** Main entrypoint for whole your app. It should be your root component */
const AppProvider: React.FC<AppProviderProps> = ({ canvasEl, rootClassName, controller }) => {
    const uiConfig = useInterfaceState(s => s.uiConfig)
    const openedUI = useInterfaceState(s => s.openedUI)
    // TODO make with percent
    const isLoading = useModalState(false)

    const rotationNeeded = useDeviceNeedsRotation() && uiConfig.hideHudIfDeviceNeedsRotation

    // useEffect(() => {
    //     controller.init = true
    //     for (const cb of controller._initSubscribers.app) {
    //         cb()
    //     }

    //     controller._onDidSettingsInit(() => isLoading.close())
    // }, [])

    return (
        <>
            {/* todo */}
            {/* <Helmet>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@700&display=swap" rel="stylesheet" />
            </Helmet> */}
            <ArwesProvider>
                <GlobalStyles />
            </ArwesProvider>
            <RootWrapper className={rootClassName}>
                <MuiThemeProvider theme={muiTheme}>
                    {!isLoading.isOpen ? (
                        <>
                            {rotationNeeded ? <RotationNeeded /> : <CurrentUI />}
                            {openedUI?.type !== 'mainMenu' && canvasEl}
                        </>
                    ) : (
                        <LoadingScreen />
                    )}
                </MuiThemeProvider>
            </RootWrapper>
        </>
    )
}

// export-lib
export default AppProvider
