import { randomBytes } from 'crypto';

export function randomId(bytes = 4): string {
  return randomBytes(bytes).toString('hex');
}
