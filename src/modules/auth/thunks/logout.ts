import Cookies from 'js-cookie'
import { Dispatch } from 'redux'
import { receiveAuthData, initialState } from 'modules/auth'

export const logout = () => (dispatch: Dispatch) => {
  Cookies.remove('token')
  dispatch(receiveAuthData(initialState))
}
