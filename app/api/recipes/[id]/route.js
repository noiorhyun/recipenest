import { NextResponse } from 'next/server';
import { validateRecipeOwnership } from '@/lib/apiMiddleware';

export async function DELETE(request, { params }) {
  try {
    const recipe = await validateRecipeOwnership(request, params.id);
    await recipe.remove();
    return NextResponse.json({ success: true });
    
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.message.includes('授权') ? 401 : 403 }
    );
  }
}