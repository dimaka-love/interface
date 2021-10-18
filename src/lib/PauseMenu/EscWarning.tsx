import React, { useEffect } from 'react'

import { Portal, Slide, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { useUserState } from '../state'

type ComponentProps = { open: boolean; onClose: () => unknown }

const TransitionDown = (props: any) => <Slide {...props} direction="down" />

// WRAPPER AROUND SNACKBAR!!! WITH!!!!!

const EscWarning: React.FC<ComponentProps> = ({ ...snackbarProps }) => {
    const pauseOpened = useUserState(s => s.openedUI)?.type === 'pause'

    useEffect(() => {
        if (pauseOpened) return
        snackbarProps.onClose()
    }, [pauseOpened])

    return (
        <Portal container={document.body}>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                TransitionComponent={TransitionDown}
                autoHideDuration={3000}
                {...snackbarProps}
            >
                <Alert severity="warning">
                    Don't use ESC Key here. It doesn't work properly due
                    browsers internal bug.
                </Alert>
            </Snackbar>
        </Portal>
    )
}

export default EscWarning
