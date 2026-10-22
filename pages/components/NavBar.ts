import { Locator, Page } from '@playwright/test';

export class NavBar {
  readonly cartLink: Locator;
  readonly cartQuantity: Locator;
  readonly userMenu: Locator;
  readonly signOut: Locator;
  readonly signIn: Locator;

  constructor(page: Page) {
    this.cartLink = page.getByTestId('nav-cart');
    this.cartQuantity = page.getByTestId('cart-quantity');
    this.userMenu = page.getByTestId('nav-menu');
    this.signOut = page.getByTestId('nav-sign-out');
    this.signIn = page.getByTestId('nav-sign-in');
  }

  async logout(): Promise<void> {
    await this.userMenu.click();
    await this.signOut.click();
  }
}
