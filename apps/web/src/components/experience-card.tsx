'use client';

import type { ExperienceResponse } from '@portfolio/contracts';
import {
  Award,
  BriefcaseBusiness,
  CalendarDays,
  ExternalLink,
  Eye,
  MapPin,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useId, useRef } from 'react';
import { BilingualText } from './bilingual-text';

function year(value: string | null): string {
  return value ? String(new Date(value).getUTCFullYear()) : '';
}

function experienceLogo(company: string): { alt: string; src: string } | null {
  const normalized = company
    .toLocaleLowerCase('es')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');

  if (normalized.includes('texaco') || normalized.includes('fortaleza')) {
    return { alt: 'Logo de Texaco', src: '/images/experience/texaco.png' };
  }
  if (normalized.includes('developer')) {
    return {
      alt: 'Logo de Developers',
      src: '/images/experience/developers.png',
    };
  }
  if (
    normalized.includes('unidad nacional de protecci') ||
    normalized.includes('unp')
  ) {
    return { alt: 'Logo de la UNP', src: '/images/experience/unp.png' };
  }
  if (normalized.includes('cementos tequendama')) {
    return {
      alt: 'Logo de Cementos Tequendama',
      src: '/images/experience/cementos-tequendama.png',
    };
  }
  if (normalized.includes('mongibello') || normalized.includes('sanford')) {
    return {
      alt: 'Logo de Mongibello',
      src: '/images/experience/mongibello.png',
    };
  }
  if (normalized.includes('ejercito')) {
    return {
      alt: 'Escudo del Ejercito Nacional de Colombia',
      src: '/images/experience/ejercito-colombia.png',
    };
  }

  return null;
}

export function ExperienceCard({
  experience,
}: {
  experience: ExperienceResponse;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const logo = experienceLogo(experience.company);
  const period = `${year(experience.startDate)} — ${experience.isCurrent ? 'Actual' : year(experience.endDate)}`;

  return (
    <>
      <article className="group relative isolate flex min-h-0 flex-col border-r border-b border-cyan-700/20 py-3 pr-2.5 pl-3 transition hover:border-cyan-500/55 dark:border-slate-600/35 dark:hover:border-cyan-500/35">
        <div
          aria-hidden
          className="absolute inset-y-3 left-0 w-0.5 bg-gradient-to-b from-blue-600 via-cyan-500 to-amber-400"
        />

        <div className="flex min-w-0 items-start gap-2.5">
          {logo ? (
            <span className="relative flex h-9 w-12 shrink-0 items-center justify-center overflow-hidden rounded border border-slate-200 bg-white">
              <Image
                alt={logo.alt}
                className="object-contain p-1"
                fill
                sizes="48px"
                src={logo.src}
              />
            </span>
          ) : (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-700/20">
              <BriefcaseBusiness aria-hidden size={17} />
            </span>
          )}
          <div className="min-w-0 flex-1">
            <h4 className="dark:text-foreground text-sm leading-4.5 font-extrabold tracking-tight text-balance break-words text-slate-900">
              {experience.role}
            </h4>
            <p className="mt-0.5 text-[0.68rem] leading-4 font-bold text-pretty break-words text-cyan-700 dark:text-cyan-300">
              {experience.company}
            </p>
          </div>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-2 text-[0.64rem] leading-4">
          {experience.location ? (
            <div className="flex items-start gap-1.5">
              <MapPin
                aria-hidden
                className="mt-0.5 shrink-0 text-cyan-700 dark:text-cyan-300"
                size={13}
              />
              <div>
                <p className="font-mono text-[0.52rem] font-bold tracking-[0.08em] text-slate-500 uppercase dark:text-slate-400">
                  Ubicación
                </p>
                <p className="font-semibold text-slate-700 dark:text-slate-300">
                  {experience.location}
                </p>
              </div>
            </div>
          ) : null}
          <div className="flex items-start gap-1.5">
            <CalendarDays
              aria-hidden
              className="mt-0.5 shrink-0 text-cyan-700 dark:text-cyan-300"
              size={13}
            />
            <div>
              <p className="font-mono text-[0.52rem] font-bold tracking-[0.08em] text-slate-500 uppercase dark:text-slate-400">
                Periodo
              </p>
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                {period}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-1.5">
            <BriefcaseBusiness
              aria-hidden
              className="mt-0.5 shrink-0 text-cyan-700 dark:text-cyan-300"
              size={13}
            />
            <div>
              <p className="font-mono text-[0.52rem] font-bold tracking-[0.08em] text-slate-500 uppercase dark:text-slate-400">
                Estado
              </p>
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                {experience.isCurrent
                  ? 'Experiencia actual'
                  : 'Experiencia finalizada'}
              </p>
            </div>
          </div>
          {experience.certificateUrl ? (
            <div className="flex items-start gap-1.5">
              <Award
                aria-hidden
                className="mt-0.5 shrink-0 text-cyan-700 dark:text-cyan-300"
                size={13}
              />
              <div>
                <p className="font-mono text-[0.52rem] font-bold tracking-[0.08em] text-slate-500 uppercase dark:text-slate-400">
                  Certificación
                </p>
                <a
                  className="inline-flex items-center gap-1 font-bold text-cyan-800 underline decoration-cyan-600/35 underline-offset-2 hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
                  href={experience.certificateUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <BilingualText en="View certificate" es="Ver certificado" />
                  <ExternalLink aria-hidden size={11} />
                </a>
              </div>
            </div>
          ) : null}
          <div className="flex items-start gap-1.5">
            <Eye
              aria-hidden
              className="mt-0.5 shrink-0 text-cyan-700 dark:text-cyan-300"
              size={13}
            />
            <div>
              <p className="font-mono text-[0.52rem] font-bold tracking-[0.08em] text-slate-500 uppercase dark:text-slate-400">
                Más información
              </p>
              <button
                className="font-bold text-cyan-800 underline decoration-cyan-600/35 underline-offset-2 hover:text-cyan-600 focus-visible:outline-none dark:text-cyan-300 dark:hover:text-cyan-200"
                onClick={() => dialogRef.current?.showModal()}
                type="button"
              >
                <BilingualText en="View details" es="Ver detalle" />
              </button>
            </div>
          </div>
        </div>
      </article>

      <dialog
        aria-labelledby={titleId}
        className="bg-background text-foreground m-auto max-h-[88vh] w-[min(92vw,42rem)] overflow-y-auto rounded-2xl border border-cyan-500/25 p-0 shadow-2xl backdrop:bg-slate-950/70 backdrop:backdrop-blur-sm"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        ref={dialogRef}
      >
        <div className="border-border border-b bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-amber-400/10 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              {logo ? (
                <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <Image
                    alt={logo.alt}
                    className="object-contain p-1"
                    fill
                    sizes="48px"
                    src={logo.src}
                  />
                </span>
              ) : (
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md">
                  <BriefcaseBusiness aria-hidden size={20} />
                </span>
              )}
              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-cyan-700 uppercase dark:text-cyan-300">
                  Detalle de experiencia
                </p>
                <h2
                  className="mt-1 text-2xl font-extrabold tracking-tight"
                  id={titleId}
                >
                  {experience.role}
                </h2>
                <p className="mt-1 font-bold text-cyan-700 dark:text-cyan-300">
                  {experience.company}
                </p>
              </div>
            </div>
            <button
              aria-label="Cerrar detalle"
              className="border-border bg-background/80 text-muted-foreground hover:bg-muted hover:text-foreground flex size-9 shrink-0 items-center justify-center rounded-full border transition"
              onClick={() => dialogRef.current?.close()}
              type="button"
            >
              <X aria-hidden size={18} />
            </button>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <div className="text-muted-foreground flex flex-wrap gap-2 text-xs font-semibold">
            <span className="bg-muted inline-flex items-center gap-1.5 rounded-full px-3 py-1.5">
              <CalendarDays aria-hidden size={14} /> {period}
            </span>
            {experience.location ? (
              <span className="bg-muted inline-flex items-center gap-1.5 rounded-full px-3 py-1.5">
                <MapPin aria-hidden size={14} /> {experience.location}
              </span>
            ) : null}
          </div>
          <div className="border-border bg-muted/45 mt-5 rounded-xl border p-4">
            <h3 className="text-sm font-extrabold">Funciones y experiencia</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-7">
              {experience.description}
            </p>
          </div>
          {experience.certificateUrl ? (
            <a
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-sm font-bold text-cyan-700 transition hover:bg-cyan-500/15 dark:text-cyan-300"
              href={experience.certificateUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Award aria-hidden size={16} />{' '}
              <BilingualText en="View certificate" es="Ver certificación" />{' '}
              <ExternalLink aria-hidden size={14} />
            </a>
          ) : null}
        </div>
      </dialog>
    </>
  );
}
