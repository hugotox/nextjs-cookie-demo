import { cleanup } from 'react-testing-library';
import renderWithRedux from '../../lib/test-utils/render-with-redux';
import { reducer } from '../../lib/init-store';
import Home from './Home';

describe('Index page tests', () => {
  afterEach(cleanup);

  it('should render', function() {
    const { getByText } = renderWithRedux(<Home />, {
      reducer,
      initialState: {
        auth: {
          user: { username: 'Test' }
        }
      }
    });
    expect(getByText('A dead simple, responsive boilerplate.')).not.toBe(null);
  });
});
