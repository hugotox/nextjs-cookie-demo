import axios from 'axios';
import Router from 'next/router';
import { BASE_URL } from 'modules/app/constants';
import { takeLatest, put } from 'redux-saga/effects';
import { LOGIN, LOGOUT, SET_USER } from './constants';

const loginRequest = function*({ payload, next }) {
  const response = yield axios.post(`${BASE_URL}/api/login`, payload);
  yield put({ type: SET_USER, user: response.data });
  Router.push(next);
};

const logoutRequest = function*() {
  yield axios.get(`${BASE_URL}/api/logout`);
  yield put({ type: SET_USER, user: null });
  Router.push('/');
};

export const loginWatcherSaga = function*() {
  yield takeLatest(LOGIN, loginRequest);
};

export const logoutWatcherSaga = function*() {
  yield takeLatest(LOGOUT, logoutRequest);
};
