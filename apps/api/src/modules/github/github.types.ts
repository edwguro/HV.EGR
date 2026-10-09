export interface GithubRepositoryPayload {
  description: string | null;
  fork: boolean;
  homepage: string | null;
  html_url: string;
  language: string | null;
  name: string;
  stargazers_count: number;
  topics: string[];
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === 'string';
}

export function isGithubRepositoryPayload(
  value: unknown,
): value is GithubRepositoryPayload {
  if (typeof value !== 'object' || value === null) return false;

  const repository = value as Record<string, unknown>;
  return (
    typeof repository.name === 'string' &&
    isNullableString(repository.description) &&
    isNullableString(repository.homepage) &&
    typeof repository.html_url === 'string' &&
    isNullableString(repository.language) &&
    typeof repository.stargazers_count === 'number' &&
    typeof repository.fork === 'boolean' &&
    Array.isArray(repository.topics) &&
    repository.topics.every((topic) => typeof topic === 'string')
  );
}
