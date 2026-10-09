import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../apps/api/src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is required to sync EDS La Fortaleza.');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const technologies = [
  'JavaScript',
  'Node.js',
  'Express',
  'EJS',
  'MySQL',
  'HTML5',
  'CSS3',
  'Railway',
];

async function main(): Promise<void> {
  const project = await prisma.project.update({
    where: { slug: 'fortaleza-app' },
    data: {
      title: 'Gestión administrativa EDS Combustibles',
      repositoryUrl: 'https://github.com/edwguro/EDS-LA-FORTALEZA',
      screenshots: [
        '/images/projects/eds-la-fortaleza-showcase.png',
        '/images/projects/eds-la-fortaleza-dashboard.png',
      ],
      technologies: {
        deleteMany: {},
        create: technologies.map((name, sortOrder) => ({ name, sortOrder })),
      },
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
