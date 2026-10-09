import { Injectable, NotFoundException } from '@nestjs/common';
import type {
  ProjectDetailResponse,
  ProjectSummaryResponse,
} from '@portfolio/contracts';
import { PrismaService } from '../../database/prisma.service';
import type { ProjectWhereInput } from '../../generated/prisma/models/Project';

const projectInclude = {
  technologies: { orderBy: { sortOrder: 'asc' as const } },
};

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    category?: string,
    technology?: string,
  ): Promise<ProjectSummaryResponse[]> {
    const where: ProjectWhereInput = {
      published: true,
      ...(category
        ? { category: { equals: category, mode: 'insensitive' } }
        : {}),
      ...(technology
        ? {
            technologies: {
              some: { name: { equals: technology, mode: 'insensitive' } },
            },
          }
        : {}),
    };

    const projects = await this.prisma.project.findMany({
      where,
      include: projectInclude,
      orderBy: [
        { featured: 'desc' },
        { sortOrder: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return projects.map((project) => ({
      category: project.category,
      coverImageUrl: project.screenshots[0] ?? null,
      demoUrl: project.demoUrl,
      featured: project.featured,
      repositoryUrl: project.repositoryUrl,
      slug: project.slug,
      summary: project.summary,
      technologies: project.technologies.map(({ name }) => name),
      title: project.title,
    }));
  }

  async findBySlug(slug: string): Promise<ProjectDetailResponse> {
    const project = await this.prisma.project.findFirst({
      where: { slug, published: true },
      include: projectInclude,
    });

    if (!project) {
      throw new NotFoundException('Project not found.');
    }

    return {
      category: project.category,
      coverImageUrl: project.screenshots[0] ?? null,
      demoUrl: project.demoUrl,
      description: project.description,
      featured: project.featured,
      repositoryUrl: project.repositoryUrl,
      screenshots: project.screenshots,
      slug: project.slug,
      summary: project.summary,
      technologies: project.technologies.map(({ name }) => name),
      title: project.title,
    };
  }
}
