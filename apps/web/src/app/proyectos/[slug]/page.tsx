import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, CodeXml } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject } from '@/lib/api';

type ProjectPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  return project
    ? { title: project.title, description: project.summary }
    : { title: 'Proyecto no encontrado' };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <main className="bg-background min-h-screen py-10 sm:py-14">
      <article className="mx-auto max-w-7xl px-5 lg:px-8">
        <Link
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm"
          href="/#proyectos"
        >
          <ArrowLeft aria-hidden size={17} /> Volver a proyectos
        </Link>
        <div className="mt-7 grid gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="border-border bg-muted overflow-hidden rounded-2xl border">
            {project.coverImageUrl ? (
              <div className="relative aspect-video">
                <Image
                  alt={`Interfaz de ${project.title}`}
                  className="object-contain"
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  src={project.coverImageUrl}
                />
              </div>
            ) : (
              <div className="text-muted-foreground flex aspect-video items-center justify-center">
                Sin captura disponible
              </div>
            )}
          </div>
          <div>
            <p className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
              {project.category}
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-lg leading-8">
              {project.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  className="border-border bg-muted/50 rounded-full border px-3 py-1.5 font-mono text-xs"
                  key={technology}
                >
                  {technology}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.demoUrl ? (
                <a
                  className="bg-foreground text-background inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                  href={project.demoUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Ver aplicación <ArrowUpRight aria-hidden size={16} />
                </a>
              ) : null}
              {project.repositoryUrl ? (
                <a
                  className="border-border hover:bg-muted inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
                  href={project.repositoryUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <CodeXml aria-hidden size={16} /> Repositorio
                </a>
              ) : null}
            </div>
          </div>
        </div>
        <section className="border-border mt-9 border-t pt-7">
          <h2 className="text-2xl font-semibold tracking-tight">
            Acerca del proyecto
          </h2>
          <p className="text-muted-foreground mt-3 max-w-3xl leading-8 whitespace-pre-line">
            {project.description}
          </p>
        </section>
      </article>
    </main>
  );
}
