# v2 – API validation

Generate API tests for the given resource of api.practicesoftwaretesting.com.

- Reuse a client extending `BaseClient` in `api/clients/`.
- Define a Zod schema in `api/schemas/` and validate every success response.
- Cover status codes, negative scenarios (404, 401, invalid payload), and response assertions.
- Build request data with factories from `data/factories/`.
