import React, { ReactNodeArray, ReactNode, useCallback } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import style from './Layout.style'

interface Props {
  children: ReactNode | ReactNodeArray
  title?: string
  isAuthenticated: boolean
  logout: () => void
}

export const Layout = ({ children, title = 'Next.js starter', isAuthenticated, logout }: Props) => {
  const handleLogout = useCallback(
    (e) => {
      e.preventDefault()
      logout()
    },
    [logout]
  )
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
      </Head>
      <div className="menu">
        <Link href="/">
          <a>Home</a>
        </Link>
        {isAuthenticated ? (
          <>
            <Link href="/account">
              <a>Account</a>
            </Link>
            <a href="/logout" onClick={handleLogout}>
              Log out
            </a>
          </>
        ) : (
          <Link href="/login">
            <a>Log in</a>
          </Link>
        )}
      </div>
      {children}
      <style jsx>{style}</style>
    </div>
  )
}
