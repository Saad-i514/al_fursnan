import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verify() {
  console.log('🔍 Verifying database seed...\n');

  const userCount = await prisma.user.count();
  console.log(`✅ Users: ${userCount}`);

  const serviceCount = await prisma.service.count();
  console.log(`✅ Services: ${serviceCount}`);
  
  const services = await prisma.service.findMany({
    orderBy: { displayOrder: 'asc' },
    select: { title: true, displayOrder: true }
  });
  services.forEach(s => console.log(`   - ${s.displayOrder}. ${s.title}`));

  const teamCount = await prisma.teamMember.count();
  console.log(`\n✅ Team Members: ${teamCount}`);
  
  const team = await prisma.teamMember.findMany({
    select: { role: true, name: true }
  });
  team.forEach(t => console.log(`   - ${t.role}: ${t.name}`));

  console.log('\n🎉 Database verification complete!');
}

verify()
  .catch((e) => {
    console.error('❌ Error verifying database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
