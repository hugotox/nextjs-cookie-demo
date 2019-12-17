import { WHOAMI_SUCCESS, LOGOUT_SUCCESS, LOGIN_SUCCESS } from './constants'
import { User } from './actions'
import { AnyAction } from 'redux'

interface AuthState {
  user?: User
}

const initialState: AuthState = {
  user: undefined,
}

export const auth = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case WHOAMI_SUCCESS: {
      return { ...state, user: action.payload }
    }

    case LOGIN_SUCCESS: {
      return { ...state, user: action.payload }
    }

    case LOGOUT_SUCCESS: {
      return { ...state, user: undefined }
    }

    default:
      return state
  }
}
