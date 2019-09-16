import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withReduxStore from 'lib/with-redux-store';
import styles from 'styles/global-styles';
import Head from 'next/head';
import axios from 'axios';
import { BASE_URL } from 'modules/app/constants';
import { SET_USER } from 'modules/auth/constants';
// import registerServiceWorker from '../lib/register-service-worker';

// runs once on first SSR load
const whoAmI = async cookie =>
  axios
    .get(`${BASE_URL}/api/whoami`, {
      headers: {
        Accept: 'application/json',
        Cookie: cookie,
      },
      withCredentials: true,
    })
    .then(response => response && response.data);

/*
 * Initializes the Redux Provider with the store
 */
class ExampleApp extends App {
  static async getInitialProps({ Component, ctx }) {
    if (typeof window === 'undefined') {
      const { reduxStore, req } = ctx;
      const { cookie } = req.headers;
      if (cookie) {
        const user = await whoAmI(cookie);
        if (user) {
          reduxStore.dispatch({ type: SET_USER, user });
        }
      }
    }

    let pageProps = {};
    if (typeof Component.getInitialProps === 'function') {
      pageProps = await Component.getInitialProps.call(Component, ctx);
    }
    return { ...pageProps };
  }

  // componentDidMount() {
  //   registerServiceWorker();
  // }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <>
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
      </>
    );
  }
}

export default withReduxStore(ExampleApp);
