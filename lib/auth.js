import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET

export function generateToken(userId) {
  return jwt.sign({ userId }, SECRET, { expiresIn: '1d' })
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET)
}

// New version that modifies the response directly
export function setAuthCookie(response, token) {
  response.cookies.set('token', token, {
    httpOnly: true,
    maxAge: 86400, // 1 day
    sameSite: 'strict',
    path: '/',
    secure: process.env.NODE_ENV === 'production'
  })
  return response
}