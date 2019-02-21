/*
 * Initializes the Redux Provider with the store
 */
import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withReduxStore from '../lib/with-redux-store';
import Router from 'next/router';
import { whoAmI } from '../components/login/actions';
import styles from '../styles/global-styles';
import Head from 'next/head';
import registerServiceWorker from '../lib/register-service-worker';

const loginPageUrl = '/login';

class ExampleApp extends App {
  static redirectToLogin(ctx) {
    const { req, res } = ctx;
    const isServer = typeof window === 'undefined';
    if (isServer) {
      res.writeHead(302, {
        Location: `${loginPageUrl}?next=${req.originalUrl}`
      });
      res.end();
    } else {
      Router.push(`${loginPageUrl}?next=${ctx.asPath}`);
    }
  }

  static async getInitialProps({ Component, ctx }) {
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

  componentDidMount() {
    registerServiceWorker();
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Head>
          <title>Next.js Starter</title>
        </Head>
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
