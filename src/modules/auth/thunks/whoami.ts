import { AppDispatch } from 'modules/app'
import { receiveAuthData } from 'modules/auth'

interface WhoAmI {
  baseUrl?: string
  token: string
}

export const whoAmI = ({ baseUrl = '', token }: WhoAmI) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`${baseUrl}/api/auth/whoami`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
    const user = await response.json()
    dispatch(receiveAuthData({ user }))
    return user
  } catch {}
}
