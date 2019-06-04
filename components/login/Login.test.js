import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRedux from '../../lib/test-utils/render-with-redux';
import Login from './Login';
import * as actions from './actions';

describe('Login page tests', () => {
  let spy;

  beforeAll(() => {
    spy = jest.fn();
    spy = jest.spyOn(actions, 'login');
  });

  afterEach(cleanup);

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render', function() {
    const { getByTestId } = renderWithRedux(<Login />);
    const usernameInput = getByTestId('username-input');
    const passwordInput = getByTestId('password-input');
    const loginBtn = getByTestId('login-button');

    expect(usernameInput).not.toBe(null);
    expect(passwordInput).not.toBe(null);

    // submit a form:
    fireEvent.change(usernameInput, { target: { value: 'user@domain.com' } });
    fireEvent.change(passwordInput, { target: { value: 'changeme' } });
    fireEvent.click(loginBtn);

    // assert API was called:
    expect(spy).toHaveBeenCalledWith(
      {
        username: 'user@domain.com',
        password: 'changeme'
      },
      '/'
    );
  });
});
