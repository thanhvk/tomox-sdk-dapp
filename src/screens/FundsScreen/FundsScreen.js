import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class FundsScreen extends Component {
  static navigationOptions = {
    title: 'Funds',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Funds screen!</Text>
        <Button
          title="Go to trade"
          onPress={() => navigate('Trade')}
        />
      </View>
    );
  }
}
