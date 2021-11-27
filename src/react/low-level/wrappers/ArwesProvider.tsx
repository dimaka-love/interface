import React, { useContext } from 'react'
import { ArwesThemeProvider } from '@arwes/core'

const ArwesProvider: React.FC = ({ children }) => {
    // const { arwesThemeSettings } = useContext(interfaceContext)

    return <ArwesThemeProvider>{children}</ArwesThemeProvider>
}

export default ArwesProvider
