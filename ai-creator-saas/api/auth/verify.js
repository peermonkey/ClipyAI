import { query } from '../../lib/db.js'
import { verifyToken, extractTokenFromHeader } from '../../lib/auth.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const authHeader = req.headers.authorization
    const token = extractTokenFromHeader(authHeader)
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }
    
    const decoded = verifyToken(token)
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' })
    }
    
    // Get fresh user data from database
    const users = query('SELECT * FROM users WHERE id = ? AND email = ?', [decoded.userId, decoded.email])
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'User not found' })
    }
    
    const user = users[0]
    
    // Return user data (excluding password hash)
    res.status(200).json({
      valid: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        creatorType: user.creator_type,
        creditsBalance: user.credits_balance,
        subscriptionPlan: user.subscription_plan,
        lastLogin: user.last_login
      }
    })
    
  } catch (error) {
    console.error('Token verification error:', error)
    res.status(401).json({ error: 'Token verification failed' })
  }
}
