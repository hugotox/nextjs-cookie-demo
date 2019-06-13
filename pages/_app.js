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

export function makeRedirect(ctx, toUrl) {
  const { req, res } = ctx;
  const isServer = !!req;
  if (isServer) {
    res.writeHead(302, {
      Location: `${toUrl}?next=${req.originalUrl}`
    });
    res.end();
  } else {
    Router.push(`${toUrl}?next=${ctx.asPath}`);
  }
}

export async function checkUser({ Component, ctx }) {
  const { reduxStore, req } = ctx;
  const isServer = !!req;
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

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (!pageProps.isPublic && !user) {
    // anonymous user
    makeRedirect(ctx, '/login');
  }

  return { pageProps };
}

class ExampleApp extends App {
  static async getInitialProps(props) {
    return checkUser(props);
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
