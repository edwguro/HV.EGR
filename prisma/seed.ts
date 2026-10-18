import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  PrismaClient,
  SkillCategory,
} from '../apps/api/src/generated/prisma/client';
import { resumeData } from './data/resume';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is required to seed the database.');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});
const profileId = '11111111-1111-4111-8111-111111111111';

const currentDateLabels = new Set([
  'actual',
  'actualmente',
  'present',
  'presente',
]);

function isCurrentDateLabel(value?: string): boolean {
  return value
    ? currentDateLabels.has(value.trim().toLocaleLowerCase('es'))
    : false;
}

function parseOptionalDate(value?: string): Date | null {
  if (!value || isCurrentDateLabel(value)) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(
      `Fecha inválida en resume.ts: "${value}". Usa el formato AAAA-MM-DD o "Actualmente".`,
    );
  }

  return date;
}

async function main(): Promise<void> {
  await prisma.profile.upsert({
    where: { slug: 'professional-profile' },
    update: resumeData.profile,
    create: {
      id: profileId,
      slug: 'professional-profile',
      ...resumeData.profile,
    },
  });

  await prisma.experience.deleteMany({ where: { profileId } });
  if (resumeData.experiences.length) {
    await prisma.experience.createMany({
      data: resumeData.experiences.map((experience, sortOrder) => ({
        ...experience,
        startDate: new Date(experience.startDate),
        endDate: parseOptionalDate(experience.endDate),
        isCurrent: experience.endDate
          ? isCurrentDateLabel(experience.endDate)
          : experience.isCurrent,
        profileId,
        sortOrder,
      })),
    });
  }

  await prisma.education.deleteMany({ where: { profileId } });
  if (resumeData.education.length) {
    await prisma.education.createMany({
      data: resumeData.education.map((education, sortOrder) => ({
        ...education,
        startDate: parseOptionalDate(education.startDate),
        endDate: parseOptionalDate(education.endDate),
        profileId,
        sortOrder,
      })),
    });
  }

  const skills = [
    ['HTML5', SkillCategory.FRONTEND, 1],
    ['CSS3', SkillCategory.FRONTEND, 2],
    ['TypeScript', SkillCategory.FRONTEND, 3],
    ['React', SkillCategory.FRONTEND, 4],
    ['Next.js', SkillCategory.FRONTEND, 5],
    ['EJS', SkillCategory.FRONTEND, 6],
    ['Handlebars', SkillCategory.FRONTEND, 7],
    ['Diseño responsive', SkillCategory.FRONTEND, 8],
    ['Accesibilidad WCAG', SkillCategory.FRONTEND, 9],
    ['Node.js', SkillCategory.BACKEND, 1],
    ['NestJS', SkillCategory.BACKEND, 2],
    ['Express', SkillCategory.BACKEND, 3],
    ['LoopBack 4', SkillCategory.BACKEND, 4],
    ['C# / .NET', SkillCategory.BACKEND, 5],
    ['MySQL', SkillCategory.DATABASE, 1],
    ['MongoDB', SkillCategory.DATABASE, 2],
    ['PostgreSQL', SkillCategory.DATABASE, 3],
    ['Docker', SkillCategory.DEVOPS, 1],
    ['Git', SkillCategory.DEVOPS, 2],
    ['GitHub', SkillCategory.DEVOPS, 3],
    ['ESLint', SkillCategory.DEVOPS, 4],
    ['Prettier', SkillCategory.DEVOPS, 5],
    ['Jest', SkillCategory.DEVOPS, 6],
    ['Mocha', SkillCategory.DEVOPS, 7],
    ['REST APIs', SkillCategory.API, 1],
    ['OpenAPI / Swagger', SkillCategory.API, 2],
    ['Codex', SkillCategory.AI, 1],
    ['OpenAI API', SkillCategory.AI, 2],
    ['Prompt engineering', SkillCategory.AI, 3],
  ] as const;

  await prisma.skill.deleteMany({ where: { profileId } });

  for (const [name, category, sortOrder] of skills) {
    await prisma.skill.upsert({
      where: { profileId_category_name: { profileId, category, name } },
      update: { sortOrder },
      create: { profileId, name, category, sortOrder },
    });
  }

  await prisma.project.deleteMany({
    where: { slug: 'replace-with-real-project' },
  });

  const featuredProjects = [
    {
      slug: 'pautas-ji',
      title: 'PAUTAS JI',
      summary:
        'Sistema web en producción para administrar clientes, planes de pauta, visitas, entrevistas, contenidos audiovisuales, recaudo e informes mensuales.',
      description:
        'Plataforma web y PWA para la gestión comercial y audiovisual de James Informa. Centraliza clientes, catálogo de planes, pautas contratadas, visitas, entrevistas, videos, pagos, cartera e informes mensuales. Su panel ejecutivo consolida indicadores financieros y operativos para consultar ventas, recaudo, saldos, actividad comercial y cumplimiento desde una sola interfaz.',
      category: 'Gestión comercial y audiovisual',
      technologies: [
        'JavaScript',
        'Node.js 22',
        'Express 5',
        'PostgreSQL',
        'Chart.js',
        'PWA',
        'Railway',
      ],
      repositoryUrl: null,
      demoUrl: 'https://pautas-ji-web-production.up.railway.app/',
      screenshots: ['/images/projects/pautas-ji-dashboard.png'],
      sortOrder: 1,
    },
    {
      slug: 'taxi-ji',
      title: 'Taxi Ji',
      summary:
        'Plataforma para gestionar vehículos, conductores, producción, gastos, mantenimientos, documentos y rentabilidad de una flota.',
      description:
        'Solución full-stack para centralizar la operación y el seguimiento financiero de una flota de transporte.',
      category: 'Gestión de flotas',
      technologies: ['React', 'NestJS', 'PostgreSQL', 'Prisma'],
      repositoryUrl: 'https://github.com/edwguro/taxi-ji',
      screenshots: ['/images/projects/taxi-ji-showcase-v2.png'],
      sortOrder: 4,
    },
    {
      slug: 'territorio-360',
      title: 'Territorio 360',
      summary:
        'Plataforma de inteligencia territorial para visualizar patrones, escenarios, actores y puntos críticos sobre un mapa analítico.',
      description:
        'Aplicación web orientada al análisis territorial y la toma de decisiones. Integra navegación institucional, búsqueda de vistas, lectura geográfica de puntos críticos y módulos para patrones, escenarios, redes y memoria territorial. El detalle del proyecto incorporará una demostración en video de su flujo de uso.',
      category: 'Inteligencia territorial',
      technologies: [
        'TypeScript',
        'React',
        'Node.js',
        'PostgreSQL',
        'Leaflet',
        'OpenStreetMap',
      ],
      repositoryUrl: null,
      screenshots: ['/images/projects/territorio-360-showcase.png'],
      sortOrder: 5,
    },
    {
      slug: 'fortaleza-app',
      title: 'Gestión administrativa EDS Combustibles',
      summary:
        'Plataforma administrativa para visualizar ventas, rentabilidad, caja, cartera, inventario de combustibles y operación de la estación.',
      description:
        'Dashboard gerencial y operativo para centralizar indicadores, productos, finanzas, personal y control de una estación de servicio.',
      category: 'Gestión administrativa',
      technologies: [
        'JavaScript',
        'Node.js',
        'Express',
        'EJS',
        'MySQL',
        'HTML5',
        'CSS3',
        'Railway',
      ],
      repositoryUrl: 'https://github.com/edwguro/EDS-LA-FORTALEZA',
      demoUrl: 'https://eds-la-fortaleza-production-9a15.up.railway.app/',
      screenshots: [
        '/images/projects/eds-la-fortaleza-showcase.png',
        '/images/projects/eds-la-fortaleza-dashboard.png',
      ],
      sortOrder: 2,
    },
    {
      slug: 'edufree-api',
      title: 'Edufree API',
      summary:
        'Backend para administración académica con autenticación, persistencia MongoDB y exploración de servicios REST.',
      description:
        'API académica estructurada con controladores, repositorios, modelos y fuentes de datos.',
      category: 'Backend académico',
      technologies: [
        'TypeScript',
        'LoopBack 4',
        'MongoDB',
        'Docker',
        'OpenAPI',
      ],
      repositoryUrl: 'https://github.com/edwguro/BackendEdufree-G28-E2',
      screenshots: ['/images/projects/edufree-showcase-v1.png'],
      sortOrder: 6,
    },
    {
      slug: 'ganaderia-app',
      title: 'Ganadería App',
      summary:
        'Plataforma de administración y salud animal para centralizar historias clínicas, razas, pesos, reproducción, crianza y seguimiento del ganado.',
      description:
        'Sistema web aplicado a la industria ganadera que organiza la información de cada ejemplar durante su ciclo productivo. Permite gestionar ganaderos y veterinarios, construir historias clínicas, registrar vacunas y tratamientos, controlar razas, pesos, reproducción, procesos de crianza y trazabilidad sanitaria. Su enfoque integra administración operativa y salud animal para facilitar decisiones oportunas, mejorar el control del hato y conservar un historial confiable de cada proceso.',
      category: 'Administración y salud ganadera',
      technologies: ['C#', '.NET Core', 'HTML', 'CSS'],
      repositoryUrl: 'https://github.com/edwguro/EquipoColaborativo4',
      screenshots: ['/images/projects/ganaderia-app-showcase-v1.png'],
      sortOrder: 7,
    },
    {
      slug: 'portafolio-full-stack',
      title: 'Portafolio full-stack',
      summary:
        'Hoja de vida digital construida como producto: interfaz accesible, API REST versionada, PostgreSQL, documentación OpenAPI, pruebas automatizadas y despliegue con contenedores.',
      description:
        'Monolito modular en un monorepo con Next.js en el frontend y NestJS en el backend, contratos TypeScript compartidos, persistencia con Prisma y PostgreSQL, integraciones con GitHub, OpenAI y correo ejecutadas solo en el servidor, y un asistente que responde únicamente con información publicada. Incluye pruebas unitarias y E2E, integración continua con GitHub Actions, Docker multi-stage y despliegue en Railway.',
      category: 'Portafolio full-stack',
      technologies: [
        'TypeScript',
        'Next.js',
        'NestJS',
        'PostgreSQL',
        'Prisma',
        'Docker',
        'Railway',
      ],
      repositoryUrl: 'https://github.com/edwguro/HV.EGR',
      demoUrl: 'https://hv-egr.up.railway.app/',
      screenshots: ['/images/projects/hv-egr-showcase.png'],
      sortOrder: 3,
    },
  ] as const;

  await prisma.project.deleteMany({
    where: { slug: { in: ['construcivil-app', 'backend-pedidos'] } },
  });

  for (const project of featuredProjects) {
    const { technologies, ...projectData } = project;
    const demoUrl = 'demoUrl' in project ? project.demoUrl : null;
    const screenshots =
      'screenshots' in project ? [...project.screenshots] : [];
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        summary: project.summary,
        description: project.description,
        category: project.category,
        featured: true,
        published: true,
        sortOrder: project.sortOrder,
        repositoryUrl: project.repositoryUrl,
        demoUrl,
        screenshots,
      },
      create: {
        ...projectData,
        category: project.category,
        featured: true,
        published: true,
        repositoryUrl: project.repositoryUrl,
        demoUrl,
        screenshots,
      },
    });

    const savedProject = await prisma.project.findUniqueOrThrow({
      where: { slug: project.slug },
      select: { id: true },
    });
    await prisma.projectTechnology.deleteMany({
      where: { projectId: savedProject.id },
    });
    if (technologies.length) {
      await prisma.projectTechnology.createMany({
        data: technologies.map((name, sortOrder) => ({
          projectId: savedProject.id,
          name,
          sortOrder,
        })),
      });
    }
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error(
      error instanceof Error ? error.message : 'Database seed failed.',
    );
    await prisma.$disconnect();
    process.exitCode = 1;
  });
