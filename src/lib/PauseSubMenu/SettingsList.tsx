import React, { useCallback, useMemo } from 'react'

import { clamp } from 'lodash'

import { css } from '@emotion/css'

import { SettingField } from '../createSettings'
import { useSettingsStore } from '../settingsStore'
import { focusableElemOutline } from '../styles'
import { isMacOs } from '../util'
import { MenuSetting, SliderSetting, ToggleSetting } from './SettingControllers'

type SettingItemCommonProps = {
    label: string
    settingSchema: SettingField
}

export const PersistedSettingItem: React.FC<
    SettingItemCommonProps & Record<'tabName' | 'groupName', string>
> = ({ tabName, groupName, label, settingSchema }) => {
    const userValue = useSettingsStore!(s => s[tabName]?.[groupName]?.[label])
    const handleChange = useCallback(
        newValue => {
            useSettingsStore!.setState({
                [tabName]: {
                    [groupName]: {
                        [label]: newValue,
                    },
                },
            })
        },
        [settingSchema],
    )

    return (
        <SettingsItem
            {...{
                label,
                settingSchema,
                value:
                    userValue ??
                    ('defaultValue' in settingSchema
                        ? settingSchema.defaultValue
                        : ''),
                onChange: handleChange,
            }}
        />
    )
}

const SettingsItem: React.FC<
    SettingItemCommonProps & {
        onChange: (newValue: any) => unknown
        value: any
    }
> = ({ label, settingSchema, onChange, value }) => {
    const handleFocusBlurEvents = useCallback(
        ({
            currentTarget,
            target,
            type: eventName,
        }: React.FocusEvent<HTMLDivElement>) => {
            const focusEvent = eventName === 'focus'
            currentTarget.classList.toggle('focused', focusEvent)
            if (settingSchema.type === 'menu' && currentTarget === target) {
                const menuSelectRoot = currentTarget.querySelector(
                    'div.MuiInputBase-root',
                )!
                menuSelectRoot.classList.toggle('Mui-focused', focusEvent)
            }
        },
        [settingSchema],
    )

    const renderedInput = useMemo((): JSX.Element => {
        switch (settingSchema.type) {
            case 'menu':
                return (
                    <MenuSetting {...settingSchema} {...{ onChange, value }} />
                )
            case 'slider':
                return (
                    <SliderSetting
                        {...settingSchema}
                        {...{ onChange, value }}
                    />
                )
            case 'toggle':
                return (
                    <ToggleSetting
                        {...settingSchema}
                        {...{ onChange, value }}
                    />
                )
            case 'text':
                return <span>{settingSchema.text}</span>
            // case "button":
            //     return <Button
            //         variant="contained"
            //         color="primary"
            //         onClick={settingSchema.onClick}
            //     >{settingSchema.text}</Button>;
        }
    }, [settingSchema, value, onChange])

    return (
        <div
            className={css`
                width: 100%;
                max-width: 800px;
                background-color: rgba(0 0 0 / 30%);
                display: flex;
                padding: 5px 15px;
                justify-content: space-between;
                align-items: center;
                border-left: 3px solid transparent;
                ${'defaultValue' in settingSchema &&
                settingSchema.defaultValue !== value
                    ? `border-left-color: rgb(0 255 255 / 80%);`
                    : ''}
                &.focused {
                    ${focusableElemOutline}
                }
            `}
            onFocus={handleFocusBlurEvents}
            onBlur={handleFocusBlurEvents}
            tabIndex={0}
            onKeyDown={({ code, currentTarget, target, ...event }) => {
                if (target !== currentTarget) return
                switch (code) {
                    // more clean implementation, please
                    case 'Space':
                    case 'Enter':
                        switch (settingSchema.type) {
                            case 'menu':
                                currentTarget
                                    .querySelector('div.MuiSelect-root')!
                                    .dispatchEvent(
                                        new MouseEvent('mousedown', {
                                            bubbles: true,
                                        }),
                                    )
                                break
                            case 'slider':
                                currentTarget
                                    .querySelector('input[type="number"]')!
                                    .focus()
                                break
                            case 'toggle':
                                onChange(!value)
                                break
                        }
                }
                if (settingSchema.type === 'slider') {
                    const ArrowKey = code.match(/Arrow(Left|Right)/)?.[1]
                    if (!ArrowKey) return
                    const modifierKey = isMacOs ? event.altKey : event.ctrlKey
                    onChange(
                        clamp(
                            value +
                                (modifierKey ? 10 : 1) *
                                    (ArrowKey === 'Right' ? 1 : -1),
                            settingSchema.min ?? 0,
                            settingSchema.max ?? 100,
                        ),
                    )
                }
            }}
        >
            <span
                className={css`
                    font-size: 0.9rem;
                    /* font-weight: bold; */
                    text-transform: uppercase;
                    letter-spacing: 0.0285em;
                `}
            >
                {label}
            </span>
            <div>
                {/* TODO show actual display refresh rate */}
                {/* <span>@60</span> */}
                {renderedInput}
            </div>
        </div>
    )
}

export default SettingsItem
