import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/User';

// 适用于 App Router 的认证包装器
export const withAuth = (handler) => async (request) => {
  const token = request.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json(
      { error: '未授权 - 缺少Token' },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      );
    }

    // 添加用户信息到请求头（供后续使用）
    const headers = new Headers(request.headers);
    headers.set('x-user-id', user._id.toString());
    headers.set('x-user-role', user.role || 'user');

    return handler(request, { user });
  } catch (error) {
    return NextResponse.json(
      { error: '未授权 - Token无效' },
      { status: 401 }
    );
  }
};

// 直接验证Token的快捷方法
export const verifyToken = async (request) => {
  const token = request.headers.get('authorization')?.split(' ')[1];
  if (!token) throw new Error('未授权');
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId).select('-password');
  if (!user) throw new Error('用户不存在');
  
  return user;
};