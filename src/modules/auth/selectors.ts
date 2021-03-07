import { compose } from 'redux'

import { RootState } from 'modules/app'

export const selectAuth = (state: RootState) => {
  return state.auth
}

export const selectUser = compose((auth) => {
  return auth.user
}, selectAuth)
