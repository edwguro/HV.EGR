'use client';

import { Mail, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Button } from './ui/button';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
const apiUrl =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';
const fieldClass =
  'mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition placeholder:text-muted-foreground/65 focus:border-accent focus:ring-2 focus:ring-accent/15';

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    setStatus('submitting');
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      if (!response.ok) throw new Error('Contact request failed.');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="border-border bg-surface h-full rounded-xl border p-4 shadow-[0_12px_30px_-24px_rgb(15_23_42_/_0.45)] sm:p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className="bg-accent/10 text-accent flex size-9 items-center justify-center rounded-lg">
          <Mail aria-hidden size={17} />
        </span>
        <div>
          <h3 className="text-sm font-bold tracking-tight">Contacto directo</h3>
          <p className="text-muted-foreground text-xs">
            Respuesta al correo registrado
          </p>
        </div>
      </div>
      <form
        className="grid gap-3"
        onSubmit={(event) => void handleSubmit(event)}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-xs font-semibold">
            Nombre
            <input
              className={fieldClass}
              maxLength={160}
              minLength={2}
              name="name"
              required
            />
          </label>
          <label className="text-xs font-semibold">
            Correo
            <input
              className={fieldClass}
              maxLength={320}
              name="email"
              required
              type="email"
            />
          </label>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-xs font-semibold">
            Empresa{' '}
            <span className="text-muted-foreground font-normal">
              (opcional)
            </span>
            <input className={fieldClass} maxLength={180} name="company" />
          </label>
          <label className="text-xs font-semibold">
            Asunto
            <input
              className={fieldClass}
              maxLength={200}
              minLength={3}
              name="subject"
              required
            />
          </label>
        </div>
        <label className="text-xs font-semibold">
          Mensaje
          <textarea
            className={`${fieldClass} min-h-20 resize-y`}
            maxLength={5000}
            minLength={10}
            name="message"
            required
          />
        </label>
        <label aria-hidden className="absolute -left-[10000px]" tabIndex={-1}>
          Sitio web
          <input autoComplete="off" name="website" tabIndex={-1} />
        </label>
        <div className="flex min-h-9 flex-wrap items-center gap-3">
          <Button disabled={status === 'submitting'} type="submit">
            <Send aria-hidden size={15} />
            {status === 'submitting' ? 'Enviando…' : 'Enviar mensaje'}
          </Button>
          <p
            aria-live="polite"
            className="text-muted-foreground text-xs"
            role="status"
          >
            {status === 'success'
              ? 'Mensaje recibido. Gracias por contactarme.'
              : null}
            {status === 'error'
              ? 'No fue posible enviar el mensaje. Inténtalo nuevamente.'
              : null}
          </p>
        </div>
      </form>
    </div>
  );
}
