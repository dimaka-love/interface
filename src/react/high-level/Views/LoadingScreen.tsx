import React from 'react'

import { CircularProgress } from '@mui/material'

import Screen from './View'

interface ComponentProps {}

const LoadingScreen: React.FC<ComponentProps> = () => (
    <Screen>
        <div />
        <CircularProgress />
        <div />
    </Screen>
)

export default LoadingScreen
