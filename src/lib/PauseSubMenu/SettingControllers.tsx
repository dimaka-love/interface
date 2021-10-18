import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
} from 'react'

import { startCase } from 'lodash'

import { css } from '@emotion/css'
import { Input, MenuItem, Select, Slider, Switch } from '@material-ui/core'

import { SettingField } from '../createSettings'

const focusOnClosestFocusableElem = (elem: HTMLElement) => {
    elem.closest('div[tabindex="0"]')!.focus()
}

type PossiblePrimitive = string | number | boolean

type PropsForSettingType<
    T extends Extract<SettingField, { defaultValue: K }>['type'],
    K extends PossiblePrimitive,
> = Omit<Extract<SettingField, { type: T }>, 'type'> & {
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

    const menuOptionsLabel = useMemo(() => {
        return Object.entries(values).map(([id, labelType]) => {
            const label = getMenuItemLabel
                ? getMenuItemLabel(id)
                : labelType === true
                ? startCase(id)
                : typeof labelType === 'function'
                ? labelType()
                : labelType
            return {
                id,
                label: label,
            }
        })
    }, [values, getMenuItemLabel])

    return (
        <Select
            ref={selectElemRef}
            MenuProps={{
                tabIndex: -1,
            }}
            variant="outlined"
            classes={{
                root: css`
                    padding-top: 7px !important;
                    padding-bottom: 6px !important;
                `,
            }}
            value={value}
            onChange={e => {
                onChange(e.target.value as string)
            }}
            onClose={async () => {
                // million workarounds for mui
                await new Promise(resolve => setTimeout(resolve, 0))
                focusOnClosestFocusableElem(selectElemRef.current)
            }}
        >
            {menuOptionsLabel.map(({ label, id }) => {
                return (
                    <MenuItem key={id} value={id}>
                        {label}
                    </MenuItem>
                )
            })}
        </Select>
    )
}

// TOGGLE

export const ToggleSetting: React.FC<PropsForSettingType<'toggle', boolean>> =
    ({ value, onChange }) => {
        return (
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
    }

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
        sliderRef.current.querySelectorAll('[tabindex="0"]').forEach(el => {
            const elem = el as HTMLElement
            elem.tabIndex = -1
            // no memory leak?
            elem.addEventListener('focus', () => {
                focusOnClosestFocusableElem(elem)
            })
        })
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
                type="number"
                inputProps={{
                    inputMode: 'numeric',
                    min,
                    max,
                    tabIndex: -1,
                }}
                disableUnderline
                onFocus={e => (e.target as HTMLInputElement).select()}
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
                onChange={e => handleChange(+e.target.value)}
            />
            <CustomSlider
                onChange={(_, val) => handleChange(val as number)}
                value={value}
            />
        </div>
    )
}
