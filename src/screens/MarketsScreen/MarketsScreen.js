import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { TabView } from 'react-native-tab-view'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import styled from 'styled-components'

const COLUMNS_WIDTH = ['35%', '35%', '30%']

const getTextChange = (change) => change > 0 ? `+${change}` : change < 0 ? `${change}` : '0'

const getStatusChange = (change) => change > 0 ? 'up' : change < 0 ? 'down' : ''

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

export default class MarketsScreen extends React.PureComponent {
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
        <Header width={COLUMNS_WIDTH[0]}>Pair/Vol</Header>
        <Header width={COLUMNS_WIDTH[1]}>Last Price</Header>
        <Header width={COLUMNS_WIDTH[2]}>24h Chg%</Header>
      </Row>   

      { 
        tokenPairs.map((pair, index) => {
          return ( 
            <Row key={index}>
              <Col width={COLUMNS_WIDTH[0]}>
                <LgText>{pair.pair}</LgText>
                <MdText>{pair.volume}</MdText>
              </Col>
              <Col width={COLUMNS_WIDTH[1]}>
                <LgText>{pair.lastPrice}</LgText>
                <MdText>${pair.price}</MdText>
              </Col>
              <Col 
                width={COLUMNS_WIDTH[2]}
                >
                <Button 
                  status={getStatusChange(pair.change)}>
                  <Caption>{getTextChange(pair.change)}</Caption>
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
  background-color: #252C40;
  margin-top: ${getStatusBarHeight()}px;
`

const Container = styled(View)`
  padding: 10px;
`

const Row = styled(View)`
  padding: 7px 0;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-style: solid;
  border-bottom-color:  #394362;
` 

const Col = styled(View)`
  color: #fff;
  flex-direction: column;
  width: ${props => props.width ? props.width : '30%'};
`

const Header = styled(Text)`
  color: #fff;
  width: ${props => props.width ? props.width : '30%'};
`

const Button = styled(View)`
  width: 100px;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  background-color: ${props => props.status === 'up' ? '#00c38c' : props.status === 'down' ? '#f94d5c' : '#f2f2f2'}
`

const Caption = styled(Text)`
  color: #fff;
`

const SmText = styled(Text)`
  color: #fff;  
  font-size: 10px;
`

const MdText = styled(SmText)`
  font-size: 12px;
`

const LgText = styled(SmText)`
  font-weight: 600;
  font-size: 16px;
`