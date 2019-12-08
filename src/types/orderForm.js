//@flow

export type SIDE = 'BUY' | 'SELL'

export type OrderFormState = {
  formName: string,
  askPrice: number,
  bidPrice: number,
  totalQuoteBalance: number,
  totalBaseBalance: number,
  baseToken: string,
  quoteToken: string
}
