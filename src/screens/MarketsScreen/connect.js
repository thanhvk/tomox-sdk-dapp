import { connect } from 'react-redux'
import { updateFavorite } from '../../store/actions/marketsTable'
import getMarketTableSelector from '../../store/models/marketsTable'
import {
    queryAppData,
    queryAccountData,
  } from '../../store/models/layout'

import type { State } from '../../types'

export function mapStateToProps(state: State) {
  const marketTableSelector = getMarketTableSelector(state)

  return {
    ...marketTableSelector,
  }
}

export const mapDispatchToProps = {
  updateFavorite,
  queryAppData,
}

export default connect(mapStateToProps, mapDispatchToProps)
