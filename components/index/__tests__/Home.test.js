import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Home from '../Home';

describe('Index page tests', () => {
  afterEach(cleanup);

  it('should render', function() {
    const { getByText } = render(<Home user={{ username: 'Test' }} logout={() => {}} />);
    expect(getByText('A dead simple, responsive boilerplate.')).not.toBe(null);
  });
});
