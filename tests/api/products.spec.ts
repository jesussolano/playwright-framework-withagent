import { authErrorSchema, brandListSchema, loginResponseSchema, productPageSchema, productSchema } from '../../api/schemas/product.schema';
import { buildCredentials } from '../../data/factories/credentialsFactory';
import { env } from '../../config/env';
import { expect, test } from '../../fixtures';

test.describe('Products API', () => {
  test('list returns a schema-valid page @smoke', async ({ productClient }) => {
    const response = await productClient.list();
    expect(response.status()).toBe(200);
    const body = await productClient.parse(response, productPageSchema);
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('get by id returns the same product', async ({ productClient }) => {
    const first = (await productClient.parse(await productClient.list(), productPageSchema)).data[0];
    const response = await productClient.getById(first.id);
    expect(response.ok()).toBeTruthy();
    const product = await productClient.parse(response, productSchema);
    expect(product.name).toBe(first.name);
  });

  test('search returns matching products', async ({ productClient }) => {
    const body = await productClient.parse(await productClient.search('pliers'), productPageSchema);
    expect(body.data.length).toBeGreaterThan(0);
    for (const p of body.data) expect(p.name.toLowerCase()).toContain('pliers');
  });

  test('brands endpoint is schema-valid', async ({ productClient }) => {
    const brands = await productClient.parse(await productClient.brands(), brandListSchema);
    expect(brands.length).toBeGreaterThan(0);
  });

  test('unknown product is not found @negative', async ({ productClient }) => {
    const response = await productClient.getById('does-not-exist');
    expect(response.status()).toBe(404);
  });
});

test.describe('Auth API', () => {
  test('valid credentials return a token @smoke', async ({ authClient }) => {
    const response = await authClient.login(env.email, env.password);
    expect(response.status()).toBe(200);
    await authClient.parse(response, loginResponseSchema);
  });

  test('invalid credentials are rejected @negative', async ({ authClient }) => {
    const { email, password } = buildCredentials();
    const response = await authClient.login(email, password);
    expect(response.status()).toBe(401);
  });

  test('empty payload is rejected with error schema @negative', async ({ authClient }) => {
    const response = await authClient.loginRaw({});
    expect(response.status()).toBe(401);
    await authClient.parse(response, authErrorSchema);
  });

  test('case-insensitive email returns token @smoke', async ({ authClient }) => {
    const response = await authClient.login(env.email.toUpperCase(), env.password);
    expect(response.status()).toBe(200);
    await authClient.parse(response, loginResponseSchema);
  });
});
