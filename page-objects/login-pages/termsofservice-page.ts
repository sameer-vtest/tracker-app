import { Page, expect, } from "@playwright/test";

export class TermsOfServicePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;

  }
  /**
  * This function is used to verify the terms of service page is opened in new tab
  */
  async verifyTermsAndServicePageIsOpenInNewTab(title: string) {
    expect(this.page).toHaveTitle(title)
  }
}