import { NextResponse } from 'next/server'
import { verifyToken } from './auth'

export async function middleware(req) {
  // Option 1: Cookie-based (if you prefer cookies)
  const token = req.cookies.get('token')?.value
  
  // Option 2: Header-based (more standard for APIs)
  // const authHeader = req.headers.get('authorization')
  // const token = authHeader?.split(' ')[1]

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' }, 
      { status: 401 }
    )
  }

  try {
    const decoded = verifyToken(token)
    // Add user ID to request headers for backend routes
    const headers = new Headers(req.headers)
    headers.set('x-user-id', decoded.userId)
    
    return NextResponse.next({
      request: { headers }
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    )
  }
}

export const config = {
    matcher: [
      '/api/recipes', 
      '/api/recipes/:id*',
      '/api/bookmarks'
    ]
  }