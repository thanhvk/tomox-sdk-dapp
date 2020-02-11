import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'

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
            <Header>
                <Title>Price</Title>
                <Title>Amount</Title>
            </Header>
            <Body>
                <List type="ask" data={asks} />
                {currentPairData && <CurrentPrice currentPairData={currentPairData} />}
                <List type="bid" data={bids} />
            </Body>
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
            <Price>{currentPairData.price}</Price>
            <PriceUsd>${currentPairData.priceUsd.toFixed(2)}</PriceUsd>
        </Centered>
    )
}

const Container = styled(View)`
    flex: 1;
    flex-direction: column;
`

const ListContainer = styled(View)`
    flex: 1;
    overflow: hidden;
`

const Row = styled(View)`
    padding: 7px 0;
    flex-direction: row;
    justify-content: space-between;
`

const Header = styled(Row)`
    height: 40px;
`

const Body = styled(View)`
    flex: 1;
`

const Centered = styled(View)`
    height: 50px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-style: solid;
    border-top-width: 1px;
    border-top-color: #fff;
    border-bottom-width: 1px;
    border-bottom-color: #fff;
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

const Price = styled(Text)`
    margin-left: 7px;
    color: #fff;
    font-size: 18px;
    font-family: Ubuntu-Regular;
`

const PriceUsd = styled(Text)`
    margin-left: 7px;
    color: #fff;
    font-size: 14px;
    font-family: Ubuntu-Regular;
`
