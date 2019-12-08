// @flow
import type {
  AccountBalances,
  SubscribeAccountBalanceAction,
  UnsubscribeAccountBalanceAction,
  UpdateAccountBalanceAction,
  UpdateAccountBalancesAction,
} from '../../types/accountBalances'



const actionTypes = {
  subscribeBalance: 'accountBalances/SUBSCRIBE_BALANCE',
  updateBalance: 'accountBalances/UPDATE_BALANCE',
  updateBalances: 'accountBalances/UPDATE_BALANCES',
  unsubscribeBalance: 'accountBalances/UNSUBSCRIBE_BALANCE',
}

export function subscribeBalance(
  symbol: string
): SubscribeAccountBalanceAction {
  return {
    type: actionTypes.subscribeBalance,
    payload: {
      symbol,
    },
  }
}

export function updateBalance(
  symbol: string,
  balance: number,
): UpdateAccountBalanceAction {
  return {
    type: actionTypes.updateBalance,
    payload: {
      symbol,
      balance,
    },
  }
}

export function updateBalances(
  balances: AccountBalances
): UpdateAccountBalancesAction {
  return {
    type: actionTypes.updateBalances,
    payload: {
      balances,
    },
  }
}

export function unsubscribeBalance(
  symbol: string
): UnsubscribeAccountBalanceAction {
  return {
    type: actionTypes.unsubscribeBalance,
    payload: {
      symbol,
    },
  }
}

export default actionTypes