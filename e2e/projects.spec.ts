import { expect, test } from '@playwright/test';

test('filtra proyectos y abre el detalle de La Fortaleza', async ({ page }) => {
  await page.goto('/#proyectos', { waitUntil: 'domcontentloaded' });
  await page
    .getByLabel('Categoría')
    .selectOption({ label: 'Gestión administrativa' });
  const projectsSection = page.locator('#proyectos');
  const project = projectsSection
    .getByRole('article')
    .filter({ hasText: 'Gestión administrativa EDS Combustibles' });
  await expect(project).toBeVisible();
  await expect(
    projectsSection.getByRole('article').filter({ hasText: 'Edufree API' }),
  ).toHaveCount(0);
  await project.getByRole('button', { name: 'App en vivo' }).click();
  const preview = page.getByRole('dialog');
  await expect(preview).toBeVisible();
  await expect(
    preview.getByTitle(
      'Aplicacion Gestión administrativa EDS Combustibles en ejecucion',
    ),
  ).toBeVisible();
  await preview.getByRole('button', { name: 'Cerrar aplicacion' }).click();

  await project.getByRole('link', { name: 'Ver detalle' }).click();
  await expect(page).toHaveURL(/\/proyectos\/fortaleza-app$/);
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Gestión administrativa EDS Combustibles',
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('img', {
      name: 'Interfaz de Gestión administrativa EDS Combustibles',
    }),
  ).toBeVisible();
});
