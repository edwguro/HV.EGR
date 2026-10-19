import type { ExperienceResponse } from '@portfolio/contracts';
import { AutoScrollRibbon } from './auto-scroll-ribbon';
import { ExperienceCard } from './experience-card';

export function ExperienceRibbon({
  experiences,
}: {
  experiences: ExperienceResponse[];
}) {
  return (
    <AutoScrollRibbon
      ariaLabel="Experiencias laborales en cinta horizontal"
      itemCount={experiences.length}
    >
      {experiences.map((experience) => (
        <div
          className="min-w-0 [&>article]:h-full"
          key={`${experience.company}-${experience.role}`}
        >
          <ExperienceCard experience={experience} />
        </div>
      ))}
    </AutoScrollRibbon>
  );
}
