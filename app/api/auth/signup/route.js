import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { connectMongoose } from '@/lib/dbConnect'
import User from '@/models/User'

export async function POST(request) {
  try {
    // Initialize Mongoose connection
    await connectMongoose()
    
    // Verify connection
    await mongoose.connection.db.command({ ping: 1 })
    console.log('✅ Mongoose connection active')

    const { name, email, password } = await request.json()

    // Check for existing user with timeout
    const existingUser = await User.findOne({ email })
      .maxTimeMS(5000)
      .lean()
      .exec()

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Create new user
    const user = await User.create({ name, email, password })
    const { password: _, ...userData } = user.toObject()

    return NextResponse.json(
      { user: userData },
      { status: 201 }
    )

  } catch (error) {
    console.error('❌ Signup Error:', error)
    return NextResponse.json(
      { 
        error: 'Registration failed',
        details: process.env.NODE_ENV === 'development' ? error.message : null
      },
      { status: 500 }
    )
  }
}