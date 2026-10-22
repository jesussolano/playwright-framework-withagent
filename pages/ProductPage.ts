import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly path = '/product';
  readonly name: Locator;
  readonly addToCart: Locator;

  constructor(page: Page) {
    super(page);
    this.name = page.getByTestId('product-name');
    this.addToCart = page.getByTestId('add-to-cart');
  }
}
