import { ArrowUp, BookOpen, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { siteContent } from '@/content/site';
import { BilingualText } from './bilingual-text';

const socialLinks = [
  {
    href: siteContent.github.href,
    label: 'GitHub',
    icon: <GitHubLogo size={16} />,
    color: 'text-white hover:border-white/70 hover:bg-white/10',
  },
  {
    href: 'https://www.linkedin.com/in/edwin-gustavo-rodriguez-balcazares/',
    label: 'LinkedIn',
    icon: <LinkedInLogo size={16} />,
    color: 'text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2]/10',
  },
  {
    href: siteContent.whatsapp.href,
    label: 'WhatsApp',
    icon: <MessageCircle aria-hidden size={16} />,
    color: 'text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/10',
  },
  {
    href: `mailto:${siteContent.email}`,
    label: 'Correo',
    icon: <Mail aria-hidden size={16} />,
    color: 'text-[#EA4335] hover:border-[#EA4335] hover:bg-[#EA4335]/10',
  },
];

function GitHubLogo({ size = 18 }: { size?: number }) {
  return (
    <svg
      aria-hidden
      fill="currentColor"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.93 10.93 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.12 3.05.73.81 1.18 1.83 1.18 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}

function LinkedInLogo({ size = 18 }: { size?: number }) {
  return (
    <svg
      aria-hidden
      fill="currentColor"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.04H3.54V8.98H7.1v11.47ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#0b1118] text-slate-100">
      <div
        aria-hidden
        className="h-0.5 w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-amber-400"
      />
      <div className="mx-auto grid w-full max-w-[96rem] items-center gap-4 px-3 py-4 text-center md:grid-cols-[minmax(0,1fr)_auto] md:text-left lg:px-5">
        <div className="min-w-0">
          <div className="flex items-end justify-center gap-3 md:justify-start">
            <Link
              className="shrink-0 text-3xl leading-none font-black tracking-[-0.06em]"
              href="#inicio"
            >
              <span className="text-blue-400">E</span>
              <span className="text-cyan-400">G</span>
              <span className="text-amber-400">R</span>
              <span className="text-blue-400">.</span>
            </Link>
            <p className="border-l border-cyan-400/35 pl-3 font-mono text-[0.62rem] font-bold tracking-[0.12em] text-cyan-300 uppercase">
              <BilingualText
                en="Software Developer"
                es="Desarrollador de software"
              />
            </p>
          </div>
          <p className="mx-auto mt-2 max-w-2xl text-xs leading-5 text-slate-400 md:mx-0">
            <BilingualText
              en="Professional portfolio featuring experience, education, projects and the technologies behind each solution."
              es="Portafolio profesional con experiencia, formación, proyectos y las tecnologías que respaldan cada solución."
            />
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {socialLinks.map(({ color, href, icon, label }) => (
            <a
              aria-label={label}
              className={`inline-flex size-8 items-center justify-center rounded-md border border-slate-600/80 transition hover:-translate-y-0.5 ${color}`}
              href={href}
              key={label}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              target={href.startsWith('http') ? '_blank' : undefined}
              title={label}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
      <div className="relative border-t border-slate-700/60">
        <div
          aria-hidden
          className="absolute top-[-1px] left-1/2 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        />
        <div className="mx-auto flex w-full max-w-[96rem] flex-wrap items-center justify-center gap-x-4 gap-y-2 px-3 py-2.5 text-[0.68rem] text-slate-500 lg:px-5">
          <p>
            © {new Date().getFullYear()} {siteContent.name} ·{' '}
            <BilingualText
              en="Built with TypeScript"
              es="Creado con TypeScript"
            />
          </p>
          <Link
            className="inline-flex items-center gap-1 font-semibold text-cyan-300 hover:text-cyan-200"
            href="/documentacion"
          >
            <BookOpen aria-hidden size={13} />
            Documentación
          </Link>
          <a
            className="inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-cyan-400/45 text-cyan-300 transition hover:-translate-y-0.5 hover:bg-cyan-400 hover:text-slate-950"
            href="#inicio"
            aria-label="Volver al inicio"
          >
            <ArrowUp aria-hidden size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
