import React from 'react'

import { Container, Header, MdText } from '../../components/Common'

export default function UnlockScreen({ navigation }) {
    return (
      <Container>
        <Header title="Unlock wallet" navigation={navigation} back />
        <MdText>Unlock screen!</MdText>
        <MdText onPress={() => navigation.pop()}>Back</MdText>
      </Container>
    )
  }