import { expect, test } from '@playwright/test';

test('muestra el detalle completo de cada experiencia en un modal', async ({
  page,
}) => {
  await page.goto('/#trayectoria', { waitUntil: 'domcontentloaded' });

  const detailButtons = page.getByRole('button', { name: 'Ver detalle' });
  await expect(detailButtons.first()).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Cambiar tema de color' }),
  ).toBeEnabled();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeHidden();
  await detailButtons.first().click();
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText('Funciones y experiencia')).toBeVisible();
  await expect(
    dialog.getByRole('link', { name: /Ver certificación/ }),
  ).toBeVisible();

  await dialog.getByRole('button', { name: 'Cerrar detalle' }).click();
  await expect(dialog).toBeHidden();
});
