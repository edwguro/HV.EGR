import { expect, test } from '@playwright/test';

test('valida y envía el formulario de contacto', async ({ page }) => {
  await page.goto('/#contacto', { waitUntil: 'domcontentloaded' });
  await page.getByLabel('Nombre').fill('Prueba E2E');
  await page
    .getByRole('textbox', { name: 'Correo', exact: true })
    .fill('playwright@example.com');
  await page
    .getByRole('textbox', { name: /^Empresa/ })
    .fill('Validación local');
  await page.getByLabel('Asunto').fill('Prueba automatizada');
  await page
    .getByLabel('Mensaje')
    .fill(
      'Este mensaje verifica el recorrido completo del formulario de contacto.',
    );
  await page.getByRole('button', { name: 'Enviar mensaje' }).click();
  await expect(page.getByRole('status')).toContainText('Mensaje recibido');
});
