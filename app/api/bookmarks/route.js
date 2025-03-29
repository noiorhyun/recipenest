import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Bookmark from '@/models/Bookmark'

export async function GET(request) {
  await dbConnect()
  const userId = request.headers.get('x-user-id')
  
  const bookmarks = await Bookmark.find({ user: userId }).populate('recipe')
  return NextResponse.json(bookmarks)
}

export async function POST(request) {
  await dbConnect()
  const { recipeId } = await request.json()
  const userId = request.headers.get('x-user-id')
  
  const bookmark = await Bookmark.create({ user: userId, recipe: recipeId })
  return NextResponse.json(bookmark, { status: 201 })
}
  