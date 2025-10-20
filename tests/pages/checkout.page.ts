import { Locator, Page, expect } from "@playwright/test"
import { AppUrls } from 'tests/utils/app-urls'

export class CheckoutPage {
    constructor(private page: Page) {}

    //Locators
    private firstNameField = '#first-name'
    private lastNameField = '#last-name'
    private postalCodeField = '#postal-code'
    private continueButton = '#continue'
    
    get checkoutPageTitle(): Locator {
        return this.page.locator('.title')
    }

    async verifyCheckoutPageLoad() {
        await expect(this.page).toHaveURL(AppUrls.CHECKOUT)
        await expect(this.checkoutPageTitle).toHaveText('Checkout: Your Information')
    }
    
    async fillPaymentDetails(firstName: string, lastName: string, postal: string) {
        await this.page.fill(this.firstNameField, firstName)
        await this.page.fill(this.lastNameField, lastName)
        await this.page.fill(this.postalCodeField, postal)
    }
    
    async proceedToCheckoutOverviewPage() {
        await this.page.click(this.continueButton)
    }
}

