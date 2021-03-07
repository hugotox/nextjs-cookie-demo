import { compose } from 'redux'

import { selectAuth } from 'modules/auth/selectors'

export const selectUser = compose((auth) => {
  return auth.user
}, selectAuth)
