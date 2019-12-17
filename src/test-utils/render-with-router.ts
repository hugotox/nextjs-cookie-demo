import { Component } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'

const actionWithPromise = () => {
  return new Promise((_, reject) => reject(new Error('error')))
}

export const mockedRouter = {
  push: actionWithPromise,
  replace: actionWithPromise,
  prefetch: () => {},
  route: '/mock-route',
  pathname: 'mock-path',
  query: {},
}

// @ts-ignore
Router.router = mockedRouter

export const withMockRouterContext = (mockRouter: any) => {
  class MockRouterContext extends Component {
    static propTypes = {
      children: PropTypes.any,
    }

    getChildContext() {
      return {
        router: Object.assign(mockedRouter, mockRouter),
      }
    }

    render() {
      return this.props.children
    }
  }

  // @ts-ignore
  MockRouterContext.childContextTypes = {
    router: PropTypes.object,
  }

  return MockRouterContext
}
