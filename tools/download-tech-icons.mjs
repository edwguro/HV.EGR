import { mkdir, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Descarga una sola vez los íconos de tecnologías que usa el portafolio y los
// guarda en apps/web/public/icons para servirlos desde el propio dominio.
// Si una fuente falla, prueba la siguiente. Después de ejecutarlo, sube los
// SVG al repositorio. Uso: corepack pnpm icons:download

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = join(root, 'apps', 'web', 'public', 'icons');

const deviconBases = [
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons',
  'https://raw.githubusercontent.com/devicons/devicon/master/icons',
  'https://raw.githubusercontent.com/devicons/devicon/develop/icons',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons',
];
const deviconFiles = [
  'csharp/csharp-original.svg',
  'css3/css3-original.svg',
  'docker/docker-original.svg',
  'dotnetcore/dotnetcore-original.svg',
  'eslint/eslint-original.svg',
  'express/express-original.svg',
  'git/git-original.svg',
  'github/github-original.svg',
  'handlebars/handlebars-original.svg',
  'html5/html5-original.svg',
  'javascript/javascript-original.svg',
  'jest/jest-plain.svg',
  'mocha/mocha-original.svg',
  'mongodb/mongodb-original.svg',
  'mysql/mysql-original.svg',
  'nestjs/nestjs-original.svg',
  'nextjs/nextjs-original.svg',
  'nodejs/nodejs-original.svg',
  'postgresql/postgresql-original.svg',
  'prisma/prisma-original.svg',
  'react/react-original.svg',
  'swagger/swagger-original.svg',
  'typescript/typescript-original.svg',
];
const simpleIconFiles = ['railway'];

const jobs = [
  ...deviconFiles.map((file) => ({
    target: join(outputRoot, 'devicon', file),
    urls: deviconBases.map((base) => `${base}/${file}`),
  })),
  ...simpleIconFiles.map((name) => ({
    target: join(outputRoot, 'simple', `${name}.svg`),
    urls: [`https://cdn.simpleicons.org/${name}`],
  })),
];

async function fetchSvg(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${url} respondió ${response.status}`);
  }

  const svg = await response.text();
  if (!svg.includes('<svg')) {
    throw new Error(`${url} no devolvió un SVG válido`);
  }

  return svg;
}

async function download({ target, urls }) {
  const errors = [];

  for (const url of urls) {
    try {
      const svg = await fetchSvg(url);
      await mkdir(dirname(target), { recursive: true });
      await writeFile(target, svg, 'utf8');
      return;
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }

  throw new Error(
    `No se pudo descargar ${basename(target)}:\n  ${errors.join('\n  ')}`,
  );
}

const results = await Promise.allSettled(jobs.map(download));
const failures = results.filter((result) => result.status === 'rejected');

console.log(
  `Íconos descargados: ${jobs.length - failures.length}/${jobs.length}`,
);
for (const failure of failures) {
  console.error(
    failure.reason instanceof Error ? failure.reason.message : failure.reason,
  );
}

if (failures.length > 0) {
  process.exitCode = 1;
}
