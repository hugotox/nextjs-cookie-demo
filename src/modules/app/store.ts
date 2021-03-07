import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper'

import { reducer as auth } from 'modules/auth'
import { reducer as example } from 'modules/example'

const combinedReducers = combineReducers({
  auth,
  example,
})

export type RootState = ReturnType<typeof combinedReducers>

const rootReducer: any = (state: RootState, action: any = {}) => {
  if (action.type === HYDRATE) {
    // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    return nextState
  } else {
    return combinedReducers(state, action)
  }
}

// create a makeStore function
const makeStore = (context: Context) => {
  // default middleware in dev mode: [thunk, immutableStateInvariant, serializableStateInvariant]
  // default middleware in prod mode: [thunk]
  // https://redux-toolkit.js.org/api/getDefaultMiddleware#included-default-middleware
  return configureStore({
    reducer: rootReducer,
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type AppDispatch = AppStore['dispatch']

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>

// export an assembled wrapper
export const wrapper = createWrapper<RootState>(makeStore, {
  debug: false, // NEXT_PUBLIC_NODE_ENV === 'development',
})
