// @flow
import {
  tsvParse,
} from 'd3-dsv'
import {
  timeParse,
} from 'd3-time-format'

const request = (endpoint: string, options: Object) => {
  return fetch(`https://localhost${endpoint}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    mode: 'cors',
    ...options,
  })
}

export const fetchOHLCV = async (
  baseToken: string,
  quoteToken: string,
  from: number,
  to: number,
  duration: number,
  units: string
) => {
  const response = await request(`/trades/ticks`, {
    body: JSON.stringify({
      pair: [{
        baseToken,
        quoteToken,
      }],
      from,
      to,
      duration,
      units,
    }),
    method: 'POST',
  })

  if (response.status !== 200) {
    throw new Error('Error')
  }

  const {
    data,
  } = await response.json()
  return data
}

export function parseData(parse: any) {
  return function (d: any) {
    d.date = parse(d.date)
    d.open = +d.open
    d.high = +d.high
    d.low = +d.low
    d.close = +d.close
    d.volume = +d.volume
    return d
  }
}

export const parseDate = timeParse('%Y-%m-%d')

// these data will be served from backend instead
export function getData(): Promise < Object > {
  const ohlcv = fetch('/data.tsv')
    .then(response => response.text())
    .then(data => {
      return tsvParse(data, parseData(parseDate))
    })
  return ohlcv
}