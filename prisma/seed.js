const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findFirst({
    where: { email: 'admin@farmnet.com' }
  });

  if (existingAdmin) {
    console.log('👤 Admin user already exists');
    return;
  }

  // Hash the admin password
  const hashedPassword = await bcrypt.hash('F@RmN3t@dmin25', 12);

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
  console.log('📧 Admin Email: admin@farmnet.com');
  console.log('🔑 Admin Password: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });