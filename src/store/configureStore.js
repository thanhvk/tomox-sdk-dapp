import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import * as reducers from './reducers'
import * as services from './services'

let composeEnhancers = compose

const configureStore = preloadedState => {
  const initialStore = {}

  const middlewares = [
    thunk.withExtraArgument(services),
  ]
  const enhancers = [applyMiddleware(...middlewares)]
  const storeEnhancer = composeEnhancers(...enhancers)
  const rootReducer = combineReducers(reducers)


  const store = createStore(
    rootReducer,
    preloadedState,
    storeEnhancer
  )

  return {
    store,
  }
}

export default configureStore
