import React from 'react'

import { useAppSelector, wrapper } from 'modules/app'
import { receiveExample, selectSelectExampleMessage } from 'modules/example'
import { isServer } from 'utils'
import Link from 'next/link'

export const Example = () => {
  const message = useAppSelector(selectSelectExampleMessage)
  return (
    <div>
      <h3>Example with dispatch from server side props</h3>
      Data from redux:
      <pre>{message}</pre>
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(({ store }) => {
  const { dispatch } = store
  const side = isServer() ? 'server' : 'client'
  dispatch(receiveExample({ message: `Message dispatched ${side} side` }))
  return {
    props: {},
  }
})
