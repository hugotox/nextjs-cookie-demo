import Link from 'next/link'
import React from 'react'

export const Home = () => {
  return (
    <>
      <h1>Next.js Starter project</h1>
      <p>Example pages:</p>
      <ul>
        <li>
          <Link href="/example">
            <a>Public page with server side props</a>
          </Link>
        </li>
        <li>
          <Link href="/private">
            <a>Private page</a>
          </Link>
        </li>
        <li>
          <Link href="/private-ssp">
            <a>Private page with server side props</a>
          </Link>
        </li>
      </ul>
    </>
  )
}
