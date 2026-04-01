# 🎭 Playwright — TypeScript

End-to-end tests for the automation challenges, written in **TypeScript** using [Playwright](https://playwright.dev).

This folder also contains a dedicated [`/playwright-agents`](../playwright-agents/) section for exploring **Playwright AI Agents**.

---

## 📁 Folder Structure

<details>
<summary>Click to expand</summary>

```
playwright/
├── tests/
│   ├── challenge-1/
│   │   └── challenge-1-dynamic-table.spec.ts
│   ├── challenge-2/
│   │   └── challenge-2-auth-token.spec.ts
│   └── ...
│
├── page-objects/
│   ├── challenge-1/
│   │   └── ProductInventory.ts
│   ├── challenge-2/
│   │   └── SecureVaultDashboard.ts
│   └── ...
│
├── entities/
│   ├── challenge-1/
│   │   └── Product.ts
│   └── ...
│
├── playwright.config.ts
├── package.json
└── README.md
```

</details>

---

## 🚀 Setup

<details>
<summary>Click to expand</summary>

### Prerequisites

- Node.js 18+
- Challenges server running at `http://localhost:3000`

### Install

```bash
cd playwright
npm install
npx playwright install
```

</details>

---

## ▶️ Running Tests

<details>
<summary>Click to expand</summary>

```bash
# Run all challenge tests
npx playwright test

# Run a specific challenge
npx playwright test challenge-1
npx playwright test challenge-2

# Run in headed mode (watch the browser)
npx playwright test --headed

# Run with UI mode (interactive debugger)
npx playwright test --ui

# Run on a specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

</details>

---

## 🧪 Approach & Patterns

<details>
<summary>Click to expand</summary>

### Page Object Model

Each challenge has its own Page Object under `page-objects/challenge-N/`. The PO encapsulates all selectors and interactions, keeping the spec files clean and readable.

```
tests/challenge-N/spec.ts         ← what to test
page-objects/challenge-N/PO.ts    ← how to interact
entities/challenge-N/Entity.ts    ← data shape
```

### Entities

Typed entity classes under `entities/` define the data shape used across page objects and assertions — no magic strings or `any` types.

### No fixed waits

All waits are condition-based — no `sleep()`, no `waitForTimeout()`.

```typescript
// Challenge 1 — wait for table status
await expect(this.statustext).not.toHaveText("Loading rows...", { timeout: 45_000 });

// Challenge 2 — wait for session expiry
await expect(this.sessionInfo).toContainText("Storage token: cleared", { timeout: 35_000 });
```

</details>

---

## 📋 Challenge Progress

| # | Challenge | Status | Notes |
|---|---|---|---|
| 1 | Dynamic Table | 🟢 | POM + entity, condition-based waits, sort validation |
| 2 | Auth Token | 🟢 | JWT lifecycle, storage validation, session expiry, re-login |
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
| 25 | Agents Challenge | ⚪ | See `/playwright-agents` |

> Status: 🟢 Done · 🟡 In Progress · ⚪ Not Started

---

## 🔍 Challenge Details

<details>
<summary>✅ Challenge 1 — Dynamic Table</summary>

<br>

**File:** `tests/challenge-1/challenge-1-dynamic-table.spec.ts`  
**Page Object:** `page-objects/challenge-1/ProductInventory.ts`  
**Entity:** `entities/challenge-1/Product.ts`

### Tests

| Test | Description |
|---|---|
| Initial load | Waits for 5+ rows with no `sleep` — uses status text conditions |
| Sort descending | Clicks price header twice, verifies CSS class + data order |
| Load More + sort | Loads more rows, sorts, verifies new rows respect sort order |
| Load More disabled | Iterates through all pages, asserts button becomes disabled |

### Key methods in `ProductInventory`

| Method | Purpose |
|---|---|
| `waitForTableToLoad()` | Waits for status text to leave "Loading rows..." state |
| `sortColByDirection(col, dir)` | Clicks header and asserts sort CSS class |
| `isListedSortedBy(col, dir)` | Reads DOM data and validates sort order |
| `getDataFromList()` | Extracts all rows into typed `Product[]` array |
| `loadMoreProducts()` | Clicks Load More if not disabled |
| `loadPageFully()` | Loops until all pages loaded, asserts button disabled |

</details>

---

<details>
<summary>✅ Challenge 2 — Auth Token Lifecycle</summary>

<br>

**File:** `tests/challenge-2/challenge-2-auth-token.spec.ts`  
**Page Object:** `page-objects/challenge-2/SecureVaultDashboard.ts`

### Tests

| Test | Description |
|---|---|
| Login + dashboard | Logs in, validates token visible, timer active, no expired overlay |
| API call `/api/profile` | Clicks button, asserts 200 OK and user data in response log |
| API call `/api/data` | Clicks button, asserts 200 OK and items payload in response log |
| Session expiry overlay | Waits for storage to clear, asserts expired overlay visible |
| Storage cleared after expiry | Validates localStorage is empty after token expires |
| Re-login after expiry | Signs in again from expired state, verifies clean session restored |

### Key methods in `SecureVaultDashboard`

| Method | Purpose |
|---|---|
| `login(user, pass)` | Fills credentials and submits login form |
| `validateLoginSuccess()` | Asserts token visible, timer active, no expired UI |
| `validateSessionInfo(condition)` | Checks session panel for `active` or `expired` state |
| `validateStorageData()` | Asserts `auth_token` present in localStorage |
| `validateStorageClean()` | Asserts localStorage is fully empty |
| `getApiProfile()` | Calls `/api/profile`, validates 200 and user payload in log |
| `getApiData()` | Calls `/api/data`, validates 200 and items payload in log |
| `validateExpiredOverlay()` | Asserts expired container and re-login button are visible |
| `signInAgain(user, pass)` | Clicks re-login button, validates clean storage, logs in again |

</details>

---

## 🤖 Agents

The [`/playwright-agents`](../playwright-agents/) folder is a separate learning space for **Playwright AI Agents**.

→ See [`playwright-agents/README.md`](../playwright-agents/README.md) for details.
