import { Page, expect } from '@playwright/test'
import { AppUrls } from 'tests/utils/app-urls'

export class LoginPage {
    constructor(private page: Page) { }

    private usernameField = '#user-name'
    private passwordField = '#password'
    private loginButton = '#login-button'

    async goToLoginPage() {
        await this.page.goto(AppUrls.HOME)
    }

    async login(username: string, password: string) {
        await this.page.fill(this.usernameField, username)
        await this.page.fill(this.passwordField, password)
        await this.page.click(this.loginButton)
    }
}