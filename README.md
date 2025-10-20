# Sauce Demo - End to end test automation for purchasing 1st two items in the product list
This project contains an automated end to end test case for complete purchasing first two products. It validates the selected item names, prices and calculated total item price(excluding tax)

# Test flow
purchase-product.spec.ts
1. Login with valid credentials
2. Add 1st two items to the cart
3. Proceed to Cart
4. Verify items names, prices in the cart
5. Proceed to checkout page
6. Enter payment details and proceed to checkout overview page
7. Verify items names, prices and sub total
8. Complete the purchase and verify purchasing success

# Project structure
|- SAUCE-DEMO-TEST
|----| tests
|--------|e2e
|-----------|purchase-products.spec.ts
|--------|pages
|-----------|cart.page.ts
|-----------|checkout-complete.page.ts
|-----------|checkout-overview.page.ts
|-----------|checkout.page.ts
|-----------|login.page.ts
|-----------|products.page.ts
|---------|test-data
|-----------|user.json
|---------|utils
|-----------|app-urls.ts
|README.md

# Technologies used
1. Framework: Playwright
2. Language: Typescript
3. Model: Page Object Model

# Steps to run the test
Run below command from project folder
    npx playwright test --project=chromium --headed "purchase-products.spec.ts"

# Futher Enhancements Options
- Add error handling to validate scenarios such as 
    - Item count is larger than number of listed items
- Config to maintain environment specific properties (dev, staging, production)