import { utimesSync, watch } from 'node:fs';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const resumeFile = resolve('prisma/data/resume.ts');
let timer;
let running = false;
let pending = false;

function seedResume() {
  if (running) {
    pending = true;
    return;
  }

  running = true;
  console.log('[HV] Cambio detectado. Actualizando la base de datos...');

  const command =
    process.platform === 'win32'
      ? 'node_modules\\.bin\\tsx.cmd'
      : 'node_modules/.bin/tsx';
  const child = spawn(command, ['prisma/seed.ts'], {
    cwd: process.cwd(),
    shell: process.platform === 'win32',
    stdio: 'inherit',
  });

  child.on('exit', (code) => {
    running = false;
    if (code === 0) {
      const now = new Date();
      utimesSync(resolve('apps/web/src/app/page.tsx'), now, now);
    }
    console.log(
      code === 0
        ? '[HV] Datos actualizados y web refrescada.'
        : '[HV] No se pudo actualizar. Revisa la fecha o el registro editado.',
    );
    if (pending) {
      pending = false;
      seedResume();
    }
  });
}

watch(resumeFile, () => {
  clearTimeout(timer);
  timer = setTimeout(seedResume, 500);
});

console.log(`[HV] Observando cambios en ${resumeFile}`);
