'use client';

import { BookOpen, FileText, Menu, X } from 'lucide-react';
import Link from 'next/link';
import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import { siteContent } from '@/content/site';
import { AccessibilityControls } from './accessibility-controls';
import { BilingualText } from './bilingual-text';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';

const navStyle =
  'text-slate-700 after:bg-gradient-to-r after:from-blue-700 after:via-cyan-500 after:to-amber-400 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-blue-700/12 hover:via-cyan-500/10 hover:to-amber-400/12 hover:text-blue-800 focus-visible:bg-blue-700/12 focus-visible:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/45 aria-[current=page]:bg-gradient-to-r aria-[current=page]:from-blue-700/18 aria-[current=page]:via-cyan-500/16 aria-[current=page]:to-amber-400/18 aria-[current=page]:text-blue-950 aria-[current=page]:shadow-[0_5px_16px_-10px_rgb(8_47_73_/_0.85)] dark:text-slate-100 dark:hover:from-blue-400/18 dark:hover:via-cyan-300/14 dark:hover:to-amber-300/14 dark:hover:text-cyan-100 dark:focus-visible:bg-cyan-300/14 dark:focus-visible:text-cyan-100 dark:aria-[current=page]:from-blue-400/28 dark:aria-[current=page]:via-cyan-300/24 dark:aria-[current=page]:to-amber-300/18 dark:aria-[current=page]:text-white dark:aria-[current=page]:shadow-[0_5px_18px_-10px_rgb(34_211_238_/_0.75)]';

export function SiteHeader() {
  const [activeSection, setActiveSection] = useState('#inicio');
  const [menuOpen, setMenuOpen] = useState(false);

  const navigateTo = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    event.preventDefault();
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    target.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
    window.history.replaceState(null, '', href);
    setActiveSection(href);
    setMenuOpen(false);
  };

  useEffect(() => {
    const sections = siteContent.navigation
      .map(({ href }) => document.querySelector(href))
      .filter((section): section is Element => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: '-35% 0px -55%', threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-blue-200/80 bg-gradient-to-r from-white/96 via-cyan-50/92 to-blue-50/96 shadow-[0_8px_26px_-20px_rgb(8_47_73_/_0.7)] backdrop-blur-xl dark:border-cyan-300/15 dark:from-slate-950/96 dark:via-slate-900/94 dark:to-cyan-950/80 dark:shadow-[0_8px_28px_-20px_rgb(34_211_238_/_0.45)] print:hidden">
      <div className="mx-auto flex min-h-16 max-w-[88rem] items-center justify-between gap-3 px-5 lg:px-8">
        <Link
          aria-label="EGR, Software Developer"
          className="group flex flex-col items-start gap-0 rounded-lg focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:outline-none"
          href="#inicio"
          onClick={(event: MouseEvent<HTMLAnchorElement>) =>
            navigateTo(event, '#inicio')
          }
        >
          <span className="text-2xl leading-none font-black tracking-[-0.065em] transition-transform duration-200 group-hover:translate-x-0.5 sm:text-3xl">
            <span className="text-blue-700 dark:text-blue-400">E</span>
            <span className="text-cyan-600 dark:text-cyan-400">G</span>
            <span className="text-amber-500 dark:text-amber-400">R</span>
            <span className="text-blue-700 dark:text-blue-400">.</span>
          </span>
          <span className="font-mono text-[0.52rem] leading-none font-bold tracking-[0.13em] text-blue-700 uppercase dark:text-blue-300">
            Software Developer
          </span>
          <span className="sr-only">{siteContent.name}</span>
        </Link>
        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-0.5 lg:flex"
        >
          {siteContent.navigation.map((item) => (
            <Link
              aria-current={activeSection === item.href ? 'page' : undefined}
              className={`relative rounded-lg px-3 py-2 text-xs font-bold tracking-[0.01em] transition-all duration-200 after:absolute after:bottom-0 after:left-3 after:h-0.5 after:w-0 after:rounded-full after:transition-all after:duration-200 hover:after:w-[calc(100%-1.5rem)] aria-[current=page]:after:w-[calc(100%-1.5rem)] ${navStyle}`}
              href={item.href}
              key={item.href}
              onClick={(event: MouseEvent<HTMLAnchorElement>) =>
                navigateTo(event, item.href)
              }
            >
              <BilingualText en={item.labelEn} es={item.label} />
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Button
            asChild
            className="hidden h-9 gap-2 rounded-lg px-3 text-xs font-bold xl:flex"
            variant="outline"
          >
            <Link href="/documentacion">
              <BookOpen aria-hidden size={15} />
              Docs
            </Link>
          </Button>
          <Button
            asChild
            className="hidden h-9 gap-2 rounded-lg bg-blue-700 px-3 text-xs font-bold text-white shadow-sm hover:bg-blue-800 sm:flex"
          >
            <Link href="/hoja-de-vida" rel="noreferrer" target="_blank">
              <FileText aria-hidden size={15} />
              Imprimir HV
            </Link>
          </Button>
          <AccessibilityControls />
          <ThemeToggle />
          <Button
            aria-expanded={menuOpen}
            aria-label="Abrir menú"
            className="size-9 p-0 lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
            variant="ghost"
          >
            {menuOpen ? (
              <X aria-hidden size={18} />
            ) : (
              <Menu aria-hidden size={18} />
            )}
          </Button>
        </div>
      </div>
      {menuOpen ? (
        <nav
          aria-label="Navegación móvil"
          className="grid border-t border-blue-200/75 bg-gradient-to-br from-white via-cyan-50 to-blue-50 p-3 lg:hidden dark:border-cyan-300/15 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950"
        >
          {siteContent.navigation.map((item) => (
            <Link
              aria-current={activeSection === item.href ? 'page' : undefined}
              className={`relative rounded-lg px-4 py-3 text-sm font-bold transition-all duration-200 after:absolute after:inset-y-2 after:left-0 after:w-0.5 after:scale-y-0 after:rounded-full after:transition-transform aria-[current=page]:after:scale-y-100 ${navStyle}`}
              href={item.href}
              key={item.href}
              onClick={(event: MouseEvent<HTMLAnchorElement>) =>
                navigateTo(event, item.href)
              }
            >
              <BilingualText en={item.labelEn} es={item.label} />
            </Link>
          ))}
          <Link
            className="mt-2 flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-3 text-sm font-bold text-white"
            href="/hoja-de-vida"
            onClick={() => setMenuOpen(false)}
            rel="noreferrer"
            target="_blank"
          >
            <FileText aria-hidden size={16} />
            Imprimir hoja de vida
          </Link>
          <Link
            className="mt-1 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-700/10 dark:text-cyan-300 dark:hover:bg-cyan-400/10"
            href="/documentacion"
            onClick={() => setMenuOpen(false)}
          >
            <BookOpen aria-hidden size={16} />
            Documentación técnica
          </Link>
        </nav>
      ) : null}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-blue-700/70 via-cyan-500/80 to-amber-500/60"
      />
    </header>
  );
}
