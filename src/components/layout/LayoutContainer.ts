import { connect } from 'react-redux'
import { Layout } from './Layout'
import { selectIsAuthenticated } from 'modules/auth/selectors'
import { State } from 'store/state'
import { Dispatch } from 'redux'
import { logout } from 'modules/auth/actions'

const mapStateToProps = (state: State) => {
  return {
    isAuthenticated: selectIsAuthenticated(state),
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    logout: () => {
      dispatch(logout())
    },
  }
}

export const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Layout)
