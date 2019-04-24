import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import { login } from './actions';

class Login extends Component {
  static isPublic = true;

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  state = {
    username: '',
    password: ''
  };

  handleSubmit = e => {
    const { router } = Router;
    const { query } = router;
    const next = query.next || '/';
    e.preventDefault();
    this.props.dispatch(login(this.state, next));
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="container">
        <div className="box">
          <h3>Login</h3>
          <form onSubmit={this.handleSubmit} method="POST">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={this.handleOnChange}
              className="form-control"
              data-testid="username-input"
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleOnChange}
              className="form-control"
              data-testid="password-input"
            />
            <input type="submit" value="Login" className="btn btn-default" data-testid="login-button" />
          </form>
        </div>
        <style jsx>{/*language=CSS*/
        `
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
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Login);
