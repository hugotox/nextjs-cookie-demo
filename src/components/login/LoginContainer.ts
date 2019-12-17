import { connect } from 'react-redux'
import { Login } from './Login'
import { Dispatch } from 'redux'
import { login } from 'modules/auth/actions'

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    login: (username: string, password: string) => {
      dispatch(login({ username, password }))
    },
  }
}

export const LoginContainer = connect(null, mapDispatchToProps)(Login)
