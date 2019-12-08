import getWalletDomain from './wallets'
import * as eventCreators from './wallets'
import { mockSerializedWallet, mockSerializedWalletAddress } from '../../mockData'

function getDomain(events) {
  const state = events.reduce((state, event) => event(state), undefined)
  return getWalletDomain(state)
}

it('handles initialized event properly', () => {
  const wallets = getDomain([eventCreators.initialized()])

  expect(wallets.addresses()).toEqual([])
  expect(wallets.byAddress()).toEqual({})
})

it('handles wallet added event properly', () => {
  const wallets = getDomain([
    eventCreators.initialized(),
    eventCreators.walletAdded(mockSerializedWalletAddress, mockSerializedWallet),
  ])

  expect(wallets.addresses()).toEqual([mockSerializedWalletAddress])
  expect(wallets.byAddress()).toEqual({
    [mockSerializedWalletAddress]: {
      address: mockSerializedWalletAddress,
      encryptedWallet: mockSerializedWallet,
    },
  })
})

it('handles wallet removed event properly', () => {
  const wallets = getDomain([
    eventCreators.initialized(),
    eventCreators.walletAdded(mockSerializedWalletAddress, mockSerializedWallet),
    eventCreators.walletRemoved(mockSerializedWalletAddress),
  ])

  expect(wallets.addresses()).toEqual([])
  expect(wallets.byAddress()).toEqual({})
})
