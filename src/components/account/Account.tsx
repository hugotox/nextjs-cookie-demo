import React from 'react'
import { LayoutContainer } from 'components/layout/LayoutContainer'
import { User } from 'modules/auth/actions'

interface Props {
  user: User
}

export const Account = ({ user }: Props) => {
  return (
    <LayoutContainer>
      <h3>Account page</h3>
      User: {user.firstName} {user.lastName}
    </LayoutContainer>
  )
}
