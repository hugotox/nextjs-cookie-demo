import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withReduxStore from 'lib/with-redux-store';
import styles from 'styles/global-styles';
import Head from 'next/head';
// import registerServiceWorker from '../lib/register-service-worker';

/*
 * Initializes the Redux Provider with the store
 */
class ExampleApp extends App {
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
