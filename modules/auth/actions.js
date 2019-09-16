import { LOGOUT, LOGIN } from 'modules/auth/constants';

export const login = (payload, next) => ({
  type: LOGIN,
  payload,
  next,
});

export const logout = () => ({ type: LOGOUT });
