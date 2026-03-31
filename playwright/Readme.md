# 🎭 Playwright — TypeScript

End-to-end tests for the automation challenges, written in **TypeScript** using [Playwright](https://playwright.dev).

This folder also contains a dedicated [`/agents`](./agents/) section for exploring **Playwright AI Agents**.

---

## 📁 Folder Structure

```
playwright/
├── tests/
│   ├── challenge-01-dynamic-table.spec.ts
│   ├── challenge-02-auth-token.spec.ts
│   ├── ...
│   └── challenge-25-*.spec.ts
│
├── agents/
│   ├── README.md             # Agents-specific docs
│   ├── examples/             # Agent usage examples
│   └── tasks/                # Agent-powered challenge solutions
│
├── fixtures/                 # Shared test fixtures and setup
├── utils/                    # Helpers (retry logic, wait utils, etc.)
├── playwright.config.ts
├── package.json
└── README.md                 ← You are here
```

---

## 🚀 Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Install

```bash
cd playwright
npm install
npx playwright install
```

---

## ▶️ Running Tests

```bash
# Run all challenge tests
npx playwright test

# Run a specific challenge
npx playwright test challenge-01

# Run in headed mode (watch the browser)
npx playwright test --headed

# Run with UI mode (interactive debugger)
npx playwright test --ui

# Run on a specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

---

## 🧪 Test Structure

Each challenge follows the same file and structure conventions:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Challenge 01 — Dynamic Table', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/challenge-1-dynamic-table.html');
  });

  test('should load at least 5 rows without fixed waits', async ({ page }) => {
    // ...
  });

  test('should sort by price descending and verify order', async ({ page }) => {
    // ...
  });

});
```

---

## ⚙️ Configuration

`playwright.config.ts` is set up with:

- **Base URL**: `http://localhost:8080`
- **Browsers**: Chromium (default), Firefox, WebKit
- **Retries**: 1 retry on CI, 0 locally
- **Reporter**: HTML report + console
- **Trace**: On first retry (for debugging)

---

## 🤖 Agents

The [`/agents`](./agents/) subfolder is a separate learning space for **Playwright AI Agents** — using LLMs to drive browser automation for tasks that go beyond deterministic scripts.

Topics explored:

- Natural language → browser actions
- Self-healing selectors
- Autonomous task completion
- Agent observability and tracing

→ See [`agents/README.md`](./agents/README.md) for details.

---

## 📋 Challenge Progress

| # | Challenge | Status | Notes |
|---|---|---|---|
| 1 | Dynamic Table | ⚪ | |
| 2 | Auth Token | ⚪ | |
| 3 | Multi-Tab | ⚪ | |
| 4 | Visual Regression | ⚪ | |
| 5 | Flaky App | ⚪ | |
| 6 | Kanban | ⚪ | |
| 7 | File Upload | ⚪ | |
| 8 | Infinite Scroll | ⚪ | |
| 9 | Date Picker | ⚪ | |
| 10 | Form Wizard | ⚪ | |
| 11 | Notifications | ⚪ | |
| 12 | iFrame + Shadow DOM | ⚪ | |
| 13 | Accessibility | ⚪ | |
| 14 | API Mocking | ⚪ | |
| 15 | Keyboard Nav | ⚪ | |
| 16 | Cookie Consent | ⚪ | |
| 17 | Responsive | ⚪ | |
| 18 | Rich Interactions | ⚪ | |
| 19 | Localization | ⚪ | |
| 20 | Chat | ⚪ | |
| 21 | Error Boundary | ⚪ | |
| 22 | Data Grid | ⚪ | |
| 23 | State Persistence | ⚪ | |
| 24 | Performance | ⚪ | |
| 25 | Agents Challenge | ⚪ | |

> Status: 🟢 Done · 🟡 In Progress · ⚪ Not Started

---

## 💡 Patterns Used

- **No `page.waitForTimeout()`** — all waits are condition-based (`waitForSelector`, `waitForResponse`, `waitForFunction`)
- **Custom retry utility** for flaky scenarios (challenge 5)
- **Page Object Model** where applicable for reusability
- **Fixtures** for shared setup (auth state, base navigation)
