import { connect } from 'react-redux';
import { compose } from 'redux';
import withLoginRequired from 'lib/auth/with-login-required';
import { logout } from 'modules/auth/actions';

import Home from './Home';

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default compose(
  withLoginRequired,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Home);
