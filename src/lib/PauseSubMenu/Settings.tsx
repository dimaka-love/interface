import React, { useMemo, useRef } from 'react'

import { css } from '@emotion/css'

import { SettingsSchema } from '../createSettings'
import { useFocusController } from '../react-util'
import { appSettingsTabsSchema } from '../settingsStore'
import MenuWithTabs from './MenuWithTabs'
import SettingsItem, { PersistedSettingItem } from './SettingsList'

interface ComponentProps {}

const SettingsList: React.FC = ({ children }) => {
    const listElemRef = useRef<HTMLElement>(null!)
    useFocusController({
        focusableElemSelector: 'div',
        containerRef: listElemRef,
    })

    return (
        <div
            ref={listElemRef as any}
            className={css`
                display: flex;
                flex-direction: column;
                /* justify-content: ; */
                align-items: center;
                margin-top: 50px;
                width: 100%;

                & > div {
                    margin-bottom: 5px;
                }
            `}
        >
            {children}
        </div>
    )
}

// {/* <a href="https://gist.github.com/zardoy/6e5ce377d2b4c1e322e660973da069cd">How to disable VSync</a> */}
const SettingsTabPanel: React.FC<{ tabName: string; schema: SettingsSchema }> =
    ({ tabName, schema }) => {
        return (
            <SettingsList>
                {Object.entries(schema).map(([groupName, groupSchema]) => {
                    return Object.entries(groupSchema).map(
                        ([label, settingSchema]) => {
                            return (
                                <PersistedSettingItem
                                    key={`${groupName}-${label}`}
                                    label={label as string}
                                    settingSchema={settingSchema}
                                    {...{
                                        tabName,
                                        groupName: groupName as string,
                                    }}
                                />
                            )
                        },
                    )
                })}
            </SettingsList>
        )
    }

let Settings: React.FC<ComponentProps> = () => {
    const tabs = useMemo((): React.ComponentProps<
        typeof MenuWithTabs
    >['tabs'] => {
        return Object.entries(appSettingsTabsSchema!).map(
            ([tabName, settingsSchema]) => {
                return {
                    tabName,
                    panelContent: (
                        <SettingsTabPanel
                            tabName={tabName}
                            schema={settingsSchema}
                        />
                    ),
                }
            },
        )
    }, [])

    return <MenuWithTabs tabsLabel="settings" tabs={tabs} />
}

export default Settings
