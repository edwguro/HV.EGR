import { Controller, Get } from '@nestjs/common';
import type { GithubRepositoryResponse } from '@portfolio/contracts';
import { GithubService } from './github.service';

@Controller('github/repositories')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get()
  findAll(): Promise<GithubRepositoryResponse[]> {
    return this.githubService.findAll();
  }
}
