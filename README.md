# 🤖 Automation Practices

> A hands-on portfolio of end-to-end test automation across multiple frameworks, built around a set of 25+ purpose-built UI challenges covering everything from async DOM manipulation to performance budgets.

---

## 📌 About This Repository

This repository documents my journey solving a structured set of E2E automation challenges using industry-standard frameworks. Each challenge targets a specific real-world testing scenario — from JWT lifecycle handling to drag & drop, accessibility auditing, and performance thresholds.

The goal is not just to make tests pass, but to write **robust, maintainable, CI-ready automation** that reflects professional standards.

---

## 🗂️ Repository Structure

```
automation-practices/
│
├── challenges/               # 25+ self-contained HTML challenge apps
│   └── README.md             # Challenge index, acceptance criteria & scoring
│
├── playwright/               # Playwright (TypeScript)
│   ├── tests/                # Challenge test specs
│   ├── agents/               # Playwright AI Agents exploration
│   └── README.md
│
├── selenium/                 # Selenium WebDriver (Java)
│   ├── src/test/java/
│   └── README.md
│
├── cypress/                  # Cypress (TypeScript)
│   ├── e2e/
│   └── README.md
│
├── robot/                    # Robot Framework (Python)
│   ├── tests/
│   └── README.md
│
└── README.md                 ← You are here
```

---

## ⚡ Quick Start

### Serve the challenges locally

All challenge files are self-contained HTML. Serve them with any static server:

```bash
# Python
python3 -m http.server 8080

# Node.js
npx serve ./challenges

# VS Code
# Use the "Live Server" extension
```

Then open: `http://localhost:8080/challenge-N-name.html`

---

## 🧩 The Challenges

25 UI challenges grouped by complexity — each one targeting a distinct automation skill:

| Group | Challenges | Focus |
|---|---|---|
| **Fundamentals** | 1–5 | Async loading, JWT lifecycle, multi-tab, visual regression, flakiness |
| **Interactions** | 6–10 | Drag & drop, file upload, infinite scroll, date picker, multi-step forms |
| **Advanced DOM** | 11–15 | Notifications, iFrame + Shadow DOM, accessibility, API mocking, keyboard nav |
| **Cross-Cutting** | 16–20 | Cookies, responsive design, clipboard, localization, real-time chat |
| **Expert** | 21–25 | Error boundaries, data grid, state persistence, performance budgets, agents |

→ Full challenge index and acceptance criteria: [`challenges/README.md`](./challenges/README.md)

---

## 🛠️ Frameworks

| Framework | Language | Folder | Status |
|---|---|---|---|
| [Playwright](https://playwright.dev) | TypeScript | [`/playwright`](./playwright/) | 🟡 In Progress |
| [Selenium WebDriver](https://www.selenium.dev) | Java | [`/selenium`](./selenium/) | 🟡 In Progress |
| [Cypress](https://www.cypress.io) | TypeScript | [`/cypress`](./cypress/) | 🟡 In Progress |
| [Robot Framework](https://robotframework.org) | Python | [`/robot`](./robot/) | 🟡 In Progress |

> Status legend: 🟢 Complete · 🟡 In Progress · ⚪ Not Started

---

## 📊 Scoring Rubric

Each solution is evaluated across five dimensions:

| Criteria | Weight | What it means |
|---|---|---|
| **Correctness** | 25% | Tests exactly what the acceptance criteria asks |
| **Robustness** | 25% | No fixed waits, handles edge cases and retries |
| **Code Quality** | 20% | Clean, readable, DRY, well-structured |
| **Real-World Readiness** | 15% | CI-friendly, good patterns, no hacks |
| **Edge Case Handling** | 15% | Boundaries, cleanup, error paths covered |

---

## 🧠 Playwright Agents

Inside [`/playwright/agents`](./playwright/agents/) there is a dedicated space for exploring **Playwright's AI agent capabilities** — how to combine LLMs with browser automation for tasks that go beyond scripted tests.

---

## 📬 Feedback & Evaluation

After each challenge is solved, solutions are submitted for structured AI-assisted code review covering correctness, patterns, and improvement suggestions.

---

*Built with curiosity and a stubborn refusal to use `sleep()`.*
