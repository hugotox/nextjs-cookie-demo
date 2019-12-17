import React from 'react'
import { renderWithRedux } from 'test-utils/render-with-redux'
import { Home } from 'components/home/Home'

it('renders', () => {
  const { getByText } = renderWithRedux(<Home />)
  expect(getByText('Next.js Starter'))
})
