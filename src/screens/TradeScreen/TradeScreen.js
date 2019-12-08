import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

export default class TradeScreen extends Component {
  static navigationOptions = {
    title: 'Trade',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Trade screen!</Text>
        <Button
          title="Go to markets"
          onPress={() => navigate('Markets')}
        />
      </View>
    );
  }
}
