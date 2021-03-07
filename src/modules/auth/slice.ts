import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    user: 'anon',
    message: 'holaaa',
  },
  reducers: {
    receiveUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload
    },
  },
})

export const { receiveUser } = AuthSlice.actions
export const { reducer } = AuthSlice
