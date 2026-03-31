import {test, expect} from "@playwright/test";
import {ProductInventory } from "../page-objects/challenge-1/ProductInventory";

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/challenge-1-dynamic-table');
  const productInventoryPage = new ProductInventory(page);
  await productInventoryPage.waitForTableToLoad();
});
    
test.describe('Load Challenge - 1 Dynamic async table with sorting ' , () =>{
    
    test('Wait for initial load (5+ rows) with NO sleep/fixed waits',async ({page}) =>{
          const productInventoryPage = new ProductInventory(page);
          await productInventoryPage.waitForTableToLoad();
    })
    test('Sort by Price descending, verify order across all visible rows',async ({page}) =>{
         const productInventoryPage = new ProductInventory(page);
         await productInventoryPage.waitForTableToLoad();
        await productInventoryPage.sortColByDirection('price','desc');
        await productInventoryPage.isListedSortedBy('price','desc');
    })
    test('Load More, verify new rows respect sort',async ({page}) =>{
        const productInventoryPage = new ProductInventory(page);
        await productInventoryPage.loadMoreProducts();
        await productInventoryPage.sortColByDirection('price','desc');
        await expect(await productInventoryPage.isListedSortedBy('price','desc')).toBeTruthy();
    })
    test('Handle Load More becoming disabled when all data loaded',async ({page}) =>{
         const productInventoryPage = new ProductInventory(page);
         await productInventoryPage.loadPageFully();
    })
})