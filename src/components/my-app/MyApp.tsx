import React from 'react'
import App, { AppContext } from 'next/app'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { initStore } from 'store/init-store'
import { whoamiSuccess } from 'modules/auth/actions'
import globalStyles from 'styles/globalStyles'
import { whoamiRequest } from 'modules/auth/api'
import { PageContextWithStore } from 'components/my-app/types'

interface Props {
  Component: React.ComponentClass
  pageProps: Promise<{}> | {}
  store: Store
}

class MyApp extends App<Props> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const isServer = !!ctx.req

    if (isServer && ctx.req?.headers.cookie) {
      try {
        const response = await whoamiRequest(ctx.req?.headers.cookie)
        const data = await response.json()
        if (data) {
          ;(ctx as PageContextWithStore).store.dispatch(whoamiSuccess(data))
        }
      } catch {}
    }

    let pageProps = {}
    if (typeof Component.getInitialProps === 'function') {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <Component {...pageProps} />
        <style jsx>{globalStyles}</style>
      </Provider>
    )
  }
}

// @ts-ignore
export const MyAppWithRedux = withRedux(initStore)(withReduxSaga(MyApp))
