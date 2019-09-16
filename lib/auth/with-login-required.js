import React from 'react';
import Router from 'next/router';

export function makeRedirect(ctx, toUrl) {
  const { req, res } = ctx;
  const isServer = !!req;
  if (isServer) {
    res.writeHead(302, {
      Location: `${toUrl}?next=${req.originalUrl}`,
    });
    res.end();
  } else {
    Router.push(`${toUrl}?next=${ctx.asPath}`);
  }
}

const withLoginRequired = WrappedComponent => {
  const withLoginRequiredWrapper = props => {
    return <WrappedComponent {...props} />;
  };

  withLoginRequiredWrapper.getInitialProps = async ctx => {
    const { reduxStore } = ctx;
    let user = reduxStore.getState().auth.user;
    if (!user) {
      makeRedirect(ctx, '/login');
    }

    let pageProps = {};
    if (typeof WrappedComponent.getInitialProps === 'function') {
      pageProps = await WrappedComponent.getInitialProps.call(WrappedComponent, ctx);
    }

    return { ...pageProps, user };
  };
  return withLoginRequiredWrapper;
};

export default withLoginRequired;
