import { APIResponse } from '@playwright/test';
import { endpoints } from '../endpoints/endpoints';
import { BaseClient } from './BaseClient';

export class ProductClient extends BaseClient {
  list(page = 1): Promise<APIResponse> {
    return this.get(endpoints.products, { page });
  }

  getById(id: string): Promise<APIResponse> {
    return this.get(endpoints.product(id));
  }

  search(query: string): Promise<APIResponse> {
    return this.get(endpoints.search, { q: query });
  }

  brands(): Promise<APIResponse> {
    return this.get(endpoints.brands);
  }
}
