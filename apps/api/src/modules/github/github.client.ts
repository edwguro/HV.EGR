import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Environment } from '../../config/environment';
import {
  isGithubRepositoryPayload,
  type GithubRepositoryPayload,
} from './github.types';

@Injectable()
export class GithubClient {
  constructor(private readonly config: ConfigService<Environment, true>) {}

  async listPublicRepositories(): Promise<GithubRepositoryPayload[]> {
    const username = this.config.get('GITHUB_USERNAME', { infer: true });
    const token = this.config.get('GITHUB_TOKEN', { infer: true });

    if (!username || username === 'replace-me') return [];

    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'professional-portfolio-api',
      'X-GitHub-Api-Version': '2026-03-10',
    };

    if (token && !token.startsWith('replace-')) {
      headers.Authorization = `Bearer ${token}`;
    }

    let response: Response;
    try {
      response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
        { headers, signal: AbortSignal.timeout(8_000) },
      );
    } catch {
      throw new ServiceUnavailableException(
        'GitHub is temporarily unavailable.',
      );
    }

    if (!response.ok) {
      throw new ServiceUnavailableException(
        response.status === 403
          ? 'GitHub rate limit reached. Please try again later.'
          : 'GitHub repositories are temporarily unavailable.',
      );
    }

    const payload: unknown = await response.json();
    if (!Array.isArray(payload)) {
      throw new ServiceUnavailableException(
        'GitHub returned an unexpected response.',
      );
    }

    return payload.filter(isGithubRepositoryPayload);
  }
}
