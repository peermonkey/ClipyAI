import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message?: string
  token?: string
  user?: {
    id: string
    name: string
    email: string
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password } = req.body

  // Simple mock authentication
  if (email === 'demo@clipmagic.com' && password === 'demo123') {
    return res.status(200).json({
      message: 'Login successful',
      token: 'mock-jwt-token',
      user: {
        id: '1',
        name: 'Demo Creator',
        email: 'demo@clipmagic.com'
      }
    })
  }

  return res.status(401).json({ message: 'Invalid credentials' })
}
