import { env } from '../../config/env';
import { expect, test } from '../../fixtures';

test.describe('Login', () => {
  test('valid customer lands on My account @smoke', async ({ loginPage, accountPage, page }) => {
    await loginPage.open();
    await loginPage.login(env.email, env.password);
    await expect(page).toHaveURL(/\/account/);
    await expect(accountPage.title).toHaveText('My account');
  });

  test('invalid password shows an error @negative', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(env.email, 'wrong_password');
    await expect(loginPage.error).toContainText('Invalid email or password');
  });

  test('empty fields display required validation errors @negative', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.submit.click();
    await expect(loginPage.emailError).toHaveText('Email is required');
    await expect(loginPage.passwordError).toHaveText('Password is required');
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('malformed email displays format validation error @negative', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.login('invalid-email-format', env.password);
    await expect(loginPage.emailError).toHaveText('Email format is invalid');
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('missing email displays email required validation error @negative', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.password.fill(env.password);
    await loginPage.submit.click();
    await expect(loginPage.emailError).toHaveText('Email is required');
    await expect(loginPage.passwordError).not.toBeVisible();
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('missing password displays password required validation error @negative', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.email.fill(env.email);
    await loginPage.submit.click();
    await expect(loginPage.passwordError).toHaveText('Password is required');
    await expect(loginPage.emailError).not.toBeVisible();
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('whitespace-only email displays email required validation error @negative', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.login('   ', env.password);
    await expect(loginPage.emailError).toHaveText('Email is required');
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('logout returns to sign in @smoke', async ({ loggedInPage, navBar }) => {
    await expect(loggedInPage.title).toBeVisible();
    await navBar.logout();
    await expect(navBar.signIn).toBeVisible();
  });
});
