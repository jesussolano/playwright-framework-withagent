import { expect, test } from '../../fixtures';

test.describe('Product catalog', () => {
  test('home page lists products @smoke', async ({ homePage }) => {
    await homePage.open();
    await expect(homePage.productNames.first()).toBeVisible();
    expect(await homePage.productNames.count()).toBeGreaterThan(0);
  });

  test('search filters the catalog', async ({ homePage }) => {
    await homePage.open();
    await homePage.search('Pliers');
    await expect(homePage.searchCaption).toContainText('Pliers');
    await expect(homePage.productNames.first()).toContainText(/pliers/i);
  });

  test('search with no match shows an empty state @negative', async ({ homePage }) => {
    await homePage.open();
    await homePage.search('zzzzzzzz');
    await expect(homePage.noResults).toBeVisible();
  });
});
