export interface Environment {
  API_PORT: number;
  CORS_ORIGINS: string;
  CONTACT_NOTIFICATION_TO?: string;
  DATABASE_URL: string;
  EMAIL_FROM?: string;
  GITHUB_TOKEN?: string;
  GITHUB_USERNAME: string;
  NODE_ENV: 'development' | 'test' | 'production';
  OPENAI_API_KEY?: string;
  OPENAI_MODEL: string;
  RESEND_API_KEY?: string;
}

const supportedEnvironments = new Set<Environment['NODE_ENV']>([
  'development',
  'test',
  'production',
]);

function readString(value: unknown, fallback: string): string {
  if (value === undefined) return fallback;
  if (typeof value === 'string') return value;
  throw new Error('Environment variable values must be strings.');
}

export function validateEnvironment(
  input: Record<string, unknown>,
): Environment {
  const nodeEnv = readString(input.NODE_ENV, 'development');
  const databaseUrl = readString(input.DATABASE_URL, '').trim();
  const apiPort = Number(readString(input.API_PORT, '4000'));

  if (!supportedEnvironments.has(nodeEnv as Environment['NODE_ENV'])) {
    throw new Error('NODE_ENV must be development, test, or production.');
  }

  if (
    !databaseUrl.startsWith('postgresql://') &&
    !databaseUrl.startsWith('postgres://')
  ) {
    throw new Error('DATABASE_URL must be a valid PostgreSQL connection URL.');
  }

  if (!Number.isInteger(apiPort) || apiPort < 1 || apiPort > 65_535) {
    throw new Error('API_PORT must be an integer between 1 and 65535.');
  }

  return {
    API_PORT: apiPort,
    CORS_ORIGINS: readString(input.CORS_ORIGINS, 'http://localhost:3000'),
    CONTACT_NOTIFICATION_TO:
      readString(input.CONTACT_NOTIFICATION_TO, '') || undefined,
    DATABASE_URL: databaseUrl,
    EMAIL_FROM: readString(input.EMAIL_FROM, '') || undefined,
    GITHUB_TOKEN: readString(input.GITHUB_TOKEN, '') || undefined,
    GITHUB_USERNAME: readString(input.GITHUB_USERNAME, 'replace-me'),
    NODE_ENV: nodeEnv as Environment['NODE_ENV'],
    OPENAI_API_KEY: readString(input.OPENAI_API_KEY, '') || undefined,
    OPENAI_MODEL: readString(
      input.OPENAI_MODEL,
      'replace-with-a-supported-model',
    ),
    RESEND_API_KEY: readString(input.RESEND_API_KEY, '') || undefined,
  };
}
