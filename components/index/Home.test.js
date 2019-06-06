import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRedux from '../../lib/test-utils/render-with-redux';
import Home from './Home';

describe('Index page tests', () => {
  afterEach(cleanup);

  it('should render', function() {
    const { getByText } = renderWithRedux(<Home />, {
      initialState: {
        auth: {
          user: { username: 'Test' }
        }
      }
    });
    expect(getByText('A dead simple, responsive boilerplate.')).not.toBe(null);
  });
});
