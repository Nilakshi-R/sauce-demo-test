import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
    constructor(private page: Page) {}

    //Locators
    get cartItems(): Locator {
        return this.page.locator('.cart_item')
    }

    get checkoutButton(): Locator {
        return this.page.locator('.checkout_button')
    }

    get itemName(): Locator {
        return this.page.locator('.inventory_item_name')
    }

    async verifyItemsCount(expectedCount: number) {
        await expect(this.cartItems).toHaveCount(expectedCount)
    }

    /**
     * Retreive names and prices of the items in the cart
     * @returns Array of item names and prices
     */
    async getCartItems(): Promise<{ name: string; price: string }[]> {
        const items = this.cartItems
        const count = await items.count()
        const cartItems: { name: string, price: string }[] = []

        for (let i = 0; i < count; i++) {
            const item = items.nth(i)
            const name = (await item.locator('.inventory_item_name').textContent())?.trim() || ''
            const price = (await item.locator('.inventory_item_price').textContent())?.trim() || ''
            cartItems.push({ name, price })
        }
        return cartItems
    }

    async proceedToCheckoutPage() {
        await this.checkoutButton.click()
    }        
}