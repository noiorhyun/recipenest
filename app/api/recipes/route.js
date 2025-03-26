import { NextResponse } from 'next/server';
import { validateRecipeOwnership } from '@/lib/apiMiddleware';

export async function GET(request, { params }) {
  try {
    const { recipe, headers } = await validateRecipeOwnership(request, params.id);
    return NextResponse.json(recipe, { headers });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.message.includes('授权') ? 401 : 403 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { recipe, headers } = await validateRecipeOwnership(request, params.id);
    await recipe.deleteOne();
    return NextResponse.json(
      { success: true },
      { headers }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.message.includes('授权') ? 401 : 403 }
    );
  }
}