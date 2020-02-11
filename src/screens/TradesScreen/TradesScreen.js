import React, { Component } from 'react'
import styled from 'styled-components'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Text, View } from 'react-native'

import Orderbook from '../../components/Orderbook/'

export default class TradeScreen extends Component {
  componentDidMount() {
    if (this.props.isConnected) {
      this.props.queryTradingPageData()
    }
  }

  componentDidUpdate(prevProps: Props) {
    if ((!prevProps.isConnected && this.props.isConnected)
      || (this.props.currentPairName !== prevProps.currentPairName)) {
      this.props.queryTradingPageData()
    }
  }

  componentWillUnmount() {
    this.props.releaseResources()
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container>
        <TokenPair><Text>Token</Text></TokenPair>
        <Actions><Text>Actions</Text></Actions>
        <Row>
          <Col>
            <OrderPlace><Text>Order place</Text></OrderPlace>
            <DepthChart><Text>Depth chart</Text></DepthChart>
          </Col>
          <Col>
            <Orderbook />
          </Col>
        </Row>
        <TradesHistory><Text>Trades history</Text></TradesHistory>
      </Container>
    );
  }
}

const Container = styled(View)`
  flex: 1;
  background-color: #191e2f;
  margin-top: ${getStatusBarHeight()}px;
`

const Row = styled(View)`
  flex: 1;
  flex-direction: row;
`

const Col = styled(View)`
  flex: 1;
  flex-direction: column;
  width: 50%;
`

const TokenPair = styled(View)`
  height: 50px;
  justify-content: center;
  background-color: #252C40;
`

const Actions = styled(View)`
  height: 40px;
  justify-content: center;
  background-color: #1e2438;
`

const OrderPlace = styled(View)`
  flex: 1;
`

const DepthChart = styled(View)`
  flex: 1;
`

const TradesHistory = styled(View)`
  height: 40px;
  justify-content: center;
  background-color: #1e2438;
`
