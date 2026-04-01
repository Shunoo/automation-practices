import { Page, Locator, expect } from "@playwright/test";

export class SecureVaultDashboard {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly signIn: Locator;
  readonly tokenDisplay: Locator;
  readonly getProfileBtn: Locator;
  readonly getDataBtn: Locator;
  readonly logoutBtn: Locator;
  readonly sessionInfo: Locator;
  readonly signInAgainBtn: Locator;
  readonly expireMessageContainer: Locator;
  readonly errorMessage: string;
  readonly tokenTimer: Locator;
  readonly apiConsole: Locator;
  readonly expireMessage: string;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('[data-testid="username-input"]');
    this.password = page.locator('[data-testid="password-input"]');
    this.signIn = page.locator('[data-testid="login-button"]');
    this.tokenDisplay = page.locator('[data-testid="token-display"]');
    this.getProfileBtn = page.locator('[data-testid="api-call-button"]');
    this.getDataBtn = page.locator('[data-testid="api-data-button"]');
    this.logoutBtn = page.locator('[data-testid="logout-button"]');
    this.sessionInfo = page.locator('[data-testid="session-info"]');
    this.signInAgainBtn = page.locator('[data-testid="relogin-button"]');
    this.expireMessageContainer = page.locator(
      '[data-testid="session-expired-message"]',
    );
    this.errorMessage = "Invalid credentials. Use testuser / password123";
    this.tokenTimer = page.locator('[data-testid="token-timer"]');
    this.apiConsole = page.locator('[data-testid="response-log"]');
    this.expireMessage =
      "Your session has expired. Please sign in again to continue.";
  }

  /**
   * Allows the user to login
   * @param username
   * @param password
   */
  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.signIn.click();
  }

  /**
   * Fills the username
   * @param username
   */
  async fillUsername(username: string) {
    await this.username.clear();
    await this.username.click();
    await this.username.fill(username);
    await expect(await this.username.inputValue()).toBe(username);
  }

  /**
   * Fills the password
   * @param password
   */
  async fillPassword(password: string) {
    await this.password.clear();
    await this.password.click();
    await this.password.fill(password);
    await expect(await this.password.inputValue()).toBe(password);
  }

  /**
   * Validates error message on login screen
   */
  async validateErrorMessage() {
    await expect(
      this.page.locator('[data-testid="login-error"]').textContent(),
    ).toBe(this.errorMessage);
  }

  /**
   * Validate login sucess
   */
  async validateLoginSuccess() {
    await expect(this.tokenDisplay).toBeVisible();
    await expect(this.tokenDisplay.textContent).not.toBe("");
    await expect(this.tokenTimer).toBeVisible();
    await expect(this.tokenTimer.textContent).not.toBe("Expired");
    await expect(this.signInAgainBtn).not.toBeVisible();
    await expect(this.expireMessageContainer).not.toBeVisible();
  }

  /**
   * Get last api profile
   */
  async getApiProfile() {
    await this.getProfileBtn.click();
    let log = await this.apiConsole
      .locator(".log-entry.success")
      .last()
      .innerHTML();
    await expect(log.includes("/api/profile → 200 OK")).toBe(true);
    log = await this.apiConsole
      .locator(".log-entry.success")
      .last()
      .innerHTML();
    await expect(
      await log.includes(
        'user\":\"testuser\",\"role\":\"user\",\"email\":\"test@example.com',
      ),
    ).toBe(true);
  }

  /**
   * Get last api data
   */
  async getApiData() {
    await this.getDataBtn.click();
    let log = await this.apiConsole
      .locator(".log-entry.success")
      .last()
      .innerHTML();
    await expect(log.includes("/api/data → 200 OK")).toBe(true);
    log = await this.apiConsole
      .locator(".log-entry.success")
      .last()
      .innerHTML();
    await expect(await log.includes('{\"items\":42,')).toBe(true);
  }

  /**
   * Validate if storage is clean
   */
  async validateStorageClean() {
    let helper = await this.page.context().storageState();
    await expect(
      helper.origins.at(0)?.localStorage.at(0)?.name,
    ).not.toBeTruthy();
    await expect(
      helper.origins.at(0)?.localStorage.at(0)?.value,
    ).not.toBeTruthy();
  }

  /**
   * Validate that storage has data from authentication
   */
  async validateStorageData() {
    let helper = await this.page.context().storageState();
    await expect(helper.origins.at(0)?.localStorage.at(0)?.name).toContain(
      "auth_token",
    );
    await expect(helper.origins.at(0)?.localStorage.at(0)?.value).not.toBe("");
  }

  /**
   * Logout
   */
  async logout() {
    await this.logoutBtn.click();
    await this.validateStorageClean();
  }

  /**
   * Validate session info
   * @param condition
   */
  async validateSessionInfo(condition: string) {
    await expect(this.sessionInfo).toContainText("User: testuser");
    switch (condition) {
      case "expired":
        await expect(this.sessionInfo).toContainText("Storage token: cleared", {
          timeout: 35_000,
        });
        await expect(this.sessionInfo).toContainText("Session flag: cleared", {
          timeout: 35_000,
        });
        await this.validateStorageClean();
        break;
      case "active":
        await expect(this.sessionInfo).toContainText("Storage token: present", {
          timeout: 35_000,
        });
        await expect(this.sessionInfo).toContainText("Session flag: true", {
          timeout: 35_000,
        });
        await this.validateStorageData();

        break;
    }
  }
  async validateExpiredOverlay() {
    await expect(this.expireMessageContainer).toBeVisible();
    await expect(this.expireMessageContainer.textContent).toBe(
      this.expireMessage,
    );
    await expect(this.signInAgainBtn).toBeVisible();
  }

  async signInAgain(username: string, password: string) {
    await this.signInAgainBtn.click();
    await this.validateStorageClean();
    await this.login(username, password);
  }
}
