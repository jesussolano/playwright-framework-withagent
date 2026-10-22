import { test as base, expect } from '@playwright/test';
import { AuthClient } from '../api/clients/AuthClient';
import { ProductClient } from '../api/clients/ProductClient';
import { env } from '../config/env';
import { AccountPage } from '../pages/AccountPage';
import { CartPage } from '../pages/CartPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { NavBar } from '../pages/components/NavBar';

type Fixtures = {
  loginPage: LoginPage;
  accountPage: AccountPage;
  homePage: HomePage;
  productPage: ProductPage;
  cartPage: CartPage;
  navBar: NavBar;
  loggedInPage: AccountPage;
  productClient: ProductClient;
  authClient: AuthClient;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  accountPage: async ({ page }, use) => use(new AccountPage(page)),
  homePage: async ({ page }, use) => use(new HomePage(page)),
  productPage: async ({ page }, use) => use(new ProductPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  navBar: async ({ page }, use) => use(new NavBar(page)),

  // Authenticated session: setup happens before the test, no teardown required.
  loggedInPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(env.email, env.password);
    const account = new AccountPage(page);
    await expect(account.title).toBeVisible();
    await use(account);
  },

  productClient: async ({ request }, use) => use(new ProductClient(request)),
  authClient: async ({ request }, use) => use(new AuthClient(request)),
});

export { expect };
