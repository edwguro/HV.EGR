import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../apps/api/src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is required to sync Ganadería App.');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main(): Promise<void> {
  await prisma.project.deleteMany({
    where: { slug: { in: ['construcivil-app', 'backend-pedidos'] } },
  });

  const project = await prisma.project.update({
    where: { slug: 'ganaderia-app' },
    data: {
      category: 'Administración y salud ganadera',
      description:
        'Sistema web aplicado a la industria ganadera que organiza la información de cada ejemplar durante su ciclo productivo. Permite gestionar ganaderos y veterinarios, construir historias clínicas, registrar vacunas y tratamientos, controlar razas, pesos, reproducción, procesos de crianza y trazabilidad sanitaria. Su enfoque integra administración operativa y salud animal para facilitar decisiones oportunas, mejorar el control del hato y conservar un historial confiable de cada proceso.',
      screenshots: ['/images/projects/ganaderia-app-showcase-v1.png'],
      sortOrder: 5,
      summary:
        'Plataforma de administración y salud animal para centralizar historias clínicas, razas, pesos, reproducción, crianza y seguimiento del ganado.',
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
