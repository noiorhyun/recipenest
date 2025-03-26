import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '../../../models/User.js';
import dbConnect from '@/lib/dbConnect';

export async function POST(request) {
  await dbConnect();
  
  const { email, password } = await request.json();
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return NextResponse.json(
      { error: '邮箱或密码错误' },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  const response = NextResponse.json({
    _id: user._id,
    username: user.username,
    email: user.email
  });

  // 设置HttpOnly Cookie
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 86400 // 1天
  });

  return response;
}