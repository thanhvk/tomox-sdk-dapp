import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class AccountScreen extends Component {
  static navigationOptions = {
    title: 'Account',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Account screen!</Text>
        <Button
          title="Go to trade"
          onPress={() => navigate('Trade')}
        />
      </View>
    );
  }
}
