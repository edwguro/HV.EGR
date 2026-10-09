'use client';

import { Download, Printer } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export function ResumeActions() {
  return (
    <div className="resume-actions flex flex-wrap items-center justify-center gap-2">
      <Button
        className="gap-2 bg-blue-700 text-white hover:bg-blue-800"
        onClick={() => window.print()}
        type="button"
      >
        <Printer aria-hidden size={16} />
        Imprimir / Guardar PDF
      </Button>
      <Button asChild className="gap-2" variant="outline">
        <Link download href="/documents/edwin-rodriguez-hv.pdf">
          <Download aria-hidden size={16} />
          Descargar PDF
        </Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href="/">Volver al portafolio</Link>
      </Button>
    </div>
  );
}
