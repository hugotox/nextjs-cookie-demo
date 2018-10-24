import { cleanup } from 'react-testing-library';
import renderWithRedux from '../../lib/test-utils/render-with-redux';
import { reducer } from '../../lib/init-store';
import Login from './Login';

describe('Login page tests', () => {
  afterEach(cleanup);

  it('should render', function() {
    const { getByText } = renderWithRedux(<Login />);
    expect(getByText('Username')).not.toBe(null);
    expect(getByText('Password')).not.toBe(null);
  });
});
