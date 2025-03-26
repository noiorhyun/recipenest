import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';

const adminHandler = async (request, { user }) => {
  if (user.role !== 'admin') {
    return NextResponse.json(
      { error: '权限不足' },
      { status: 403 }
    );
  }

  return NextResponse.json({
    adminData: '这是管理员专属数据'
  });
};

export const GET = withAuth(adminHandler);
