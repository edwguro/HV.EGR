import { expect, test } from '@playwright/test';

test('expone el README técnico en una vista compacta', async ({ page }) => {
  await page.goto('/documentacion', { waitUntil: 'domcontentloaded' });

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Arquitectura y operación del portafolio',
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Abrir en GitHub' }),
  ).toHaveAttribute('href', 'https://github.com/edwguro/HV.EGR#readme');
  await expect(page.getByText('Perfil técnico')).toBeVisible();
});
