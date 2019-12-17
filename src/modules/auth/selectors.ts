import { compose } from 'redux'
import { State } from 'store/state'

export const selectAuth = (state: State) => {
  return state.auth
}

export const selectUser = compose((auth: ReturnType<typeof selectAuth>) => auth.user, selectAuth)

export const selectIsAuthenticated = compose((auth: ReturnType<typeof selectAuth>) => {
  return auth?.user?.id !== undefined
}, selectAuth)
