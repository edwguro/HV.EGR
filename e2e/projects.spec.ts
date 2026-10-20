import { expect, test } from '@playwright/test';

test('prioriza los proyectos en producción y enlaza PAUTAS JI', async ({
  page,
}) => {
  await page.goto('/#proyectos', { waitUntil: 'domcontentloaded' });

  const projects = page.locator('#proyectos').getByRole('article');
  await expect(projects.nth(0)).toContainText('PAUTAS JI');
  await expect(projects.nth(1)).toContainText(
    'Gestión administrativa EDS Combustibles',
  );

  const pautas = projects.filter({ hasText: 'PAUTAS JI' });
  await expect(pautas).toContainText('En producción');
  const github = pautas.getByRole('link', { name: 'GitHub', exact: true });
  await expect(github).toBeVisible();
  await expect(github).toHaveAttribute(
    'href',
    'https://github.com/edwguro/pautas-ji',
  );
  await expect(github).toHaveAttribute('target', '_blank');
  await expect(pautas.getByRole('link', { name: 'Ver web' })).toHaveAttribute(
    'href',
    'https://pautas-ji-web-production.up.railway.app/',
  );
});

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
