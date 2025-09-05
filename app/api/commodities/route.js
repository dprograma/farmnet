import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const includeCategories = searchParams.get('includeCategories') === 'true';
    const activeOnly = searchParams.get('activeOnly') !== 'false'; // Default to true

    // If includeCategories is requested, return categories with their commodities
    if (includeCategories) {
      const categories = await prisma.commodityCategory.findMany({
        where: activeOnly ? { isActive: true } : undefined,
        include: {
          commodities: {
            where: activeOnly ? { isActive: true } : undefined,
            orderBy: { sortOrder: 'asc' }
          }
        },
        orderBy: { sortOrder: 'asc' }
      });

      return NextResponse.json({
        success: true,
        data: categories,
        message: 'Categories with commodities fetched successfully'
      });
    }

    // If categoryId is provided, return commodities for that category only
    if (categoryId) {
      const commodities = await prisma.commodity.findMany({
        where: {
          categoryId,
          ...(activeOnly && { isActive: true })
        },
        include: {
          category: true
        },
        orderBy: { sortOrder: 'asc' }
      });

      return NextResponse.json({
        success: true,
        data: commodities,
        message: 'Commodities fetched successfully'
      });
    }

    // Return all commodities with their categories
    const commodities = await prisma.commodity.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      include: {
        category: true
      },
      orderBy: [
        { category: { sortOrder: 'asc' } },
        { sortOrder: 'asc' }
      ]
    });

    return NextResponse.json({
      success: true,
      data: commodities,
      message: 'All commodities fetched successfully'
    });

  } catch (error) {
    console.error('Error fetching commodities:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch commodities',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST endpoint for creating new commodities (admin only)
export async function POST(request) {
  try {
    const { name, categoryId, description, aliases = [], units = [] } = await request.json();

    // Basic validation
    if (!name || !categoryId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name and categoryId are required'
        },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await prisma.commodityCategory.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category not found'
        },
        { status: 404 }
      );
    }

    // Check if commodity already exists in this category
    const existingCommodity = await prisma.commodity.findFirst({
      where: {
        name,
        categoryId
      }
    });

    if (existingCommodity) {
      return NextResponse.json(
        {
          success: false,
          error: 'Commodity already exists in this category'
        },
        { status: 409 }
      );
    }

    // Get the highest sort order for this category
    const lastCommodity = await prisma.commodity.findFirst({
      where: { categoryId },
      orderBy: { sortOrder: 'desc' }
    });

    const sortOrder = lastCommodity ? lastCommodity.sortOrder + 1 : 1;

    // Create the commodity
    const commodity = await prisma.commodity.create({
      data: {
        name,
        categoryId,
        description,
        aliases,
        units,
        sortOrder,
        isActive: true
      },
      include: {
        category: true
      }
    });

    return NextResponse.json({
      success: true,
      data: commodity,
      message: 'Commodity created successfully'
    });

  } catch (error) {
    console.error('Error creating commodity:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create commodity',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}