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
        <Row>
          <Col>
            <Text>Order place</Text>
            <Text>Depth chart</Text>
          </Col>
          <Col>
            <Orderbook />
          </Col>
        </Row>
      </Container>
    );
  }
}

const Container = styled(View)`
  flex: 1;
  background-color: #1f2538;
  margin-top: ${getStatusBarHeight()}px;
`

const Row = styled(View)`
  flex-direction: row;
`

const Col = styled(View)`
  flex-direction: column;
  width: 50%;
`
