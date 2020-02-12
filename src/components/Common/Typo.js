import { Text } from 'react-native'
import styled from 'styled-components'

export const P = styled(Text)`
    color: ${props => props.mute ? '#6e7793' : '#fff'};
    font-size: 14px;
    font-family: 'Ubuntu-Regular';
    margin-bottom: 5px;
`

export const H1 = styled(Text)`
    color: #fff;
    font-size: 18px;
    font-family: 'Ubuntu-Regular';
    margin-bottom: 5px;
`

export const H2 = styled(H1)`
    font-size: 16px;
`

export const H3 = styled(H1)`
    font-size: 14px;
`

export const Highlight = styled(Text)`
    color: ${props => props.color ? props.color : '#ff9a4d'};
`

export const MdText = styled(Text)`
    color: ${props => props.mute ? '#6e7793' : '#fff'};
    font-size: 14px;
`

