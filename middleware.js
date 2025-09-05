import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Handle requests to /uploads/* - let Next.js try to serve them first
  // Only intercept when they would return 404
  if (pathname.startsWith('/uploads/')) {
    const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(pathname);
    const isVideo = /\.(mp4|avi|mov|webm|mkv)$/i.test(pathname);
    
    // For now, let Next.js handle all file requests normally
    // The error handling will be done in the frontend
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/uploads/:path*'
  ]
};