import { createStore, applyMiddleware, Middleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from './root-reducer'
import { rootSaga } from './root-saga'

const bindMiddleware = (middleware: Array<Middleware>) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

// @ts-ignore
export const initStore = (preloadedState = {}, { isServer, req = null }) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(rootReducer, preloadedState, bindMiddleware([sagaMiddleware]))

  // https://github.com/bmealhouse/next-redux-saga#configure-store
  if (req || !isServer) {
    // @ts-ignore
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }
  return store
}
