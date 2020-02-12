import React, { useState } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'

import { Container, Input, Button, Select, MdText } from '../Common'

const ORDER_OPTIONS = [
    {
        label: 'Limit Order',
        value: 'lo',
    },
    {
        label: 'Market Order',
        value: 'mo',
    }
]

export function OrderPlaceBuyForm() {

    return (
        <Container>
            <Select value='lo'
                data={ORDER_OPTIONS} />
            <Row>
                <Input 
                    onChangeText={text => null}
                    placeholder='Price(TOMO)' />
            </Row>
            <Row>
                <Input 
                    onChangeText={text => null}
                    placeholder='Amount(BNB)' />
            </Row>
            <Row>
                <Fractions />
            </Row>
            <Row>
                <Input 
                    onChangeText={text => null}
                    placeholder='Total(TOMO)' />
            </Row>
            <Row>
                <MdText>Avbl</MdText>
                <MdText>--</MdText>
            </Row>
            <Button type='up' height={40}>Buy</Button>
        </Container>
    )
}

export function OrderPlaceSellForm() {

    return (
        <Container>
            <Select value='lo'
                data={ORDER_OPTIONS} />
            <Row>
                <Input 
                    onChangeText={text => null}
                    placeholder='Price(TOMO)' />
            </Row>
            <Row>
                <Input 
                    onChangeText={text => null}
                    placeholder='Amount(BNB)' />
            </Row>
            <Row>
                <Fractions />
            </Row>
            <Row>
                <Input 
                    onChangeText={text => null}
                    placeholder='Total(TOMO)' />
            </Row>
            <Row>
                <MdText>Avbl</MdText>
                <MdText>--</MdText>
            </Row>
            <Button type='down' height={40}>Sell</Button>
        </Container>
    )
}

function Fractions() {
    return (
        <React.Fragment>
            <Fraction><MdText mute>25%</MdText></Fraction>
            <Fraction><MdText mute>50%</MdText></Fraction>
            <Fraction><MdText mute>75%</MdText></Fraction>
            <Fraction><MdText mute>100%</MdText></Fraction>
        </React.Fragment>
    )
}

const Row = styled(View)`
    margin-bottom: 10px;
    flex-direction: row;
    justify-content: space-between;
`
const Fraction = styled(View)`
    padding: 0 7px;
    border: 1px solid #394362;
`