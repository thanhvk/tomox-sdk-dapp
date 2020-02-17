import React, { Component } from 'react'
import styled from 'styled-components'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { View, Text, Button } from 'react-native'

import { LgText, MdText } from '../../components/Common'

export default function FundsScreen() {
  
  return (
    <Container>
      <Header><LgText mute>Funds</LgText></Header>
    </Container>
  )
}

const Container = styled(View)`
  flex: 1;
  background-color: #191e2f;
  margin-top: ${getStatusBarHeight()}px;
`

const Header = styled(View)`
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: #252C40;
`
