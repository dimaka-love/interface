import React, { useEffect } from 'react'

import clsx from 'clsx'
import { Helmet } from 'react-helmet'

import { ArwesThemeProvider } from '@arwes/core'
import { css } from '@emotion/css'
import { Global } from '@emotion/react'
import { CSSObject } from '@emotion/serialize'
import {
    createMuiTheme,
    ThemeProvider as MUIThemeProvider,
} from '@material-ui/core/styles'

import FixedStylesBaseline from './FixedStylesBaseline'
import { useDeviceNeedsRotation } from './react-util'
import RotationNeeded from './RotationNeeded'
import { useSettingsLoaded, useSettingsStore } from './settingsStore'

interface ComponentProps {
    rootClassName?: string
    /** override default Arwes theme settings */
    arwesThemeSettings?: Pick<
        React.ComponentProps<typeof ArwesThemeProvider>,
        'themeSettings'
    >
    /** @default true */
    hideHudIfDeviceNeedsRotation?: boolean
    // check rerender with global prop
    // no selected prop. it is controlled by the component itself
}

const GLOBAL_STYLES: Record<string, CSSObject> = {
    'html, body': {
        fontFamily: `"Titillium Web", sans-serif`,
    },
    'pre, code': {
        fontFamily: `"Source Code Pro", monospace`,
    },
    'body button': {
        cursor: 'default',
    },
}

const muiTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
})

/** Main entrypoint for the whole library. Your app must be wrapped with this component */
const AppProvider: React.FC<ComponentProps> = ({
    // UI only
    children,
    rootClassName,
    arwesThemeSettings = {},
    hideHudIfDeviceNeedsRotation = true,
}) => {
    useEffect(() => {
        if (useSettingsStore === undefined)
            throw new Error('Init settings store before AppProvider mount!')
    }, [])

    const rotateDevice =
        useDeviceNeedsRotation() && hideHudIfDeviceNeedsRotation

    const settingsLoaded = useSettingsLoaded()

    return (
        <ArwesThemeProvider themeSettings={{ ...arwesThemeSettings }}>
            <Helmet>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                {/* TODO HOT! */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@700&display=swap"
                    rel="stylesheet"
                />
            </Helmet>
            <Global styles={GLOBAL_STYLES} />
            <FixedStylesBaseline />
            <div
                className={clsx(
                    rootClassName,
                    css`
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                    `,
                )}
            >
                <MUIThemeProvider theme={muiTheme}>
                    {
                        // todo show popup loader
                        !settingsLoaded ? (
                            'settings loading'
                        ) : rotateDevice ? (
                            <RotationNeeded />
                        ) : (
                            children
                        )
                    }
                </MUIThemeProvider>
            </div>
        </ArwesThemeProvider>
    )
}

// export-lib
export default AppProvider
