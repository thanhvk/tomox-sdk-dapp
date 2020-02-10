import React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Provider } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import configureStore from './store/configureStore'
import SocketController from './components/SocketController'
import { getAddresses } from './config/addresses.js'
import { generateQuotes } from './config/quotes'
import { generateTokens } from './config/tokens'

import MarketsScreen from './screens/MarketsScreen'
import TradesScreen from './screens/TradesScreen'
import FundsScreen from './screens/FundsScreen'
import AccountScreen from './screens/AccountScreen'

const Tab = createBottomTabNavigator()

const Loading = _ => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Loading...</Text>
  </View>
)

function AppContent() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            switch (route.name) {
              case 'Markets':
                iconName = 'poll'
                break
              case 'Trades':
                iconName = 'xml'
                break
              case 'Funds':
                iconName = 'wallet-outline'
                break
              default:
                iconName = 'account-outline'
            }
            
            return <Icon name={iconName} color={color} size={25 } />
          },
        })}
        tabBarOptions={{
          activeTintColor: '#ff9a4d',
          inactiveTintColor: '#6e7793',
          style: {
            borderTopWidth: 0,
            height: 90,
          },
          tabStyle: {
            paddingTop: 7,
            paddingBottom: 10,
            backgroundColor: '#252C40',
          }
        }}
      >
        <Tab.Screen name="Markets" component={MarketsScreen} />
        <Tab.Screen name="Trades" component={TradesScreen} />
        <Tab.Screen name="Funds" component={FundsScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

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
                <AppContent />
              </SocketController>
            </Provider>
        )
    }
}

export default App

