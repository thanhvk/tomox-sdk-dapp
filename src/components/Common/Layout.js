import styled from 'styled-components'
import { View } from 'react-native'

const Container = styled(View)`
    flex: 1;
`

const Row = styled(View)`
  padding: 10px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
` 

export { Container, Row }

