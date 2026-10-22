import { expect, test } from '../../fixtures';

test.describe('Shopping flow', () => {
  test('logged-in customer adds a product and sees it in the cart @smoke', async ({
    loggedInPage,
    homePage,
    productPage,
    navBar,
    cartPage,
  }) => {
    await expect(loggedInPage.title).toBeVisible();
    await homePage.open();
    await homePage.openProduct('Bolt Cutters');
    await expect(productPage.name).toHaveText('Bolt Cutters');

    await productPage.addToCart.click();
    await expect(navBar.cartQuantity).toHaveText('1');

    await navBar.cartLink.click();
    await expect(cartPage.items).toContainText(['Bolt Cutters']);
  });

  test('customer updates product quantity in the cart', async ({
    homePage,
    productPage,
    navBar,
    cartPage,
  }) => {
    await homePage.open();
    await homePage.openProduct('Bolt Cutters');
    await productPage.addToCart.click();
    await expect(navBar.cartQuantity).toHaveText('1');

    await navBar.cartLink.click();
    await expect(cartPage.items).toContainText(['Bolt Cutters']);

    await cartPage.updateQuantity(0, 3);
    await expect(cartPage.quantities.first()).toHaveValue('3');
    await expect(navBar.cartQuantity).toHaveText('3');
  });

  test('customer removes a product from the cart @negative', async ({
    homePage,
    productPage,
    navBar,
    cartPage,
  }) => {
    await homePage.open();
    await homePage.openProduct('Bolt Cutters');
    await productPage.addToCart.click();
    await expect(navBar.cartQuantity).toHaveText('1');

    await navBar.cartLink.click();
    await expect(cartPage.items).toContainText(['Bolt Cutters']);

    await cartPage.removeItem(0);
    await expect(cartPage.items).toHaveCount(0);
    await expect(navBar.cartQuantity).not.toBeVisible();
  });

  test('empty cart displays no items and hides checkout actions @negative', async ({
    cartPage,
    navBar,
  }) => {
    await cartPage.open();
    await expect(cartPage.items).toHaveCount(0);
    await expect(cartPage.proceedButton).not.toBeVisible();
    await expect(navBar.cartQuantity).not.toBeVisible();
  });

  test('customer adds multiple distinct products and sees combined cart total', async ({
    homePage,
    productPage,
    navBar,
    cartPage,
  }) => {
    await homePage.open();
    await homePage.openProduct('Bolt Cutters');
    await productPage.addToCart.click();
    await expect(navBar.cartQuantity).toHaveText('1');

    await homePage.open();
    await homePage.openProduct('Pliers');
    await productPage.addToCart.click();
    await expect(navBar.cartQuantity).toHaveText('2');

    await navBar.cartLink.click();
    await expect(cartPage.items).toHaveCount(2);
    await expect(cartPage.items).toContainText(['Bolt Cutters', 'Pliers']);
    await expect(cartPage.cartTotal).toBeVisible();
  });

  test('cart retains items across page reload', async ({
    homePage,
    productPage,
    navBar,
    cartPage,
    page,
  }) => {
    await homePage.open();
    await homePage.openProduct('Bolt Cutters');
    await productPage.addToCart.click();
    await expect(navBar.cartQuantity).toHaveText('1');

    await navBar.cartLink.click();
    await expect(cartPage.items).toContainText(['Bolt Cutters']);

    await page.reload();
    await expect(cartPage.items).toContainText(['Bolt Cutters']);
    await expect(navBar.cartQuantity).toHaveText('1');
  });

  test('adding the same product repeatedly increases its quantity', async ({
    homePage,
    productPage,
    navBar,
    cartPage,
  }) => {
    await homePage.open();
    await homePage.openProduct('Bolt Cutters');
    await productPage.addToCart.click();
    await expect(navBar.cartQuantity).toHaveText('1');

    await productPage.addToCart.click();
    await expect(navBar.cartQuantity).toHaveText('2');

    await navBar.cartLink.click();
    await expect(cartPage.items).toHaveCount(1);
    await expect(cartPage.items).toContainText(['Bolt Cutters']);
    await expect(cartPage.quantities.first()).toHaveValue('2');
  });
});
