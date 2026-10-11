'use client';

import type { EducationResponse } from '@portfolio/contracts';
import {
  Award,
  BookOpen,
  CalendarDays,
  ExternalLink,
  Eye,
  GraduationCap,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useId, useRef } from 'react';
import { BilingualText } from './bilingual-text';

function institutionLogo(institution: string): string | null {
  const normalized = institution
    .toLocaleLowerCase('es')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
  if (normalized.includes('edutin')) {
    return '/images/education/edutin-academy.jpg';
  }
  if (normalized.includes('universidad de caldas')) {
    return '/images/education/universidad-caldas.jpg';
  }
  if (
    normalized.includes('cun') ||
    normalized.includes('corporacion nacional')
  ) {
    return '/images/cun-logo.png';
  }
  return null;
}

function institutionInitials(institution: string): string {
  return institution
    .split(/\s+/)
    .filter((word) => word.length > 2)
    .slice(0, 3)
    .map((word) => word[0]?.toUpperCase())
    .join('');
}

function year(value: string | null): string {
  return value ? String(new Date(value).getUTCFullYear()) : '';
}

export function EducationCard({ education }: { education: EducationResponse }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const logo = institutionLogo(education.institution);
  const period = [year(education.startDate), year(education.endDate)]
    .filter(Boolean)
    .join(' \u2014 ');

  return (
    <>
      <article className="group relative isolate flex min-h-0 flex-col border-r border-b border-emerald-700/20 py-3 pr-2.5 pl-3 transition hover:border-emerald-600/50 dark:border-slate-600/35 dark:hover:border-emerald-500/30">
        <div
          aria-hidden
          className="absolute inset-y-3 left-0 w-0.5 bg-gradient-to-b from-emerald-700 via-emerald-500 to-teal-400"
        />
        <div className="flex min-w-0 items-start gap-2.5">
          <span className="relative flex h-9 w-12 shrink-0 items-center justify-center overflow-hidden rounded border border-slate-200 bg-white">
            {logo ? (
              <Image
                alt={`Logo de ${education.institution}`}
                className="object-contain p-1"
                fill
                sizes="48px"
                src={logo}
              />
            ) : (
              <span className="font-mono text-xs font-black tracking-wider text-emerald-800">
                {institutionInitials(education.institution)}
              </span>
            )}
          </span>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm leading-4.5 font-extrabold tracking-tight text-balance break-words">
              {education.degree}
            </h4>
            <p className="mt-0.5 text-[0.68rem] leading-4 font-bold text-pretty break-words text-emerald-800 dark:text-emerald-300">
              {education.institution}
            </p>
          </div>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-2 text-[0.64rem] leading-4">
          {education.field ? (
            <div className="flex min-w-0 items-start gap-1.5">
              <BookOpen
                aria-hidden
                className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-300"
                size={13}
              />
              <div className="min-w-0">
                <p className="font-mono text-[0.52rem] font-bold tracking-[0.08em] text-slate-500 uppercase dark:text-slate-400">
                  Facultad / área
                </p>
                <p className="font-semibold text-slate-700 dark:text-slate-300">
                  {education.field}
                </p>
              </div>
            </div>
          ) : null}
          {period ? (
            <div className="flex items-start gap-1.5">
              <CalendarDays
                aria-hidden
                className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-300"
                size={13}
              />
              <div>
                <p className="font-mono text-[0.52rem] font-bold tracking-[0.08em] text-slate-500 uppercase dark:text-slate-400">
                  Periodo
                </p>
                <p className="font-semibold whitespace-nowrap text-slate-700 dark:text-slate-300">
                  {period}
                </p>
              </div>
            </div>
          ) : null}
          {education.certificateUrl ? (
            <div className="flex items-start gap-1.5">
              <Award
                aria-hidden
                className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-300"
                size={13}
              />
              <div>
                <p className="font-mono text-[0.52rem] font-bold tracking-[0.08em] text-slate-500 uppercase dark:text-slate-400">
                  Certificación
                </p>
                <a
                  className="inline-flex items-center gap-1 font-bold text-emerald-800 underline decoration-emerald-600/35 underline-offset-2 hover:text-emerald-600 dark:text-emerald-300 dark:hover:text-emerald-200"
                  href={education.certificateUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <BilingualText en="View certificate" es="Ver certificado" />
                  <ExternalLink aria-hidden size={11} />
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-1.5">
              <Award
                aria-hidden
                className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-300"
                size={13}
              />
              <div>
                <p className="font-mono text-[0.52rem] font-bold tracking-[0.08em] text-slate-500 uppercase dark:text-slate-400">
                  Certificación
                </p>
                <p className="font-bold text-amber-700 dark:text-amber-300">
                  <BilingualText
                    en="Certificate pending"
                    es="Pendiente de certificado"
                  />
                </p>
              </div>
            </div>
          )}
          <div className="flex items-start gap-1.5">
            <Eye
              aria-hidden
              className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-300"
              size={13}
            />
            <div>
              <p className="font-mono text-[0.52rem] font-bold tracking-[0.08em] text-slate-500 uppercase dark:text-slate-400">
                Más información
              </p>
              <button
                className="font-bold text-emerald-800 underline decoration-emerald-600/35 underline-offset-2 hover:text-emerald-600 focus-visible:outline-none dark:text-emerald-300 dark:hover:text-emerald-200"
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
        className="bg-background text-foreground m-auto max-h-[88vh] w-[min(92vw,40rem)] overflow-y-auto rounded-2xl border border-emerald-600/25 p-0 shadow-2xl backdrop:bg-slate-950/70 backdrop:backdrop-blur-sm"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        ref={dialogRef}
      >
        <div className="border-border border-b bg-gradient-to-r from-emerald-700/10 via-emerald-500/8 to-teal-400/10 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                {logo ? (
                  <Image
                    alt={`Logo de ${education.institution}`}
                    className="object-contain p-1"
                    fill
                    sizes="48px"
                    src={logo}
                  />
                ) : (
                  <GraduationCap
                    aria-hidden
                    className="text-emerald-700"
                    size={22}
                  />
                )}
              </span>
              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-emerald-800 uppercase dark:text-emerald-300">
                  {'Detalle acad\u00e9mico'}
                </p>
                <h2
                  className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl"
                  id={titleId}
                >
                  {education.degree}
                </h2>
                <p className="mt-1 text-sm font-bold text-emerald-800 dark:text-emerald-300">
                  {education.institution}
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
            {education.field ? (
              <span className="bg-muted rounded-full px-3 py-1.5">
                {education.field}
              </span>
            ) : null}
            {period ? (
              <span className="bg-muted inline-flex items-center gap-1.5 rounded-full px-3 py-1.5">
                <CalendarDays aria-hidden size={14} /> {period}
              </span>
            ) : null}
          </div>
          {education.description ? (
            <div className="border-border bg-muted/45 mt-5 rounded-xl border p-4">
              <h3 className="text-sm font-extrabold">
                {'Formaci\u00f3n y alcance'}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-7">
                {education.description}
              </p>
            </div>
          ) : null}
          {education.certificateUrl ? (
            <a
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-emerald-600/25 bg-emerald-600/10 px-4 py-2.5 text-sm font-bold text-emerald-800 transition hover:bg-emerald-600/15 dark:text-emerald-300"
              href={education.certificateUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Award aria-hidden size={16} />{' '}
              <BilingualText
                en="View certificate"
                es={'Ver certificaci\u00f3n'}
              />{' '}
              <ExternalLink aria-hidden size={14} />
            </a>
          ) : (
            <p className="mt-5 inline-flex items-center gap-2 rounded-lg border border-dashed border-amber-500/35 bg-amber-500/8 px-4 py-2.5 text-sm font-bold text-amber-700 dark:text-amber-300">
              <Award aria-hidden size={16} />{' '}
              <BilingualText
                en="Certificate pending"
                es="Pendiente de certificado"
              />
            </p>
          )}
        </div>
      </dialog>
    </>
  );
}
