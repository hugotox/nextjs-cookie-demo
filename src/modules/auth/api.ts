import 'isomorphic-unfetch'
import { LoginPayload } from 'modules/auth/actions'

export const whoamiRequest = async (Cookie: string) => {
  return fetch(`${process.env.BASE_URL}/api/whoami`, {
    credentials: 'include',
    headers: {
      Cookie,
    },
  })
}

export const loginRequest = async ({ username, password }: LoginPayload) => {
  return fetch(`${process.env.BASE_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ username, password }),
  })
}

export const logoutRequest = async () => {
  return fetch(`${process.env.BASE_URL}/api/logout`)
}
