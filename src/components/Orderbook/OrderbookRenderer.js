import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'

export default function OrderbookRenderer({ asks, bids, currentPairData }) {

    return (
        <Container>
            <Header>
                <Title>Price</Title>
                <Title>Amount</Title>
            </Header>
            <Body>
                <Asks data={asks} />
                {currentPairData && <CurrentPrice currentPairData={currentPairData} />}
                <Bids type="bid" data={bids} />
            </Body>
        </Container>
    )
}

function Asks({ data}) {
    return (
        <AsksContainer>
            {
                data.map((item, idx) => {
                    return (
                        <Row key={idx}>
                            <AskPrice>{item.price}</AskPrice>
                            <Amount>{item.amount}</Amount>
                        </Row>
                    )
                })
            }
        </AsksContainer>
    )
}

function Bids({ data}) {
    return (
        <BidsContainer>
            {
                data.map((item, idx) => {
                    return (
                        <Row key={idx}>
                            <BidPrice>{item.price}</BidPrice>
                            <Amount>{item.amount}</Amount>
                        </Row>
                    )
                })
            }
        </BidsContainer>
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
    padding: 0 10px 0 5px;
`

const BidsContainer = styled(View)`
    flex: 1;
    overflow: hidden;
`

const AsksContainer = styled(BidsContainer)`
    justify-content: flex-end;
`

const Row = styled(View)`
    padding: 12px 0;
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
    height: 40px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 15px 0;
    border-style: solid;
    border-color: #394362;
    border-top-width: 1px;
    border-bottom-width: 1px;
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
    color: #fff;
    font-size: 18px;
    font-family: Ubuntu-Regular;
`

const PriceUsd = styled(Price)`
    margin-left: 7px;
    font-size: 14px;
`
