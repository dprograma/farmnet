import { NextRequest, NextResponse } from 'next/server';
import { validateAdminToken } from '../../../../lib/auth';

export async function GET(request) {
  try {
    // Try to get token from header or cookie
    const authHeader = request.headers.get('authorization');
    const cookieToken = request.cookies.get('admin_token')?.value;
    
    const token = authHeader?.replace('Bearer ', '') || cookieToken;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No authentication token provided' },
        { status: 401 }
      );
    }

    const result = await validateAdminToken(token);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      admin: result.admin
    });

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Token verification failed' },
      { status: 500 }
    );
  }
}