import Cookies from 'js-cookie'
import Router from 'next/router'
import { Dispatch } from 'redux'

import { receiveAuthData } from 'modules/auth'

interface Login {
  username: string
  password: string
}

export const login = ({ username, password }: Login) => async (dispatch: Dispatch) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (response.status === 200 && data?.user && data?.token) {
      // TODO: validate `data` that comes from the server is a `UserType` data type
      dispatch(receiveAuthData({ user: data.user }))

      Cookies.set('token', data.token)

      const path = Router.query.next ? String(Router.query.next) : '/'
      Router.replace(path).catch(() => {
        window.location.href = path
      })
    }
  } catch {}
}
