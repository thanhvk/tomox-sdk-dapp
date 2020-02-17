import React from 'react'
import styled from 'styled-components'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { LgText } from './index'


/*
 * =========================
 * Container 
 * =========================
 */

const Container = styled(View)`
  flex: 1;
  background-color: #191e2f;
  margin-top: ${getStatusBarHeight()}px;
`

/*
 * =========================
 * Row 
 * =========================
 */

const Row = styled(View)`
  padding: 10px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
` 

/*
 * =========================
 * Header 
 * =========================
 */

function Header({ navigation, title, back }) {
  return (
    <HeaderWrapper>
      <LgText mute>{title}</LgText>
      {navigation && back && (<BackIcon 
        name="arrow-left" 
        onPress={() => navigation.pop()}
        size={22} />)}
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled(View)`
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: #252C40;
`

const BackIcon = styled(Icon)`
  color: #fff;
  position: absolute;
  padding: 12px 10px 10px 10px;
  left: 0;
`

export { Container, Row, Header }

