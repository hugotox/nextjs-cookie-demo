import axios from 'axios';
import Router from 'next/router';
import { BASE_URL } from './constants';

export function login(payload, next = '/') {
  return dispatch =>
    axios
      .post(`${BASE_URL}/api/login`, payload)
      .then(resp => {
        dispatch({
          type: 'SET_USER',
          user: resp.data
        });
        Router.push(next);
      })
      .catch(err => err);
}

export function logout() {
  return dispatch =>
    axios
      .get(`${BASE_URL}/api/logout`)
      .then(resp => {
        dispatch({ type: 'LOGOUT' });
        Router.push('/');
      })
      .catch(err => err);
}

export function whoAmI(cookie) {
  return dispatch => {
    return axios
      .get(`${BASE_URL}/api/whoami`, {
        headers: {
          Accept: 'application/json',
          Cookie: cookie
        },
        withCredentials: true
      })
      .then(response => {
        let user = null;
        if (response.data) {
          user = response.data;
        }
        dispatch({
          type: 'SET_USER',
          user
        });
        return user;
      })
      .catch(err => {
        return null;
      });
  };
}
