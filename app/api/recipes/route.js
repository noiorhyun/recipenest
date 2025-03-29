import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Recipe from '@/models/Recipe'
import { verifyToken } from '@/lib/auth'

// post a new recipe
export async function POST(request) {
  try {
    await dbConnect();
    
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required in x-user-id header" },
        { status: 400 }
      );
    }

    const recipeData = await request.json();
    
    const newRecipe = await Recipe.create({
      ...recipeData,
      user: userId 

    return NextResponse.json(newRecipe, { status: 201 });
    
  } catch (error) {
    console.error("Detailed error:", {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { error: error.message }, 
      { status: 500 }
    );
  }
}


// get recipes
export async function GET(request) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    
    const recipes = await Recipe.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    })
    .sort({ createdAt: -1 })
    .limit(20)
    
    return NextResponse.json(recipes)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    )
  }
}