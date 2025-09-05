import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Use singleton pattern for Prisma client
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Update ID is required' },
        { status: 400 }
      );
    }
    
    // Fetch the specific market update
    const marketUpdate = await prisma.marketUpdate.findFirst({
      where: {
        id,
        status: 'APPROVED' // Only show approved updates
      }
    });
    
    if (!marketUpdate) {
      return NextResponse.json(
        { success: false, error: 'Market update not found or not approved' },
        { status: 404 }
      );
    }
    
    // Fetch related updates (same commodity, different update)
    const relatedUpdates = await prisma.marketUpdate.findMany({
      where: {
        status: 'APPROVED',
        commodity: marketUpdate.commodity,
        id: { not: id } // Exclude current update
      },
      orderBy: { createdAt: 'desc' },
      take: 4,
      select: {
        id: true,
        title: true,
        commodity: true,
        location: true,
        price: true,
        unit: true,
        type: true,
        videoThumbnail: true,
        images: true,
        viewCount: true,
        createdAt: true
      }
    });
    
    return NextResponse.json({
      success: true,
      data: {
        update: marketUpdate,
        relatedUpdates
      },
      message: 'Market update fetched successfully'
    });

  } catch (error) {
    console.error('Error fetching market update details:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch market update details',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// PUT endpoint to increment view count for this specific update
export async function PUT(request, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Update ID is required' },
        { status: 400 }
      );
    }
    
    // Increment view count
    const updatedMarketUpdate = await prisma.marketUpdate.update({
      where: { 
        id,
        status: 'APPROVED' // Only increment for approved updates
      },
      data: {
        viewCount: {
          increment: 1
        }
      },
      select: {
        id: true,
        viewCount: true,
        title: true
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