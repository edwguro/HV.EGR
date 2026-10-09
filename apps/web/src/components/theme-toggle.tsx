'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { Button } from './ui/button';

interface ThemeApi {
  resolvedTheme?: string;
  setTheme: (theme: string) => void;
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme() as ThemeApi;
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  return (
    <Button
      aria-label="Cambiar tema de color"
      className="size-10 p-0"
      disabled={!mounted}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      type="button"
      variant="ghost"
    >
      {mounted && resolvedTheme === 'dark' ? (
        <Sun aria-hidden size={18} />
      ) : (
        <Moon aria-hidden size={18} />
      )}
    </Button>
  );
}
