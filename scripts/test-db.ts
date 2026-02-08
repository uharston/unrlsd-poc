import 'dotenv/config';
import { prisma } from '../lib/prisma';

async function main() {
  // Create a test user
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
    },
  });
  
  console.log('Created user:', user);
  
  // Query all users
  const users = await prisma.user.findMany();
  console.log('All users:', users);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());