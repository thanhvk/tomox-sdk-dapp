import React from 'react'
import { Text, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
import SocketController from './components/SocketController'
import { getAddresses } from './config/addresses.js'
import { generateQuotes } from './config/quotes'
import { generateTokens } from './config/tokens'

import MarketsScreen from './screens/MarketsScreen'
import TradeScreen from './screens/TradeScreen'
import FundsScreen from './screens/FundsScreen'
import AccountScreen from './screens/AccountScreen'

const AppNavigator = createBottomTabNavigator({
  Markets: {
    screen: MarketsScreen,
  },
  Trade: {
    screen: TradeScreen,
  },
  Funds: {
    screen: FundsScreen,
  },
  Account: {
    screen: AccountScreen,
  },
})

const AppContainer = createAppContainer(AppNavigator)

const Loading = _ => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Loading...</Text>
  </View>
)

class App extends React.PureComponent {

    state = {}

    async componentDidMount() {
        try {
            const {addresses, err} = await getAddresses()
            if (!err) {
                generateQuotes(addresses)
                generateTokens(addresses)
            }
            this.setState({ addresses })
        } catch (e) {
            console.log(e)
        }       
    }

    render() {
        if (!this.state.addresses) return (<Loading />)

        const { store } = configureStore()

        return (
            <Provider store={store}>
                <SocketController>
                    <AppContainer />
                </SocketController>
            </Provider>
        )
    }
}

export default App

