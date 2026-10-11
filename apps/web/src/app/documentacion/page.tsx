import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { BookOpen, ExternalLink, FileText } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Documentación técnica',
  description:
    'README técnico del portafolio: arquitectura, stack, ejecución y criterios de calidad.',
};

interface ReadmeSection {
  content: string;
  title: string;
}

function parseReadme(markdown: string): ReadmeSection[] {
  const [intro = '', ...rawSections] = markdown.split(/^## /m);
  const sections: ReadmeSection[] = [];
  const cleanedIntro = intro.replace(/^# .+$/m, '').trim();

  if (cleanedIntro) {
    sections.push({ content: cleanedIntro, title: 'Resumen' });
  }

  rawSections.forEach((rawSection) => {
    const [title, ...content] = rawSection.split('\n');
    const sectionContent = content.join('\n').trim();
    if (title?.trim() && sectionContent) {
      sections.push({ content: sectionContent, title: title.trim() });
    }
  });

  return sections;
}

async function getReadmeSections(): Promise<ReadonlyArray<ReadmeSection>> {
  try {
    const readmePath = path.join(process.cwd(), '..', '..', 'README.md');
    const readme = await readFile(readmePath, 'utf8');
    return parseReadme(readme);
  } catch {
    return [
      {
        content:
          'La documentación se publica junto con el repositorio. Consulta el README completo en GitHub.',
        title: 'Documentación disponible en GitHub',
      },
    ];
  }
}

export default async function DocumentationPage() {
  const sections = await getReadmeSections();

  return (
    <>
      <main
        className="mx-auto w-full max-w-[76rem] px-5 pt-8 pb-12 lg:px-8"
        id="contenido"
      >
        <header className="border-border bg-surface/75 rounded-2xl border p-5 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="max-w-3xl">
              <p className="text-accent flex items-center gap-2 font-mono text-xs font-bold tracking-[0.14em] uppercase">
                <BookOpen aria-hidden size={16} />
                Documentación técnica
              </p>
              <h1 className="text-foreground mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Arquitectura y operación del portafolio
              </h1>
              <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-6">
                Consulta el README del proyecto en un formato compacto. Incluye
                stack, módulos, seguridad, ejecución local y criterios de
                calidad para revisión técnica.
              </p>
            </div>
            <a
              className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-800"
              href="https://github.com/edwguro/HV.EGR#readme"
              rel="noreferrer"
              target="_blank"
            >
              <ExternalLink aria-hidden size={16} />
              Abrir en GitHub
            </a>
          </div>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
            {[
              'Next.js',
              'NestJS',
              'PostgreSQL',
              'Prisma',
              'Docker',
              'Railway',
            ].map((technology) => (
              <span
                className="border-border bg-muted/70 rounded-full border px-3 py-1.5"
                key={technology}
              >
                {technology}
              </span>
            ))}
          </div>
        </header>

        <section aria-label="Contenido del README" className="mt-6 grid gap-3">
          {sections.map((section, index) => (
            <details
              className="border-border bg-surface/80 group rounded-xl border shadow-sm"
              key={section.title}
              open={index < 2}
            >
              <summary className="text-foreground flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5 text-sm font-extrabold marker:hidden sm:px-5">
                <span>{section.title}</span>
                <FileText
                  aria-hidden
                  className="text-accent shrink-0 transition-transform group-open:rotate-90"
                  size={16}
                />
              </summary>
              <pre className="border-border text-muted-foreground overflow-x-auto border-t px-4 py-4 font-mono text-xs leading-5 whitespace-pre-wrap sm:px-5">
                {section.content}
              </pre>
            </details>
          ))}
        </section>

        <div className="mt-6 text-center">
          <Link
            className="text-accent text-sm font-bold hover:underline"
            href="/"
          >
            Volver al portafolio
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
