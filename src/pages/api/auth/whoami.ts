import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

import { JWT_KEY } from 'settings'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { token } = req.body
    let user
    try {
      user = jwt.verify(token, JWT_KEY)
    } catch (e) {}

    if (typeof user === 'object') {
      return res.status(200).send(user)
    }
    return res.status(404).send('Nothing here')
  }
  return res.status(404).send('Nothing here')
}
