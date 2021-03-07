import React from 'react'

import { useAppSelector } from 'modules/app'
import { withLoginRequired, selectUser } from 'modules/auth'

export const Private = withLoginRequired()(() => {
  const user = useAppSelector(selectUser)
  return (
    <div>
      <h2>Private page!</h2>
      User: {user}
    </div>
  )
})
