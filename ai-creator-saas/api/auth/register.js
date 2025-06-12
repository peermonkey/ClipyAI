import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../../lib/db.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, password, creatorType } = req.body

    // Validation
    if (!name || !email || !password || !creatorType) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' })
    }

    // Hash password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Create new user
    const newUser = new User({
      name,
      email,
      password_hash: passwordHash,
      creator_type: creatorType,
      credits_balance: 150
    })

    const savedUser = await newUser.save()

    // Generate JWT token
    const token = jwt.sign(
      { userId: savedUser._id, email },
      process.env.JWT_SECRET || 'My-Secret-333',
      { expiresIn: '7d' }
    )

    // Return user data (excluding password hash) and token
    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: savedUser._id,
        name,
        email,
        creatorType,
        creditsBalance: 150
      },
      token
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Internal server error', details: error.message })
  }
}
