import { Page, expect } from "@playwright/test";

export class KYBBHomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async verifyNavigateToKYBBPage(expectedPageURL: string) {
        const actualPageURL = this.page.url();
        expect(actualPageURL).toBe(expectedPageURL);
    }
}