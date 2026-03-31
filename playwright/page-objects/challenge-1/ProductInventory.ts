import { Page, Locator } from "playwright";
import { expect } from "playwright/test";
import { Product } from "../../entities/challenge-1/Product";

export class ProductInventory {
  readonly page: Page;
  readonly pagecount: Locator;
  readonly totalpages: Locator;
  readonly rowcount: Locator;
  readonly statustext: Locator;
  readonly loadMoreBtn: Locator;
  readonly productTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pagecount = page.locator("#page-count");
    this.totalpages = page.locator("#total-pages");
    this.rowcount = page.locator("#row-count");
    this.statustext = page.locator("#status-text");
    this.loadMoreBtn = page.locator("#load-more-btn");
    this.productTable = page.locator("#product-table");
  }

  /**
   * LoadMore products to the table
   */
  async loadMoreProducts() {
    let canIClick = await this.loadMoreBtn.isDisabled();
    if (!canIClick) {
      await this.loadMoreBtn.click();
    }
  }

  /**
   * Validate products from the table
   * @param productList
   */
  async validateExistingProducts(productList: Product[]) {
    //validate each product from the list
    productList.forEach(async (product) => {
      await expect(
        this.productTable.locator('[data-id="' + product.id + '"]').nth(0),
      ).toBe(product.id);
      await expect(
        this.productTable.locator('[data-id="' + product.id + '"]').nth(1),
      ).toBe(product.name + "");
      await expect(
        this.productTable.locator('[data-id="' + product.id + '"]').nth(2),
      ).toBe(product.price + "");
      await expect(
        this.productTable.locator('[data-id="' + product.id + '"]').nth(3),
      ).toBe(product.stock + "");
      await expect(
        this.productTable.locator('[data-id="' + product.id + '"]').nth(4),
      ).toBe(product.category + "");
    });
  }

  /** Validate that product doesn't exist
   *
   */
  async validateThatProductDoesntExist(product: Product) {
    await expect(
      this.productTable.locator('[data-name="' + product.name + '"]'),
    ).toHaveCount(0);
  }

  /** Wait for table to load
   *
   */
  async waitForTableToLoad() {
    await expect(this.statustext).not.toHaveText("Loading rows...", {
      timeout: 45_000,
    });
    const text = await this.statustext.textContent();
    if (text === "All data loaded") {
      await expect(this.statustext).toHaveText("All data loaded", {
        timeout: 45_000,
      });
    } else {
      await expect(this.statustext).toHaveText("Ready", { timeout: 45_000 });
    }
  }
  /** Validate if load btn is disable
   *
   */
  async validateDisableLoad() {
    await expect(this.loadMoreBtn).toBeDisabled();
  }
  /**
   * Sort column with direction
   * @param column
   * @param direction
   */
  async sortColByDirection(column: string, direction: string) {
    switch (direction) {
      case "asc":
        await this.productTable.locator("[data-column=" + column + "]").click();
        await expect(
          this.productTable.locator("[data-column=" + column + "]"),
        ).toHaveAttribute("class", "sortable sorted-asc");
        break;
      case "desc":
        await this.productTable.locator("[data-column=" + column + "]").click();
        await this.productTable.locator("[data-column=" + column + "]").click();
        await expect(
          this.productTable.locator("[data-column=" + column + "]"),
        ).toHaveAttribute("class", "sortable sorted-desc");
        break;
      default:
        await expect(
          this.productTable.locator("[data-column=" + column + "]"),
        ).not.toHaveAttribute("class", "sortable sorted-desc");
        await expect(
          this.productTable.locator("[data-column=" + column + "]"),
        ).not.toHaveAttribute("class", "sortable sorted-asc");
    }
  }

  /**
   * Verify if data is sorted properly
   * @param column
   * @param direction
   * @returns
   */
  async isListedSortedBy(column: keyof Product, direction: "asc" | "desc") {
    await this.sortColByDirection(column, direction);

    const productList: Product[] = await this.getDataFromList();

    const condition = this.isSorted(productList, column, direction === "asc");

    return condition;
  }

  /**
   * get all data from the table list
   * @returns product list from the table list
   */
  async getDataFromList() {
    // product List
    let productList: Product[] = [];
    for (let i = 1; i < (await this.productTable.locator("tr").count()); i++) {
      const row = await this.productTable.locator("tr").nth(i);
      productList.push({
        id: parseInt((await row.locator("td").nth(0).textContent()) || "0"),
        name: (await row.locator("td").nth(1).textContent()) || "",
        category: (await row.locator("td").nth(4).textContent()) || "",
        price: parseFloat(
          (await row.locator("td").nth(2).textContent()) || "0",
        ),
        stock: parseInt((await row.locator("td").nth(3).textContent()) || "0"),
      });
    }
    return productList;
  }

  /**
   * Sorts the array with the dinamic field and with the condition we want by default ascending
   */
  async isSorted(
    productList: Product[],
    field: keyof Product,
    asc: boolean = true,
  ) {
    return productList.every((item, i, arr) => {
      if (i === 0) return true;

      const prev = arr[i - 1][field];
      const curr = item[field];

      if (typeof prev === "number" && typeof curr === "number") {
        return asc ? prev <= curr : prev >= curr;
      }

      return asc
        ? String(prev).localeCompare(String(curr)) <= 0
        : String(prev).localeCompare(String(curr)) >= 0;
    });
  }

  /**
   * Load the page fully
   */
  async loadPageFully() {
    for (let i = 0; i < 6; i++) {
      await this.loadMoreProducts();
      await this.waitForTableToLoad();
    }

    await this.validateDisableLoad();
    await expect(await this.pagecount.textContent()).toBe("6");
    await expect(await this.totalpages.textContent()).toBe("6");
  }
}
