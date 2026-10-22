# Playwright Framework

UI + API automation for [practicesoftwaretesting.com](https://practicesoftwaretesting.com) (API: `api.practicesoftwaretesting.com`) with Playwright, TypeScript, Zod, Allure and GitHub Actions.

| Folder | Purpose |
|---|---|
| `tests/` | Specs by type: `ui`, `api`, `e2e` |
| `pages/` | Page Objects and components |
| `api/` | `clients`, `endpoints`, `schemas` |
| `fixtures/` | Custom fixtures (setup/teardown) |
| `utils/`, `data/` | Helpers and data factories |
| `config/` | Environment config |
| `prompts/` | Versioned AI prompts and templates |
| `src/agent/` | AI test automation agent (Copilot SDK runner & tools) |
| `.github/` | Copilot instructions, custom chat agent (`.github/agents`), and CI workflow |
| `.vscode/` | Playwright MCP server configuration |
| `reports/` | HTML, Allure, traces, screenshots, videos (video on CI only) |

## Usage
```
npm install
npx playwright install chromium
copy .env.example .env
npm test            # or test:ui / test:api / test:e2e / test:smoke
npm run report      # Allure
npm run agent       # Run the AI automation agent
```
The demo customer (`customer@practicesoftwaretesting.com` / `welcome01`) is public.
