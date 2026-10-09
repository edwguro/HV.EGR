import type { Metadata } from 'next';
import { Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ResumeActions } from '@/components/resume-actions';
import { siteContent } from '@/content/site';
import { getProfile, getSkills } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Hoja de vida | Edwin Gustavo Rodríguez',
  description: 'Hoja de vida profesional, imprimible y descargable en PDF.',
};

const categoryLabels = {
  API: 'APIs',
  AI: 'Inteligencia artificial',
  BACKEND: 'Backend',
  DATABASE: 'Bases de datos',
  DEVOPS: 'Calidad y DevOps',
  FRONTEND: 'Frontend',
  NETWORKING: 'Redes',
} as const;

const formatPeriod = (value: string | null, current = false) => {
  if (current) return 'Actualidad';
  if (!value) return 'Sin fecha';
  return new Intl.DateTimeFormat('es-CO', {
    month: 'short',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(new Date(value));
};

function GitHubMark() {
  return (
    <svg aria-hidden fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.93 10.93 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.12 3.05.73.81 1.18 1.83 1.18 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}

function LinkedInMark() {
  return (
    <svg aria-hidden fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.04H3.54V8.98H7.1v11.47ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

function WhatsAppMark() {
  return (
    <svg aria-hidden fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.52 3.48A11.8 11.8 0 0 0 1.96 17.71L.3 23.7l6.13-1.61a11.79 11.79 0 0 0 5.64 1.44h.01A11.8 11.8 0 0 0 20.52 3.48Zm-8.44 18.06a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.64.95.97-3.54-.23-.36a9.82 9.82 0 1 1 8.26 4.53Zm5.39-7.35c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.76.96-.93 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.9 8.9 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.49.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.79.37-.27.3-1.03 1-1.03 2.45 0 1.44 1.06 2.84 1.2 3.04.15.2 2.08 3.18 5.04 4.46.7.3 1.25.49 1.68.62.71.22 1.35.19 1.86.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.56-.34Z" />
    </svg>
  );
}

export default async function ResumePage() {
  const [profile, skillGroups] = await Promise.all([getProfile(), getSkills()]);
  if (!profile) notFound();
  const displayName = profile.fullName.replace(/^Ing\.\s*/i, '');

  return (
    <main className="resume-screen min-h-screen bg-slate-100 px-3 py-6 text-slate-900 sm:px-6 print:bg-white print:p-0">
      <div className="mx-auto mb-4 max-w-[210mm] print:hidden">
        <ResumeActions />
      </div>

      <article className="resume-sheet mx-auto w-full max-w-[210mm] overflow-hidden bg-white shadow-xl print:max-w-none print:shadow-none">
        <header className="bg-[#245b9b] px-7 py-7 text-white sm:px-10 print:px-8 print:py-4">
          <div className="grid items-center gap-5 sm:grid-cols-[1fr_7.5rem] print:grid-cols-[1fr_6.5rem]">
            <div>
              <p className="mb-2 font-mono text-[0.68rem] font-bold tracking-[0.2em] text-cyan-100 uppercase">
                Hoja de vida profesional
              </p>
              <h1 className="text-3xl leading-tight font-black tracking-tight sm:text-4xl print:text-[25pt]">
                {displayName}
              </h1>
              <p className="mt-2 text-base font-semibold text-cyan-100 print:text-[11pt]">
                {profile.headline}
              </p>
            </div>
            <div className="mx-auto overflow-hidden rounded-2xl border-2 border-white/70 bg-white/10 shadow-lg print:rounded-xl">
              <Image
                alt={`Fotografía profesional de ${displayName}`}
                className="h-28 w-28 object-cover object-top print:h-20 print:w-20"
                height={112}
                priority
                src="/images/edwin-professional-portrait.png"
                width={112}
              />
            </div>
          </div>
          <div className="mt-5 grid gap-x-5 gap-y-2 border-t border-slate-700 pt-4 text-[0.7rem] text-slate-200 sm:grid-cols-2 print:grid-cols-2 print:text-[8pt]">
            {profile.email ? (
              <a
                className="resume-contact resume-contact-email"
                href={`mailto:${profile.email}`}
              >
                <span className="resume-contact-icon">
                  <Mail aria-hidden size={14} />
                </span>
                <span>{profile.email}</span>
              </a>
            ) : null}
            <a
              className="resume-contact resume-contact-whatsapp"
              href={siteContent.whatsapp.href}
            >
              <span className="resume-contact-icon">
                <WhatsAppMark />
              </span>
              <span>{siteContent.whatsapp.label}</span>
            </a>
            {profile.githubUrl ? (
              <a
                className="resume-contact resume-contact-github"
                href={profile.githubUrl}
              >
                <span className="resume-contact-icon">
                  <GitHubMark />
                </span>
                <span>github.com/edwguro</span>
              </a>
            ) : null}
            {profile.linkedinUrl ? (
              <a
                className="resume-contact resume-contact-linkedin"
                href={profile.linkedinUrl}
              >
                <span className="resume-contact-icon">
                  <LinkedInMark />
                </span>
                <span>LinkedIn · Edwin Gustavo Rodríguez</span>
              </a>
            ) : null}
            {profile.location ? (
              <span className="resume-contact resume-contact-location">
                <span className="resume-contact-icon">
                  <MapPin aria-hidden size={14} />
                </span>
                <span>{profile.location}</span>
              </span>
            ) : null}
          </div>
        </header>

        <div className="grid gap-7 px-7 py-7 sm:grid-cols-[1.55fr_0.85fr] sm:px-10 print:grid-cols-[1.55fr_0.85fr] print:gap-5 print:px-8 print:py-4">
          <div className="space-y-7 print:space-y-4">
            <section aria-labelledby="resume-profile">
              <h2 id="resume-profile" className="resume-title">
                Perfil profesional
              </h2>
              <p className="mt-3 text-[0.82rem] leading-relaxed text-slate-700 print:mt-2 print:text-[7.8pt] print:leading-[1.45]">
                {profile.professionalSummary}
              </p>
            </section>

            <section aria-labelledby="resume-experience">
              <h2 id="resume-experience" className="resume-title">
                Experiencia laboral
              </h2>
              <div className="mt-3 space-y-4 print:mt-2 print:space-y-2">
                {profile.experiences.map((experience) => (
                  <article
                    className="break-inside-avoid border-l-2 border-cyan-500 pl-4"
                    key={`${experience.company}-${experience.startDate}`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="text-sm font-extrabold text-slate-950 print:text-[9.5pt]">
                        {experience.role}
                      </h3>
                      <p className="font-mono text-[0.65rem] font-bold text-blue-700 print:text-[7.5pt]">
                        {formatPeriod(experience.startDate)} —{' '}
                        {formatPeriod(experience.endDate, experience.isCurrent)}
                      </p>
                    </div>
                    <p className="mt-0.5 text-xs font-bold text-blue-700 print:text-[8.3pt]">
                      {experience.company}
                    </p>
                    <p className="mt-1 text-[0.72rem] leading-relaxed text-slate-600 print:text-[7.1pt] print:leading-[1.35]">
                      {experience.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-7 sm:border-l sm:border-blue-300 sm:pl-6 print:space-y-4 print:border-l print:border-blue-300 print:pl-5">
            <section
              aria-labelledby="resume-education"
              className="break-inside-avoid bg-[#173f73] p-4 text-white shadow-sm print:p-3"
            >
              <h2
                id="resume-education"
                className="resume-title resume-title-light"
              >
                Educación
              </h2>
              <div className="mt-3 space-y-4 print:mt-2 print:space-y-2">
                {profile.education.map((education) => (
                  <article
                    className="break-inside-avoid"
                    key={`${education.institution}-${education.degree}`}
                  >
                    <h3 className="text-xs leading-snug font-extrabold text-white print:text-[8pt] print:leading-[1.25]">
                      {education.degree}
                    </h3>
                    <p className="mt-0.5 text-[0.7rem] font-bold text-cyan-200 print:text-[7.2pt]">
                      {education.institution}
                    </p>
                    <p className="mt-1 font-mono text-[0.62rem] text-blue-100 print:mt-0.5 print:text-[6.5pt]">
                      {formatPeriod(education.startDate)} —{' '}
                      {formatPeriod(education.endDate)}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="resume-skills">
              <h2 id="resume-skills" className="resume-title">
                Habilidades
              </h2>
              <div className="mt-3 space-y-3 print:mt-2 print:space-y-1.5">
                {skillGroups.map((group) => (
                  <div className="break-inside-avoid" key={group.category}>
                    <h3 className="text-[0.68rem] font-extrabold tracking-wide text-blue-800 uppercase print:text-[7pt]">
                      {categoryLabels[group.category]}
                    </h3>
                    <p className="mt-1 text-[0.7rem] leading-relaxed text-slate-600 print:mt-0.5 print:text-[6.8pt] print:leading-[1.35]">
                      {group.skills.join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </article>
    </main>
  );
}
