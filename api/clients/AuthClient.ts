import { APIResponse } from '@playwright/test';
import { endpoints } from '../endpoints/endpoints';
import { BaseClient } from './BaseClient';

export class AuthClient extends BaseClient {
  login(email: string, password: string): Promise<APIResponse> {
    return this.post(endpoints.login, { email, password });
  }

  loginRaw(data: unknown): Promise<APIResponse> {
    return this.post(endpoints.login, data);
  }
}
