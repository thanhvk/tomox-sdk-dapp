import React from 'react'
import OrderbookRenderer from './OrderbookRenderer'

export default function Orderbook(props) {

    const { asks, bids, currentPairData } = props
    
    
    return (
        <OrderbookRenderer
            currentPairData={currentPairData}
            asks={asks.slice().reverse()}
            bids={bids.slice()} />
    )
}
