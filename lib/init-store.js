import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import auth from 'modules/auth/reducer';

export const reducer = combineReducers({
  auth,
});

export default initialState =>
  createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
