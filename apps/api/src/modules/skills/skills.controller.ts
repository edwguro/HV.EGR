import { Controller, Get } from '@nestjs/common';
import type { SkillGroupResponse } from '@portfolio/contracts';
import { SkillsService } from './skills.service';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  findAll(): Promise<SkillGroupResponse[]> {
    return this.skillsService.findAll();
  }
}
