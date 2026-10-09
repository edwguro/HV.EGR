import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import { SiteHeader } from '@/components/site-header';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title: {
    default: 'Edwin Gustavo Rodríguez | Desarrollador de software junior',
    template: '%s | Edwin Gustavo Rodríguez',
  },
  description:
    'Portafolio profesional de ingeniería de sistemas, desarrollo de software, aplicaciones web y redes.',
  alternates: { canonical: '/' },
  authors: [{ name: 'Edwin Gustavo Rodríguez' }],
  creator: 'Edwin Gustavo Rodríguez',
  keywords: [
    'ingeniero de sistemas',
    'desarrollador de software',
    'desarrollo web',
    'TypeScript',
    'redes',
  ],
  openGraph: {
    description:
      'Ingeniería de sistemas, desarrollo de software, aplicaciones web y redes.',
    locale: 'es_CO',
    siteName: 'Edwin Gustavo Rodríguez',
    title: 'Edwin Gustavo Rodríguez | Desarrollador de software junior',
    type: 'website',
    url: '/',
  },
  robots: {
    follow: true,
    index: true,
  },
  twitter: {
    card: 'summary_large_image',
    description:
      'Ingeniería de sistemas, desarrollo de software, aplicaciones web y redes.',
    title: 'Edwin Gustavo Rodríguez | Desarrollador de software junior',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a className="skip-link" href="#contenido">
            Saltar al contenido
          </a>
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
