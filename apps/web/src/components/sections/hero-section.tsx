'use client';

import type { ProfileResponse } from '@portfolio/contracts';
import { BadgeCheck, Braces, Database } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { siteContent } from '@/content/site';
import { BilingualText } from '../bilingual-text';

const isPlaceholder = (value: string): boolean =>
  value.startsWith('[REEMPLAZAR');

const strengths = [
  {
    title: 'Backend y APIs',
    description: 'Node.js · TypeScript · NestJS · LoopBack · Express · REST',
    icon: <Braces aria-hidden size={17} />,
    cardClass:
      'border-blue-600/35 hover:border-blue-500/70 dark:border-blue-400/25',
    iconClass: 'from-blue-700 to-blue-500 shadow-blue-700/20',
    titleClass: 'text-blue-800 dark:text-blue-300',
  },
  {
    title: 'Datos',
    description: 'PostgreSQL · MongoDB · MySQL · Prisma',
    icon: <Database aria-hidden size={17} />,
    cardClass:
      'border-cyan-600/35 hover:border-cyan-500/70 dark:border-cyan-400/25',
    iconClass: 'from-cyan-700 to-cyan-500 shadow-cyan-700/20',
    titleClass: 'text-cyan-800 dark:text-cyan-300',
  },
  {
    title: 'Calidad',
    description: 'Docker · GitHub · ESLint · Prettier · Jest · Mocha',
    icon: <BadgeCheck aria-hidden size={17} />,
    cardClass:
      'border-amber-600/35 hover:border-amber-500/70 dark:border-amber-400/25',
    iconClass: 'from-amber-600 to-amber-400 shadow-amber-700/20',
    titleClass: 'text-amber-800 dark:text-amber-300',
  },
] as const;

export function HeroSection({ profile }: { profile: ProfileResponse | null }) {
  const reduceMotion = useReducedMotion();
  const summary = profile?.professionalSummary;
  return (
    <section
      className="relative overflow-hidden pt-5 pb-10 sm:pt-6 sm:pb-12 lg:pt-7 lg:pb-14"
      id="inicio"
    >
      <div
        aria-hidden
        className="bg-accent/10 absolute top-1/3 right-[-12rem] size-96 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="relative mx-auto w-full max-w-[88rem] scroll-mt-24 px-5 lg:px-8"
        id="perfil"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-14">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-600/25 bg-cyan-500/10 px-3 py-1.5 font-mono text-xs font-bold tracking-[0.16em] text-cyan-700 uppercase dark:text-cyan-300">
              <span aria-hidden className="size-2 rounded-full bg-cyan-500" />
              <BilingualText
                en="01 / Profile and experience"
                es="01 / Perfil y trayectoria"
              />
            </div>
            <h1 className="text-foreground max-w-4xl text-3xl leading-[1.08] font-bold tracking-[-0.04em] text-balance sm:text-4xl lg:text-5xl">
              <span lang="es">
                Desarrollo de software para operaciones web de producción.
              </span>
              <span lang="en">
                I build production-ready software for web operations.
              </span>
            </h1>
            <div className="relative mt-5 max-w-4xl border-l-2 border-cyan-600/45 py-1 pl-4 sm:pl-5 dark:border-cyan-400/35">
              <span
                aria-hidden
                className="absolute top-0 left-[-2px] h-12 w-0.5 bg-gradient-to-b from-blue-600 via-cyan-500 to-amber-400"
              />
              <p className="font-sans text-[0.82rem] leading-[1.62] font-medium tracking-[-0.006em] text-pretty text-slate-800 sm:text-[0.9rem] dark:text-slate-200">
                <BilingualText
                  en={siteContent.summaryEn}
                  es={
                    summary && !isPlaceholder(summary)
                      ? summary
                      : siteContent.summary
                  }
                />
              </p>
            </div>
          </div>
          <div className="mx-auto w-64 text-center sm:w-72 lg:w-72 lg:justify-self-center xl:w-80">
            <div className="border-border from-accent/15 via-muted to-muted/40 shadow-accent/10 ring-background relative aspect-square overflow-hidden rounded-full border bg-gradient-to-b shadow-xl ring-8">
              <div
                aria-hidden
                className="bg-accent/20 absolute inset-8 rounded-full blur-3xl"
              />
              <Image
                alt="Retrato profesional de Edwin Gustavo Rodríguez"
                className="object-cover object-[50%_15%]"
                fill
                priority
                sizes="(min-width: 1280px) 304px, (min-width: 1024px) 272px, 288px"
                src="/images/edwin-professional-portrait.png"
              />
            </div>
            <div className="mt-5">
              <p className="text-foreground text-lg font-bold tracking-tight">
                {siteContent.name}
              </p>
              <p className="text-accent mt-1 text-sm font-medium">
                <BilingualText en={siteContent.roleEn} es={siteContent.role} />
              </p>
              <p className="text-muted-foreground mt-2 text-xs">
                <BilingualText
                  en={siteContent.credentialEn}
                  es={siteContent.credential}
                />
              </p>
            </div>
          </div>
        </div>
        <div className="relative mt-6 border-t border-cyan-600/35 pt-5 lg:mt-7 dark:border-cyan-400/30">
          <span
            aria-hidden
            className="absolute -top-px left-0 h-0.5 w-28 bg-gradient-to-r from-blue-600 via-cyan-500 to-amber-400"
          />
          <p className="mb-3 font-mono text-[0.68rem] font-bold tracking-[0.16em] text-slate-700 uppercase dark:text-slate-300">
            <BilingualText en="Technical strengths" es="Fortalezas técnicas" />
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {strengths.map(
              ({
                cardClass,
                description,
                icon,
                iconClass,
                title,
                titleClass,
              }) => (
                <article
                  className={`group border-l-2 py-1 pr-2 pl-3 transition hover:translate-x-0.5 ${cardClass}`}
                  key={title}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-md ${iconClass}`}
                    >
                      {icon}
                    </span>
                    <div className="min-w-0">
                      <h2
                        className={`text-sm font-extrabold tracking-tight ${titleClass}`}
                      >
                        {title}
                      </h2>
                      <p className="mt-1 text-[0.7rem] leading-5 font-medium text-slate-700 dark:text-slate-300">
                        {description}
                      </p>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
