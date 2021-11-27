// SHOULD BE USED AS STANDALONE LIBRARY

import React, { useEffect, useMemo, useRef, useState } from 'react'

import { useOrientation } from 'react-use'

import { useToggleState } from '@zardoy/react-util'
import { getLastSiblingSelector, getSiblingSelector, isMacOs } from './domUtil'

type GetStateHelpers<T> = T extends boolean ? Record<'toggle' | 'on' | 'off', () => void> : Record<string, unknown>

interface UseFocusControllerParams {
    // container: React.MutableRefObject<HTMLElement>;
    containerRef: React.MutableRefObject<HTMLElement>
    focusableElemSelector: string
}

// moves focus by using keyboard
export const useFocusController = ({ focusableElemSelector, containerRef }: UseFocusControllerParams) => {
    useEffect(() => {
        // https://css-tricks.com/snippets/javascript/test-mac-pc-javascript/
        // its really important because user might want to move the window with Windows + Arrow Down / Up
        const listener = ({ code, metaKey }: KeyboardEvent) => {
            let activeElement = document.activeElement as HTMLElement | null
            if (activeElement === document.body) activeElement = null
            if (!activeElement || !containerRef.current.contains(activeElement)) return
            const arrowKey = /Arrow(Up|Down)/.exec(code)?.[1]

            const moveFocus = (dir: 'prev' | 'next', absolute: boolean) => {
                const elemToFocus =
                    // todo-high open pr fix ts error
                    (absolute ? getLastSiblingSelector : getSiblingSelector)(activeElement!, focusableElemSelector, dir)
                if (!elemToFocus) return
                elemToFocus.focus()
            }

            if (arrowKey) {
                // also handle macOS Home / End alternative (CMD + Arrow Up / Down)
                moveFocus(arrowKey === 'Down' ? 'next' : 'prev', isMacOs && metaKey)
            }

            if (code === 'Home' || code === 'End') {
                moveFocus(code === 'End' ? 'next' : 'prev', true)
            }
        }

        window.addEventListener('keydown', listener)
        return () => {
            window.removeEventListener('keydown', listener)
        }
    }, [focusableElemSelector])
}

export const useDeviceNeedsRotation = () => {
    const orientation = useOrientation()

    const modal = useToggleState()

    const firstTime = useRef(true)

    // another 5 chromium bugs

    useEffect(() => {
        // todo on devices with sensor hook always got fired twice on first render
        if (firstTime.current) {
            firstTime.current = false
            return
        }

        // TODO-HIGH calculation
        // eslint-disable-next-line zardoy-config/@typescript-eslint/no-unused-expressions
        window.innerWidth < 500 && window.innerHeight > window.innerWidth ? modal.on() : modal.off()
    }, [orientation])

    return modal.state
}
