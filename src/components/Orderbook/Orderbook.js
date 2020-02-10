import React, { useState } from 'react'
import { Text } from 'react-native'

export default class Orderbook extends React.PureComponent {

    render() {
        const { asks, bids } = this.props
        
        return (
            <Text>Orderbook works!</Text>
        )
    }
}