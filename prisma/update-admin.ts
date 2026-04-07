import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('mazhar@41900', 10);
  
  // Delete old admin
  await prisma.user.deleteMany({
    where: { email: 'admin@alfursan.com' }
  }).catch(() => {});

  // Upsert new admin
  const user = await prisma.user.upsert({
    where: { email: 'alfursanorig@gmail.com' },
    update: { password: hashedPassword },
    create: {
      email: 'alfursanorig@gmail.com',
      password: hashedPassword,
    },
  });

  console.log('✅ Admin updated:', user.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
