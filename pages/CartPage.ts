import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly path = '/checkout';
  readonly items: Locator;
  readonly quantities: Locator;
  readonly linePrices: Locator;
  readonly cartTotal: Locator;
  readonly deleteButtons: Locator;
  readonly proceedButton: Locator;

  constructor(page: Page) {
    super(page);
    this.items = page.getByTestId('product-title');
    this.quantities = page.getByTestId('product-quantity');
    this.linePrices = page.getByTestId('line-price');
    this.cartTotal = page.getByTestId('cart-total');
    this.deleteButtons = page.locator('table .btn-danger');
    this.proceedButton = page.getByTestId('proceed-1');
  }

  async updateQuantity(index: number, quantity: number): Promise<void> {
    const input = this.quantities.nth(index);
    await input.fill(String(quantity));
    await input.press('Enter');
  }

  async removeItem(index = 0): Promise<void> {
    await this.deleteButtons.nth(index).click();
  }
}
