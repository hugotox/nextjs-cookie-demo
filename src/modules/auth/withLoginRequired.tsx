import { NextPage } from 'next'
import React from 'react'

export const withLoginRequired = () => (Component: any) => {
  console.log('with login required')
  const withLoginRequiredWrapper: NextPage = (props: any) => {
    return <Component {...props} />
  }

  withLoginRequiredWrapper.getInitialProps = (ctx) => {
    // console.log('CTX login required', ctx)
    return {}
  }

  return withLoginRequiredWrapper
}
