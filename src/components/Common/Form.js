import React from 'react'
import { View, Text, TextInput } from 'react-native'
import styled from 'styled-components'
import { Dropdown } from 'react-native-material-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

/*
 * =========================
 * Button 
 * =========================
 */
const ButtonWrapper = styled(View)`
  height: ${props => props.height ? props.height : 35}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  background-color: ${props => props.type === 'up' ? '#00c38c' : props.type === 'down' ? '#f94d5c' : '#f2f2f2'}
`

const ButtonContent = styled(Text)`
  color: ${props => props.color ? props.color : '#fff'};
  font-size: 16px;
  font-family: Ubuntu-Regular;
`

export function Button({type, height, color, children}) {
    return (
        <ButtonWrapper type={type} height={height}>
            <ButtonContent color={color}>{children}</ButtonContent>
        </ButtonWrapper>
    )
}

/*
 * =========================
 * Input 
 * =========================
 */

const StyledInput = styled(TextInput).attrs({
  placeholderTextColor: '#6e7793',
})`
  flex: 1;
  color: #fff;
  font-family: 'Ubuntu';
  height: 40px;
  padding: 10px;
  border-radius: 3px;
  background: #252C40;
`

export function Input(props) {
  return (<StyledInput {...props} />)
}

/*
 * =========================
 * Select
 * =========================
 */

const SelectLabelWrapper = styled(View)`
  height: 40px;
  flex-direction: row;
  align-items: center;
` 

const SelectLabel = styled(Text)`
  color: #fff;
`

function renderBase({title}) {
  return (
    <SelectLabelWrapper>
      <SelectLabel>{title}</SelectLabel>
      <Icon name="menu-down" size={30} color="#ff9a4d" />
    </SelectLabelWrapper>
  )
}

export function Select(props) {
  return (
    <Dropdown {...props}
      renderBase={renderBase} />
  )
}