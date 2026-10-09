import { Controller, Get, Param, Query } from '@nestjs/common';
import type {
  ProjectDetailResponse,
  ProjectSummaryResponse,
} from '@portfolio/contracts';
import { ListProjectsQueryDto } from './dto/list-projects-query.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(
    @Query() query: ListProjectsQueryDto,
  ): Promise<ProjectSummaryResponse[]> {
    return this.projectsService.findAll(query.category, query.technology);
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string): Promise<ProjectDetailResponse> {
    return this.projectsService.findBySlug(slug);
  }
}
