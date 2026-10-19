'use client';

import { MessageCircle, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Button } from './ui/button';

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4100/api/v1';

export function ProfessionalAssistant() {
  const [answer, setAnswer] = useState(
    'Pregúntame sobre experiencia, habilidades o proyectos publicados.',
  );
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const form = event.currentTarget;
    const rawMessage = new FormData(form).get('message');
    if (typeof rawMessage !== 'string' || rawMessage.trim().length < 2) return;
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: rawMessage.trim() }),
      });
      if (!response.ok) throw new Error('Assistant request failed.');
      const result = (await response.json()) as { message: string };
      setAnswer(result.message);
      form.reset();
    } catch {
      setAnswer(
        'El asistente no está disponible ahora. Puedes usar el formulario de contacto.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border-border bg-surface flex h-full min-w-0 flex-col rounded-xl border p-4 shadow-[0_12px_30px_-24px_rgb(15_23_42_/_0.45)] sm:p-5">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
          <MessageCircle aria-hidden size={17} />
        </span>
        <div>
          <h3 className="text-sm font-bold tracking-tight">
            Asistente profesional
          </h3>
          <p className="text-muted-foreground text-xs">
            Responde solo con información verificada
          </p>
        </div>
      </div>
      <p
        aria-live="polite"
        className="border-border bg-muted/35 text-muted-foreground mt-4 min-h-14 flex-1 rounded-lg border p-3 text-sm leading-6"
      >
        {loading ? 'Consultando información verificada…' : answer}
      </p>
      <form
        className="mt-3 flex gap-2"
        onSubmit={(event) => void submit(event)}
      >
        <label className="sr-only" htmlFor="assistant-message">
          Pregunta para el asistente
        </label>
        <input
          className="border-border bg-background focus:border-accent focus:ring-accent/15 min-w-0 flex-1 rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2"
          id="assistant-message"
          maxLength={1000}
          name="message"
          placeholder="¿En qué tecnologías tiene experiencia?"
          required
        />
        <Button
          aria-label="Enviar pregunta"
          className="size-10 p-0"
          disabled={loading}
          type="submit"
        >
          <Send aria-hidden size={16} />
        </Button>
      </form>
    </div>
  );
}
