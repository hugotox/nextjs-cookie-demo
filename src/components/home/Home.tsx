import React from 'react'
import Link from 'next/link'
import style from './Home.style'
import { LayoutContainer } from 'components/layout/LayoutContainer'

export const Home = () => {
  return (
    <LayoutContainer>
      <div className="title">Next.js Starter</div>
      <Link href="/account">
        <a>Account</a>
      </Link>
      <style jsx>{style}</style>
    </LayoutContainer>
  )
}
