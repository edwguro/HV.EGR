import { Injectable } from '@nestjs/common';
import type { GithubRepositoryResponse } from '@portfolio/contracts';
import { GithubClient } from './github.client';

const cacheTtlMs = 10 * 60 * 1_000;

@Injectable()
export class GithubService {
  private cache:
    { expiresAt: number; repositories: GithubRepositoryResponse[] } | undefined;

  constructor(private readonly githubClient: GithubClient) {}

  async findAll(): Promise<GithubRepositoryResponse[]> {
    if (this.cache && this.cache.expiresAt > Date.now()) {
      return this.cache.repositories;
    }

    const payload = await this.githubClient.listPublicRepositories();
    const repositories = payload
      .filter(({ fork }) => !fork)
      .map((repository) => ({
        description: repository.description,
        homepage: repository.homepage,
        language: repository.language,
        name: repository.name,
        stars: repository.stargazers_count,
        topics: repository.topics,
        url: repository.html_url,
      }));

    this.cache = { expiresAt: Date.now() + cacheTtlMs, repositories };
    return repositories;
  }
}
