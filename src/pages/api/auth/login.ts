import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

import { JWT_EXPIRES, JWT_KEY } from 'settings'

// Example login handler with hardcoded creds:
// username: "test", password: "password"
// For production you need a real database or a real auth system
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body
    if (username === 'test') {
      const match = await bcrypt.compare(
        password,
        '$2y$10$mj1OMFvVmGAR4gEEXZGtA.R5wYWBZTis72hSXzpxEs.QoXT3ifKSq' // password is "password"
      )

      if (match) {
        const user = {
          firstName: 'Test',
          lastName: 'Smith',
          username,
        }

        return jwt.sign(
          user,
          JWT_KEY,
          {
            expiresIn: JWT_EXPIRES,
          },
          (err, token) => {
            if (!err && token) {
              /* Send success with token */
              return res.status(200).send({
                success: true,
                token,
                user,
              })
            } else {
              return res.status(400).send({ error: 'Invalid login credentials' })
            }
          }
        )
      } else {
        return res.status(400).send({ error: 'Invalid login credentials' })
      }
    } else {
      return res.status(400).send({ error: 'Invalid login credentials' })
    }
  } else {
    // Handle any other HTTP method
    return res.status(404).send('Nothing here')
  }
}
