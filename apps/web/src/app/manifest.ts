import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Edwin Gustavo Rodríguez — Portafolio profesional',
    short_name: 'EGR Portafolio',
    description:
      'Portafolio profesional de ingeniería de sistemas y desarrollo de software.',
    display: 'standalone',
    background_color: '#0e100f',
    theme_color: '#0f766e',
    start_url: '/',
  };
}
