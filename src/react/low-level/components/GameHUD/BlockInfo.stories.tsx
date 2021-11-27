import { ArwesThemeProvider } from '@arwes/core'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import GlobalStyles from '../GlobalStyles'
import BlockInfo from './BlockInfo'
import { useInterval } from 'react-use'
import { useModalState } from '@zardoy/react-util'

export default {
    title: 'Components/BlockInfo',
    component: BlockInfo,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [
        Story => (
            <ArwesThemeProvider>
                <GlobalStyles />
                <Story />
            </ArwesThemeProvider>
        ),
    ],
} as ComponentMeta<typeof BlockInfo>

const Template: ComponentStory<typeof BlockInfo> = args => {
    const show = useModalState()
    useInterval(() => {
        show.toggle()
    }, 2000)
    return <BlockInfo {...args} data={show.isOpen ? args.data : null} />
}

export const Primary = Template.bind({})
Primary.args = {
    data: {
        mod: 'Super Thermal... Just Long',
        title: 'Pulverizer',
    },
}
