import { utils } from 'ethers'
import { randInt } from './helpers'

export const getOrderHash = order => {
  return utils.solidityKeccak256(
    [
      'bytes',
      'bytes',
      'bytes',
      'bytes',
      'uint256',
      'uint256',
      'uint256',
      'string',
      'string',
      'uint256',
    ],
    [
      order.exchangeAddress,
      order.userAddress,
      order.baseToken,
      order.quoteToken,
      order.amount,
      order.pricepoint,
      order.side === 'BUY' ? '0' : '1',
      order.status,
      order.type,
      order.nonce,
    ],
  )
}

export const getOrderCancelHash = orderCancel => {
  return utils.solidityKeccak256(['bytes', 'uint256'], [orderCancel.orderHash, orderCancel.nonce])
}

export const getTradeHash = trade => {
  return utils.solidityKeccak256(
    ['bytes', 'bytes'],
    [trade.makerOrderHash, trade.takerOrderHash],
  )
}

export const getRandomNonce = () => {
  return randInt(0, 1e16).toString()
}

export const isEthereumAddress = address => {
  return /^(0x)?[0-9a-f]{40}$/i.test(address)
}
