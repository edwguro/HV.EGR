'use client';

import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

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
  const interactingRef = useRef(false);
  const visibleRef = useRef(false);
  const directionRef = useRef(1);
  const reduceMotion = useReducedMotion();
  const trackId = useId();
  const [paused, setPaused] = useState(false);
  const [position, setPosition] = useState({
    first: 1,
    last: 1,
    atStart: true,
    atEnd: true,
  });

  const measure = useCallback(() => {
    const ribbon = ribbonRef.current;
    const card = ribbon?.firstElementChild;
    if (!ribbon || !(card instanceof HTMLElement)) return;
    const gap = Number.parseFloat(getComputedStyle(ribbon).columnGap) || 0;
    const step = card.getBoundingClientRect().width + gap;
    if (!step) return;
    const count = Math.max(1, Math.round((ribbon.clientWidth + gap) / step));
    const first = Math.round(ribbon.scrollLeft / step) + 1;
    const next = {
      first,
      last: Math.min(itemCount, first + count - 1),
      atStart: ribbon.scrollLeft <= 1,
      atEnd: ribbon.scrollLeft >= ribbon.scrollWidth - ribbon.clientWidth - 1,
    };
    setPosition((previous) =>
      previous.first === next.first &&
      previous.last === next.last &&
      previous.atStart === next.atStart &&
      previous.atEnd === next.atEnd
        ? previous
        : next,
    );
  }, [itemCount]);

  const move = useCallback(
    (direction: number) => {
      const ribbon = ribbonRef.current;
      if (!ribbon) return;
      const gap = Number.parseFloat(getComputedStyle(ribbon).columnGap) || 0;
      ribbon.scrollTo({
        left: Math.max(
          0,
          Math.min(
            ribbon.scrollWidth - ribbon.clientWidth,
            ribbon.scrollLeft + direction * (ribbon.clientWidth + gap),
          ),
        ),
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
    },
    [reduceMotion],
  );

  useEffect(() => {
    const ribbon = ribbonRef.current;
    if (!ribbon) return;
    const visibility = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry?.isIntersecting ?? false;
      },
      { threshold: 0.25 },
    );
    const resize = new ResizeObserver(measure);
    visibility.observe(ribbon);
    resize.observe(ribbon);
    ribbon.scrollLeft = 0;
    const frame = requestAnimationFrame(measure);
    return () => {
      visibility.disconnect();
      resize.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [measure]);

  useEffect(() => {
    if (reduceMotion || paused || itemCount < 2) return;
    const interval = window.setInterval(() => {
      const ribbon = ribbonRef.current;
      if (
        !ribbon ||
        !visibleRef.current ||
        interactingRef.current ||
        document.hidden
      )
        return;
      const limit = ribbon.scrollWidth - ribbon.clientWidth;
      if (limit <= 1) return;
      if (ribbon.scrollLeft >= limit - 1) directionRef.current = -1;
      if (ribbon.scrollLeft <= 1) directionRef.current = 1;
      move(directionRef.current);
    }, 6000);
    return () => window.clearInterval(interval);
  }, [itemCount, move, paused, reduceMotion]);

  const hasOverflow = !position.atStart || !position.atEnd;
  const controlClass =
    'border-border bg-surface text-foreground hover:bg-muted focus-visible:ring-accent inline-flex size-9 items-center justify-center rounded-lg border focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-35';
  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className={`card-ribbon ${className}`}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          interactingRef.current = false;
      }}
      onFocusCapture={() => {
        interactingRef.current = true;
      }}
      onMouseEnter={() => {
        interactingRef.current = true;
      }}
      onMouseLeave={(event) => {
        interactingRef.current = event.currentTarget.contains(
          document.activeElement,
        );
      }}
    >
      <div
        aria-label={`Tarjetas: ${ariaLabel}`}
        className="card-ribbon-track"
        id={trackId}
        onKeyDown={(event) => {
          if (
            event.target !== event.currentTarget ||
            !['ArrowLeft', 'ArrowRight'].includes(event.key)
          )
            return;
          event.preventDefault();
          setPaused(true);
          move(event.key === 'ArrowLeft' ? -1 : 1);
        }}
        onPointerDown={() => setPaused(true)}
        onWheel={() => setPaused(true)}
        onScroll={measure}
        ref={ribbonRef}
        tabIndex={hasOverflow ? 0 : undefined}
      >
        {children}
      </div>
      {hasOverflow ? (
        <div className="text-muted-foreground mt-1 flex items-center justify-between gap-3 text-xs">
          <span className="font-mono">
            {position.first}–{position.last} / {itemCount}
          </span>
          <div className="flex gap-2">
            {!reduceMotion ? (
              <button
                aria-label={paused ? 'Reanudar cinta' : 'Pausar cinta'}
                aria-controls={trackId}
                className={controlClass}
                onClick={() => setPaused((value) => !value)}
                type="button"
              >
                {paused ? (
                  <Play aria-hidden size={16} />
                ) : (
                  <Pause aria-hidden size={16} />
                )}
              </button>
            ) : null}
            <button
              aria-label="Tarjetas anteriores"
              aria-controls={trackId}
              className={controlClass}
              disabled={position.atStart}
              onClick={() => {
                setPaused(true);
                move(-1);
              }}
              type="button"
            >
              <ChevronLeft aria-hidden size={18} />
            </button>
            <button
              aria-label="Tarjetas siguientes"
              aria-controls={trackId}
              className={controlClass}
              disabled={position.atEnd}
              onClick={() => {
                setPaused(true);
                move(1);
              }}
              type="button"
            >
              <ChevronRight aria-hidden size={18} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
