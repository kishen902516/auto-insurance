import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@motor-insurance.my' },
    update: {},
    create: {
      email: 'admin@motor-insurance.my',
      phone: '+60123456789',
      fullName: 'System Administrator',
      role: UserRole.admin,
      verifiedAt: new Date(),
    },
  });

  // Create support user
  const supportUser = await prisma.user.upsert({
    where: { email: 'support@motor-insurance.my' },
    update: {},
    create: {
      email: 'support@motor-insurance.my',
      phone: '+60123456788',
      fullName: 'Support Agent',
      role: UserRole.support,
      verifiedAt: new Date(),
    },
  });

  // Create test customer
  const customerUser = await prisma.user.upsert({
    where: { email: 'test.customer@example.com' },
    update: {},
    create: {
      email: 'test.customer@example.com',
      phone: '+60123456787',
      fullName: 'Test Customer',
      role: UserRole.customer,
      verifiedAt: new Date(),
    },
  });

  console.log('Database seeded successfully');
  console.log({ adminUser, supportUser, customerUser });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });