import type { EducationResponse } from '@portfolio/contracts';
import { AutoScrollRibbon } from './auto-scroll-ribbon';
import { EducationCard } from './education-card';

export function EducationRibbon({
  education,
}: {
  education: EducationResponse[];
}) {
  return (
    <AutoScrollRibbon
      ariaLabel="Formacion academica en cinta horizontal"
      itemCount={education.length}
    >
      {education.map((item) => (
        <div
          className="min-w-0 [&>article]:h-full"
          key={`${item.institution}-${item.degree}`}
        >
          <EducationCard education={item} />
        </div>
      ))}
    </AutoScrollRibbon>
  );
}
