import React from 'react'

import { CircularProgress } from '@material-ui/core'

import Screen from './Screen'

interface ComponentProps {}

const LoadingScreen: React.FC<ComponentProps> = () => (
    <Screen>
        <div />
        <CircularProgress />
        <div />
    </Screen>
)

export default LoadingScreen
