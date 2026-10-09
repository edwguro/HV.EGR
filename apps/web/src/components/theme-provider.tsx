'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ComponentProps, PropsWithChildren } from 'react';

type ThemeProviderProps = PropsWithChildren<
  ComponentProps<typeof NextThemesProvider>
>;

export function ThemeProvider(props: ThemeProviderProps) {
  return <NextThemesProvider {...props} />;
}
