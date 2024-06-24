import { Page, expect } from "@playwright/test";

export class CompassHomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async verifyNavigateToCompassPage(expectedPageURL: string) {
        const actualPageURL = this.page.url();
        expect(actualPageURL).toBe(expectedPageURL);
    }
}