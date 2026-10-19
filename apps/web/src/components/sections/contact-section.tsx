import { CodeXml, Mail, MessageCircle } from 'lucide-react';
import { siteContent } from '@/content/site';
import { ContactForm } from '../contact-form';
import { ProfessionalAssistant } from '../professional-assistant';
import { SectionHeading } from '../section-heading';

export function ContactSection() {
  return (
    <section
      className="border-border bg-muted/35 relative border-t py-12 sm:py-14"
      id="contacto"
    >
      <div
        aria-hidden
        className="absolute top-0 left-1/2 h-0.5 w-20 -translate-x-1/2 rounded-b-full bg-cyan-500"
      />
      <div className="mx-auto max-w-[88rem] px-5 lg:px-8">
        <SectionHeading
          description="Cuéntame sobre el reto, el equipo y el resultado que buscas."
          descriptionEn="Tell me about the challenge, the team and the outcome you need."
          eyebrow="06 / Contacto"
          eyebrowEn="06 / Contact"
          title="Contacto profesional."
          titleEn="Professional contact."
        />
        <div className="mt-5 flex flex-wrap gap-2 text-sm">
          <a
            className="border-border bg-surface hover:border-accent/40 hover:bg-background inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold shadow-sm transition hover:-translate-y-0.5"
            href={`mailto:${siteContent.email}`}
          >
            <Mail aria-hidden className="text-[#EA4335]" size={15} />{' '}
            {siteContent.email}
          </a>
          <a
            className="border-border bg-surface hover:bg-background inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-[#25D366]/60"
            href={siteContent.whatsapp.href}
            rel="noreferrer"
            target="_blank"
          >
            <MessageCircle aria-hidden className="text-[#25D366]" size={15} />{' '}
            WhatsApp {siteContent.whatsapp.label}
          </a>
          <a
            className="border-border bg-surface hover:bg-background inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-[#2388ff]/60"
            href={siteContent.github.href}
            rel="noreferrer"
            target="_blank"
          >
            <CodeXml aria-hidden className="text-[#2388ff]" size={15} />{' '}
            {siteContent.github.label}
          </a>
        </div>
        <div className="mt-4 grid grid-cols-1 items-stretch gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
          <ContactForm />
          <ProfessionalAssistant />
        </div>
      </div>
    </section>
  );
}
