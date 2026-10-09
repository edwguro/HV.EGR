'use client';

import { useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

export function AutoScrollRibbon({
  ariaLabel,
  children,
  className = '',
  itemCount,
}: {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  itemCount: number;
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
      { threshold: 0.2 },
    );

    observer.observe(ribbon);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ribbon = ribbonRef.current;
    if (!ribbon || reduceMotion || itemCount < 2) return;

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
  }, [itemCount, reduceMotion]);

  return (
    <div
      aria-label={ariaLabel}
      className={`flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pt-1 pb-3 ${className}`}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          pausedRef.current = false;
        }
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
      onPointerDown={() => {
        pausedRef.current = true;
      }}
      ref={ribbonRef}
      tabIndex={0}
    >
      {children}
    </div>
  );
}
