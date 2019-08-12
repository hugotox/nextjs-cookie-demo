import axios from 'axios';
import Router from 'next/router';
import { BASE_URL } from 'modules/app/constants';
import { SET_USER, LOGOUT } from 'modules/auth/constants';

export const login = (payload, next = '/') => dispatch =>
  axios
    .post(`${BASE_URL}/api/login`, payload)
    .then(resp => {
      dispatch({
        type: SET_USER,
        user: resp.data,
      });
      Router.push(next);
    })
    .catch(err => err);

export const logout = () => dispatch =>
  axios
    .get(`${BASE_URL}/api/logout`)
    .then(() => {
      dispatch({ type: LOGOUT });
      Router.push('/');
    })
    .catch(err => err);

export const whoAmI = cookie => dispatch =>
  axios
    .get(`${BASE_URL}/api/whoami`, {
      headers: {
        Accept: 'application/json',
        Cookie: cookie,
      },
      withCredentials: true,
    })
    .then(response => {
      let user = null;
      if (response.data) {
        user = response.data;
      }
      dispatch({
        type: SET_USER,
        user,
      });
      return user;
    })
    .catch(() => {
      return null;
    });
