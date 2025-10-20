import { test, expect } from '@playwright/test'
import { LoginPage } from 'tests/pages/login.page'
import { ProductPage } from 'tests/pages/products.page'
import { CartPage } from 'tests/pages/cart.page'
import { CheckoutPage } from 'tests/pages/checkout.page'
import { CheckoutOverviewPage } from 'tests/pages/checkout-overview.page'
import { CheckoutCompletePage } from 'tests/pages/checkout-complete.page'
import users from 'tests/test-data/users.json'

test('Verify purchasing first two items', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const productPage = new ProductPage(page)
    const cartPage = new CartPage(page)
    const checkoutPage = new CheckoutPage(page)
    const checkoutOverviewPage = new CheckoutOverviewPage(page)
    const checkoutCompletePage = new CheckoutCompletePage(page)

    // Step 1: Login
    await loginPage.goToLoginPage()
    await loginPage.login(users.userName.standardUser, users.password.password)

    //Verify Products page (successful login)
    await productPage.verifyProductPageLoaded()

    // Step 2: Add first two items to the cart and get the names and prices
    const selectedItems = await productPage.addItemsToCart(2)

    // Step 3: Go to shopping cart
    await productPage.proceedToCart()

    // Get item details from the cart page
    const cartItems = await cartPage.getCartItems()

    // Verify cart items by count, names and prices match
    expect(cartItems).toEqual(selectedItems)
    expect(cartItems).toHaveLength(2)

    // Step 4: Proceed to checkout
    await cartPage.proceedToCheckoutPage()

    // Verify checkout page load
    await checkoutPage.verifyCheckoutPageLoad()

    // Step 5: Fill payment details
    await checkoutPage.fillPaymentDetails('Nilakshi', 'Rajapakshe', '1234')

    // Step 6: Proceed to checkout overview page
    await checkoutPage.proceedToCheckoutOverviewPage()

    // Verify checkout overview page loaded
    await checkoutOverviewPage.verifyOverviewPageLoad()

    // Get checkout overview items
    const checkoutOverviewItems = await checkoutOverviewPage.getCheckoutItems()

    // Verify that item names & prices match those selected in the Product page
    expect(checkoutOverviewItems).toEqual(selectedItems)

    //Verify total matches displayed subtotal
    await checkoutOverviewPage.verifyItemTotalMatchesDisplayedSubtotal()

    // Step 6: Complete purchase
    await checkoutOverviewPage.finishPurchase()

    // Verify checkout complete page loaded
    await checkoutCompletePage.verifyCheckoutCompletePageLoad()
})