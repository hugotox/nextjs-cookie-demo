import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './Login.style';

const Login = ({ submitLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="container">
      <div className="box">
        <h3>Login</h3>
        <form
          onSubmit={e => {
            e.preventDefault();
            submitLogin({username, password});
          }}
          method="POST"
        >
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
      <style jsx>{style}</style>
    </div>
  );
};

Login.propTypes = {
  submitLogin: PropTypes.func.isRequired,
};

export default Login;
