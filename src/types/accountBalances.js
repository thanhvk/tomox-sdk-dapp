// @flow
export type AccountBalanceState = {
  symbol: string,
  balance: string,
  subscribed: boolean,
};

export type AccountBalancesState = { +[string]: AccountBalanceState };

export type AccountBalance = {
  symbol: string,
  balance: string,
};

export type AccountAllowance = {
  symbol: string,
};

export type AccountAllowances = Array<AccountAllowance>;
export type AccountBalances = Array<AccountBalance>;
export type AccountBalancesMap = { [string]: AccountBalance }

export type SubscribeAccountBalanceAction = {
  type: 'accountBalances/SUBSCRIBE_BALANCE',
  payload: { symbol: string },
};

export type UpdateAccountBalanceAction = {
  type: 'accountBalances/UPDATE_BALANCE',
  payload: AccountBalance,
};

export type UnsubscribeAccountBalanceAction = {
  type: 'accountBalances/UNSUBSCRIBE_BALANCE',
  payload: { symbol: string },
};

export type UpdateAccountBalancesAction = {
  type: 'accountBalances/UPDATE_BALANCES',
  payload: { balances: AccountBalances },
};

export type UpdateAccountAllowanceAction = {
  type: 'accountBalances/UPDATE_ALLOWANCE',
  payload: AccountAllowance,
};

export type UpdateAccountAllowancesAction = {
  type: 'accountBalances/UPDATE_ALLOWANCES',
  payload: { allowances: AccountAllowances },
};

export type AccountBalancesEvent = any => AccountBalancesState => AccountBalancesState;

export type AccountBalancesAction =
  | SubscribeAccountBalanceAction
  | UpdateAccountBalanceAction
  | UpdateAccountBalancesAction
  | UpdateAccountAllowanceAction
  | UpdateAccountAllowancesAction
  | UnsubscribeAccountBalanceAction
