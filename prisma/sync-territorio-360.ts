import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../apps/api/src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is required to sync Territorio 360.');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const technologies = [
  'TypeScript',
  'React',
  'Node.js',
  'PostgreSQL',
  'Leaflet',
  'OpenStreetMap',
];

async function main(): Promise<void> {
  const project = await prisma.project.update({
    where: { slug: 'territorio-360' },
    data: {
      category: 'Inteligencia territorial',
      description:
        'Aplicación web orientada al análisis territorial y la toma de decisiones. Integra navegación institucional, búsqueda de vistas, lectura geográfica de puntos críticos y módulos para patrones, escenarios, redes y memoria territorial. El detalle del proyecto incorporará una demostración en video de su flujo de uso.',
      screenshots: ['/images/projects/territorio-360-showcase.png'],
      summary:
        'Plataforma de inteligencia territorial para visualizar patrones, escenarios, actores y puntos críticos sobre un mapa analítico.',
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
