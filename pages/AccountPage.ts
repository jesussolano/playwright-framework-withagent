import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
  readonly path = '/account';
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId('page-title');
  }
}
