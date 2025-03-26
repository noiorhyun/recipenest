import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'

export async function POST(request) {
  await dbConnect()
  const { email, password } = await request.json()
  
  // Add your authentication logic
  const user = await User.findOne({ email })
  
  if (!user) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }
  
  return NextResponse.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  })
}