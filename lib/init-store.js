import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from 'modules/auth/reducer';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { loginWatcherSaga, logoutWatcherSaga } from '../modules/auth/sagas';

const rootSaga = function*() {
  yield all([loginWatcherSaga(), logoutWatcherSaga()]);
};

export const reducer = combineReducers({
  auth,
});

const initStore = initialState => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default initStore;
