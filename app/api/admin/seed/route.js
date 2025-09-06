import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Use singleton pattern for Prisma client
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(request) {
  try {
    console.log('🌱 Starting database seeding...');

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findFirst({
      where: { email: 'admin@farmnet.com' }
    });

    if (existingAdmin) {
      return NextResponse.json({
        success: true,
        message: 'Admin user already exists',
        data: { email: existingAdmin.email }
      });
    }

    // Hash the admin password from environment variable
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    // Create admin user
    const admin = await prisma.admin.create({
      data: {
        email: 'admin@farmnet.com',
        password: hashedPassword,
        name: 'System Administrator',
        role: 'SUPER_ADMIN',
      }
    });

    console.log('✅ Admin user created:', admin.email);

    // Create some sample market data for testing
    await prisma.marketData.createMany({
      data: [
        {
          productName: 'Rice',
          category: 'Grains',
          averagePrice: 45000,
          marketLocation: 'Lagos, Mile 12 Market',
          priceDate: new Date(),
          quality: 'Grade A',
          source: 'Market Research'
        },
        {
          productName: 'Tomato',
          category: 'Vegetables',
          averagePrice: 8000,
          marketLocation: 'Kano, Dawanau Market',
          priceDate: new Date(),
          quality: 'Premium',
          source: 'Field Reports'
        },
        {
          productName: 'Yam',
          category: 'Tubers',
          averagePrice: 2500,
          marketLocation: 'Abuja, Wuse Market',
          priceDate: new Date(),
          quality: 'Standard',
          source: 'Market Survey'
        }
      ]
    });

    console.log('✅ Sample market data created');
    console.log('🎉 Database seeding completed!');

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      data: {
        adminEmail: 'admin@farmnet.com',
        adminPassword: adminPassword,
        sampleDataCount: 3
      }
    });

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Database seeding failed',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to seed database.' },
    { status: 405 }
  );
}