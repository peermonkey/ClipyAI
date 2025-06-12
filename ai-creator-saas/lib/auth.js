import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

export function hashPassword(password) {
  return bcrypt.hashSync(password, 12)
}

export function comparePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword)
}

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export function extractTokenFromHeader(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
}

export function requireAuth(handler) {
  return async (req, res) => {
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
      
      // Add user info to request
      req.user = decoded
      
      return handler(req, res)
    } catch (error) {
      console.error('Auth middleware error:', error)
      return res.status(401).json({ error: 'Authentication failed' })
    }
  }
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password) {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}
