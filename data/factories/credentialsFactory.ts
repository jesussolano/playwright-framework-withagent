import { randomId } from '../../utils/helpers';

export function buildCredentials(overrides: Partial<{ email: string; password: string }> = {}) {
  return {
    email: `nobody_${randomId()}@example.com`,
    password: `Pw_${randomId()}!`,
    ...overrides,
  };
}
