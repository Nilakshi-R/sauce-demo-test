import { Page, Locator, expect } from '@playwright/test'
import { AppUrls } from 'tests/utils/app-urls'

export class ProductPage {
    constructor(private page: Page) { }

    // Locators
    get productPageTitle(): Locator {
        return this.page.locator('.title')
    }

    get addToCartButtons(): Locator {
        return this.page.locator('.btn_inventory')
    }

    get item(): Locator {
        return this.page.locator('.inventory_item')
    }

    get itemNames(): Locator {
        return this.page.locator('.inventory_item_name')
    }

    get itemPrices(): Locator {
        return this.page.locator('.inventory_item_price')
    }

    get cartLink(): Locator {
        return this.page.locator('.shopping_cart_link')
    }

    async verifyProductPageLoaded() {
        await expect(this.page).toHaveURL(AppUrls.PRODUCTS)
        await expect(this.productPageTitle).toHaveText('Products')
    }

    /**
     * 
     * @param count - Number of items to add to the cart
     * @returns Array of selected item names and prices
     */
    async addItemsToCart(count: number): Promise<{ name: string; price: string }[]> {

        const selectedItems: { name: string; price: string }[] = []

        for (let i = 0; i < count; i++) {
            const item = this.item.nth(i)
            const itemName = (await item.locator('.inventory_item_name').textContent())?.trim() || ''
            const itemPrice = (await item.locator('.inventory_item_price').textContent())?.trim() || ''

            await item.locator('button.btn_inventory').click()

            selectedItems.push({ name: itemName, price: itemPrice })
        }
        return selectedItems
    }

    async proceedToCart() {
        await this.cartLink.click()
    }
}