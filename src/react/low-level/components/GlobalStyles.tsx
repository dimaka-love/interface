import { CSSObject, Global } from '@emotion/react'
import React from 'react'
import FixedStylesBaseline from '../wrappers/FixedStylesBaseline'

interface ComponentProps {}

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

/** Needs ArwesProvider */
const GlobalStyles: React.FC<ComponentProps> = () => (
    <>
        <Global styles={GLOBAL_STYLES} />
        <FixedStylesBaseline />
    </>
)

export default GlobalStyles
