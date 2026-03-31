# E2E Automation Challenge Kit — 24 Challenges

## Quick Setup

All challenges are self-contained HTML files. Serve them locally:

```bash
# Option 1: Python
python3 -m http.server 8080

# Option 2: Node.js
npx serve .

# Option 3: VS Code Live Server extension
```

Access each at `http://localhost:8080/challenge-N-name.html`

---

## Challenge Index

### Fundamentals (1–5)
| # | File | Focus Area |
|---|------|------------|
| 1 | `challenge-1-dynamic-table.html` | Async loading, sorting, robust waits, dynamic DOM |
| 2 | `challenge-2-auth-token.html` | JWT lifecycle, token expiry, session state, storage cleanup |
| 3 | `challenge-3-multi-tab.html` | Multi-tab/context, BroadcastChannel, cross-tab cart sync |
| 4 | `challenge-4-visual-regression.html` | Element screenshot, pixel diff, baseline management |
| 5 | `challenge-5-flaky-app.html` | Custom retry logic, error classification, flakiness handling |

### Interactions (6–10)
| # | File | Focus Area |
|---|------|------------|
| 6 | `challenge-6-kanban.html` | HTML5 drag & drop, column counts, move history, modals |
| 7 | `challenge-7-file-upload.html` | File input, drag-drop upload, validation, progress bars |
| 8 | `challenge-8-infinite-scroll.html` | IntersectionObserver, debounced search, category filters |
| 9 | `challenge-9-date-picker.html` | Calendar navigation, date range, booked dates, validation |
| 10 | `challenge-10-form-wizard.html` | Multi-step forms, per-step validation, review, back/next |

### Advanced DOM (11–15)
| # | File | Focus Area |
|---|------|------------|
| 11 | `challenge-11-notifications.html` | Toasts, auto-dismiss timers, mark read, batch actions |
| 12 | `challenge-12-iframe-shadow.html` | iFrame interaction, Shadow DOM, nested iFrame+Shadow |
| 13 | `challenge-13-accessibility.html` | a11y audit: contrast, labels, ARIA, focus trap, semantics |
| 14 | `challenge-14-api-mocking.html` | Intercept fetch, mock responses, test 200/400/404/slow |
| 15 | `challenge-15-keyboard-nav.html` | Tab order, arrow keys, dropdowns, tabs, accordion, toolbar |

### Cross-Cutting (16–20)
| # | File | Focus Area |
|---|------|------------|
| 16 | `challenge-16-cookie-consent.html` | Cookie banner, consent toggles, storage verification |
| 17 | `challenge-17-responsive.html` | Viewport resizing, mobile menu, layout shifts, hide/show |
| 18 | `challenge-18-rich-interactions.html` | Clipboard copy/paste, file download, color picker, sliders |
| 19 | `challenge-19-localization.html` | Language switch, RTL, number/date/currency format, plurals |
| 20 | `challenge-20-chat.html` | Real-time messaging, channels, typing indicators, unread |

### Expert (21–24)
| # | File | Focus Area |
|---|------|------------|
| 21 | `challenge-21-error-boundary.html` | Widget crash/recovery, network errors, unhandled exceptions |
| 22 | `challenge-22-data-grid.html` | Inline edit, sort, search, paginate, bulk select and delete |
| 23 | `challenge-23-state-persistence.html` | Hash routing, back/forward, localStorage, auto-save drafts |
| 24 | `challenge-24-performance.html` | Render stress test, FPS, blocking tasks, performance budgets |

---

## Acceptance Criteria per Challenge

### 1 — Dynamic Table
- Wait for initial load (5+ rows) with NO sleep/fixed waits
- Sort by Price descending, verify order across all visible rows
- Load More, verify new rows respect sort
- Handle Load More becoming disabled when all data loaded

### 2 — Auth Token Lifecycle
- Login with testuser/password123, verify dashboard
- Make API call, verify 200 in response log
- Wait for 30s expiry, verify session-expired overlay
- Verify localStorage/sessionStorage cleared after expiry
- Re-login, verify clean state

### 3 — Multi-Tab Workflow
- Open product listing (Tab 1), open 2 products in new tabs via URL params
- Add to cart in Tab 2, verify cart badge updates in Tab 1
- Close Tab 2, verify Tab 1 still works

### 4 — Visual Regression
- Screenshot only the revenue chart element
- Compare against baseline (auto-generate on first run)
- Fail with diff report if variance > 1%

### 5 — Retry Logic
- Custom retry up to 3x, ONLY for timeout/not-found errors
- Do NOT retry assertion errors
- Log each attempt with reason
- Final report: first try vs retry pass vs failed

### 6 — Kanban Drag and Drop
- Drag a card from To Do to In Progress
- Verify column counts update and move appears in history log
- Add a new card via modal, verify it appears in To Do
- Drag card to Done, verify full workflow

### 7 — File Upload
- Upload valid files (PNG, JPG, PDF under 5MB)
- Verify rejected files (wrong type, too large, duplicates)
- Verify progress bars fill, remove a file, submit upload

### 8 — Infinite Scroll
- Scroll to bottom, verify more articles load
- Filter by category, search with debounce
- Scroll to end, verify end message
- Combine search + filter, verify correct counts

### 9 — Date Picker
- Select check-in and check-out dates, verify range highlighting
- Try selecting range with booked dates, verify error
- Navigate months, confirm booking, verify dates become booked

### 10 — Multi-Step Form
- Fill each step with validation (empty fields, email, phone)
- Verify review page shows all data correctly
- Submit, verify success with reference number
- Test Back button preserves data

### 11 — Notifications
- Trigger each notification type, verify toast appears and auto-dismisses
- Mark read, Mark All Read, Dismiss All
- Trigger batch of 5 random notifications

### 12 — iFrame and Shadow DOM
- Fill form inside iFrame, submit, verify parent receives data
- Interact with Shadow DOM: input, tab switching, button clicks
- Navigate nested iFrame containing Shadow DOM, interact with counter

### 13 — Accessibility Audit
- Detect: low contrast, missing labels, fake buttons, missing alt text
- Detect: table without headers, modal without focus trap, color-only indicators
- Verify the good form section passes all checks

### 14 — API Mocking
- Intercept GET/POST/DELETE endpoints with mocked responses
- Test loading, success, 400, 404, and slow response states
- Verify request log captures all calls with correct methods

### 15 — Keyboard Navigation
- Tab through all elements in correct order
- Dropdown: Enter to open, Arrows to navigate, Escape to close
- Tabs: Arrow keys to switch, accordion: Enter/Space to toggle
- Toolbar: Arrow keys to navigate, Enter to activate

### 16 — Cookie Consent
- Accept All, verify all cookies set; Reject All, verify only essential
- Customize specific categories, save, reload, verify persistence
- Clear All, verify banner reappears

### 17 — Responsive Design
- Desktop (1280px): 3-col grid, nav visible, hamburger hidden
- Tablet (768px): 2-col grid, sidebar reorders
- Mobile (375px): 1-col, hamburger visible, mobile menu works
- Verify desktop-only and mobile-only content toggling

### 18 — Rich Interactions
- Copy code to clipboard, paste text into paste zone
- Trigger file downloads, change color picker, drag sliders
- Click share buttons, verify share log

### 19 — Localization
- Switch to each language, verify all text translates
- Arabic: verify RTL direction
- Verify currency/date/number format per locale
- Test pluralization rules per language

### 20 — Real-Time Chat
- Send message, verify status: Sent, Delivered, Read
- Verify bot replies with typing indicator
- Switch channels, verify separate histories and unread badges
- Click emoji, verify it appends to input

### 21 — Error Boundary
- Crash widgets, verify overlay; Retry, verify recovery
- Network offline/slow, verify error/loading states
- Form submit with 400/500/timeout, verify error messages
- Trigger JS exceptions, verify global handler catches them

### 22 — Editable Data Grid
- Double-click to inline edit, save with Enter, cancel with Escape
- Sort columns, search, paginate, change per-page
- Select rows, bulk delete, add new employee

### 23 — State Persistence
- Add to cart, reload, verify cart persists
- Navigate via tabs, use browser Back/Forward, verify correct page
- Auto-save form draft, reload, verify draft loads
- Save settings, reload, verify persistence; Clear All, verify reset

### 24 — Performance and Throttle
- Render 1000+ items, verify render time under budget
- Type rapidly, verify debounce reduces search count
- Blocking task: verify UI unresponsive; Async task: verify UI responsive
- Measure DOM nodes and FPS, verify within thresholds

---

## Frameworks and Languages

- **Selenium** with Java
- **Playwright** with JavaScript/TypeScript
- **Cypress** with JavaScript/TypeScript

## Scoring Rubric

| Criteria | Weight |
|---|---|
| Correctness (tests what is asked) | 25% |
| Robustness (no flaky waits, handles edge cases) | 25% |
| Code Quality (clean, readable, DRY) | 20% |
| Real-World Readiness (CI-friendly, good patterns) | 15% |
| Edge Case Handling (boundaries, cleanup, error paths) | 15% |
