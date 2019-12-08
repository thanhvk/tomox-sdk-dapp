//@flow
import { utils } from 'ethers'
import { getOrderHash, getOrderCancelHash, getTradeHash } from '../../../utils/crypto'
import { computePricepoint, computeAmountPoints, isTomoWallet } from '../../../utils/helpers'

// flow
import type {
  RawOrder,
  OrderCancel,
} from '../../../types/orders'
import type { Trade } from '../../../types/trades'

// The amountPrecisionMultiplier and pricePrecisionMultiplier are temporary multipliers
// that are used to turn decimal values into rounded integers that can be converted into
// big numbers that can be used to compute large amounts (ex: in wei) with the amountMultiplier
// and priceMultiplier. After multiplying with amountMultiplier and priceMultiplier, the result
// numbers are divided by the precision multipliers.
// So in the end we have:
// amountPoints ~ amount * amountMultiplier ~ amount * 1e18
// pricePoints ~ price * priceMultiplier ~ price * 1e6
export const createRawOrder = async function (params: any) {
  const order = {}
  const { userAddress, exchangeAddress, side, type, status, pair, amount, price, orderNonce } = params
  const { quoteTokenSymbol, baseTokenAddress, quoteTokenAddress, baseTokenSymbol, baseTokenDecimals, quoteTokenDecimals } = pair


  const precisionMultiplier = utils.bigNumberify(10).pow(9)
  // const priceMultiplier = utils.bigNumberify(10).pow(18)
  const baseMultiplier = utils.bigNumberify(10).pow(baseTokenDecimals)
  const quoteMultiplier = utils.bigNumberify(10).pow(quoteTokenDecimals)
  // const pricepoint = computePricepoint({ price, priceMultiplier, quoteMultiplier, precisionMultiplier })
  const pricepoint = computePricepoint({ price, quoteMultiplier, precisionMultiplier })
  const amountPoints = computeAmountPoints({ amount, baseMultiplier, precisionMultiplier })

  order.baseTokenSymbol = baseTokenSymbol
  order.quoteTokenSymbol = quoteTokenSymbol
  order.exchangeAddress = exchangeAddress
  order.userAddress = userAddress
  order.baseToken = baseTokenAddress
  order.quoteToken = quoteTokenAddress
  order.userAmount = amount
  order.userPrice = price
  order.amount = amountPoints.toString()
  order.pricepoint = pricepoint.toString()
  order.side = side
  order.type = type
  order.status = status
  order.nonce = orderNonce.toString()
  order.hash = getOrderHash(order)
  
  let signature = null

  if (isTomoWallet()) {
    order.action = 'CREATE' 
    const orderBase64 = window.btoa(JSON.stringify(order))
    signature = await this.signMessage(`TOMOX_ORDER:${orderBase64}`)
  } else {
    signature = await this.signMessage(utils.arrayify(order.hash))
  }

  const { r, s, v } = utils.splitSignature(signature)

  order.signature = { R: r, S: s, V: v }
  return order
}

export const createOrderCancel = async function (
  order: Object
): Promise<OrderCancel> {
  const nonce = order.nonce.toString()
  const orderHash = order.hash
  let orderCancel = {nonce, orderHash}
  orderCancel.hash = getOrderCancelHash(orderCancel)
  let signature = null

  if (isTomoWallet()) {
    orderCancel = {...order, ...orderCancel}
    orderCancel.action = 'CANCEL'
    const orderBase64 = window.btoa(JSON.stringify(orderCancel))
    signature = await this.signMessage(`TOMOX_ORDER:${orderBase64}`)
  } else {
    signature = await this.signMessage(utils.arrayify(orderCancel.hash))
  }

  const { r, s, v } = utils.splitSignature(signature)
  orderCancel.signature = { R: r, S: s, V: v }
  return orderCancel
}

export const signOrder = async function (order: RawOrder): Promise<RawOrder> {
  order.hash = getOrderHash(order)

  const signature = await this.signMessage(utils.arrayify(order.hash))
  const { r, s, v } = utils.splitSignature(signature)

  order.signature = { r, s, v }
  return order
}

export const signTrade = async function (trade: Trade): Promise<Trade> {
  trade.hash = getTradeHash(trade)

  const signature = await this.signMessage(utils.arrayify(trade.hash))
  const { r, s, v } = utils.splitSignature(signature)

  trade.signature = { r, s, v }
  return trade
}
