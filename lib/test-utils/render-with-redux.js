import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as defaultReducer } from '../init-store';
import { withMockRouterContext } from './render-with-router';

export default function renderWithRedux(
  ui,
  {
    reducer = defaultReducer, // default value but open to overwrite
    initialState,
    store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware))),
    extendMockRouter = {},
  } = {},
) {
  const MockRouter = withMockRouterContext(extendMockRouter);
  return {
    ...render(
      <Provider store={store}>
        <MockRouter>{ui}</MockRouter>
      </Provider>,
    ),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}
