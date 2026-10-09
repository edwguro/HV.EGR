import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AiContextService {
  constructor(private readonly prisma: PrismaService) {}

  async build(): Promise<string> {
    const [profile, projects] = await Promise.all([
      this.prisma.profile.findUnique({
        where: { slug: 'professional-profile' },
        include: {
          education: { orderBy: { sortOrder: 'asc' } },
          experiences: { orderBy: { sortOrder: 'asc' } },
          skills: { orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }] },
        },
      }),
      this.prisma.project.findMany({
        where: { published: true },
        include: { technologies: true },
        orderBy: { sortOrder: 'asc' },
      }),
    ]);

    return JSON.stringify({
      profile: profile
        ? {
            education: profile.education,
            experiences: profile.experiences,
            fullName: profile.fullName,
            headline: profile.headline,
            location: profile.location,
            professionalSummary: profile.professionalSummary,
            skills: profile.skills,
          }
        : null,
      projects,
    });
  }
}
