import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ExampleType {
  message: string
}

export const initialState: ExampleType = {
  message: '',
}

export const ExampleSlice = createSlice({
  initialState,
  name: 'example',
  reducers: {
    receiveExample: (state, action: PayloadAction<ExampleType>) => {
      const { message } = action.payload
      state.message = message
    },
  },
})

export const { reducer } = ExampleSlice
