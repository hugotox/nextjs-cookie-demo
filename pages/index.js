import { connect } from 'react-redux';
import { compose } from 'redux';
import Home from '../components/index/Home';
import withUserAuth from '../lib/auth/with-user-auth';
import { logout } from '../components/login/actions';

const mapStateToProps = state => {
  return {
    someState: 'lalala'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default compose(
  withUserAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home);
