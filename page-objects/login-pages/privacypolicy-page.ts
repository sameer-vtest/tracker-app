import { Page, expect, } from "@playwright/test";

export class PrivacyPolicyPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;

  }

  
  /**
  * This function is used to verify the privacy policy page is opened in new tab
  */
  async verifyPrivacyPolicyPageIsOpenInNewTab(title: string) {
    expect(this.page).toHaveTitle(title)
  }
}