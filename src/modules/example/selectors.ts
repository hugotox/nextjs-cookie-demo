import { RootState } from 'modules/app'
import { compose } from 'redux'

export const selectExample = (state: RootState) => {
  return state.example
}

export const selectSelectExampleMessage = compose((example) => example.message, selectExample)
