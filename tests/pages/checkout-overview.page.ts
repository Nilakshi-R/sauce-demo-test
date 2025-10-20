import { Locator, Page, expect } from "@playwright/test"
import { AppUrls } from 'tests/utils/app-urls'

export class CheckoutOverviewPage {
    constructor(private page: Page) {}

    //Locators
    private finishButton = '#finish'

    get checkoutOverviewPageTitle(): Locator {
        return this.page.locator('.title')
    }

    get checkoutItems() {
        return this.page.locator('.cart_item');
    }

    get itemNames() {
        return this.page.locator('.inventory_item_name');
    }

    get itemPrices() {
        return this.page.locator('.inventory_item_price');
    }

    get summarySubtotal() {
        return this.page.locator('.summary_subtotal_label');
    }

    async verifyOverviewPageLoad() {
        await expect(this.page).toHaveURL(AppUrls.CHECKOUT_OVERVIEW)
        await expect(this.checkoutOverviewPageTitle).toHaveText('Checkout: Overview')
    }

    /**
     * Get all item names and prices displayed in checkout overview page
     * @returns Array of item name and prices
     */
    async getCheckoutItems(): Promise<{ name: string; price: string }[]> {
        const itemCount = await this.checkoutItems.count()
        const items: { name: string; price: string }[] = []

        for (let i = 0; i < itemCount; i++) {
            const name = (await this.itemNames.nth(i).textContent())?.trim() || ''
            const price = (await this.itemPrices.nth(i).textContent())?.trim() || ''
            items.push({ name, price })
        }
        return items
    }

    /**
     * Calculate the total of the item prices excluding tax
     * @returns Total price of the items
     */
    async calculateItemTotal(): Promise<number> {
        const prices = await this.itemPrices.allTextContents()
        const total = prices.reduce((sum, priceText) => {
            const price = parseFloat(priceText.replace('$', '').trim())
            return sum + price
        }, 0)
        return total
    }

    /**
     * Verify that the subtotal displayed matches the sum of item prices
     */
    async verifyItemTotalMatchesDisplayedSubtotal() {
        const expectedTotal = await this.calculateItemTotal()
        const subtotalText = await this.summarySubtotal.textContent()
        const displayedTotal = parseFloat(subtotalText?.replace('Item total: $', '').trim() || '0' )

        expect(displayedTotal).toBeCloseTo(expectedTotal, 2)
    }

    async finishPurchase() {
        await this.page.click(this.finishButton)
    }
}