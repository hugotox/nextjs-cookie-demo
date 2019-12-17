import { combineReducers } from 'redux'
import { auth } from 'modules/auth/reducer'

export const rootReducer = combineReducers({
  auth,
})
