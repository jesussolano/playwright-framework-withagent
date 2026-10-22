# v1 – Login flow

Generate Playwright tests for the login flow on practicesoftwaretesting.com.

- Use `LoginPage` from `pages/` and fixtures from `fixtures/`.
- Cover: valid login, invalid password, empty fields, logout.
- Use `getByTestId` (`data-test`) / `getByRole` locators only.
- Tag happy path with `@smoke`, failures with `@negative`.
