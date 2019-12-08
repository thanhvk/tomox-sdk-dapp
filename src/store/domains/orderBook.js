// @flow
import type { OrderBookState, OrderBookData } from '../../types/orderBook'
import SortedArray from 'sorted-array'
import BigNumber from 'bignumber.js'
import { round } from '../../utils/helpers'
import { pricePrecision, amountPrecision } from '../../config/tokens'

const initialState: OrderBookState = {
  selected: null,
  bids: {},
  asks: {},
  sortedBids: [],
  sortedAsks: [],
  quoteToken: '',
  baseToken: '',
}

export const initialized = () => {
  const event = (state: OrderBookState = initialState) => state
  return event
}

export const selected = (order: Object) => {
  const event = (state: OrderBookState) => ({
    ...state,
    selected: order,
  })

  return event
}

export const orderBookInitialized = (
  bids: Array<Object>,
  asks: Array<Object>
) => {
  const event = (state: OrderBookState) => {
    const newSortedBids = new SortedArray([], (a, b) => b - a)
    const newSortedAsks = new SortedArray([], (a, b) => a - b)

    const newBids = bids.reduce((result, item) => {
      if (item.amount > 0) {
        item.update = true
        result[item.price] = item
        if (newSortedBids.search(item.price) === -1)
          newSortedBids.insert(item.price)
      }

      return result
    }, {})

    const newAsks = asks.reduce((result, item) => {
      if (item.amount > 0) {
        item.update = true
        result[item.price] = item
        if (newSortedAsks.search(item.price) === -1)
          newSortedAsks.insert(item.price)
      }

      return result
    }, {})

    return {
      ...state,
      bids: newBids,
      asks: newAsks,
      sortedBids: newSortedBids.array,
      sortedAsks: newSortedAsks.array,
    }
  }

  return event
}

export const orderBookUpdated = (bids: Array<Object>, asks: Array<Object>) => {
  const event = (state: OrderBookState) => {
    const newSortedBids = new SortedArray(state.sortedBids, (a, b) => b - a)
    const newSortedAsks = new SortedArray(state.sortedAsks, (a, b) => a - b)

    const oldBids = {}
    for (const price of state.sortedBids) {
      oldBids[price] = {...state.bids[price], update: false}
    }

    const oldAsks = {}
    for (const price of state.sortedAsks) {
      oldAsks[price] = {...state.asks[price], update: false}
    }

    const newBids = bids.reduce((result, item) => {
      if (item.amount > 0) {
        item.update = true
        result[item.price] = item
        if (newSortedBids.search(item.price) === -1)
          newSortedBids.insert(item.price)
      }

      if (item.amount <= 0) {
        delete result[item.price]
        newSortedBids.remove(item.price)
      }

      return result
    }, {})

    const newAsks = asks.reduce((result, item) => {
      if (item.amount > 0) {
        item.update = true
        result[item.price] = item
        if (newSortedAsks.search(item.price) === -1)
          newSortedAsks.insert(item.price)
      }

      if (item.amount <= 0) {
        delete result[item.price]
        newSortedAsks.remove(item.price)
      }

      return result
    }, {})

    return {
      ...state,
      bids: {
        ...oldBids,
        ...newBids,
      },
      asks: {
        ...oldAsks,
        ...newAsks,
      },
      sortedBids: newSortedBids.array,
      sortedAsks: newSortedAsks.array,
    }
  }

  return event
}

export const orderBookReset = () => {
  const event = (state: OrderBookState) => {
    return {
      ...state,
      bids: {},
      asks: {},
      sortedBids: [],
      sortedAsks: [],
    }
  }

  return event
}

export default function domain(state: OrderBookState) {
  return {
    getState: () => state,
    getAsks: () => state.asks,
    getBids: () => state.bids,
    getSelectedOrder: () => state.selected,
    getOrderedBids: (): Array<Object> =>
      state.sortedBids.map(price => state.bids[price]),
    getOrderedAsks: (): Array<Object> =>
      state.sortedAsks.map(price => state.asks[price]),
    getOrderBookData: (ln: number): OrderBookData => {
      ln = ln || 300

      let bids = state.sortedBids
        .slice(0, Math.min(state.sortedBids.length, ln))
        .map(price => state.bids[price])
        .reduce((result, item) => {
          result.push({
            update: item.update,
            price: item.price,
            amount: item.amount,
            total:
              result.length > 0
                ? round(result[result.length - 1].total + item.amount, amountPrecision)
                : round(item.amount, amountPrecision),
          })
          return result
        }, [])

      let asks = state.sortedAsks
        .slice(0, Math.min(state.sortedAsks.length, ln))
        .map(price => state.asks[price])
        .reduce((result, item) => {
          result.push({
            update: item.update,
            price: item.price,
            amount: item.amount,
            total:
              result.length > 0
                ? round(result[result.length - 1].total + item.amount, amountPrecision)
                : round(item.amount, amountPrecision),
          })

          return result
        }, [])

      const maxBids = bids.length > 1 ? bids[bids.length - 1].total : 0
      const maxAsks = asks.length > 1 ? asks[asks.length  - 1].total : 0

      bids = bids.map(item => ({
        ...item,
        relativeTotal: maxBids ? item.amount / maxBids : 1,
        amount: BigNumber(item.amount).toFixed(amountPrecision),
        total: BigNumber(item.total).toFixed(pricePrecision),
        price: BigNumber(item.price).toFixed(pricePrecision),
      }))

      asks = asks.map(item => ({
        ...item,
        relativeTotal: maxAsks ? item.amount / maxAsks : 1,
        amount: BigNumber(item.amount).toFixed(amountPrecision),
        total: BigNumber(item.total).toFixed(pricePrecision),
        price: BigNumber(item.price).toFixed(pricePrecision),
      }))

      return { asks, bids }
    },

    getBidPrice: () =>
      state.bids[state.sortedBids[0]]
        ? state.bids[state.sortedBids[0]].price
        : 0,
    getAskPrice: () =>
      state.asks[state.sortedAsks[0]]
        ? state.asks[state.sortedAsks[0]].price
        : 0,
    getQuoteToken: () => state.quoteToken,
    getBaseToken: () => state.baseToken,
  }
}
