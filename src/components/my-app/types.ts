import { NextPageContext } from 'next'
import { Store } from 'redux'

export interface PageContextWithStore extends NextPageContext {
  store: Store
}
