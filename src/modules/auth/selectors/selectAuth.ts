import { RootState } from 'modules/app'

export const selectAuth = (state: RootState) => {
  return state.auth
}
