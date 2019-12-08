//@flow
import aes from 'crypto-js/aes'
import CryptoJS from 'crypto-js'
import { DEFAULT_NETWORK_ID } from '../../config/environment'
import { createLocalWalletSigner } from '../services/signer'
import {
  getAccountDomain,
  getAccountBalancesDomain,
  getTokenDomain,
  getSettingsDomain,
  getTokenPairsDomain,
  getNotificationsDomain,
} from '../domains'

import { quoteTokens } from '../../config/quotes'
import { NATIVE_TOKEN_SYMBOL } from '../../config/tokens'

import * as actionCreators from '../actions/walletPage'
import * as notifierActionCreators from '../actions/app'
import * as settingsActionCreators from '../actions/settings'
import * as accountBalancesCreators from '../actions/accountBalances'
import * as layoutCreators from '../actions/layout'

import type { State, ThunkAction } from '../../types'
import type { Token } from '../../types/tokens'
import { getSigner } from '../services/signer'

export default function createSelector(state: State) {
  const accountDomain = getAccountDomain(state)
  const accountBalancesDomain = getAccountBalancesDomain(state)
  const settingsDomain = getSettingsDomain(state)
  const tokenPairs = getTokenPairsDomain(state)
  const newNotifications = getNotificationsDomain(state).getNewNotifications()

  const TomoBalance = accountBalancesDomain.tomoBalance()
  const authenticated = accountDomain.authenticated()
  const address = accountDomain.address()
  const currentBlock = accountDomain.currentBlock()
  const accountLoading = !TomoBalance
  const referenceCurrency = accountDomain.referenceCurrency()
  const showSessionPasswordModal = accountDomain.showSessionPasswordModal()
  const locale = settingsDomain.getLocale()
  const mode = settingsDomain.getMode()
  const currentPair = tokenPairs.getCurrentPair()
  const currentPairData = tokenPairs.getCurrentPairData()
  const { router: { location: { pathname }}} = state

  return {
    TomoBalance,
    authenticated,
    address,
    accountLoading,
    currentBlock,
    locale,
    mode,
    currentPair,
    currentPairData,
    pathname,
    referenceCurrency,
    newNotifications,
    showSessionPasswordModal,
  }
}

export function queryAppData(): ThunkAction {
  return async (dispatch, getState, { socket, api }) => {
    const state = getState()

    try {
      socket.subscribeMarkets()
      dispatch(layoutCreators.updateLoadingTokenPair(true))

      let tokens = getTokenDomain(state).tokens()
      const quotes = quoteTokens

      tokens = quotes
        .concat(tokens)
        .filter((token: Token) => token.symbol !== NATIVE_TOKEN_SYMBOL)

      const pairs = await api.fetchPairs()
      dispatch(layoutCreators.updateTokenPairs(pairs))

      const exchangeAddress = await api.getExchangeAddress()
      dispatch(actionCreators.updateExchangeAddress(exchangeAddress))
    } catch (e) {
      const message = e.message ? e.message : "Could not connect to Tomochain network"

      dispatch(
        notifierActionCreators.addErrorNotification({
          message,
        })
      )
      console.log(e)
    }
  }
}

export function queryAccountData(): ThunkAction {
  return async (dispatch, getState, { api, socket }) => {
    const state = getState()
    const accountAddress = getAccountDomain(state).address()
    const privatekey = getAccountDomain(state).privateKey()
    const signer = getSigner()

    try {
      const addresses = JSON.parse(sessionStorage.getItem('addresses'))
      if (!addresses) return

      if (!signer && privatekey) {
        if (window.getBalancesInterval) clearInterval(window.getBalancesInterval)
        return dispatch(dispatch(layoutCreators.showSessionPasswordModal(true)))
      }

      let tokens = getTokenDomain(state).tokens() //eslint-disable-line
      const quotes = quoteTokens

      tokens = quotes
        .concat(tokens)
        .filter((token: Token) => token.symbol !== NATIVE_TOKEN_SYMBOL)
        .reduce((newTokens, currentToken) => { // remove duplicate tokens
          const x = newTokens.find(item => item.symbol === currentToken.symbol)

          if (!x) {
            return [...newTokens, currentToken]
          }

          return newTokens
        }, [])

      if (!accountAddress) throw new Error('Account address is not set')
      
      const { tokenBalances } = await api.fetchAccountInfo(accountAddress)
      dispatch(accountBalancesCreators.updateBalances(tokenBalances))
      window.getBalancesInterval = setInterval(async _ => {
        const { tokenBalances } = await api.fetchAccountInfo(accountAddress)
        dispatch(accountBalancesCreators.updateBalances(tokenBalances))
      }, 2000)
    } catch (e) {
      dispatch(
        notifierActionCreators.addErrorNotification({
          message: 'Could not connect to Tomochain network',
        })
      )
      console.log(e)
    }
  }
}

export function createProvider(): ThunkAction {
  return async (dispatch, getState, { provider }) => {
    provider.createConnection()
  }
}

export function changeLocale(locale: string): ThunkAction {
  return async (dispatch, getstate) => {
    dispatch(settingsActionCreators.changeLocale(locale))
  }
}

export function changeMode(mode: string): ThunkAction {
  return async (dispatch, getstate) => {
    dispatch(settingsActionCreators.changeMode(mode))
  }
}

export function closeSessionPasswordModal(status: Boolean): ThunkAction {
  return async (dispatch, getstate) => {
    dispatch(layoutCreators.showSessionPasswordModal(false))
  }
}

export function unlockWalletWithSessionPassword(password): ThunkAction {
  return async (dispatch, getstate) => {
    const state = getstate()
    const privateKeyEncrypted = getAccountDomain(state).privateKey()

    try {
      const bytes = aes.decrypt(privateKeyEncrypted, password)
      const privateKey = bytes.toString(CryptoJS.enc.Utf8)

      if (!privateKey) return {error: 'Wrong password!'}

      await createLocalWalletSigner({
          privateKey,
        },
        +DEFAULT_NETWORK_ID
      )   

      dispatch(layoutCreators.showSessionPasswordModal(false))
      return {error: null}
    } catch(e) {
      return {error: e}
    }
  }
}

export function releaseResource(): ThunkAction {
  return async (dispatch, getState, { socket }) => {
    socket.unSubscribeMarkets()
    if (window.getBalancesInterval) clearInterval(window.getBalancesInterval)
  }
}
