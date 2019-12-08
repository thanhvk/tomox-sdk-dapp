//@flow
import type {TxReceipt} from './common'
export type TxStatus = 'incomplete' | 'valid' | 'invalid' | 'sent' | 'reverted' | 'confirmed' | 'error';
export type Address = string;



export type TransferTokensFormState = {
  +loading: boolean,
  +status: TxStatus,
  +statusMessage: ?string,
  +gas: ?number,
  +gasPrice: ?number,
  +hash: ?string,
  +receipt: ?TxReceipt,
};

export type TOMOTxParams = {
  amount: number,
  receiver: string,
  gas: number,
  gasPrice: number
};

export type TransferTokensTxParams = {
  amount: number,
  receiver: string,
  gas: number,
  gasPrice: number,
  tokenAddress: Address,
  tokenDecimals: number,
};

export type TxNotification = {
  status: TxStatus,
  statusMessage: string,
  gas: number,
  receipt: TxReceipt,
};

export type TxErrorAction = {
  type: 'transferTokensForm/ERROR',
  payload: {
    status: TxStatus,
    statusMessage: string,
  },
};

export type ValidateTxAction = {
  type: 'transferTokensForm/VALIDATE',
  payload: {
    statusMessage: string,
    gas: number,
  },
};

export type InvalidateTxAction = {
  type: 'transferTokensForm/INVALIDATE',
  payload: {
    statusMessage: string,
  },
};

export type SendTxAction = {
  type: 'transferTokensForm/SEND',
  payload: {
    hash: string,
  },
};

export type RevertTxAction = {
  type: 'transferTokensForm/REVERT',
  payload: {
    statusMessage: string,
    receipt: TxReceipt,
  },
};

export type ConfirmTxAction = {
  type: 'transferTokensForm/CONFIRM',
  payload: {
    receipt: TxReceipt,
  },
};

export type ResetFormAction = {
  type: 'transferTokensForm/RESET_FORM'
};

export type TransferTokensFormEvent = any => TransferTokensFormState => TransferTokensFormState;

export type TransferTokensFormAction =
  | TxErrorAction
  | ValidateTxAction
  | InvalidateTxAction
  | SendTxAction
  | ConfirmTxAction
  | RevertTxAction
  | ResetFormAction;
