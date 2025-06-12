import { query } from '../../lib/db.js'
import { comparePassword, generateToken, validateEmail } from '../../lib/auth.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Find user by email
    const users = query('SELECT * FROM users WHERE email = ?', [email])
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const user = users[0]

    // Verify password
    if (!comparePassword(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Generate JWT token
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      creatorType: user.creator_type
    }
    
    const token = generateToken(tokenPayload)

    // Update last login
    query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [user.id])

    // Return success response (don't include password hash)
    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        creatorType: user.creator_type,
        creditsBalance: user.credits_balance,
        subscriptionPlan: user.subscription_plan,
        lastLogin: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
