import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { getRolenamebyUserId } from '../controllers/usersControllers.js'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

export const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  jwt.verify(token, JWT_SECRET, (error, payload) => {
    if (error) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    req.userId = payload.id
    next()
  })
}

export const requireRole = (allowedRoles = []) => {
  const normalizedRoles = allowedRoles.map((role) => String(role).toLowerCase())

  return async (req, res, next) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      const result = await getRolenamebyUserId(req.userId)
      const role = result[0]?.role

      if (!role || !normalizedRoles.includes(String(role).toLowerCase())) {
        return res.status(403).json({ message: 'Forbidden' })
      }

      req.userRole = role
      next()
    } catch (error) {
      next(error)
    }
  }
}
