import { connect } from 'react-redux';
import { compose } from 'redux';
import withUserAuth from 'lib/auth/with-user-auth';
import { logout } from 'modules/auth/actions';

import Home from './Home';

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default compose(
  withUserAuth,
  connect(
    null,
    mapDispatchToProps,
  ),
)(Home);
