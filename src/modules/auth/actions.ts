import {
  LOGOUT,
  WHOAMI_SUCCESS,
  // WHOAMI_ERROR,
  LOGOUT_SUCCESS,
  LOGIN,
  LOGIN_SUCCESS,
} from './constants'

export interface LoginPayload {
  username: string
  password: string
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

export const login = (payload: LoginPayload) => ({ type: LOGIN, payload })

export const loginSuccess = (payload: User) => ({ type: LOGIN_SUCCESS, payload })

export const logout = () => ({ type: LOGOUT })

export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS })

export const whoamiSuccess = (payload: User) => ({ type: WHOAMI_SUCCESS, payload })

// export const whoamiError = (payload) => ({ type: WHOAMI_ERROR, payload })
