import dotenv from 'dotenv';
import path from 'path';

const target = process.env.TEST_ENV ?? 'dev';
dotenv.config({ path: path.resolve(__dirname, `.env.${target}`) });
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

export const env = {
  name: target,
  baseUrl: process.env.BASE_URL ?? 'https://practicesoftwaretesting.com',
  apiUrl: process.env.API_URL ?? 'https://api.practicesoftwaretesting.com',
  email: process.env.APP_EMAIL ?? 'customer@practicesoftwaretesting.com',
  password: process.env.APP_PASSWORD ?? 'welcome01',
};
