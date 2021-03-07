import { configureStore } from '@reduxjs/toolkit'

import { reducer as auth } from 'modules/auth'

// default middleware in dev mode: [thunk, immutableStateInvariant, serializableStateInvariant]
// default middleware in prod mode: [thunk]
// https://redux-toolkit.js.org/api/getDefaultMiddleware#included-default-middleware

export const store = configureStore({
  reducer: {
    auth,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type StoreType = typeof store
