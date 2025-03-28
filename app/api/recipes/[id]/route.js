import { NextResponse } from 'next/server';
import { validateRecipeOwnership } from '@/lib/apiMiddleware';
import dbConnect from '@/lib/dbConnect'
import Recipe from '@/models/Recipe'

export async function GET(request, { params }) {
  try {
    await dbConnect()
    
    // Validate recipe ID format
    if (!params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: 'Invalid recipe ID format' },
        { status: 400 }
      )
    }

    const recipe = await Recipe.findById(params.id)
      .populate('user', 'name email')
    
    if (!recipe) {
      return NextResponse.json(
        { error: 'Recipe not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(recipe)
  } catch (error) {
    console.error('Error fetching recipe:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request, { params }) {
    try {
      await dbConnect()
      
      const userId = request.headers.get('x-user-id')
      const updates = await request.json()
  
      const recipe = await Recipe.findOneAndUpdate(
        { _id: params.id, user: userId },
        updates,
        { new: true }
      )
  
      if (!recipe) {
        return NextResponse.json(
          { error: 'Recipe not found or unauthorized' },
          { status: 404 }
        )
      }

      return NextResponse.json(recipe)

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update recipe' },
      { status: 500 }
    )
  }
}


export async function DELETE(request, { params }) {
    try {
      await dbConnect()
      
      const userId = request.headers.get('x-user-id')
      
      const recipe = await Recipe.findOneAndDelete({
        _id: params.id,
        user: userId
      })
  
      if (!recipe) {
        return NextResponse.json(
          { error: 'Recipe not found or unauthorized' },
          { status: 404 }
        )
      }
  
      return NextResponse.json(
        { message: 'Recipe deleted successfully' },
        { status: 200 }
      )

    } catch (error) {
        return NextResponse.json(
          { error: 'Failed to delete recipe' },
          { status: 500 }
        )
      }
    }      