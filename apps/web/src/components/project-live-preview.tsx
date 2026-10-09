'use client';

import { ArrowUpRight, MonitorPlay, X } from 'lucide-react';
import { useId, useRef, useState } from 'react';
import { BilingualText } from './bilingual-text';

export function ProjectLivePreview({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [opened, setOpened] = useState(false);

  const open = () => {
    setOpened(true);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <button
        className="inline-flex items-center gap-1 rounded-md bg-cyan-700 px-2 py-1.5 text-[0.66rem] font-bold text-white transition hover:bg-cyan-800 dark:bg-cyan-300 dark:text-slate-950 dark:hover:bg-cyan-200"
        onClick={open}
        type="button"
      >
        <MonitorPlay aria-hidden size={13} />{' '}
        <BilingualText en="Live app" es="App en vivo" />
      </button>
      <dialog
        aria-labelledby={titleId}
        className="bg-background text-foreground m-auto h-[min(88vh,52rem)] w-[min(95vw,76rem)] overflow-hidden rounded-2xl border border-cyan-500/30 p-0 shadow-2xl backdrop:bg-slate-950/75 backdrop:backdrop-blur-sm"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        ref={dialogRef}
      >
        <div className="border-border bg-surface flex items-center justify-between gap-4 border-b px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-bold tracking-[0.14em] text-cyan-700 uppercase dark:text-cyan-300">
              Aplicacion en ejecucion
            </p>
            <h2 className="truncate text-base font-extrabold" id={titleId}>
              {title}
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              className="border-border hover:bg-muted inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-bold"
              href={url}
              rel="noreferrer"
              target="_blank"
            >
              Abrir aparte <ArrowUpRight aria-hidden size={14} />
            </a>
            <button
              aria-label="Cerrar aplicacion"
              className="border-border hover:bg-muted flex size-9 items-center justify-center rounded-lg border"
              onClick={() => dialogRef.current?.close()}
              type="button"
            >
              <X aria-hidden size={17} />
            </button>
          </div>
        </div>
        <div className="h-[calc(100%-4rem)] bg-slate-100 dark:bg-slate-950">
          {opened ? (
            <iframe
              className="size-full border-0"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
              src={url}
              title={`Aplicacion ${title} en ejecucion`}
            />
          ) : null}
        </div>
      </dialog>
    </>
  );
}
