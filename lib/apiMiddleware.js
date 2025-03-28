import { NextResponse } from 'next/server'
import { verifyToken } from './auth'

export async function middleware(req) {
  const token = req.cookies.get('token')?.value

  if (token) {
    try {
      const decoded = verifyToken(token)
      const headers = new Headers(req.headers)
      headers.set('x-user-id', decoded.userId)

      return NextResponse.next({
        request: { headers }
      })
    } catch (err) {
      console.warn('Invalid token, but allowing public access.')
    }
  }

  // No token or invalid token: Allow public access
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/recipes', 
    '/api/recipes/:id*',
    '/api/bookmarks'
  ]
}
