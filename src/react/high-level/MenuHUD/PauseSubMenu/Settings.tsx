import { css } from '@emotion/css'
import { useFocusController } from 'low-level/reactUtil'
import { useInterfaceState } from 'low-level/state'
import React, { useMemo, useRef } from 'react'
import { TabSettingsSchema } from '../../../../controller/settings'
import MenuWithTabs from './MenuWithTabs'
import { PersistedSettingItem } from './SettingsList'

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
const SettingsTabPanel: React.FC<{
    tabName: string
    schema: TabSettingsSchema
}> = ({ tabName, schema }) => (
    <SettingsList>
        {Object.entries(schema).map(([groupName, groupSchema]) =>
            Object.entries(groupSchema).map(([label, settingSchema]) => (
                <PersistedSettingItem
                    key={`${groupName}-${label}`}
                    label={label}
                    settingSchema={settingSchema}
                    {...{
                        tabName,
                        groupName,
                    }}
                />
            )),
        )}
    </SettingsList>
)

const Settings: React.FC<ComponentProps> = () => {
    const { controller } = useInterfaceState()

    const tabs = useMemo(
        (): React.ComponentProps<typeof MenuWithTabs>['tabs'] =>
            Object.entries(controller.settingsStore.schema).map(([tabName, settingsSchema]) => ({
                tabName,
                panelContent: <SettingsTabPanel tabName={tabName} schema={settingsSchema} />,
            })),
        [],
    )

    return <MenuWithTabs tabsLabel="settings" tabs={tabs} />
}

export default Settings
