import { Braces } from 'lucide-react';

const deviconBase = '/icons/devicon';

const technologyLogos: Record<string, { className?: string; src: string }> = {
  'C#': { src: `${deviconBase}/csharp/csharp-original.svg` },
  CSS: { src: `${deviconBase}/css3/css3-original.svg` },
  CSS3: { src: `${deviconBase}/css3/css3-original.svg` },
  Docker: { src: `${deviconBase}/docker/docker-original.svg` },
  Express: {
    className: 'dark:invert',
    src: `${deviconBase}/express/express-original.svg`,
  },
  GitHub: {
    className: 'dark:invert',
    src: `${deviconBase}/github/github-original.svg`,
  },
  Handlebars: { src: `${deviconBase}/handlebars/handlebars-original.svg` },
  HTML: { src: `${deviconBase}/html5/html5-original.svg` },
  HTML5: { src: `${deviconBase}/html5/html5-original.svg` },
  JavaScript: { src: `${deviconBase}/javascript/javascript-original.svg` },
  MongoDB: { src: `${deviconBase}/mongodb/mongodb-original.svg` },
  MySQL: { src: `${deviconBase}/mysql/mysql-original.svg` },
  NestJS: { src: `${deviconBase}/nestjs/nestjs-original.svg` },
  '.NET': { src: `${deviconBase}/dotnetcore/dotnetcore-original.svg` },
  '.NET Core': { src: `${deviconBase}/dotnetcore/dotnetcore-original.svg` },
  'Next.js': {
    className: 'dark:invert',
    src: `${deviconBase}/nextjs/nextjs-original.svg`,
  },
  'Node.js': { src: `${deviconBase}/nodejs/nodejs-original.svg` },
  OpenAPI: { src: `${deviconBase}/swagger/swagger-original.svg` },
  PostgreSQL: { src: `${deviconBase}/postgresql/postgresql-original.svg` },
  Prisma: {
    className: 'dark:invert',
    src: `${deviconBase}/prisma/prisma-original.svg`,
  },
  React: { src: `${deviconBase}/react/react-original.svg` },
  Railway: {
    className: 'dark:invert',
    src: '/icons/simple/railway.svg',
  },
  TypeScript: { src: `${deviconBase}/typescript/typescript-original.svg` },
};

export function TechnologyBadge({ name }: { name: string }) {
  const logo = technologyLogos[name];

  return (
    <span className="border-border/70 bg-background/75 inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[0.58rem] font-semibold">
      {logo ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          alt=""
          aria-hidden
          className={`size-3.5 ${logo.className ?? ''}`}
          height="14"
          src={logo.src}
          width="14"
        />
      ) : (
        <span className="bg-accent/10 text-accent flex size-3.5 items-center justify-center rounded-sm">
          <Braces aria-hidden size={9} />
        </span>
      )}
      {name}
    </span>
  );
}
