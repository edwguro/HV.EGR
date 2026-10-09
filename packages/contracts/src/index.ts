export interface HealthResponse {
  status: 'ok';
  timestamp: string;
}

export interface ExperienceResponse {
  certificateUrl: string | null;
  company: string;
  description: string;
  endDate: string | null;
  isCurrent: boolean;
  location: string | null;
  role: string;
  startDate: string;
}

export interface EducationResponse {
  certificateUrl: string | null;
  degree: string;
  description: string | null;
  endDate: string | null;
  field: string | null;
  institution: string;
  startDate: string | null;
}

export interface ProfileResponse {
  cvUrl: string | null;
  education: EducationResponse[];
  email: string | null;
  experiences: ExperienceResponse[];
  fullName: string;
  githubUrl: string | null;
  headline: string;
  linkedinUrl: string | null;
  location: string | null;
  professionalSummary: string;
}

export interface ProjectSummaryResponse {
  category: string;
  coverImageUrl: string | null;
  demoUrl: string | null;
  featured: boolean;
  repositoryUrl: string | null;
  slug: string;
  summary: string;
  technologies: string[];
  title: string;
}

export interface ProjectDetailResponse extends ProjectSummaryResponse {
  description: string;
  screenshots: string[];
}

export interface SkillGroupResponse {
  category:
    | 'FRONTEND'
    | 'BACKEND'
    | 'DATABASE'
    | 'DEVOPS'
    | 'API'
    | 'NETWORKING'
    | 'AI';
  skills: string[];
}

export interface ContactResponse {
  accepted: true;
}

export interface GithubRepositoryResponse {
  description: string | null;
  homepage: string | null;
  language: string | null;
  name: string;
  stars: number;
  topics: string[];
  url: string;
}

export interface AiChatResponse {
  message: string;
}
