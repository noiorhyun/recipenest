import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'

export async function GET(request, { params }) {
  await dbConnect()
  const user = await User.findById(params.id)
    .select('-password')
    .populate('recipes')
    
  return NextResponse.json(user)
}