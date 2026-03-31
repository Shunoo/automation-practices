# 🤖 Robot Framework — Python

End-to-end tests for the automation challenges using **Robot Framework** with the **Browser Library** (Playwright-based) or **SeleniumLibrary**.

---

## 📁 Folder Structure

```
robot/
├── tests/
│   ├── challenge_01_dynamic_table.robot
│   ├── challenge_02_auth_token.robot
│   └── ...
│
├── resources/
│   ├── keywords/             # Reusable keyword files
│   │   ├── common.resource
│   │   ├── table_keywords.resource
│   │   └── ...
│   └── variables/
│       └── config.robot      # Environment variables & config
│
├── results/                  # Test output (gitignored)
│   ├── output.xml
│   ├── log.html
│   └── report.html
│
├── requirements.txt
└── README.md                 ← You are here
```

---

## 🚀 Setup

### Prerequisites

- Python 3.9+
- Challenges server running at `http://localhost:8080`

### Install

```bash
cd robot
pip install -r requirements.txt

# If using Browser Library (Playwright-based)
rfbrowser init
```

### `requirements.txt`

```
robotframework>=7.0
robotframework-browser>=18.0       # Browser Library (Playwright)
robotframework-seleniumlibrary     # Alternative: SeleniumLibrary
```

---

## ▶️ Running Tests

```bash
# Run all tests
robot tests/

# Run a specific challenge
robot tests/challenge_01_dynamic_table.robot

# Run by tag
robot --include challenge:01 tests/

# Run with a specific output directory
robot --outputdir results/ tests/

# Run and generate report only
robot --report report.html --log log.html tests/
```

---

## 🧪 Test Structure

```robot
*** Settings ***
Library         Browser
Resource        ../resources/keywords/common.resource
Suite Setup     New Browser    chromium    headless=False
Suite Teardown  Close Browser

*** Variables ***
${BASE_URL}     http://localhost:8080

*** Test Cases ***
Should Load At Least 5 Rows Without Fixed Waits
    [Tags]    challenge:01
    New Page    ${BASE_URL}/challenge-1-dynamic-table.html
    Wait For Elements State    css=tbody tr    visible
    ${rows}=    Get Elements    css=tbody tr
    Length Should Be    ${rows}    >=    5

Should Sort By Price Descending
    [Tags]    challenge:01
    Click    text=Price
    Click    text=Price
    # verify descending order...
```

---

## ⚙️ Configuration

Variables are defined in `resources/variables/config.robot`:

```robot
*** Variables ***
${BASE_URL}         http://localhost:8080
${BROWSER}          chromium
${HEADLESS}         False
${TIMEOUT}          10s
${RETRY_COUNT}      3
```

Override at runtime:

```bash
robot --variable BROWSER:firefox --variable HEADLESS:True tests/
```

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

- **Keyword-Driven** — reusable `.resource` files for shared interactions
- **No `Sleep`** — use `Wait For Elements State` and `Wait Until Keyword Succeeds`
- **Tags** for selective test execution (`challenge:01`, `smoke`, `regression`)
- **Variables** file for environment config, overridable via CLI
