import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly path = '/';
  readonly productNames: Locator;
  readonly searchInput: Locator;
  readonly searchSubmit: Locator;
  readonly searchCaption: Locator;
  readonly noResults: Locator;

  constructor(page: Page) {
    super(page);
    this.noResults = page.getByText('There are no products found.');
    this.productNames = page.getByTestId('product-name');
    this.searchInput = page.getByTestId('search-query');
    this.searchSubmit = page.getByTestId('search-submit');
    this.searchCaption = page.getByTestId('search-caption');
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchSubmit.click();
  }

  async openProduct(name: string): Promise<void> {
    await this.page.getByTestId('product-name').filter({ hasText: name }).first().click();
  }
}
