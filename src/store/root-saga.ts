import { all, takeLatest } from 'redux-saga/effects'
import { LOGOUT, LOGIN } from 'modules/auth/constants'
import { logoutSaga, loginSaga } from 'modules/auth/sagas'

export const rootSaga = function*() {
  yield all([takeLatest(LOGIN, loginSaga), takeLatest(LOGOUT, logoutSaga)])
}
