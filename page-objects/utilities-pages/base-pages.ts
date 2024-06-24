import { Locator, Page } from "@playwright/test";
import { TrackerLoginPage } from "../login-pages/login-page";
import { TrackerDashboardPage } from "../../page-objects/dashboard-pages/dashboard-page.ts";

const email = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;

export class BasePage {

    static async click(page: Page, selector: Locator, maxAttempts: number = 3): Promise<void> {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                // Attempt to click the element
                await selector.click();

                // Wait for navigation to occur
                await Promise.race([
                    page.waitForNavigation(), // Wait for navigation event
                    page.waitForTimeout(5000) // Timeout after 5 seconds
                ]);

                // If navigation occurs, exit the loop
                return;
            } catch (error) {
                console.error(`Click attempt ${attempt} failed:`, error);
            }
        }
        throw new Error(`Failed to click element and navigate after ${maxAttempts} attempts`);
    }

    static async fill(selector: Locator, value: string, maxAttempts: number = 3): Promise<void> {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                // Fill the text box with the input value
                await selector.fill(value);

                // Verify the value of the text box
                const textboxValue = await selector.inputValue();

                // If the value matches the input value, exit the loop
                if (textboxValue === value) {
                    return;
                }
            } catch (error) {
                console.error(`Fill attempt ${attempt} failed:`, error);
            }
        }
        throw new Error(`Failed to fill text box with value after ${maxAttempts} attempts`);
    }

    static async reloadPage(page: Page) {
        await page.reload();
        await page.waitForLoadState('networkidle');
        console.log("currenct url: " + page.url());
        if (page.url().includes("https://demo-accounts.merklescience.com/")) {
            const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
            const trackerDashBoardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
            await trackerLoginPage.enterWelcomePageEmail(`${email}`);
            await trackerLoginPage.enterPasswordAndclickContinueBtn(`${password}`);
            await trackerDashBoardPage.verifyWelcomeToTrackerTitleIsVisible();
        }
    }
}