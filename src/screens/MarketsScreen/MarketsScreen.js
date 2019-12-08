import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { getStatusBarHeight } from 'react-native-status-bar-height'

const getRoutes = titles => {
  let routes = []

  titles.forEach(title => {
    routes.push({
      key: title.toLowerCase(),
      title: title.toUpperCase(),
    })
  })

  return routes
}

const getScenes = titles => {
  let scenes = []

  titles.forEach((title, index) => {
    scenes.push(
      () => (
        <View key={index}>
          <Text>{title.toUpperCase()}</Text>
        </View>
      )
    )
  })

  return scenes
}

const getSceneMap = (routes, scenes) => {
  let sceneMap = {}

  routes.forEach((route, index) => {
    sceneMap[route.key] = scenes[index]
  })

  return sceneMap
}

export default class MarketsScreen extends Component {
  static navigationOptions = {
    title: 'Markets',
  };

  state = {
    index: 0,
    routes: getRoutes(['All', ...this.props.quoteTokens]),
  }

  componentDidMount() {
    this.props.queryAppData()
  }

  filterTokens = (pairs: Array<TokenPair>) => {
    const { searchInput, selectedTab } = this.state

    if (selectedTab.toLowerCase() !== 'all'
      && selectedTab.toLowerCase() !== 'favorites') pairs = pairs.filter(pair => pair.quoteTokenSymbol === selectedTab)

    if (selectedTab.toLowerCase() === 'favorites') pairs = pairs.filter(pair => pair.favorited)
    
    pairs = searchInput ? pairs.filter(pair => pair.baseTokenSymbol.indexOf(searchInput.toUpperCase()) > -1) : pairs

    return pairs
  }

  handleFavoriteClick = (e, pair, favorited) => {
    e.stopPropagation()

    const { updateFavorite } = this.props
    updateFavorite(pair, favorited)
  }

  scenes = getScenes(['All', ...this.props.quoteTokens])
  sceneMap = getSceneMap( this.state.routes, this.scenes )

  render() {
    const {
      pairs,
      redirectToTradingPage,
      quoteTokens,
      currentReferenceCurrency,
      loading,
    } = this.props

    const {
      index,
      // routes
    } = this.state

    // const filteredPairs = this.filterTokens(pairs)

    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap(this.sceneMap)}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={styles.container}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: getStatusBarHeight(),
  },
  scene: {
    flex: 1,
  },
});