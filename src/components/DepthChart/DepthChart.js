import React from 'react'
import DepthChartRenderer from './DepthChartRenderer'

export default function DepthChart(props) {

    const { asks, bids } = props
    const asksProcessed = asks.map(item => {
        return {
            total: Number(item.total),
            price: Number(item.price),
            side: 'ask',
        }
    })
    const bidProcessed = bids.map(item => {
        return {
            total: Number(item.total),
            price: Number(item.price),
            side: 'bid',
        }
    }).reverse()
    
    return (
        <DepthChartRenderer
            asks={asksProcessed}
            bids={bidProcessed} />
    )
}
