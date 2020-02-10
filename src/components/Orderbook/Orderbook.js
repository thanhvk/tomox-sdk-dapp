import React, { useState } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { H2, P } from '../Common'

export default function Orderbook(props) {

    const { asks, bids, currentPairData } = props
    
    
    return (
        <OrderbookRenderer
            currentPairData={currentPairData}
            asks={asks.slice().reverse()}
            bids={bids.slice()} />
    )
}

function OrderbookRenderer({ asks, bids, currentPairData }) {

    return (
        <Container>
            <Row>
                <Title>Price</Title>
                <Title>Amount</Title>
            </Row>
            <List type="ask" data={asks} />
            {currentPairData && <CurrentPrice currentPairData={currentPairData} />}
            <List type="bid" data={bids} />
        </Container>
    )
}

function List({ data, type }) {
    return (
        <ListContainer>
            {
                data.map((item, idx) => {
                    return (
                        <Row key={idx}>
                            {
                                (type === 'ask') 
                                ? (<AskPrice>{item.price}</AskPrice>) 
                                : (<BidPrice>{item.price}</BidPrice>)
                            }
                            <Amount>{item.amount}</Amount>
                        </Row>
                    )
                })
            }
        </ListContainer>
    )
}

function CurrentPrice({ currentPairData }) {
    if (!currentPairData) return null

    return (
        <Centered>
            <H2>{currentPairData.price}</H2>
            <PriceUsd>${currentPairData.priceUsd.toFixed(2)}</PriceUsd>
        </Centered>
    )
}

const Container = styled(View)`
    flex: 1;
`

const ListContainer = styled(View)`
    height: 300px;
    overflow: hidden;
`

const Row = styled(View)`
    padding: 10px 0;
    flex-direction: row;
    justify-content: space-between;
`

const Centered = styled(View)`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const AskPrice = styled(Text)`
    color: #f94d5c;
    font-family: Ubuntu-Regular;
`

const BidPrice = styled(Text)`
    color: #00c38c;
    font-family: Ubuntu-Regular;
`

const Amount = styled(Text)`
    color: #fff;
    font-family: Ubuntu-Regular;
`

const Title = styled(Text)`
    color: #6e7793;
    font-family: Ubuntu-Regular;
`

const PriceUsd = styled(P)`
    margin-left: 7px;
`
