import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { login } from './actions';

const Login = ({ dispatch, router }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const { query } = router;
    const next = query.next || '/';
    dispatch(login({ username, password }, next));
  };

  return (
    <div className="container">
      <div className="box">
        <h3>Login</h3>
        <form onSubmit={handleSubmit} method="POST">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="form-control"
            data-testid="username-input"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="form-control"
            data-testid="password-input"
          />
          <input type="submit" value="Login" className="btn btn-primary" data-testid="login-button" />
        </form>
      </div>
      <style jsx>{`
        label,
        input {
          display: block;
          margin-bottom: 10px;
        }

        .box {
          width: 400px;
          margin: 50px auto;
        }

        .box h3 {
          margin-top: 0;
        }
      `}</style>
    </div>
  );
};

Login.getInitialProps = async () => {
  return {
    isPublic: true
  };
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Login);
