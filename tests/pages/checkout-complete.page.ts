import { Locator, Page, expect } from "@playwright/test"
import { AppUrls } from 'tests/utils/app-urls'

export class CheckoutCompletePage {
    constructor(private page: Page) {}

    get checkoutCompletePageTitle(): Locator {
        return this.page.locator('.title')
    }

    async verifyCheckoutCompletePageLoad() {
        await expect(this.page).toHaveURL(AppUrls.CHECKOUT_COMPLETE)
        await expect(this.checkoutCompletePageTitle).toHaveText('Checkout: Complete!')
    }
}