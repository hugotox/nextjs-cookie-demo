import configureMockStore from 'redux-mock-store'
import { render } from '@testing-library/react'
import thunk from 'redux-thunk'
import React from 'react'
import { Provider } from 'react-redux'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

interface Options {
  initialState: any
}

export const renderWithRedux = (children: React.ReactNode, { initialState }: Options) => {
  const store = mockStore(initialState)
  return render(<Provider store={store}>{children}</Provider>)
}
