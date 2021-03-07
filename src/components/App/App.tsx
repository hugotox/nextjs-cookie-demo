import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'

import { wrapper } from 'modules/app'

const WrappedApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Next.js Starter App</title>
        <link href="/favicon/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/favicon/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export const MyApp = wrapper.withRedux(WrappedApp)
