'use client';

import { Languages, Type } from 'lucide-react';
import { useEffect, useSyncExternalStore } from 'react';
import { Button } from './ui/button';

type Language = 'es' | 'en';
const fontScales = [1, 1.125, 1.25] as const;

export function AccessibilityControls() {
  const preferences = useSyncExternalStore(
    (onChange) => {
      window.addEventListener('portfolio-preferences', onChange);
      window.addEventListener('storage', onChange);
      return () => {
        window.removeEventListener('portfolio-preferences', onChange);
        window.removeEventListener('storage', onChange);
      };
    },
    () =>
      `${localStorage.getItem('portfolio-language') ?? 'es'}|${localStorage.getItem('portfolio-font-scale') ?? '1'}`,
    () => 'es|1',
  );
  const [savedLanguage, savedScaleValue] = preferences.split('|');
  const language: Language = savedLanguage === 'en' ? 'en' : 'es';
  const parsedScale = Number(savedScaleValue);
  const fontScaleIndex = fontScales.includes(
    parsedScale as (typeof fontScales)[number],
  )
    ? fontScales.indexOf(parsedScale as (typeof fontScales)[number])
    : 0;
  const currentScale = fontScales[fontScaleIndex] ?? fontScales[0];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;
    document.documentElement.style.setProperty(
      '--user-font-scale',
      String(currentScale),
    );
  }, [currentScale, language]);

  const notifyPreferenceChange = () =>
    window.dispatchEvent(new Event('portfolio-preferences'));

  const toggleLanguage = () => {
    const nextLanguage: Language = language === 'es' ? 'en' : 'es';
    localStorage.setItem('portfolio-language', nextLanguage);
    notifyPreferenceChange();
  };

  const increaseFontSize = () => {
    const nextIndex = (fontScaleIndex + 1) % fontScales.length;
    const nextScale = fontScales[nextIndex] ?? fontScales[0];
    localStorage.setItem('portfolio-font-scale', String(nextScale));
    notifyPreferenceChange();
  };

  return (
    <div
      aria-label="Preferencias de accesibilidad"
      className="flex items-center gap-1"
      role="group"
    >
      <Button
        aria-label={
          language === 'es'
            ? 'Cambiar idioma a inglés'
            : 'Switch language to Spanish'
        }
        className="h-9 gap-1.5 px-2.5 text-xs"
        onClick={toggleLanguage}
        type="button"
        variant="ghost"
      >
        <Languages aria-hidden size={16} /> {language.toUpperCase()}
      </Button>
      <Button
        aria-label="Aumentar tamaño de letra"
        className="h-9 gap-1 px-2.5 text-xs"
        onClick={increaseFontSize}
        title={`${Math.round(currentScale * 100)}%`}
        type="button"
        variant="ghost"
      >
        <Type aria-hidden size={16} /> A{fontScaleIndex + 1}
      </Button>
    </div>
  );
}
