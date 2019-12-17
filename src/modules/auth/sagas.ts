import { logoutRequest, loginRequest } from './api'
import { put } from 'redux-saga/effects'
import { login, logoutSuccess, LoginPayload, loginSuccess, User } from './actions'
import Router from 'next/router'

interface LoginSaga {
  type: ReturnType<typeof login>
  payload: LoginPayload
}

export const loginSaga = function*({ payload }: LoginSaga) {
  try {
    const resp = yield loginRequest(payload)
    if (resp.status === 200) {
      const data: User = yield resp.json()
      yield put(loginSuccess(data))
      yield Router.push('/')
    }
  } catch {}
}

export const logoutSaga = function*() {
  try {
    const resp = yield logoutRequest()
    if (resp.status === 200) {
      yield put(logoutSuccess())
      yield Router.push('/')
    }
  } catch {}
}
