'use client';

import type { ProjectSummaryResponse } from '@portfolio/contracts';
import { CodeXml, ExternalLink, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState, useSyncExternalStore } from 'react';
import { AutoScrollRibbon } from '../auto-scroll-ribbon';
import { BilingualText } from '../bilingual-text';
import { ProjectLivePreview } from '../project-live-preview';
import { SectionHeading } from '../section-heading';
import { TechnologyBadge } from '../technology-badge';

export function ProjectsSection({
  projects,
}: {
  projects: ProjectSummaryResponse[];
}) {
  const [category, setCategory] = useState('Todos');
  const [technology, setTechnology] = useState('Todas');
  const hydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const categories = useMemo(
    () => ['Todos', ...new Set(projects.map((project) => project.category))],
    [projects],
  );
  const technologies = useMemo(
    () => [
      'Todas',
      ...new Set(projects.flatMap((project) => project.technologies)),
    ],
    [projects],
  );
  const filteredProjects = projects.filter(
    (project) =>
      (category === 'Todos' || project.category === category) &&
      (technology === 'Todas' || project.technologies.includes(technology)),
  );
  return (
    <section
      className="border-border bg-muted/35 relative border-t py-12 sm:py-14"
      id="proyectos"
    >
      <div
        aria-hidden
        className="absolute top-0 left-1/2 h-0.5 w-20 -translate-x-1/2 rounded-b-full bg-cyan-500"
      />
      <div className="mx-auto max-w-[88rem] px-5 lg:px-8">
        <SectionHeading
          description="Productos desarrollados con atención al rendimiento, la claridad y la mantenibilidad."
          descriptionEn="Products built with attention to performance, clarity and maintainability."
          eyebrow="04 / Proyectos"
          eyebrowEn="04 / Projects"
          title="Proyectos y desarrollos propios."
          titleEn="Projects and original developments."
        />
        {projects.length ? (
          <div className="border-border bg-surface mt-6 flex flex-wrap gap-3 rounded-xl border p-3 shadow-sm">
            <label className="text-muted-foreground flex min-w-44 flex-1 items-center gap-2 text-xs font-semibold">
              <BilingualText en="Category" es="Categoría" />
              <select
                className="border-border bg-background text-foreground focus:border-accent focus:ring-accent/15 min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm font-medium outline-none focus:ring-2"
                disabled={!hydrated}
                onChange={(event) => setCategory(event.target.value)}
                value={category}
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="text-muted-foreground flex min-w-44 flex-1 items-center gap-2 text-xs font-semibold">
              <BilingualText en="Technology" es="Tecnología" />
              <select
                className="border-border bg-background text-foreground focus:border-accent focus:ring-accent/15 min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm font-medium outline-none focus:ring-2"
                disabled={!hydrated}
                onChange={(event) => setTechnology(event.target.value)}
                value={technology}
              >
                {technologies.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>
        ) : null}
        <div className="mt-5">
          {filteredProjects.length ? (
            <AutoScrollRibbon
              ariaLabel="Proyectos en cinta horizontal"
              itemCount={filteredProjects.length}
            >
              {filteredProjects.map((project) => (
                <article
                  className="group border-border bg-surface hover:border-accent/35 flex min-w-0 flex-col overflow-hidden rounded-lg border shadow-[0_8px_22px_-20px_rgb(15_23_42_/_0.42)] transition duration-300 hover:-translate-y-0.5"
                  key={project.slug}
                >
                  <div className="project-cover border-border bg-muted relative aspect-[3/2] overflow-hidden border-b">
                    {project.coverImageUrl ? (
                      <Image
                        alt={`Interfaz de ${project.title}`}
                        className="object-contain object-center"
                        fill
                        sizes="(max-width: 679px) 100vw, (max-width: 1087px) 50vw, (max-width: 1343px) 33vw, 336px"
                        src={project.coverImageUrl}
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center bg-gradient-to-br from-blue-600/15 via-cyan-500/10 to-amber-400/10">
                        <CodeXml
                          aria-hidden
                          className="text-accent"
                          size={30}
                        />
                      </div>
                    )}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent opacity-70 transition group-hover:opacity-45"
                    />
                    <span className="absolute top-2 left-2 rounded border border-white/20 bg-slate-950/70 px-1.5 py-0.5 text-[0.58rem] font-bold text-white backdrop-blur-sm">
                      {project.category}
                    </span>
                    {project.demoUrl ? (
                      <span className="absolute top-2 right-2 rounded border border-emerald-300/35 bg-emerald-950/80 px-1.5 py-0.5 text-[0.58rem] font-bold text-emerald-100 backdrop-blur-sm">
                        <BilingualText en="In production" es="En producción" />
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-2.5">
                    <div>
                      <h3 className="text-sm font-extrabold tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mt-1 line-clamp-3 text-[0.68rem] leading-4">
                        {project.summary}
                      </p>
                    </div>
                    {project.technologies.length ? (
                      <div className="border-border/65 mt-2 border-t pt-1.5">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((item) => (
                            <TechnologyBadge key={item} name={item} />
                          ))}
                        </div>
                      </div>
                    ) : null}
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                      <Link
                        className="border-border hover:border-accent/35 hover:bg-muted inline-flex items-center gap-1 rounded-md border px-2 py-1.5 text-[0.66rem] font-bold"
                        href={`/proyectos/${project.slug}`}
                      >
                        <Eye aria-hidden size={15} />{' '}
                        <BilingualText
                          en="Technical details"
                          es="Ver detalle"
                        />
                      </Link>
                      {project.repositoryUrl ? (
                        <a
                          className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-2 py-1.5 text-[0.66rem] font-bold text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-950 dark:hover:bg-white"
                          href={project.repositoryUrl}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <CodeXml aria-hidden size={13} /> GitHub
                        </a>
                      ) : null}
                      {project.demoUrl ? (
                        <>
                          <ProjectLivePreview
                            title={project.title}
                            url={project.demoUrl}
                          />
                          <a
                            className="inline-flex items-center gap-1 rounded-md bg-emerald-700 px-2 py-1.5 text-[0.66rem] font-bold text-white transition hover:bg-emerald-800 dark:bg-emerald-300 dark:text-slate-950 dark:hover:bg-emerald-200"
                            href={project.demoUrl}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <BilingualText en="Open website" es="Ver web" />
                            <ExternalLink aria-hidden size={13} />
                          </a>
                        </>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </AutoScrollRibbon>
          ) : (
            <p className="border-border text-muted-foreground rounded-2xl border p-8">
              Los casos de estudio aparecerán cuando sean publicados desde la
              base de datos.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
