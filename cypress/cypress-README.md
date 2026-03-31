# 🌲 Cypress — TypeScript

End-to-end tests for the automation challenges using **Cypress 13** with **TypeScript**.

---

## 📁 Folder Structure

```
cypress/
├── e2e/
│   ├── challenge-01-dynamic-table.cy.ts
│   ├── challenge-02-auth-token.cy.ts
│   └── ...
│
├── support/
│   ├── commands.ts           # Custom Cypress commands
│   └── e2e.ts                # Global setup / imports
│
├── fixtures/                 # Static test data (JSON)
├── cypress.config.ts
├── package.json
└── README.md                 ← You are here
```

---

## 🚀 Setup

### Prerequisites

- Node.js 18+
- Challenges server running at `http://localhost:8080`

### Install

```bash
cd cypress
npm install
```

---

## ▶️ Running Tests

```bash
# Open Cypress interactive runner
npx cypress open

# Run all tests headlessly (CI mode)
npx cypress run

# Run a specific challenge
npx cypress run --spec "e2e/challenge-01*"

# Run on a specific browser
npx cypress run --browser firefox
npx cypress run --browser chrome
npx cypress run --browser edge
```

---

## 🧪 Test Structure

```typescript
describe('Challenge 01 — Dynamic Table', () => {

  beforeEach(() => {
    cy.visit('/challenge-1-dynamic-table.html');
  });

  it('should load at least 5 rows without fixed waits', () => {
    cy.get('tbody tr').should('have.length.gte', 5);
  });

  it('should sort by price descending and verify order', () => {
    cy.contains('Price').click();
    cy.contains('Price').click(); // descending

    cy.get('tbody tr').then(rows => {
      const prices = [...rows].map(r =>
        parseFloat(r.querySelector('td:nth-child(3)')!.textContent!)
      );
      expect(prices).to.deep.equal([...prices].sort((a, b) => b - a));
    });
  });

});
```

---

## ⚙️ Configuration

`cypress.config.ts` is set up with:

| Setting | Value |
|---|---|
| `baseUrl` | `http://localhost:8080` |
| `viewportWidth` | `1280` |
| `viewportHeight` | `720` |
| `video` | `false` (enable for CI debugging) |
| `screenshotOnRunFailure` | `true` |
| `retries` | `{ runMode: 1, openMode: 0 }` |

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

> Status: 🟢 Done · 🟡 In Progress · ⚪ Not Started

---

## 💡 Patterns Used

- **No `cy.wait(number)`** — all waits use Cypress's built-in retry-ability
- **Custom commands** in `support/commands.ts` for repeated interactions
- **`cy.intercept()`** for API mocking (challenge 14)
- **Fixtures** for test data instead of hardcoded values
