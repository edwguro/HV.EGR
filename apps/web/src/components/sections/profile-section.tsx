import type { ProfileResponse } from '@portfolio/contracts';
import { BriefcaseBusiness, GraduationCap } from 'lucide-react';
import { BilingualText } from '../bilingual-text';
import { EducationRibbon } from '../education-ribbon';
import { ExperienceRibbon } from '../experience-ribbon';

export function ProfileSection({
  profile,
}: {
  profile: ProfileResponse | null;
}) {
  return (
    <section className="border-border bg-background relative border-t py-10 sm:py-12">
      <div
        aria-hidden
        className="absolute top-0 left-1/2 h-0.5 w-20 -translate-x-1/2 rounded-b-full bg-cyan-500"
      />
      <div className="mx-auto max-w-[88rem] px-5 lg:px-8">
        {profile?.experiences.length ? (
          <div className="scroll-mt-24" id="trayectoria">
            <div className="border-border/80 border-b pb-4">
              <p className="font-mono text-xs font-bold tracking-[0.18em] text-cyan-600 uppercase dark:text-cyan-400">
                02 / Trayectoria
              </p>
              <div className="mt-2 flex items-center gap-3">
                <BriefcaseBusiness
                  aria-hidden
                  className="text-cyan-500"
                  size={24}
                />
                <h3 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                  <BilingualText
                    en="Career and professional experience"
                    es="Trayectoria y experiencia laboral"
                  />
                </h3>
              </div>
              <p className="text-muted-foreground mt-2 max-w-3xl text-sm leading-6">
                <BilingualText
                  en="Roles, responsibilities and verified achievements that show the evolution of my professional experience."
                  es="Roles, responsabilidades y logros verificables que muestran la evolución de mi experiencia profesional."
                />
              </p>
            </div>
            <div className="mt-3">
              <ExperienceRibbon experiences={profile.experiences} />
            </div>
          </div>
        ) : null}

        {profile?.education.length ? (
          <div
            className="border-border mt-7 scroll-mt-24 border-t pt-7"
            id="educacion"
          >
            <div className="border-border/80 border-b pb-4">
              <p className="font-mono text-xs font-bold tracking-[0.18em] text-emerald-700 uppercase dark:text-emerald-300">
                03 / Educación
              </p>
              <div className="mt-2 flex items-center gap-3">
                <GraduationCap
                  aria-hidden
                  className="text-emerald-600 dark:text-emerald-400"
                  size={26}
                />
                <h3 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                  <BilingualText
                    en="Academic background and certifications"
                    es="Formación académica y certificaciones"
                  />
                </h3>
              </div>
              <p className="text-muted-foreground mt-2 max-w-3xl text-sm leading-6">
                <BilingualText
                  en="Academic studies, complementary training and certificates that support my technical profile."
                  es="Estudios, formación complementaria y certificaciones que respaldan mi perfil técnico."
                />
              </p>
            </div>
            <div className="mt-3">
              <EducationRibbon education={profile.education} />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
