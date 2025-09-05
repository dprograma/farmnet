import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeCommodities = searchParams.get('includeCommodities') === 'true';
    const activeOnly = searchParams.get('activeOnly') !== 'false'; // Default to true

    const categories = await prisma.commodityCategory.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      include: includeCommodities ? {
        commodities: {
          where: activeOnly ? { isActive: true } : undefined,
          orderBy: { sortOrder: 'asc' }
        }
      } : undefined,
      orderBy: { sortOrder: 'asc' }
    });

    // Add commodity counts to each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const commodityCount = await prisma.commodity.count({
          where: {
            categoryId: category.id,
            ...(activeOnly && { isActive: true })
          }
        });

        return {
          ...category,
          commodityCount
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: categoriesWithCounts,
      message: 'Categories fetched successfully'
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch categories',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST endpoint for creating new categories (admin only)
export async function POST(request) {
  try {
    const { name, description, icon } = await request.json();

    // Basic validation
    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name is required'
        },
        { status: 400 }
      );
    }

    // Check if category already exists
    const existingCategory = await prisma.commodityCategory.findUnique({
      where: { name }
    });

    if (existingCategory) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category already exists'
        },
        { status: 409 }
      );
    }

    // Get the highest sort order
    const lastCategory = await prisma.commodityCategory.findFirst({
      orderBy: { sortOrder: 'desc' }
    });

    const sortOrder = lastCategory ? lastCategory.sortOrder + 1 : 1;

    // Create the category
    const category = await prisma.commodityCategory.create({
      data: {
        name,
        description,
        icon,
        sortOrder,
        isActive: true
      }
    });

    return NextResponse.json({
      success: true,
      data: category,
      message: 'Category created successfully'
    });

  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create category',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}