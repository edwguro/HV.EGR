import { expect, test } from '@playwright/test';

test('permite recorrer las secciones principales del portafolio', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Desarrollo de software',
  );

  const routes = [
    ['Perfil', '#perfil'],
    ['Trayectoria', '#trayectoria'],
    ['Educación', '#educacion'],
    ['Proyectos', '#proyectos'],
    ['Habilidades', '#habilidades'],
    ['Contacto', '#contacto'],
  ] as const;

  for (const [label, target] of routes) {
    await page.getByRole('link', { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${target}$`));
    await expect(page.locator(target)).toBeInViewport();
  }
});
