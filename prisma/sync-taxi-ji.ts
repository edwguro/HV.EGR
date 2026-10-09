import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../apps/api/src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is required to sync Taxi Ji.');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main(): Promise<void> {
  const project = await prisma.project.update({
    where: { slug: 'taxi-ji' },
    data: {
      repositoryUrl: 'https://github.com/edwguro/taxi-ji',
      screenshots: ['/images/projects/taxi-ji-showcase-v2.png'],
    },
  });

  console.log(`Proyecto actualizado: ${project.title}`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
