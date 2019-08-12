import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import { login } from 'modules/auth/actions';
import Login from './Login';

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitLogin: payload => {
    const { router } = ownProps;
    const { query } = router;
    const next = query.next || '/';
    dispatch(login(payload, next));
  },
});

const LoginContainer = compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps,
  ),
)(Login);

LoginContainer.getInitialProps = () => ({
  isPublic: true,
});

export default LoginContainer;
