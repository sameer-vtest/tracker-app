import { Locator, Page, expect } from "@playwright/test";

export class TrackerProfileSettingsPage {
  readonly page: Page;
  readonly profileTab: Locator;
  readonly profileSettingsText: Locator;
  readonly subHeaderText: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly timeZone: Locator;
  readonly personalInformationSaveChangesButton: Locator;
  readonly headerChangePassword: Locator;
  readonly oldPassword: Locator;
  readonly newPassword: Locator;
  readonly confirmNewPassword: Locator;
  readonly passwordSaveChangesButton: Locator;
  readonly toastMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.profileTab = page.locator("//a[.='Profile']");
    this.profileSettingsText = page.locator("//h3[.='Profile Settings']");
    this.subHeaderText = page.locator("//h4[.='Personal Information']");
    this.firstName = page.locator('[id="firstName"]');
    this.lastName = page.locator('[id="lastName"]');
    this.timeZone = page.locator('(//button[@type="button"])[2]');
    this.personalInformationSaveChangesButton = page.locator("(//button[contains(text(),'Save Changes')])[1]");
    this.headerChangePassword = page.locator("//h4[.='Change Password']");
    this.oldPassword = page.locator('[id="oldPassword"]');
    this.newPassword = page.locator('[id="newPassword"]');
    this.confirmNewPassword = page.locator('[id="newPassword2"]');
    this.passwordSaveChangesButton = page.locator("(//button[contains(text(),'Save Changes')])[2]");
    this.toastMessage = page.locator("//div[contains(.,'Your details have')]").last();
  }

  /**
   * This function is used to click on profile tab;
   */
  async clickOnProfileTab() {
    await this.page.waitForLoadState("networkidle");
    await this.profileTab.click();
  }
  /**
   * This function is used to verify user profile contents.
   */
  async verfiyUserProfilePageContents() {
    /**
     * This section is to verify user profile settings header
     */
    const isSettingsHeaderVisible = await this.profileSettingsText.isVisible();
    expect(isSettingsHeaderVisible).toBeTruthy();
    /**
     * This section is to verify user profile settings sub header
     */
    const isSettingsSubHeaderVisible = await this.subHeaderText.isVisible();
    expect(isSettingsSubHeaderVisible).toBeTruthy();
    /**
     * This section is to verify user profile settings First name Field
     */
    const isSettingsFirstNameVisible = await this.firstName.isVisible();
    expect(isSettingsFirstNameVisible).toBeTruthy();

    /**
     * This section is to verify user profile settings Last name Field
     */
    const isSettingsLastNameVisible = await this.lastName.isVisible();
    expect(isSettingsLastNameVisible).toBeTruthy();
    /**
     * This section is to verify profile settings Time zone drop down.
     */
    const isSettingsTimeZoneVisible = await this.timeZone.isVisible();
    expect(isSettingsTimeZoneVisible).toBeTruthy();
    /**
     * This section is to verify user profile settings save changes button.
     */
    const isSaveChangesPersonelInformationVisible =
      await this.personalInformationSaveChangesButton.isDisabled();
    expect(isSaveChangesPersonelInformationVisible).toBeTruthy();

    /**
     * This section is to verify user profile settings header change password.
     */
    const isHeaderChangePasswordVisible =
      await this.headerChangePassword.isVisible();
    expect(isHeaderChangePasswordVisible).toBeTruthy();

    /**
     * This section is to verify user profile settings old password field.
     */
    const isSettingsOldPasswordVisible = await this.oldPassword.isVisible();
    expect(isSettingsOldPasswordVisible).toBeTruthy();

    /**
     * This section is to verify user profile settings New password field.
     */
    const isSettingsNewPasswordVisible = await this.newPassword.isVisible();
    expect(isSettingsNewPasswordVisible).toBeTruthy();

    /**
     * This section is to verify user profile settings Confirm password field.
     */
    const isSettingsConfirmNewPasswordVisible =
      await this.confirmNewPassword.isVisible();
    expect(isSettingsConfirmNewPasswordVisible).toBeTruthy();

    /**
     * This section is to verify user profile settings change password save changes button.
     */
    const isSaveChangesPasswordVisible =
      await this.passwordSaveChangesButton.isVisible();
    expect(isSaveChangesPasswordVisible).toBeTruthy();
  }

  /**
   * This function is used to user Enter First name
   */
  async enterFirstName(firstname: string) {
    await this.firstName.fill(firstname);
  }
  /**
   * This function is used to user Enter Last name
   */
  async enterLastName(lastname: string) {
    await this.lastName.fill(lastname);
  }

  /**
   * This function is used to click on save changes
   */
  async clickOnSaveChangesProfileInformation() {
    await this.personalInformationSaveChangesButton.first().click();
  }

  /**
   * This function is used to user verify Profile settings personal information save changes button.
   */
  async verifyPersonalInformationSaveChangesButton() {
    const personalInformationSaveChangesButtonVisible =
      await this.personalInformationSaveChangesButton.isDisabled();
    expect(personalInformationSaveChangesButtonVisible).toBeTruthy();
  }

  /**
   * This function is used to verify Toast Message is visible
   */
  async verifyToastMessageIsVisible(expectedText: string) {
    if (await this.toastMessage.isVisible()) {
      const actualtext = await this.toastMessage.textContent();
      expect(actualtext).toBe(expectedText);
    }
  }

  /**
   * This function is used to verify Toast Message is visible
   */
  async verifyUpdatedFirstAndLastNameIsVisible(
    firstName: string,
    lastName: string
  ) {
    expect(this.firstName).toHaveValue(firstName);
    expect(this.lastName).toHaveValue(lastName);
  }

  /**
   * This function is used to revert back the personal information
   */
  async modifyThePersonalInformation(
    firstName: string,
    lastName: string,
    timezome: string
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.timeZone.click();
    await this.page
      .locator("//span[normalize-space()='" + timezome + "']")
      .last()
      .click();
  }

  /**
   * This function is used to verify updated timezone is visible
   */
  async verifyUpdatedTimeZoneIsVisible(timezone: string) {
    const isUpdatedTimeZoneVisible = await this.page
      .locator("//span[normalize-space()='" + timezone + "']")
      .first()
      .isVisible();
    expect(isUpdatedTimeZoneVisible).toBeTruthy();
  }

  /**
   * This function is used to modify the password
   */
  async modifyThePassword(
    wrongOldPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) {
    await this.oldPassword.fill(wrongOldPassword);
    await this.newPassword.fill(newPassword);
    await this.confirmNewPassword.fill(confirmNewPassword);
    await this.passwordSaveChangesButton.last().click();
  }

  /**
   * This function is used to verify the Profile Settings Page is Visible
   */
  async verifyProfileSettingsPageIsVisible() {
    await this.page.waitForTimeout(3000);
    const isSettingsVisible = await this.profileSettingsText.isVisible();
    expect(isSettingsVisible).toBeTruthy();
  }

  async enterOldPassword(oldPassword: string) {
    await this.oldPassword.fill(oldPassword);
  }

  async enterNewPassword(newPassword: string) {
    await this.newPassword.fill(newPassword);
  }

  async enterConfirmNewPassword(confirmPassword: string) {
    await this.confirmNewPassword.fill(confirmPassword);
  }

  async verifyChangePasswordSaveChangesButtonIsDisabled() {
    await expect(this.passwordSaveChangesButton.last()).toBeDisabled();
  }

  async verifyErrorMessageShowsCrossIcon(message: string) {
    const isCrossIconVisible = await this.page
      .locator("//span[text()='" + message + "']/../*[contains(@class,'red')]")
      .isVisible();
    expect(isCrossIconVisible).toBeTruthy();
  }

  async verifySuccesMessageShowsBlueTick(message: string) {
    const isCrossIconVisible = await this.page
      .locator("//span[text()='" + message + "']/../*[contains(@class,'blue')]")
      .isVisible();
    expect(isCrossIconVisible).toBeTruthy();
  }
}