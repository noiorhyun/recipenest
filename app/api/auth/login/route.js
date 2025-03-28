import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { generateToken, setAuthCookie } from '@/lib/auth'

export async function POST(request) {
  try {
    await dbConnect()
    
    const { email, password } = await request.json()
    
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const token = generateToken(user._id)
    const { password: _, ...userData } = user.toObject()

    // Create response and set cookie in one operation
    const response = NextResponse.json({
      user: userData,
      token,
      userId: user._id 
    });
    
    return setAuthCookie(response, token)

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}