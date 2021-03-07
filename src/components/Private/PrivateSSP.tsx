import Link from 'next/link'
import React from 'react'

import { useAppDispatch, useAppSelector } from 'modules/app'
import { selectUser, logout } from 'modules/auth'

export interface Props {
  message?: string
}

export const PrivateSSP = ({ message }: Props) => {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <h3>Private page example with server side props</h3>
      User: <pre>{JSON.stringify(user, null, 2)}</pre>
      <br />
      Server side props:
      <pre>{message}</pre>
      <br />
      <Link href="/">
        <a href="/">Home</a>
      </Link>
      <br />
      <Link href="/">
        <a href="/" onClick={handleLogout}>
          Logout
        </a>
      </Link>
      <br />
      <style jsx>{`
        a {
          color: red;
        }
      `}</style>
    </div>
  )
}

export const getServerSideProps = () => {
  return {
    props: { message: 'Message from getServerSideProps' },
  }
}
