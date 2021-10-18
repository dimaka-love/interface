import React, { useEffect, useRef, useState } from 'react'

import useEventListener from 'use-typed-event-listener'

import { css } from '@emotion/css'
import { AppBar, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

export type Tab = {
    tabName: string
    /** @default false */
    disabled?: boolean
    panelContent: JSX.Element
}

interface ComponentProps {
    tabsLabel: string
    tabs: Tab[]
}

const MenuWithTabs: React.FC<ComponentProps> = ({ tabs, tabsLabel }) => {
    const tabsRootRef = useRef<HTMLDivElement>(null!)
    const tabsListRef = useRef<HTMLButtonElement>(null!)

    const [tab, setTab] = useState(0)

    const handleTabChange = (_: any, newVal: string) => setTab(+newVal)

    // GLOBAL TABS SWITCHER WITH [ ] KEYS . REWORK PLS doesnt work with disabled tabs
    useEventListener(window, 'keydown', e => {
        if (
            !e.code.startsWith('Bracket') ||
            tabsListRef.current.contains(document.activeElement)
        )
            return
        const currentFocusedButton =
            tabsRootRef.current.querySelector('.Mui-selected')!
        if (!currentFocusedButton) return
        const elemToFocus = currentFocusedButton[
            e.code.endsWith('Left')
                ? 'previousElementSibling'
                : 'nextElementSibling'
        ] as HTMLElement
        if (!elemToFocus) return
        elemToFocus.click()
    })

    const firstTabButtonRef = useRef<HTMLDivElement>(null!)

    useEffect(() => {
        // component just got mounted. move focus to the first tab
        firstTabButtonRef.current.focus()
        // dispatch event
        // firstTabButtonRef.current.dispatchEvent(new Event("focus"));
    }, [])

    return (
        <div
            ref={tabsRootRef}
            className={css`
                & .MuiTabs-indicator {
                    height: 4px;
                    background-color: aqua;
                }
            `}
        >
            <TabContext value={tab.toString()}>
                <AppBar
                    position="static"
                    style={{
                        backgroundColor: 'rgb(35 30 30 / 70%)',
                    }}
                >
                    <TabList
                        ref={tabsListRef}
                        selectionFollowsFocus
                        aria-label={`${tabsLabel}panel`}
                        variant="scrollable"
                        scrollButtons="auto"
                        onChange={handleTabChange}
                    >
                        {tabs.map(({ tabName, disabled = false }, index) => (
                            <Tab
                                ref={
                                    index === 0 ? firstTabButtonRef : undefined
                                }
                                key={tabName}
                                disabled={disabled}
                                label={tabName}
                                value={index.toString()}
                            />
                        ))}
                    </TabList>
                </AppBar>

                {tabs.map(({ panelContent }, index) => (
                    <TabPanel
                        key={index}
                        value={index.toString()}
                        classes={{
                            root: css`
                                padding: 0 !important;
                            `,
                        }}
                    >
                        {panelContent}
                    </TabPanel>
                ))}
            </TabContext>
        </div>
    )
}

export default MenuWithTabs
