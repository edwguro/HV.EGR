import { Injectable } from '@nestjs/common';
import type { SkillGroupResponse } from '@portfolio/contracts';
import { PrismaService } from '../../database/prisma.service';
import { SkillCategory } from '../../generated/prisma/enums';

const categoryOrder = [
  SkillCategory.FRONTEND,
  SkillCategory.BACKEND,
  SkillCategory.DATABASE,
  SkillCategory.DEVOPS,
  SkillCategory.API,
  SkillCategory.NETWORKING,
  SkillCategory.AI,
] as const;

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<SkillGroupResponse[]> {
    const skills = await this.prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }, { name: 'asc' }],
      select: { category: true, name: true },
    });

    return categoryOrder
      .map((category) => ({
        category,
        skills: skills
          .filter((skill) => skill.category === category)
          .map((skill) => skill.name),
      }))
      .filter((group) => group.skills.length > 0);
  }
}
