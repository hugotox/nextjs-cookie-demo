import React from 'react'
import { selectUser } from './selectors'
import Router from 'next/router'
import { NextPage, NextPageContext } from 'next'
import { PageContextWithStore } from 'components/my-app/types'

export const makeRedirect = (ctx: NextPageContext, toUrl: string) => {
  const { req, res } = ctx
  const isServer = !!req
  if (isServer && req && res) {
    res.writeHead(302, {
      Location: `${toUrl}?next=${req.url}`,
    })
    res.end()
  } else {
    Router.push(`${toUrl}?next=${ctx.asPath}`)
  }
}

interface WithLoginRequiredOptions {
  getInitialProps?: any
  requiresUserType?: boolean
}

export const withInitialProps = ({
  getInitialProps,
  requiresUserType,
}: WithLoginRequiredOptions) => (WrappedComponent: NextPage) => {
  const withInitialPropsWrapper = (props: any) => {
    return <WrappedComponent {...props} />
  }

  withInitialPropsWrapper.getInitialProps = async (ctx: PageContextWithStore) => {
    if (requiresUserType) {
      const { store } = ctx
      const user = selectUser(store.getState())
      if (!user || (user && !user.id)) {
        makeRedirect(ctx, '/login')
      }
    }
    let pageProps = {}
    if (typeof getInitialProps === 'function') {
      pageProps = await getInitialProps(ctx)
    }
    return { ...pageProps }
  }
  return withInitialPropsWrapper
}
