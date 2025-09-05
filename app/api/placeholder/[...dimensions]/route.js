import { NextRequest, NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const { dimensions } = resolvedParams;
    const [width, height] = dimensions.join('/').split('/').map(d => parseInt(d) || 400);
    
    // Create a simple SVG placeholder
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <rect x="20%" y="20%" width="60%" height="60%" fill="#e5e7eb" rx="8"/>
        <circle cx="35%" cy="35%" r="8%" fill="#d1d5db"/>
        <rect x="45%" y="30%" width="40%" height="4%" fill="#d1d5db" rx="2"/>
        <rect x="45%" y="40%" width="30%" height="4%" fill="#d1d5db" rx="2"/>
        <rect x="45%" y="50%" width="35%" height="4%" fill="#d1d5db" rx="2"/>
        <text x="50%" y="75%" text-anchor="middle" fill="#9ca3af" font-family="sans-serif" font-size="${Math.min(width, height) * 0.04}">
          ${width} × ${height}
        </text>
      </svg>
    `;
    
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
    
  } catch (error) {
    console.error('Error generating placeholder:', error);
    
    // Fallback to a simple colored rectangle
    const svg = `
      <svg width="400" height="225" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#e5e7eb"/>
        <text x="50%" y="50%" text-anchor="middle" fill="#6b7280" font-family="sans-serif" font-size="16">
          Image Not Found
        </text>
      </svg>
    `;
    
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
}