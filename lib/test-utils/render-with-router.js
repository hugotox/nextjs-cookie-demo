const { Component } = require('react');
const Router = require('next/router').default;
const PropTypes = require('prop-types');

const actionWithPromise = () => {
  return new Promise((resolve, reject) => reject());
};

export const mockedRouter = {
  push: actionWithPromise,
  replace: actionWithPromise,
  prefetch: () => {},
  route: '/mock-route',
  pathname: 'mock-path'
};

Router.router = mockedRouter;

export const withMockRouterContext = mockRouter => {
  class MockRouterContext extends Component {
    getChildContext() {
      return {
        router: Object.assign(mockedRouter, mockRouter)
      };
    }
    render() {
      return this.props.children;
    }
  }

  MockRouterContext.childContextTypes = {
    router: PropTypes.object
  };

  return MockRouterContext;
};
