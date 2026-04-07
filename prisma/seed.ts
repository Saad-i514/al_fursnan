import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('mazhar@41900', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'alfursanorig@gmail.com' },
    update: { password: hashedPassword },
    create: {
      email: 'alfursanorig@gmail.com',
      password: hashedPassword,
    },
  });
  // Also remove old admin if exists
  await prisma.user.deleteMany({
    where: { email: 'admin@alfursan.com' },
  }).catch(() => {});
  console.log('✅ Admin user created:', admin.email);

  // Create services
  const services = [
    {
      title: 'AI Solutions',
      description: 'Custom artificial intelligence implementations tailored to your business needs. From machine learning models to intelligent automation systems.',
      icon: 'ai-brain',
      displayOrder: 1,
    },
    {
      title: 'AI Automations',
      description: 'Streamline your workflows with intelligent automation. Reduce manual tasks and increase efficiency with AI-powered solutions.',
      icon: 'automation',
      displayOrder: 2,
    },
    {
      title: 'SAAS Products',
      description: 'End-to-end Software as a Service development. Scalable, secure, and user-friendly cloud-based applications.',
      icon: 'cloud',
      displayOrder: 3,
    },
    {
      title: 'Website Solutions',
      description: 'Modern, responsive websites built with cutting-edge technologies. From landing pages to complex web applications.',
      icon: 'web',
      displayOrder: 4,
    },
    {
      title: 'Mobile Applications',
      description: 'Native and cross-platform mobile apps for iOS and Android. Beautiful interfaces with seamless user experiences.',
      icon: 'mobile',
      displayOrder: 5,
    },
    {
      title: 'Chatbots',
      description: 'Intelligent conversational AI for customer support, lead generation, and user engagement. Available 24/7.',
      icon: 'chat',
      displayOrder: 6,
    },
  ];

  // Clean duplicate services first, keep only one per title
  const allServices = await prisma.service.findMany({ orderBy: { createdAt: 'asc' } });
  const seen = new Set<string>();
  for (const s of allServices) {
    if (seen.has(s.title)) {
      await prisma.service.delete({ where: { id: s.id } });
    } else {
      seen.add(s.title);
    }
  }

  // Upsert services using title-based lookup
  for (const service of services) {
    const existing = await prisma.service.findFirst({ where: { title: service.title } });
    if (existing) {
      await prisma.service.update({ where: { id: existing.id }, data: service });
    } else {
      await prisma.service.create({ data: service });
    }
    console.log('✅ Service upserted:', service.title);
  }

  // Create team members
  const ceo = await prisma.teamMember.upsert({
    where: { role: 'CEO' },
    update: {},
    create: {
      role: 'CEO',
      name: 'Muhammad Saad',
      imageUrl: null,
    },
  });
  console.log('✅ CEO created:', ceo.name);

  const founder = await prisma.teamMember.upsert({
    where: { role: 'FOUNDER' },
    update: {},
    create: {
      role: 'FOUNDER',
      name: 'Muhammad Saad',
      imageUrl: null,
    },
  });
  console.log('✅ Founder created:', founder.name);

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
