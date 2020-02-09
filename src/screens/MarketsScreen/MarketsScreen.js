import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { TabView } from 'react-native-tab-view'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import styled from 'styled-components'
import { H1, P, Button } from '../../components/Common'

const COLUMNS_WIDTH = ['40%', '40%', '20%']

const getTextChange = (change) => change > 0 ? `+${change}%` : change < 0 ? `${change}%` : '0%'

const getStatusChange = (change) => change > 0 ? 'up' : change < 0 ? 'down' : ''

const getRoutes = titles => {
  let routes = []

  titles.forEach(title => {
    routes.push({
      key: title.toLowerCase(),
      title: title,
    })
  })

  return routes
}

export default class MarketsScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Markets',
  };

  state = {
    index: 0,
    routes: getRoutes([...this.props.quoteTokens, 'All']),
  }

  componentDidMount() {
    this.props.queryAppData()
  }

  filterTokens = (key, pairs: Array<TokenPair>) => {

    if (key.toLowerCase() !== 'all'
      && key.toLowerCase() !== 'favorites') pairs = pairs.filter(pair => pair.quoteTokenSymbol.toLowerCase() === key.toLowerCase())

    if (key.toLowerCase() === 'favorites') pairs = pairs.filter(pair => pair.favorited)
    
    // pairs = searchInput ? pairs.filter(pair => pair.baseTokenSymbol.indexOf(searchInput.toUpperCase()) > -1) : pairs

    return pairs
  }

  handleFavoriteClick = (e, pair, favorited) => {
    e.stopPropagation()

    const { updateFavorite } = this.props
    updateFavorite(pair, favorited)
  }

  render() {
    const {
      pairs,
      redirectToTradingPage,
      quoteTokens,
      currentReferenceCurrency,
      loading,
    } = this.props

    const renderScene = ({ route }) => {
      const filteredPairs = this.filterTokens(route.key, pairs)
      return <MarketsTable tokenPairs={filteredPairs} />
    }

    return (
      <StyledTabView
        navigationState={this.state}
        renderScene={renderScene}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    )
  }
}

function MarketsTable({ tokenPairs }) {
  return (
    <Container>
      <Row>
        <Header width={COLUMNS_WIDTH[0]}>Pair / Vol</Header>
        <Header width={COLUMNS_WIDTH[1]}>Last Price</Header>
        <Header width={COLUMNS_WIDTH[2]}>24h Chg%</Header>
      </Row>   

      { 
        tokenPairs.map((pair, index) => {
          return ( 
            <Row key={index}>
              <Col width={COLUMNS_WIDTH[0]}>
                <Pair>
                  <H1>{pair.baseTokenSymbol}</H1>
                  <P mute> / {pair.quoteTokenSymbol}</P>
                </Pair>
                <P mute>Vol {pair.volume}</P>
              </Col>
              <Col width={COLUMNS_WIDTH[1]}>
                <H1>{pair.lastPrice}</H1>
                <P mute>${pair.price}</P>
              </Col>
              <Col width={COLUMNS_WIDTH[2]}>
                <Button type={getStatusChange(pair.change)}>
                  {getTextChange(pair.change)}
                </Button>
              </Col>
            </Row>
          )
        })
      }
    </Container>
  )
}

const StyledTabView = styled(TabView)`
  background-color: #1f2538;
  margin-top: ${getStatusBarHeight()}px;
`

const Container = styled(View)`
  padding: 0 10px 10px 10px;
`

const Row = styled(View)`
  padding: 10px 0;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-style: solid;
  border-bottom-color:  #394362;
` 

const Pair = styled(View)`
  flex-direction: row;
  align-items: center;
` 

const Col = styled(View)`
  flex-direction: column;
  width: ${props => props.width ? props.width : '30%'};
`

const Header = styled(Text)`
  color: #fff;
  font-family: Ubuntu-Regular;
  width: ${props => props.width ? props.width : '30%'};
`

