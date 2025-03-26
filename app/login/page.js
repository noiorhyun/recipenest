// app/api/auth/login/route.js
import { NextResponse } from 'next/server'
import { connectMongoose } from '@/lib/dbConnect'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    await connectMongoose()
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

    const { password: _, ...userData } = user.toObject()
    return NextResponse.json({ user: userData })

  } catch (error) {
    console.error('Login Error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}