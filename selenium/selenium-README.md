# 🔬 Selenium WebDriver — Java

End-to-end tests for the automation challenges using **Selenium WebDriver 4** with **Java** and **JUnit 5**.

---

## 📁 Folder Structure

```
selenium/
├── src/
│   ├── main/java/
│   │   ├── pages/            # Page Object Model classes
│   │   └── utils/            # Helpers (waits, retry, browser factory)
│   └── test/java/
│       ├── challenges/
│       │   ├── Challenge01DynamicTableTest.java
│       │   ├── Challenge02AuthTokenTest.java
│       │   └── ...
│       └── base/
│           └── BaseTest.java  # Shared setup / teardown
│
├── pom.xml
└── README.md                  ← You are here
```

---

## 🚀 Setup

### Prerequisites

- Java 17+
- Maven 3.8+
- Chrome / Firefox installed
- Challenges server running at `http://localhost:8080`

### Install & Build

```bash
cd selenium
mvn clean install -DskipTests
```

---

## ▶️ Running Tests

```bash
# Run all tests
mvn test

# Run a specific challenge
mvn test -Dtest=Challenge01DynamicTableTest

# Run on a specific browser (default: chrome)
mvn test -Dbrowser=firefox

# Run in headless mode
mvn test -Dheadless=true

# Run and generate Surefire report
mvn test surefire-report:report
```

---

## 🧪 Test Structure

```java
public class Challenge01DynamicTableTest extends BaseTest {

    @BeforeEach
    void navigate() {
        driver.get(BASE_URL + "/challenge-1-dynamic-table.html");
    }

    @Test
    @DisplayName("Should load at least 5 rows without fixed waits")
    void shouldLoadTableRows() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        List<WebElement> rows = wait.until(
            ExpectedConditions.numberOfElementsToBeMoreThan(By.cssSelector("tbody tr"), 4)
        );
        assertTrue(rows.size() >= 5);
    }
}
```

---

## ⚙️ Configuration

Configuration is managed through `pom.xml` system properties:

| Property | Default | Description |
|---|---|---|
| `browser` | `chrome` | Browser to use (`chrome`, `firefox`, `edge`) |
| `headless` | `false` | Run without UI |
| `base.url` | `http://localhost:8080` | Challenge server URL |
| `implicit.wait` | `0` | Implicit wait in seconds (keep at 0) |
| `explicit.wait` | `10` | Default explicit wait timeout |

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

- **Page Object Model** — separates page structure from test logic
- **Explicit waits only** — `WebDriverWait` + `ExpectedConditions`, no `Thread.sleep()`
- **Browser Factory** — abstract driver creation for multi-browser support
- **BaseTest** — shared `@BeforeEach` / `@AfterEach` lifecycle for driver setup/teardown
