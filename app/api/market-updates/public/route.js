import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Use singleton pattern for Prisma client
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search') || '';
    const commodity = searchParams.get('commodity') || '';
    const type = searchParams.get('type') || ''; // VIDEO, TEXT_WITH_IMAGES
    const location = searchParams.get('location') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt'; // createdAt, viewCount, approvedAt
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    // Calculate offset for pagination
    const offset = (page - 1) * limit;
    
    // Build where clause
    const whereClause = {
      status: 'APPROVED', // Only show approved updates
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { commodity: { contains: search, mode: 'insensitive' } },
          { location: { contains: search, mode: 'insensitive' } }
        ]
      }),
      ...(commodity && { commodity: { contains: commodity, mode: 'insensitive' } }),
      ...(type && { type }),
      ...(location && { location: { contains: location, mode: 'insensitive' } })
    };
    
    // Fetch market updates with pagination
    const [marketUpdates, totalCount] = await Promise.all([
      prisma.marketUpdate.findMany({
        where: whereClause,
        orderBy: { [sortBy]: sortOrder },
        skip: offset,
        take: limit,
        select: {
          id: true,
          title: true,
          description: true,
          type: true,
          commodity: true,
          location: true,
          price: true,
          unit: true,
          videoUrl: true,
          videoThumbnail: true,
          videoDuration: true,
          images: true,
          submittedBy: true,
          submitterContact: true,
          viewCount: true,
          createdAt: true,
          approvedAt: true,
          approvedBy: true
        }
      }),
      prisma.marketUpdate.count({ where: whereClause })
    ]);
    
    // Get unique commodities for filtering (only from approved updates)
    const uniqueCommodities = await prisma.marketUpdate.findMany({
      where: { status: 'APPROVED' },
      select: { commodity: true },
      distinct: ['commodity'],
      orderBy: { commodity: 'asc' }
    });
    
    // Get unique locations for filtering (only from approved updates)
    const uniqueLocations = await prisma.marketUpdate.findMany({
      where: { status: 'APPROVED' },
      select: { location: true },
      distinct: ['location'],
      orderBy: { location: 'asc' }
    });
    
    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;
    
    return NextResponse.json({
      success: true,
      data: {
        updates: marketUpdates,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          limit,
          hasNextPage,
          hasPreviousPage
        },
        filters: {
          commodities: uniqueCommodities.map(item => item.commodity),
          locations: uniqueLocations.map(item => item.location)
        }
      },
      message: 'Market updates fetched successfully'
    });

  } catch (error) {
    console.error('Error fetching public market updates:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch market updates',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// POST endpoint to increment view count
export async function POST(request) {
  try {
    const { updateId } = await request.json();
    
    if (!updateId) {
      return NextResponse.json(
        { success: false, error: 'Update ID is required' },
        { status: 400 }
      );
    }
    
    // Increment view count
    const updatedMarketUpdate = await prisma.marketUpdate.update({
      where: { 
        id: updateId,
        status: 'APPROVED' // Only increment for approved updates
      },
      data: {
        viewCount: {
          increment: 1
        }
      },
      select: {
        id: true,
        viewCount: true
      }
    });
    
    return NextResponse.json({
      success: true,
      data: updatedMarketUpdate,
      message: 'View count updated successfully'
    });

  } catch (error) {
    console.error('Error updating view count:', error);
    
    // Handle case where update doesn't exist or isn't approved
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'Market update not found or not approved' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update view count',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}