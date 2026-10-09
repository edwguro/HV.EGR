import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../apps/api/src/generated/prisma/client';
import { resumeData } from './data/resume';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is required to sync the resume.');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

function parseOptionalDate(value?: string): Date | null {
  if (
    !value ||
    ['actual', 'actualmente', 'present'].includes(value.toLowerCase())
  ) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Fecha inválida en resume.ts: "${value}".`);
  }
  return date;
}

async function main(): Promise<void> {
  const profile = await prisma.profile.findUniqueOrThrow({
    where: { slug: 'professional-profile' },
    select: { id: true },
  });

  for (const [sortOrder, experience] of resumeData.experiences.entries()) {
    const startDate = new Date(experience.startDate);
    const existing = await prisma.experience.findFirst({
      where: {
        company: experience.company,
        profileId: profile.id,
        role: experience.role,
        startDate,
      },
      select: { id: true },
    });
    const data = {
      ...experience,
      certificateUrl: experience.certificateUrl ?? null,
      endDate: parseOptionalDate(experience.endDate),
      profileId: profile.id,
      sortOrder,
      startDate,
    };

    if (existing) {
      await prisma.experience.update({ where: { id: existing.id }, data });
    } else {
      await prisma.experience.create({ data });
    }
  }

  for (const [sortOrder, education] of resumeData.education.entries()) {
    const startDate = parseOptionalDate(education.startDate);
    const existing = await prisma.education.findFirst({
      where: {
        degree: education.degree,
        institution: education.institution,
        profileId: profile.id,
        startDate,
      },
      select: { id: true },
    });
    const data = {
      ...education,
      certificateUrl: education.certificateUrl ?? null,
      endDate: parseOptionalDate(education.endDate),
      profileId: profile.id,
      sortOrder,
      startDate,
    };

    if (existing) {
      await prisma.education.update({ where: { id: existing.id }, data });
    } else {
      await prisma.education.create({ data });
    }
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error(
      error instanceof Error ? error.message : 'Resume sync failed.',
    );
    await prisma.$disconnect();
    process.exitCode = 1;
  });
