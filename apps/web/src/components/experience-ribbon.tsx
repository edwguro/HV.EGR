'use client';

import type { ExperienceResponse } from '@portfolio/contracts';
import { useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { ExperienceCard } from './experience-card';

export function ExperienceRibbon({
  experiences,
}: {
  experiences: ExperienceResponse[];
}) {
  const ribbonRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const ribbon = ribbonRef.current;
    if (!ribbon || reduceMotion || experiences.length < 2) return;

    let animationFrame = 0;
    let previousTime = performance.now();
    let direction = 1;

    const move = (time: number) => {
      const elapsed = Math.min(time - previousTime, 40);
      previousTime = time;

      if (!pausedRef.current) {
        const limit = ribbon.scrollWidth - ribbon.clientWidth;
        ribbon.scrollLeft += direction * elapsed * 0.025;

        if (ribbon.scrollLeft >= limit - 1) direction = -1;
        if (ribbon.scrollLeft <= 1) direction = 1;
      }

      animationFrame = requestAnimationFrame(move);
    };

    animationFrame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(animationFrame);
  }, [experiences.length, reduceMotion]);

  return (
    <div
      aria-label="Experiencias laborales en cinta horizontal"
      className="flex snap-x snap-mandatory scrollbar-thin scrollbar-thumb-cyan-500/40 scrollbar-track-transparent gap-1.5 overflow-x-auto overscroll-x-contain pt-1 pb-2"
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          pausedRef.current = false;
      }}
      onFocusCapture={() => {
        pausedRef.current = true;
      }}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      ref={ribbonRef}
      tabIndex={0}
    >
      {experiences.map((experience) => (
        <div
          className="w-[min(86vw,21rem)] shrink-0 snap-start [&>article]:h-full"
          key={`${experience.company}-${experience.role}`}
        >
          <ExperienceCard experience={experience} />
        </div>
      ))}
    </div>
  );
}
