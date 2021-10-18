import React, { useMemo } from 'react'

import { ArwesTheme } from '@arwes/core'
import { createGlobalGeneralStyles } from '@arwes/core/lib/StylesBaseline/StylesBaseline.styles'
import { Global, useTheme } from '@emotion/react'

interface ComponentProps {}

const deleteProps = <T extends object>(obj: T, props: (keyof T)[]) => {
    props.forEach(prop => {
        delete obj[prop]
    })
}

// RESOLVE STYLE CONFLICTS

const useGlobalGeneralStyles = () => {
    const theme = useTheme() as ArwesTheme
    return useMemo(() => {
        const styles = createGlobalGeneralStyles(theme)
        // WORKAROUND FOR MATERIAL-UI INPUTS
        deleteProps(styles['input, textarea, select']!, ['&:hover, &:focus'])
        // todo remove this workaround
        styles['html, body']!.fontSize = 'unset'
        styles['html, body']!.userSelect = 'none'
        return styles
    }, [theme])
}

let FixedStylesBaseline: React.FC<ComponentProps> = () => {
    const globalGeneralStyles = useGlobalGeneralStyles()

    return <Global styles={globalGeneralStyles} />
}

export default FixedStylesBaseline
