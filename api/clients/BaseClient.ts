import { APIRequestContext, APIResponse } from '@playwright/test';
import { ZodSchema } from 'zod';

export abstract class BaseClient {
  constructor(protected readonly request: APIRequestContext) {}

  protected get(url: string, params?: Record<string, string | number>): Promise<APIResponse> {
    return this.request.get(url, { params });
  }

  protected post(url: string, data: unknown): Promise<APIResponse> {
    return this.request.post(url, { data });
  }

  /** Parses the JSON body and fails with a readable error if it violates the schema. */
  async parse<T>(response: APIResponse, schema: ZodSchema<T>): Promise<T> {
    return schema.parse(await response.json());
  }
}
