import { connect } from 'react-redux'
import { Account } from './Account'
import { selectUser } from 'modules/auth/selectors'
import { compose } from 'redux'
import { withInitialProps } from 'modules/auth/with-initial-props'
import { State } from 'store/state'

const mapStateToProps = (state: State) => {
  return {
    user: selectUser(state),
  }
}

export const AccountContainer = compose(
  withInitialProps({ requiresUserType: true }),
  connect(mapStateToProps)
)(Account)
