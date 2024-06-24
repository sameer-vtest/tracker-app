import { Locator, Page, expect, test } from "@playwright/test";
import { BasePage } from "../../page-objects/utilities-pages/base-pages.ts";

export class TrackerLoginPage {
  readonly page: Page;
  readonly trackerByMerkleScienceLogo: Locator;
  readonly merkleScienceLogo: Locator;
  readonly merkleScienceLeftPattern: Locator;
  readonly merkleScienceRightPattern: Locator;
  readonly emailAddressInput: Locator;
  readonly emailAddressTextValue: Locator;
  readonly continueButton: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly loginPageHeader: Locator;
  readonly welcomeText: Locator;
  readonly loginIntoVTestText: Locator;
  readonly emailAddressTextField: Locator;
  readonly forgotPasswordLink: Locator;
  readonly noOrgFoundErrorPopup: Locator;
  readonly wrongCredentialsErrorMessage: Locator;
  readonly continueWithGoogleButton: Locator;
  readonly existingGoogleUserEmails: Locator;
  readonly useAnotherAccountButton: Locator;
  readonly userEmailInput: Locator;
  readonly googleNextButton: Locator;
  readonly userPasswordInput: Locator;
  readonly privacyPolicy: Locator;
  readonly termsofService: Locator;
  readonly invalidEmail: Locator;
  readonly hidePassword: Locator;
  readonly showPassword: Locator;
  readonly showIcon: Locator;
  readonly resendEmail: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordPage: Locator;
  readonly forgotPasswordPageSubHeader: Locator;
  readonly backToLoginLink: Locator;
  readonly forgotPasswordContinueButton: Locator;
  readonly encryptedPassword: Locator;
  readonly decryptedPassword: Locator;
  readonly noAccessToProductError: Locator;
  readonly checkYourEmail: Locator;
  readonly instructionMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.trackerByMerkleScienceLogo = page.locator("//img[@alt='merklescience-logo']");
    this.merkleScienceLogo = page.locator("//img[contains(@src,'merkle-science')]");
    this.merkleScienceLeftPattern = page.locator("//img[contains(@src,'pattern-left')]");
    this.merkleScienceRightPattern = page.locator("//img[contains(@src,'pattern-right')]");
    this.emailAddressInput = page.locator('//input[@placeholder="Enter your email address"]');
    this.emailAddressTextValue = page.locator("//p[contains(text(),'Email Address')]");
    this.continueButton = page.locator("[id='login']");
    this.passwordField = page.locator("[id='password']");
    this.loginButton = page.locator("//button[contains(text(),'Continue')]");
    this.loginPageHeader = page.locator("[class*='text-xl-semibold text-center']");

    this.welcomeText = page.locator("//h1[text()='Welcome']");
    this.loginIntoVTestText = page.locator("//img[@id='prompt-logo-center']/following-sibling::div/p");
    this.emailAddressTextField = page.locator('[inputmode="email"]');
    this.forgotPasswordLink = page.locator("//a[.='Forgot password?']");
    this.noOrgFoundErrorPopup = page.locator("//div[contains(.,'No organization' )]").last();
    this.wrongCredentialsErrorMessage = page.locator("//span[contains(.,'Wrong email or password')]");
    this.continueWithGoogleButton = page.locator("//button[@data-provider='google']");
    this.existingGoogleUserEmails = page.locator("//div[@class='wLBAL']");
    this.useAnotherAccountButton = page.locator("//div[text()='Use another account']");
    this.userEmailInput = page.locator("//input[@type='email']");
    this.googleNextButton = page.locator("//span[text()='Next']");
    this.userPasswordInput = page.locator("//input[@type='password']");
    this.privacyPolicy = page.locator("//a[.='Privacy Policy']");
    this.termsofService = page.locator("//a[.='Terms of Service']");
    this.invalidEmail = page.locator('[id="invalidEmail"]');
    this.hidePassword = page.locator("//span[.='Hide password']").first();
    this.showPassword = page.locator("//span[.='Show password']").first();
    this.showIcon = page.locator('//button[@data-action="toggle"]');
    this.resendEmail = page.locator('[value="resend-email-action"]');
    this.errorMessage = page.locator('[id="error-element-password"]');
    this.forgotPasswordPage = page.locator("//h1[.='Forgot Your Password?']");
    this.forgotPasswordPageSubHeader = page.locator('//div/p');
    this.backToLoginLink = page.locator('[value="back-to-login"]');
    this.forgotPasswordContinueButton = page.locator('(//button[@type="submit"])[1]');
    this.encryptedPassword = page.locator('[type="password"]');
    this.decryptedPassword = page.locator('(//input[@type="text"])[2]');
    this.noAccessToProductError = page.locator("//div[contains(@class,'full')]");
    this.checkYourEmail = page.locator("//h1[contains(text(),'Check Your Email')]");
    this.instructionMessage = page.locator("//p[contains(text(),'Please check the email address sameer.bevinal@merklescience.com for instructions to reset your password.')]");
  }

  async gotoLoginPage(url: string) {
    await this.page.goto(url);
  }

  /**
   * This function is used to login to the application
   * @param emailAddress - Username or email id text
   * @param password - password text
   */
  async loginToApplication(emailAddress: string, password: string) {
    await this.emailAddressInput.fill(emailAddress);
    await this.continueButton.click();
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  /**
   * This function is used to verify Tracker By Merkle Science Logo is visible
   */

  async verifyTrackerByMerkleScienceLogoIsVisible() {
    await expect(this.trackerByMerkleScienceLogo).toBeVisible();
  }

  /**
   * This function is used to verify Merkle Science Logo is visible
   */

  async verifyMerkleScienceLogoIsVisible() {
    await expect(this.merkleScienceLogo).toBeVisible();
  }

  /**
   * This function is used to verify Merkle Science Left Pattern is visible
   */

  async verifyMerkleScienceLeftPatternIsVisible() {
    await expect(this.merkleScienceLeftPattern).toBeVisible();
  }

  /**
   * This function is used to verify Merkle Science Right Pattern is visible
   */

  async verifyMerkleScienceRightPatternIsVisible() {
    await expect(this.merkleScienceRightPattern).toBeVisible();
  }

  /**
   * This function is used to verify the Header of Login Page
   */
  async verifyLoginPageHeader(expectedLoginPageHeader: string) {
    const actualLoginPageHeader = await this.loginPageHeader.textContent();
    expect(actualLoginPageHeader).toBe(expectedLoginPageHeader);
  }

  /**
   * This function is used to verify the email address field is visible
   */
  async verifyEmailAddressFieldIsVisible(emailAddressTextValue: string, emailAddressAttributeValue: string) {
    expect(await this.emailAddressTextValue.textContent()).toBe(emailAddressTextValue);
    await expect(this.emailAddressInput).toHaveAttribute("placeholder", emailAddressAttributeValue);
  }

  /**
   * This function is used to verify the continue button is visible
   */
  async verifyContinueButtonIsVisible() {
    await expect(this.continueButton).toBeVisible();
  }

  /**
   * This function is used to enter email address
   * @param emailAddress - Username or email id text
   */
  async enterEmailAddress(emailAddress: string) {
    await BasePage.fill(this.emailAddressInput, emailAddress);
  }

  async enterEmailAndclickContinueBtn(emailId: string): Promise<void> {

    const regexPattern = /demo-accounts.merklescience\.com\/u/;
    // Function to check if page navigation happens
    const waitForNavigation = async (): Promise<void> => {
      await Promise.race([
        await this.page.waitForURL(regexPattern),
        await this.page.waitForTimeout(5000) // Adjust timeout as needed
      ]);
    };

    // Enter email and click continue
    await this.emailAddressInput.fill(emailId);
    await this.continueButton.click();

    // Retry logic
    let retries = 3; // Number of retries
    let navigationSuccessful = false;
    while (retries > 0 && !navigationSuccessful) {
      try {
        await waitForNavigation();
        navigationSuccessful = true;
      } catch (error) {
        console.error('Navigation attempt failed, retrying...');
        await this.page.reload(); // Reload the page
        await this.page.waitForLoadState(); // Wait for page to load
        await this.emailAddressInput.fill(emailId);
        await this.continueButton.click();
        retries--;
      }
    }
  }

  async enterPasswordAndclickContinueBtn(password: string): Promise<void> {

    // Function to check if page navigation happens
    const waitForNavigation = async (): Promise<void> => {
      await Promise.race([
        await this.page.waitForURL("https://tracker.demo.merklescience.com"),
        await this.page.waitForTimeout(5000) // Adjust timeout as needed
      ]);
    };

    // Enter password and click continue
    await this.passwordField.fill(password);
    await this.loginButton.click();

    // Retry logic
    let retries = 3; // Number of retries
    let navigationSuccessful = false;
    while (retries > 0 && !navigationSuccessful) {
      try {
        await waitForNavigation();
        navigationSuccessful = true;
      } catch (error) {
        console.error('Navigation attempt failed, retrying...');
        await this.page.reload(); // Reload the page
        await this.page.waitForLoadState(); // Wait for page to load
        await this.passwordField.fill(password);
        await this.loginButton.click();
        retries--;
      }
    }
  }

  /**
   * This function is used to click on continue button
   */
  async clickOnContinueButton() {
    await BasePage.click(this.page, this.continueButton);
  }

  /**
   * This function is used to verify page title
   */
  async verifyPageTitle(title: string) {
    console.log("Login page title : " + (await this.page.title()));
    await expect(this.page).toHaveTitle(title);
  }

  /**
   * This function is used to verify page header
   */
  async verifyPageHeader(expectedheader: string) {
    const actualHeader = await this.welcomeText.textContent();
    console.log("Login page header : " + actualHeader);
    expect(actualHeader).toBe(expectedheader);
  }

  /**
   * This function is used to verify email address value
   */
  async verifyEmailAddress(expectedvalue: string) {
    expect(this.emailAddressTextField).toHaveValue(expectedvalue);
  }

  /**
   * This function is used to verify page information
   */
  async verifyMessage(expectedMessage: string) {
    const actualMessage = await this.loginIntoVTestText.textContent();
    console.log("Login message : " + actualMessage);
    expect(actualMessage).toBe(expectedMessage);
  }

  /**
   * This function is used to verify the password field is visible
   */
  async verifyPasswordFieldIsVisible() {
    expect(this.passwordField).toBeVisible();
  }

  /**
   * This function is used to verify the forget password link is visible
   */
  async verifyForgotPasswordLinkIsVisible() {
    expect(this.forgotPasswordLink).toBeVisible();
  }
  /**
   * This function is used to verify the continue button is visible
   */
  async verifyContinueButtonVisible() {
    await expect(this.loginButton).toBeVisible();
  }

  /**
   * This function is used to enter password
   */
  async enterPassword(password: string) {
    await BasePage.fill(this.passwordField, password);
  }

  /**
   * This function is used to click on login button
   */
  async clickOnLoginButton() {
    await BasePage.click(this.page, this.loginButton);
  }

  /**
     * This function is used to verify the error popup when invalid email is entered
     */
  async verifyNoOrganizationFoundErrorPopup(expectedError: string) {
    if (await this.noOrgFoundErrorPopup.isVisible()) {
      const actualError = await this.noOrgFoundErrorPopup.textContent();
      expect(actualError).toBe(expectedError);
    }
  }

  /**
  * This function is used to verify the error message when invalid password is entered
  */
  async verifyWrongCredentialsErrorMessage() {
    const actualErrorMessage = await this.wrongCredentialsErrorMessage.textContent();
    expect(actualErrorMessage).toBeTruthy();
  }

  /**
     * This function is used to sign in with google option
     */
  async signInWithGoogleOption(userEmail: string, userPassword: string) {
    await this.continueWithGoogleButton.click();
    await this.page.waitForLoadState('networkidle');
    const existingUserEmailsCount = await this.existingGoogleUserEmails.count();
    if (existingUserEmailsCount != 0) {
      for (let i = 0; i <= existingUserEmailsCount - 1; i++) {
        if (this.existingGoogleUserEmails[i].textContent() == userEmail) {
          this.existingGoogleUserEmails[i].click();
          await this.page.waitForLoadState('networkidle');
          break;
        }
      }
    } else {
      if (await this.useAnotherAccountButton.isVisible()) {
        await this.useAnotherAccountButton.click();
      }
      await this.userEmailInput.fill(userEmail);
      await this.googleNextButton.click();
      await this.userPasswordInput.fill(userPassword);
      await this.googleNextButton.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
    * This function is used to verify the privacy policy and terms of service hyper links should be visible
    */
  async verifyPrivacyPolicyAndTermsOfServiceIsVisible() {
    expect(this.privacyPolicy).toBeTruthy();
    expect(this.termsofService).toBeTruthy();
  }

  /**
   * This function is used to click on privacy policy hyperlink
   */
  async clickOnPrivacyPolicyLink() {
    await this.privacyPolicy.click();
  }

  /**
  * This function is used to click onterms of service hyperlink
  */
  async clickOnTermsOfServiceLink() {
    await this.termsofService.click();
  }

  /**
    * This function is used to verify the error message when enter invalid email
    */
  async verifyInvalidEmailErrorMessageIsVisible(ExpectedErrorMessage: string) {
    const actualErrorMessage = await this.invalidEmail.textContent();
    console.log("Error Message : " + actualErrorMessage);
    expect(actualErrorMessage).toBe(ExpectedErrorMessage)
  }

  /**
    * This function is used to verify the Tool tip with message 'Show password' should be visible
    */
  async verifyToolTipShowPasswordIsVisible() {
    const isShowPasswordVisible = await this.showPassword.isVisible();
    expect(isShowPasswordVisible).toBeTruthy();
  }

  /**
    * This function is used to verify the Tool tip with message 'Hide password' should be visible
    */
  async verifyToolTipHidePasswordIsVisible() {
    const isHidePasswordVisible = await this.hidePassword.isVisible();
    expect(isHidePasswordVisible).toBeTruthy();
  }

  /**
    * This function is used to mouse hover on show icon in password field.
    */
  async mouseHoverOnshowIconInPasswordField() {
    await this.page.waitForLoadState('networkidle');
    await this.showIcon.hover();
  }

  /**
    * This function is used to verify the encrypted password
   */
  async verifyEncryptedAndDecryptedPassword() {
    await expect(this.encryptedPassword).toBeVisible();
    this.clickOnShowIconInPasswordField();
    await expect(this.decryptedPassword).toBeVisible();
  }

  /**
    * This function is used to click on show icon in password field.
    */
  async clickOnShowIconInPasswordField() {
    await this.showIcon.click();
  }

  /**
   * This function is used to verify forgot password page header text
   */
  public async verifyForgotPasswordPageHeaderText() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.forgotPasswordPage).toBeVisible();
  }

  /**
   * This function is used to click on the forget password link 
   */
  async clickOnForgotPassword() {
    await this.page.waitForLoadState('networkidle');
    await this.forgotPasswordLink.click();
  }
  /**
     * This function is used to click on Resend email button
     */
  async clickOnResendEmail() {
    await this.page.waitForLoadState('networkidle');
    await this.resendEmail.click();
  }

  /**
   * This function is used to verify forgot password page back to Login link
   */
  public async verifyBackToLoginLink() {
    await expect(this.backToLoginLink).toBeVisible();
  }

  /**
   * This function is used to click on back to login
   */
  async clickOnBackToLogin() {
    await this.page.waitForLoadState('networkidle');
    await this.backToLoginLink.click();
  }

  /**
 * This function is used to verify the 'Forgot Your Password?' page is opened in new tab
 */
  async verifyForgotYourPasswordPage(title: string) {
    await this.page.waitForLoadState('networkidle');
    expect(this.page).toHaveTitle(title)
  }

  /**
 * This function is used to verify the 'Login Tracker Demo' page is opened in new tab
 */
  async verifyLoginTrackerDemoPage(title: string) {
    await this.page.waitForLoadState('networkidle');
    expect(this.page).toHaveTitle(title)
  }

  /**
   * This function is used to enter welcome page email
   */
  async enterWelcomePageEmail(emailAddress: string) {
    await this.emailAddressTextField.fill(emailAddress);
  }

  /**
   * This function is used to verify forgot password page sub header
   */
  public async verifyForgotPasswordPageSubHeader() {
    await this.page.waitForLoadState("networkidle");
    await expect(this.forgotPasswordPageSubHeader).toBeVisible();
  }

  /**
   * This function is used to verify email address field
   */
  async verifyForgotPasswordEmailfield(expectedvalue: string) {
    await expect(this.emailAddressTextField).toHaveValue(expectedvalue);
  }

  /**
   * This function is used to verify the forgot password continue button is visible
   */
  async verifyForgotPasswordContinueButton() {
    await expect(this.forgotPasswordContinueButton).toBeVisible();
  }

  /**
     * This function is used to verify the error when logged in with unregistered email
     */
  async verifyNoAccessToProductError() {
    if (await this.noAccessToProductError.isVisible()) {
      const actualError = await this.noAccessToProductError.innerText();
      console.log(actualError);
    }
  }

  /**
   * This function is used to verify check your email header text
   */
  public async verifyResetPasswordRequesElementsVisible() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.checkYourEmail).toBeVisible();
    await expect(this.instructionMessage).toBeVisible();
    await expect(this.resendEmail).toBeVisible();
  }
}