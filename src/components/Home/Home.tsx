import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect } from 'react'

export interface Props {
  homeInitialProps?: string
}

export const Home: NextPage<Props> = ({ homeInitialProps }: Props) => {
  useEffect(() => {
    fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ name: 'HUGO' }),
    }).catch(() => {})
  }, [])

  return (
    <div>
      <h1>Home</h1>
      <p>Hello, world</p>
      <Link href="/private">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>Private</a>
      </Link>
      <br />
      homeInitialProps: {homeInitialProps}
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  // console.log('CTX HOME', ctx)
  return {
    homeInitialProps: 'dog',
  }
}
