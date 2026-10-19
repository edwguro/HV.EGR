import type { SkillGroupResponse } from '@portfolio/contracts';
import { Braces } from 'lucide-react';
import { AutoScrollRibbon } from '../auto-scroll-ribbon';
import { SectionHeading } from '../section-heading';

const labels: Record<SkillGroupResponse['category'], string> = {
  AI: 'Inteligencia artificial',
  API: 'APIs e integraciones',
  BACKEND: 'Backend',
  DATABASE: 'Bases de datos',
  DEVOPS: 'DevOps',
  FRONTEND: 'Frontend',
  NETWORKING: 'Redes',
};

const descriptions: Record<SkillGroupResponse['category'], string> = {
  AI: 'Asistencia, análisis y productividad.',
  API: 'Contratos, servicios e integraciones.',
  BACKEND: 'Lógica, seguridad y arquitectura.',
  DATABASE: 'Persistencia y modelado de datos.',
  DEVOPS: 'Calidad, entrega y automatización.',
  FRONTEND: 'Interfaces accesibles y responsivas.',
  NETWORKING: 'Conectividad e infraestructura.',
};

const deviconBase = '/icons/devicon';

const skillLogos: Record<string, { className?: string; src: string }> = {
  CSS3: { src: `${deviconBase}/css3/css3-original.svg` },
  Docker: { src: `${deviconBase}/docker/docker-original.svg` },
  ESLint: { src: `${deviconBase}/eslint/eslint-original.svg` },
  Express: {
    className: 'dark:invert',
    src: `${deviconBase}/express/express-original.svg`,
  },
  Git: { src: `${deviconBase}/git/git-original.svg` },
  GitHub: {
    className: 'dark:invert',
    src: `${deviconBase}/github/github-original.svg`,
  },
  Handlebars: { src: `${deviconBase}/handlebars/handlebars-original.svg` },
  HTML5: { src: `${deviconBase}/html5/html5-original.svg` },
  MongoDB: { src: `${deviconBase}/mongodb/mongodb-original.svg` },
  MySQL: { src: `${deviconBase}/mysql/mysql-original.svg` },
  Mocha: { src: `${deviconBase}/mocha/mocha-original.svg` },
  NestJS: { src: `${deviconBase}/nestjs/nestjs-original.svg` },
  'Next.js': {
    className: 'dark:invert',
    src: `${deviconBase}/nextjs/nextjs-original.svg`,
  },
  'Node.js': { src: `${deviconBase}/nodejs/nodejs-original.svg` },
  PostgreSQL: { src: `${deviconBase}/postgresql/postgresql-original.svg` },
  React: { src: `${deviconBase}/react/react-original.svg` },
  Jest: { src: `${deviconBase}/jest/jest-plain.svg` },
  'OpenAPI / Swagger': { src: `${deviconBase}/swagger/swagger-original.svg` },
  TypeScript: { src: `${deviconBase}/typescript/typescript-original.svg` },
  'C# / .NET': { src: `${deviconBase}/csharp/csharp-original.svg` },
};

function SkillItem({ name }: { name: string }) {
  const logo = skillLogos[name];

  return (
    <div className="inline-flex w-fit items-center gap-1.5 rounded-md px-1.5 py-1 transition hover:bg-amber-500/8">
      {logo ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          alt=""
          aria-hidden="true"
          className={`size-5 shrink-0 ${logo.className ?? ''}`}
          height="20"
          src={logo.src}
          width="20"
        />
      ) : (
        <span className="bg-accent/10 text-accent flex size-5 shrink-0 items-center justify-center rounded">
          <Braces aria-hidden size={12} />
        </span>
      )}
      <span className="text-[0.68rem] leading-tight font-semibold">{name}</span>
    </div>
  );
}

export function SkillsSection({ groups }: { groups: SkillGroupResponse[] }) {
  return (
    <section
      className="border-border bg-background relative border-t py-12 sm:py-14"
      id="habilidades"
    >
      <div
        aria-hidden
        className="absolute top-0 left-1/2 h-0.5 w-20 -translate-x-1/2 rounded-b-full bg-amber-500"
      />
      <div className="mx-auto max-w-[88rem] px-5 lg:px-8">
        <SectionHeading
          description="Stack organizado por el rol que cumple cada tecnología dentro de una solución."
          descriptionEn="A stack organized by the role each technology plays in a solution."
          eyebrow="05 / Habilidades"
          eyebrowEn="05 / Skills"
          title="Tecnologías y herramientas."
          titleEn="Technologies and tools."
        />
        <div className="mt-5">
          {groups.length ? (
            <AutoScrollRibbon
              ariaLabel="Tecnologías y habilidades en cinta horizontal"
              itemCount={groups.length}
            >
              {groups.map((group) => (
                <article
                  className="border-border/80 bg-surface flex min-w-0 flex-col rounded-lg border border-l-2 px-3 py-2.5 shadow-sm"
                  key={group.category}
                >
                  <div className="border-border/70 min-h-12 border-b pb-2">
                    <h3 className="text-xs font-extrabold tracking-[0.12em] text-amber-800 uppercase dark:text-amber-300">
                      {labels[group.category]}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-[0.67rem] leading-4">
                      {descriptions[group.category]}
                    </p>
                  </div>
                  <div className="mt-2 flex flex-wrap content-start items-start gap-1.5">
                    {group.skills.map((skill) => (
                      <SkillItem key={skill} name={skill} />
                    ))}
                  </div>
                </article>
              ))}
            </AutoScrollRibbon>
          ) : (
            <p className="text-muted-foreground py-12">
              Las habilidades se cargarán desde el perfil verificado.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
