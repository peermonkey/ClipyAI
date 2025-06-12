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

  const { name, email, password } = req.body

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' })
  }

  // Mock successful signup
  return res.status(201).json({
    message: 'Account created successfully',
    token: 'mock-jwt-token',
    user: {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email
    }
  })
}
