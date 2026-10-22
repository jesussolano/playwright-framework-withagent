# Playwright Framework Instructions

## Coding Standards
- Use TypeScript only
- Follow Page Object Model
- Add clear comments and typings

## Locator Strategy
- Prefer role/text, testId (`data-test` attribute)
- Avoid brittle selectors

## Test Design
- One assertion per test concept
- Use fixtures for setup/teardown

## API Testing
- Reusable clients and schemas
- Validate with Zod/JSON Schema

## General
- Keep tests independent
- Add meaningful commits
