import React from 'react';
import { cleanup } from '@testing-library/react';
import Router from 'next/router';
import initStore from '../../lib/init-store';
import { checkUser } from '../_app';

jest.mock('next/router');

function TestComponent() {
  return <div>Hello, I am a test component</div>;
}

describe('_app.js test', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should export a `checkUser` function', () => {
    expect(typeof checkUser).toBe('function');
  });

  it('should redirect an anonymous user (client side)', async () => {
    const spy = jest.spyOn(Router, 'push');
    const ctx = {
      reduxStore: initStore({
        auth: {
          user: null
        }
      }),
      res: {
        writeHead: jest.fn()
      },
      asPath: '/test'
    };
    await checkUser({
      Component: TestComponent,
      ctx
    });

    expect(spy).toHaveBeenCalledWith('/login?next=/test');
  });

  it('should redirect an anonymous user (server side)', async () => {
    const ctx = {
      reduxStore: initStore({
        auth: {
          user: null
        }
      }),
      res: {
        writeHead: jest.fn(),
        end: jest.fn()
      },
      req: {
        headers: {},
        originalUrl: '/test'
      },
      asPath: '/test'
    };
    await checkUser({
      Component: TestComponent,
      ctx
    });

    expect(ctx.res.writeHead).toHaveBeenCalledWith(302, { Location: '/login?next=/test' });
  });

  it('should not redirect an authed user (client side)', async () => {
    const spy = jest.spyOn(Router, 'push');
    spy.mockClear();
    const ctx = {
      reduxStore: initStore({
        auth: {
          user: {
            firstName: 'John',
            lastName: 'Doe'
          }
        }
      }),
      res: {
        writeHead: jest.fn()
      },
      asPath: '/test'
    };

    await checkUser({
      Component: TestComponent,
      ctx
    });

    expect(spy).not.toHaveBeenCalled();
  });

  it('should not redirect an authed user (server side)', async () => {
    const ctx = {
      reduxStore: initStore({
        auth: {}
      }),
      res: {
        writeHead: jest.fn(),
        end: jest.fn()
      },
      req: {
        headers: {
          cookie: {
            session: '12345'
          }
        },
        originalUrl: '/test'
      },
      asPath: '/test'
    };

    ctx.reduxStore.dispatch = jest.fn();

    ctx.reduxStore.dispatch.mockReturnValue({
      name: 'John'
    });

    await checkUser({
      Component: TestComponent,
      ctx
    });
    expect(ctx.res.writeHead).not.toHaveBeenCalled();
  });

  it("should pass the component's getInitialProps", async () => {
    function TestWithInitialProps() {
      return <div>Test with initial props</div>;
    }

    TestWithInitialProps.getInitialProps = async function() {
      return {
        message: 'Hello'
      };
    };

    const initialProps = await checkUser({
      Component: TestWithInitialProps,
      ctx: {
        reduxStore: initStore({
          auth: {
            user: null
          }
        })
      }
    });

    expect(initialProps).toEqual({ pageProps: { message: 'Hello' } });
  });
});
