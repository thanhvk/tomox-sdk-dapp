import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'

const Wrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 7px;
  border-radius: 3px;
  background-color: ${props => props.type === 'up' ? '#00c38c' : props.type === 'down' ? '#f94d5c' : '#f2f2f2'}
`

const Content = styled(Text)`
  color: ${props => props.color ? props.color : '#fff'};
  font-size: 16px;
  font-family: Ubuntu-Regular;
`

export function Button({type, color, children}) {
    return (
        <Wrapper type={type}>
            <Content color={color}>{children}</Content>
        </Wrapper>
    )
}