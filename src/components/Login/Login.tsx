import React, { useState } from 'react'

import { useAppDispatch } from 'modules/app'
import { login } from 'modules/auth/thunks'

export const Login = () => {
  const [username, setUsername] = useState('test')
  const [password, setPassword] = useState('password')
  const dispatch = useAppDispatch()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(login({ username, password })).catch(() => {})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            value={username}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
          />
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
      <style jsx>{`
        label,
        input {
          display: block;
        }
        .field {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  )
}
