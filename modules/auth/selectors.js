import { compose } from 'redux';

const selectAuth = state => state.auth;

export const selectUser = compose(
  state => state && state.user,
  selectAuth,
);
