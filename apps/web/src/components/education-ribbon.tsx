'use client';

import type { EducationResponse } from '@portfolio/contracts';
import { useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { EducationCard } from './education-card';

export function EducationRibbon({
  education,
}: {
  education: EducationResponse[];
}) {
  const ribbonRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const visibleRef = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const ribbon = ribbonRef.current;
    if (!ribbon) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry?.isIntersecting ?? false;
      },
      { threshold: 0.25 },
    );

    observer.observe(ribbon);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ribbon = ribbonRef.current;
    if (!ribbon || reduceMotion || education.length < 2) return;

    let animationFrame = 0;
    let previousTime = performance.now();
    let direction = 1;

    const move = (time: number) => {
      const elapsed = Math.min(time - previousTime, 40);
      previousTime = time;

      if (visibleRef.current && !pausedRef.current) {
        const limit = ribbon.scrollWidth - ribbon.clientWidth;
        ribbon.scrollLeft += direction * elapsed * 0.022;

        if (ribbon.scrollLeft >= limit - 1) direction = -1;
        if (ribbon.scrollLeft <= 1) direction = 1;
      }

      animationFrame = requestAnimationFrame(move);
    };

    animationFrame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(animationFrame);
  }, [education.length, reduceMotion]);

  return (
    <div
      aria-label="Formacion academica en cinta horizontal"
      className="flex gap-1.5 overflow-x-auto overscroll-x-contain pt-1 pb-2"
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
      {education.map((item) => (
        <div
          className="w-[min(86vw,21rem)] shrink-0 [&>article]:h-full"
          key={`${item.institution}-${item.degree}`}
        >
          <EducationCard education={item} />
        </div>
      ))}
    </div>
  );
}
