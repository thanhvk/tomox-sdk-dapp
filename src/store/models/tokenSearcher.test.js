import tokenSearcherSelector from './tokenSearcher'
import * as domains from '../domains'

jest.mock('../domains')

it('tokenSearcherSelector parses data correctly', () => {
  const getFavoritePairsMock = jest.fn(() => ['TOMO/DAI', 'ZRX/WETH'])

  const getCurrentPairMock = jest.fn(() => ({
    pair: 'TOMO/WETH',
    baseTokenSymbol: 'TOMO',
    quoteTokenSymbol: 'WETH',
  }))

  const tokenBalanceMock = jest.fn(symbol => {
    if (symbol === 'TOMO') return '100.00'
    if (symbol === 'WETH') return '10.00'
    return
  })

  const getTokenPairsDataArrayMock = jest.fn(() => [
    {
      pair: 'TOMO/WETH',
      lastPrice: '7425.2945',
      change: '4.5421',
      high: '8782.7964',
      low: '6499.3696',
      volume: 720404,
    },
    {
      pair: 'TOMO/DAI',
      lastPrice: '6018.7886',
      change: '1.6589',
      high: '3876.8717',
      low: '4613.5315',
      volume: 68946,
    },
    {
      pair: 'OMG/DAI',
      lastPrice: '66.2789',
      change: '3.5460',
      high: '9211.5292',
      low: '4241.7509',
      volume: 912048,
    },
    {
      pair: 'ZRX/WETH',
      lastPrice: '8176.7874',
      change: '1.7811',
      high: '6165.0712',
      low: '2242.4298',
      volume: 752620,
    },
    {
      pair: 'OMG/WETH',
      lastPrice: '398.888',
      change: '3.7561',
      high: '9892.7954',
      low: '6884.7173',
      volume: 155880,
    },
  ])

  const expectedTokenPairsByQuoteToken = {
    WETH: [
      {
        pair: 'TOMO/WETH',
        lastPrice: '7425.2945',
        change: '4.5421',
        high: '8782.7964',
        low: '6499.3696',
        volume: 720404,
        base: 'TOMO',
        quote: 'WETH',
        favorited: false,
      },
      {
        pair: 'ZRX/WETH',
        lastPrice: '8176.7874',
        change: '1.7811',
        high: '6165.0712',
        low: '2242.4298',
        volume: 752620,
        base: 'ZRX',
        quote: 'WETH',
        favorited: true,
      },
      {
        pair: 'OMG/WETH',
        lastPrice: '398.888',
        change: '3.7561',
        high: '9892.7954',
        low: '6884.7173',
        volume: 155880,
        base: 'OMG',
        quote: 'WETH',
        favorited: false,
      },
    ],
    DAI: [
      {
        pair: 'TOMO/DAI',
        lastPrice: '6018.7886',
        change: '1.6589',
        high: '3876.8717',
        low: '4613.5315',
        base: 'TOMO',
        quote: 'DAI',
        volume: 68946,
        favorited: true,
      },
      {
        pair: 'OMG/DAI',
        lastPrice: '66.2789',
        change: '3.5460',
        high: '9211.5292',
        low: '4241.7509',
        base: 'OMG',
        quote: 'DAI',
        volume: 912048,
        favorited: false,
      },
    ],
  }

  domains.getTokenPairsDomain = jest.fn(() => ({
    getTokenPairsDataArray: getTokenPairsDataArrayMock,
    getFavoritePairs: getFavoritePairsMock,
    getCurrentPair: getCurrentPairMock,
  }))

  domains.getAccountBalancesDomain = jest.fn(() => ({
    tokenBalance: tokenBalanceMock,
  }))

  const { tokenPairsByQuoteToken, currentPair, baseTokenBalance, quoteTokenBalance } = tokenSearcherSelector()
  expect(tokenPairsByQuoteToken).toEqual(expectedTokenPairsByQuoteToken)
  expect(currentPair).toEqual({ pair: 'TOMO/WETH', baseTokenSymbol: 'TOMO', quoteTokenSymbol: 'WETH' })
  expect(baseTokenBalance).toEqual('100.00')
  expect(quoteTokenBalance).toEqual('10.00')
})
