/*
* Initializes the Redux Provider with the store
*/
import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withReduxStore from '../lib/with-redux-store';
import Router from 'next/router';
import { whoAmI } from '../lib/auth/actions';
import styles from '../styles/global-styles';

class ExampleApp extends App {
  static redirectToLogin(ctx) {
    const { req, res } = ctx;
    const isServer = typeof window === 'undefined';
    if (isServer) {
      res.writeHead(302, { Location: `/login?next=${req.originalUrl}` });
      res.end();
    } else {
      Router.push(`/login?next=${ctx.asPath}`);
    }
  }

  static async getInitialProps({ Component, router, ctx }) {
    const { isPublic } = Component;
    const { reduxStore, req } = ctx;
    const isServer = typeof window === 'undefined';
    let user = null;

    if (isServer) {
      // happens on page first load
      const { cookie } = req.headers;
      if (cookie) {
        user = await reduxStore.dispatch(whoAmI(cookie));
      }
    } else {
      // happens on client side navigation
      user = reduxStore.getState().auth.user;
    }

    if (!isPublic && !user) {
      // anonymous user
      this.redirectToLogin(ctx);
    }

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <div>
            <Component {...pageProps} />
            <style jsx global>
              {styles}
            </style>
          </div>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(ExampleApp);
