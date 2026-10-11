import type {
  ProfileResponse,
  ProjectDetailResponse,
  ProjectSummaryResponse,
  SkillGroupResponse,
} from '@portfolio/contracts';

const apiUrl =
  process.env.API_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:4100/api/v1';

async function getJson<T>(path: string, revalidate = 300): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`, {
    next: { revalidate },
    signal: AbortSignal.timeout(5_000),
  });
  if (!response.ok)
    throw new Error(`API request failed with status ${response.status}.`);
  return (await response.json()) as T;
}

export async function getProfile(): Promise<ProfileResponse | null> {
  try {
    return await getJson<ProfileResponse>('/profile', 0);
  } catch {
    return null;
  }
}

export async function getProjects(): Promise<ProjectSummaryResponse[]> {
  try {
    return await getJson<ProjectSummaryResponse[]>('/projects', 0);
  } catch {
    return [];
  }
}

export async function getProject(
  slug: string,
): Promise<ProjectDetailResponse | null> {
  try {
    return await getJson<ProjectDetailResponse>(
      `/projects/${encodeURIComponent(slug)}`,
      0,
    );
  } catch {
    return null;
  }
}

export async function getSkills(): Promise<SkillGroupResponse[]> {
  try {
    return await getJson<SkillGroupResponse[]>('/skills', 0);
  } catch {
    return [];
  }
}
