/* eslint-disable zardoy-config/@typescript-eslint/no-restricted-imports */
import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react'

import {
    Portal,
    Slide,
    Snackbar,
    Alert,
    Button,
    AppBar,
    Tab,
    Input,
    MenuItem,
    Select,
    Slider,
    Switch,
} from '@mui/material'

import 'typed-query-selector'
import useTypedEventListener from 'use-typed-event-listener'
import selectDom from 'select-dom'

import { css } from '@emotion/css'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Except } from 'type-fest'
import { startCase } from 'lodash-es'
import { SettingField } from '../../controller/settings'
import { useInterfaceState } from './state'

export {
    ScreenRotation,
    MoreHoriz,
    ArrowRightAlt as ArrowRightAltIcon,
} from '@mui/icons-material'

export {
    ThemeProvider as MuiThemeProvider,
    createTheme as createMuiTheme,
} from '@mui/material'

type ComponentProps = { open: boolean; onClose: () => unknown }

const TransitionDown = (props: any) => <Slide {...props} direction="down" />

// WRAPPER AROUND SNACKBAR!!! WITH!!!!!

export const EscWarning: React.FC<ComponentProps> = ({ ...snackbarProps }) => {
    const pauseOpened = useInterfaceState(s => s.openedUI)?.type === 'pause'

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
                    Don't use ESC Key here. It doesn't work properly due to
                    browser bugs.
                </Alert>
            </Snackbar>
        </Portal>
    )
}

const howToEnableRawInputUrl =
    'https://gist.github.com/zardoy/8325b680c08a396d820986991c54a41e'

type SnackbarState = 'notShowed' | boolean | 'showed'

export const MouseRawInputSnackbar: React.FC<ComponentProps> = () => {
    const usingRawInput = useInterfaceState(s => s.usingRawInput)

    const [snackbarState, setSnackbarState] =
        useState<SnackbarState>('notShowed')

    useTypedEventListener(document, 'pointerlockchange', () => {
        if (
            !document.pointerLockElement ||
            usingRawInput === null ||
            snackbarState !== 'notShowed'
        )
            return

        setSnackbarState(usingRawInput)
    })

    return (
        <Snackbar
            open={typeof snackbarState === 'boolean'}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            TransitionComponent={TransitionDown}
            autoHideDuration={4000}
            onClose={() => setSnackbarState('showed')}
        >
            <Alert severity={snackbarState ? 'success' : 'warning'}>
                Mouse Raw Input{' '}
                {snackbarState ? 'enabled' : 'needs to be enabled!'}
                {!snackbarState && (
                    <Button
                        color="primary"
                        size="small"
                        component="a"
                        target="_blank"
                        href={howToEnableRawInputUrl}
                    >
                        MORE INFO
                    </Button>
                )}
            </Alert>
        </Snackbar>
    )
}

export type PanelTab = {
    tabName: string
    /** @default false */
    disabled?: boolean
    panelContent: JSX.Element
}

interface MenuComponentProps {
    tabsLabel: string
    tabs: PanelTab[]
}

export const MenuWithTabs: React.FC<MenuComponentProps> = ({
    tabs,
    tabsLabel,
}) => {
    const tabsRootRef = useRef<HTMLDivElement>(null!)
    const tabsListRef = useRef<HTMLButtonElement>(null!)

    const [tab, setTab] = useState(0)

    const handleTabChange = (_: any, newVal: string) => setTab(+newVal)

    // GLOBAL TABS SWITCHER WITH [ ] KEYS . REWORK PLS doesnt work with disabled tabs
    useTypedEventListener(window, 'keydown', e => {
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

export const SliderSetting: React.FC<PropsForSettingType<'slider', number>> = ({
    min = defaultSliderConfig.min,
    max = defaultSliderConfig.max,
    value,
    onChange,
}) => {
    const handleChange = useCallback(
        (newValue: number) => {
            onChange(newValue < min ? min : newValue > max ? max : newValue)
        },
        [onChange, min, max],
    )

    return (
        <div
            className={css`
                display: flex;
                justify-content: center;
                align-items: center;
            `}
        >
            <Input
                disableUnderline
                type="number"
                inputProps={{
                    inputMode: 'numeric',
                    min,
                    max,
                    tabIndex: -1,
                }}
                className={css`
                    font-size: 0.8em !important;
                    & input {
                        width: 28px;
                        text-align: center;
                    }
                    & input:focus {
                        background: rgba(128, 128, 128, 0.5);
                    }
                    /* Chrome, Safari, Edge, Opera */
                    & input::-webkit-outer-spin-button,
                    & input::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }

                    /* Firefox */
                    & input[type='number'] {
                        -moz-appearance: textfield;
                    }
                `}
                value={value}
                onFocus={e => (e.target as HTMLInputElement).select()}
                onChange={e => handleChange(+e.target.value)}
            />
            <CustomSlider
                value={value}
                onChange={(_, val) => handleChange(val as number)}
            />
        </div>
    )
}

const focusOnClosestFocusableElem = (elem: HTMLElement) => {
    elem.closest('div[tabindex="0"]')!.focus()
}

type PossiblePrimitive = string | number | boolean

type PropsForSettingType<
    T extends Extract<SettingField, { defaultValue: K }>['type'],
    K extends PossiblePrimitive,
> = Except<Extract<SettingField, { type: T }>, 'type'> & {
    onChange: (newVal: K) => unknown
    value: K
}

// MENU

export const MenuSetting: React.FC<PropsForSettingType<'menu', string>> = ({
    values,
    value,
    onChange,
    getMenuItemLabel,
}) => {
    const selectElemRef = useRef<HTMLElement>(null!)

    useLayoutEffect(() => {
        const buttonElem =
            selectElemRef.current.querySelector('div.MuiSelect-root')!
        buttonElem.tabIndex = -1
    }, [])

    const menuOptionsLabel = useMemo(
        () =>
            Object.entries(values).map(([id, labelType]) => {
                const label = getMenuItemLabel
                    ? getMenuItemLabel(id)
                    : labelType === true
                    ? startCase(id)
                    : typeof labelType === 'function'
                    ? labelType()
                    : labelType
                return {
                    id,
                    label,
                }
            }),
        [values, getMenuItemLabel],
    )

    return (
        <Select
            ref={selectElemRef}
            MenuProps={{
                tabIndex: -1,
            }}
            variant="outlined"
            className={css`
                padding-top: 7px !important;
                padding-bottom: 6px !important;
            `}
            value={value}
            onChange={e => {
                onChange(e.target.value)
            }}
            onClose={async () => {
                // eslint-disable-next-line no-promise-executor-return
                await new Promise(resolve => setTimeout(resolve, 0))
                focusOnClosestFocusableElem(selectElemRef.current)
            }}
        >
            {menuOptionsLabel.map(({ label, id }) => (
                <MenuItem key={id} value={id}>
                    {label}
                </MenuItem>
            ))}
        </Select>
    )
}

// TOGGLE

export const ToggleSetting: React.FC<
    PropsForSettingType<'toggle', boolean>
> = ({ value, onChange }) => (
    <Switch
        inputProps={{
            tabIndex: -1,
            onFocus: ({ currentTarget }) =>
                focusOnClosestFocusableElem(currentTarget),
        }}
        color="primary"
        checked={value}
        onChange={(_, checked) => onChange(checked)}
    />
)

// SLIDER

const sliderRailHeight = 4

const defaultSliderConfig = {
    min: 0,
    max: 100,
    step: 1,
}

const CustomSlider: React.FC<React.ComponentProps<typeof Slider>> = ({
    ...props
}) => {
    const sliderRef = useRef<HTMLElement>(null!)

    useEffect(() => {
        // remove focus ability from all elems
        for (const elem of selectDom.all('[tabindex="0"]', sliderRef.current)) {
            elem.tabIndex = -1
            // no memory leak?
            elem.addEventListener('focus', () => {
                focusOnClosestFocusableElem(elem)
            })
        }
    }, [])

    return (
        <Slider
            ref={sliderRef}
            classes={{
                root: css`
                    width: 200px !important;
                    color: deepskyblue !important;
                `,
                track: css`
                    height: ${sliderRailHeight}px !important;
                `,
                rail: css`
                    height: ${sliderRailHeight}px !important;
                `,
                thumb: css`
                    color: white;
                `,
            }}
            {...props}
        />
    )
}
