import { Component } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Promise } from 'es6-promise';

const actionWithPromise = () => {
  return new Promise((resolve, reject) => reject());
};

export const mockedRouter = {
  push: actionWithPromise,
  replace: actionWithPromise,
  prefetch: () => {},
  route: '/mock-route',
  pathname: 'mock-path',
  query: {},
};

Router.router = mockedRouter;

export const withMockRouterContext = mockRouter => {
  class MockRouterContext extends Component {
    static propTypes = {
      children: PropTypes.any,
    };

    getChildContext() {
      return {
        router: Object.assign(mockedRouter, mockRouter),
      };
    }
    render() {
      return this.props.children;
    }
  }

  MockRouterContext.childContextTypes = {
    router: PropTypes.object,
  };

  return MockRouterContext;
};
