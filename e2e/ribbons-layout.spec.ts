import { expect, test } from '@playwright/test';

for (const width of [320, 390, 768, 1024, 1280, 1440]) {
  for (const theme of ['light', 'dark']) {
    test(`cintas completas y mockups uniformes: ${width}px, ${theme}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({
        reducedMotion: 'reduce',
        colorScheme: theme === 'dark' ? 'dark' : 'light',
      });
      await page.addInitScript(
        (value) => localStorage.setItem('theme', value),
        theme,
      );
      await page.goto('/', { waitUntil: 'networkidle' });
      const tracks = page.locator('.card-ribbon-track');
      await expect(tracks).toHaveCount(4);
      const geometry = await tracks.evaluateAll((elements) =>
        elements.map((element) => {
          const bounds = element.getBoundingClientRect();
          const cards = [...element.children].map((child) =>
            child.getBoundingClientRect(),
          );
          return {
            left: bounds.left,
            width: bounds.width,
            partial: cards.filter(
              (card) =>
                card.right > bounds.left + 1 &&
                card.left < bounds.right - 1 &&
                (card.left < bounds.left - 1 || card.right > bounds.right + 1),
            ).length,
          };
        }),
      );
      for (const track of geometry) {
        expect(track.left).toBeCloseTo(geometry[0].left, 0);
        expect(track.width).toBeCloseTo(geometry[0].width, 0);
        expect(track.partial).toBe(0);
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const covers = await page
        .locator('.project-cover')
        .evaluateAll((elements) =>
          elements.map((element) => ({
            width: element.clientWidth,
            height: element.clientHeight,
          })),
        );
      expect(covers.length).toBeGreaterThan(3);
      for (const cover of covers) {
        expect(Math.abs(cover.height - covers[0].height)).toBeLessThan(2);
        expect(Math.abs(cover.width / cover.height - 1.5)).toBeLessThan(0.03);
      }
      const projects = page.getByRole('region', {
        name: 'Proyectos en cinta horizontal',
        exact: true,
      });
      await projects.scrollIntoViewIfNeeded();
      const next = projects.getByRole('button', {
        name: 'Tarjetas siguientes',
      });
      await next.click();
      await expect(
        projects.getByRole('button', { name: 'Tarjetas anteriores' }),
      ).toBeEnabled();
      const track = projects.locator('.card-ribbon-track');
      await track.focus();
      await page.keyboard.press('ArrowLeft');
      await expect
        .poll(() => track.evaluate((element) => element.scrollLeft))
        .toBe(0);
      await expect(
        projects.getByRole('button', { name: 'Pausar cinta' }),
      ).toHaveCount(0);
      await page.screenshot({ path: `outputs/ribbons-${width}-${theme}.png` });
    });
  }
}

test('controles de pausa y texto ampliado sin desbordamiento', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });
  const projects = page.getByRole('region', {
    name: 'Proyectos en cinta horizontal',
    exact: true,
  });
  await projects.getByRole('button', { name: 'Pausar cinta' }).click();
  await expect(
    projects.getByRole('button', { name: 'Reanudar cinta' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Aumentar tamaño de letra' }).click();
  await page.getByRole('button', { name: 'Aumentar tamaño de letra' }).click();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
