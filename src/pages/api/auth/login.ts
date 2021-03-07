import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body
    if (username === 'test' && password === '123456') {
      res.status(200).send('ok')
    } else {
      res.status(401).send('invalid login credentials')
    }
  } else {
    // Handle any other HTTP method
    res.status(404).send('Nothing here')
  }
}
