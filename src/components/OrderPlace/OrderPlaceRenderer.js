import React from 'react'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'

import { OrderPlaceBuyForm, OrderPlaceSellForm } from './OrderPlaceForms'

const renderTabBar = (props) => (
    <TabBar
      {...props}
      getLabelText={({ route }) => route.title}
      labelStyle={{marginTop: -5}}
      activeColor='#ff9a4d'
      indicatorStyle={{ backgroundColor: '#ff9a4d' }}
      style={{ backgroundColor: '#1e2438', height: 40, justifyItems: 'space-between' }}
    /> 
)

export default function OrderPlaceRenderer() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'buy', title: 'Buy' },
        { key: 'sell', title: 'Sell' },
    ])

    const renderScene = SceneMap({
        buy: OrderPlaceBuyForm,
        sell: OrderPlaceSellForm,
    })

    return (
        <TabView
            swipeEnabled={false}
            navigationState={{ index, routes }}
            renderTabBar={renderTabBar}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{}}/>
    )
}