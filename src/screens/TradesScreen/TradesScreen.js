import React, { Component } from 'react'
import styled from 'styled-components'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Orderbook from '../../components/Orderbook'
import OrderPlace from '../../components/OrderPlace'
import { MdText } from '../../components/Common'

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
        <Row>
          <Col>
            <OrderPlace />
            <DepthChart><Text>Depth chart</Text></DepthChart>
          </Col>
          <Col>
            <Actions>
              <Icon name="clipboard-text-outline" size={20} color="#fff" />
              <MdText>Open Orders</MdText>
            </Actions>
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #1e2438;
`

const DepthChart = styled(View)`
  flex: 1;
`

const TradesHistory = styled(View)`
  height: 40px;
  justify-content: center;
  background-color: #1e2438;
`
