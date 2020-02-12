import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'

import { OrderPlaceForm } from './OrderPlaceForms'

const TAB_ITEMS = [
    { value: 'buy', label: 'Buy' },
    { value: 'sell', label: 'Sell' }
]

function TabList({items, side, handleTabChange}) {    
    return (
        <TabListWrapper>
            {
                items.map((item, index) => {
                    const active = (side === item.value)

                    return (
                        <TabItem key={index}>
                            <TabItemText active={active}
                                onPress={() => handleTabChange(item.value)}>
                                {item.label}
                            </TabItemText>
                            {active && <TabIndicator />}
                        </TabItem>
                    )
                })
            }
        </TabListWrapper>
    )
}

export default function OrderPlaceRenderer() {
    const [side, setSide] = React.useState('buy')

    function handleTabChange(side) {
        setSide(side)
    }

    return (
        <Tabs>
            <TabList items={TAB_ITEMS}
                side={side} 
                handleTabChange={handleTabChange} />
            <TabContent>
                <OrderPlaceForm side={side} />
            </TabContent>
        </Tabs>
    )
}

const Tabs = styled(View)`
    flex: 1;
`

const TabListWrapper = styled(View)`
    background-color: #1e2438;
    flex-direction: row;
    justify-content: space-around; 
`

const TabItem = styled(View)`

`

const TabIndicator = styled(View)`
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-style: solid;
    border-color: #ff9a4d;
    border-bottom-width: 3px;
`

const TabItemText = styled(Text)`
    height: 40px;
    width: 55px;
    line-height: 40px;
    text-align: center;
    color: ${props => props.active ? '#ff9a4d' : '#fff'};
`

const TabContent = styled(View)`
    flex: 1;
`