# v3 – Checkout agent

Create an E2E test for the checkout journey.

- Steps: login, add product, open cart, proceed to checkout, fill billing address, choose payment, confirm.
- Add any missing page objects under `pages/` (one class per page).
- Use the `loggedInPage` fixture for authentication.
- Assert the order confirmation message at the end.
