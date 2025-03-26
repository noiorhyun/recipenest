import { NextResponse } from 'next/server'

// Basic template for all endpoints
export async function GET() {
  return NextResponse.json({ 
    status: 'success',
    data: null,
    message: 'Endpoint working' 
  })
}