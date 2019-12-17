import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from 'store/root-reducer'
import { withMockRouterContext } from './render-with-router'

export const renderWithRedux = (
  ui: React.ReactElement,
  {
    reducer = rootReducer, // default value but open to overwrite
    initialState,
    store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware())),
    extendMockRouter = {},
  }: any = {}
) => {
  const MockRouter = withMockRouterContext(extendMockRouter)
  return {
    ...render(
      <Provider store={store}>
        <MockRouter>{ui}</MockRouter>
      </Provider>
    ),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  }
}
