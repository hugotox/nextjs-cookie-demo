import React, { useCallback, useState } from 'react'
import { LayoutContainer } from 'components/layout/LayoutContainer'

interface Props {
  login: (username: string, password: string) => void
}

export const Login = ({ login }: Props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      login(username, password)
    },
    [login, password, username]
  )
  return (
    <LayoutContainer>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    </LayoutContainer>
  )
}
