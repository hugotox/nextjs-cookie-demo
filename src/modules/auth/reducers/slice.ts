import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserType {
  username?: string
  firstName?: string
  lastName?: string
  email?: string
}
export interface AuthSliceType {
  user: UserType | null
}

export const initialState: AuthSliceType = {
  user: null,
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    receiveAuthData: (state, action: PayloadAction<AuthSliceType>) => {
      const { user } = action.payload
      state.user = user
    },
  },
})

export const { receiveAuthData } = AuthSlice.actions
export const { reducer } = AuthSlice
