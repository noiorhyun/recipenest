import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import Recipe from '@/models/Recipe';

// 新版请求对象适配
export async function authenticateRequest(request) {
  const token = await getToken({ 
    req: {
      headers: Object.fromEntries(request.headers.entries()),
      cookies: Object.fromEntries(request.cookies.entries())
    } 
  });

  if (!token) {
    throw new Error('未授权');
  }
  
  // 将用户信息注入头部
  const headers = new Headers(request.headers);
  headers.set('x-user-id', token.userId);
  
  return {
    token,
    headers
  };
}

// 食谱所有权验证
export async function validateRecipeOwnership(request, recipeId) {
  const { token, headers } = await authenticateRequest(request);
  const recipe = await Recipe.findById(recipeId);
  
  if (!recipe) throw new Error('食谱不存在');
  if (recipe.user.toString() !== token.userId) {
    throw new Error('无权操作此食谱');
  }
  
  return { recipe, headers };
}