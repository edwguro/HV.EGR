import { expect, test } from '@playwright/test';

test('muestra los estudios en tarjetas compactas con detalle', async ({
  page,
}) => {
  await page.goto('/#educacion', { waitUntil: 'domcontentloaded' });

  const education = page.locator('#educacion');
  const ribbon = education.getByLabel(
    'Formacion academica en cinta horizontal',
  );
  await expect(ribbon).toBeVisible();
  await expect
    .poll(() => ribbon.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(0);

  const detailButtons = education.getByRole('button', { name: 'Ver detalle' });
  await expect(detailButtons.first()).toBeVisible();

  await detailButtons.first().click();
  const dialog = page.locator('dialog[open]');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(/Formaci/)).toBeVisible();
  await expect(
    dialog.getByRole('link', { name: /Ver certificaci/ }),
  ).toBeVisible();

  await dialog.getByRole('button', { name: 'Cerrar detalle' }).click();
  await expect(dialog).toBeHidden();
});
