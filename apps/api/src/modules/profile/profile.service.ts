import { Injectable, NotFoundException } from '@nestjs/common';
import type { ProfileResponse } from '@portfolio/contracts';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getPublicProfile(): Promise<ProfileResponse> {
    const profile = await this.prisma.profile.findUnique({
      where: { slug: 'professional-profile' },
      include: {
        education: { orderBy: { sortOrder: 'asc' } },
        experiences: { orderBy: { sortOrder: 'asc' } },
      },
    });

    if (!profile) {
      throw new NotFoundException('Professional profile is not configured.');
    }

    return {
      cvUrl: profile.cvUrl,
      education: profile.education.map((item) => ({
        certificateUrl: item.certificateUrl,
        degree: item.degree,
        description: item.description,
        endDate: item.endDate?.toISOString() ?? null,
        field: item.field,
        institution: item.institution,
        startDate: item.startDate?.toISOString() ?? null,
      })),
      email: profile.email,
      experiences: profile.experiences.map((item) => ({
        certificateUrl: item.certificateUrl,
        company: item.company,
        description: item.description,
        endDate: item.endDate?.toISOString() ?? null,
        isCurrent: item.isCurrent,
        location: item.location,
        role: item.role,
        startDate: item.startDate.toISOString(),
      })),
      fullName: profile.fullName,
      githubUrl: profile.githubUrl,
      headline: profile.headline,
      linkedinUrl: profile.linkedinUrl,
      location: profile.location,
      professionalSummary: profile.professionalSummary,
    };
  }
}
