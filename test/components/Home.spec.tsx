import React from 'react'

import { Home } from 'components/Home'
import { renderWithRedux } from '../renderWithRedux'

describe('Home', () => {
  it('renders', () => {
    const { getByText } = renderWithRedux(<Home />, { initialState: {} })
    expect(getByText('Next.js Starter project')).toBeInTheDocument()
  })
})
