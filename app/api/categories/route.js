import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Recipe from '@/models/Recipe'

export async function GET() {
  try {
    await dbConnect()
    
    const categories = await Recipe.distinct('categories')
    return NextResponse.json(categories)

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
