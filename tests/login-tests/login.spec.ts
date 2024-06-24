import { BrowserContext, Page, expect, test } from "@playwright/test";
import { TrackerLoginPage } from "../../page-objects/login-pages/login-page.ts"
import { PrivacyPolicyPage } from "../../page-objects/login-pages/privacypolicy-page.ts"
import { TermsOfServicePage } from "../../page-objects/login-pages/termsofservice-page.ts"
import { TrackerDashboardPage } from "../../page-objects/dashboard-pages/dashboard-page.ts";
import { allure } from "allure-playwright";
const consts = require('../../constants/login-constants.ts') as Record<string, any>;

const data = require(`../../test-data/login/login.json`) as Record<string, any>;
const baseurl = process.env.BASE_URL;
const email = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;

test.describe('Auth0 Tests', () => {
  let context: BrowserContext;
  let page: Page;
  let trackerLoginPage: TrackerLoginPage;
  let dashboardPage: TrackerDashboardPage;

  test.beforeEach(async ({ browser }) => {
    // Create a new browser context for each test
    context = await browser.newContext();
    page = await context.newPage();
    trackerLoginPage = new TrackerLoginPage(page);
    dashboardPage = new TrackerDashboardPage(page);
    allure.suite("Tracker Sanity Suite");
  });

  test.afterEach(async () => {
    // Close the context after each test to ensure isolation
    await context.close();
  });

  test("QATRKR-TC-25, Verify navigation of page when hitting base URL. @authentication @authentication-regression", async () => {

    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);

    await test.step("1. Navigating to " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Verifying the login url", async () => {
      const actualLoginUrl = page.url();
      expect(actualLoginUrl).toBe(`${baseurl}` + '/' + consts.LOGIN);
    });
  });

  test("QATRKR-TC-5, Validate the app logo on the Login page. @authentication @authentication-sanity", async () => {

    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);

    await test.step("1. Navigating to " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Verifying Tracker By Merkle Science Logo", async () => {
      await trackerLoginPage.verifyTrackerByMerkleScienceLogoIsVisible();
    });
  });

  test("QATRKR-TC-6,QATRKR-TC-7,QATRKR-TC-8, Validate the different app logos on the Login page. @authentication @authentication-regression", async () => {

    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);

    await test.step("1. Navigating to " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Verifying Merkle Science Logo", async () => {
      await trackerLoginPage.verifyMerkleScienceLogoIsVisible();
    });

    await test.step("3. Verifying Merkle Science Left Pattern", async () => {
      await trackerLoginPage.verifyMerkleScienceLeftPatternIsVisible();
    });

    await test.step("4. Verifying Merkle Science Right Pattern", async () => {
      await trackerLoginPage.verifyMerkleScienceRightPatternIsVisible();
    });
  });

  test("QATRKR-TC-9,QATRKR-TC-14,QATRKR-TC-15,QATRKR-TC-20,QATRKR-TC-213, Verify Login Page contents and Logout functionality. @authentication @authentication-regression", async () => {

    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const trackerDashBoardPage: TrackerDashboardPage = new TrackerDashboardPage(page);

    await test.step("1. Navigating to login page", async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Verifying the login page header", async () => {
      await trackerLoginPage.verifyLoginPageHeader(data["TC_001_Login"].loginPageHeader);
    });

    await test.step("3. Verifying email address field is visible", async () => {
      await trackerLoginPage.verifyEmailAddressFieldIsVisible(data["TC_001_Login"].emailAddressTextValue, data["TC_001_Login"].emailAddressPlaceholderValue);
    });

    await test.step("4. Verifying continue button is visible", async () => {
      await trackerLoginPage.verifyContinueButtonIsVisible();
    });

    await test.step("5. Verifying Privacy Policy and Terms Of Service is visible", async () => {
      await trackerLoginPage.verifyPrivacyPolicyAndTermsOfServiceIsVisible();
    });

    await test.step("6. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("7. Verifying login page title", async () => {
      await trackerLoginPage.verifyPageTitle(data["TC_001_Login"].pageTitle);
    });

    await test.step("8. Verifying login page header.", async () => {
      await trackerLoginPage.verifyPageHeader(data["TC_001_Login"].header);
    });

    await test.step('9. Verifying login page message "Log in to Merkle Science to continue to Tracker Demo"', async () => {
      await trackerLoginPage.verifyMessage(data["TC_001_Login"].message);
    });

    await test.step("10. Verifying existing email address text", async () => {
      await trackerLoginPage.verifyEmailAddress(`${email}`);
    });

    await test.step("11. Verifying password is visible", async () => {
      await trackerLoginPage.verifyPasswordFieldIsVisible();
    });

    await test.step("12. Verifying forget password link is visible", async () => {
      await trackerLoginPage.verifyForgotPasswordLinkIsVisible();
    });

    await test.step("13. Verifying continue button is visible", async () => {
      await trackerLoginPage.verifyContinueButtonVisible();
    });

    await test.step("14. Entering the password and clicking on continue button", async () => {
      await trackerLoginPage.enterPasswordAndclickContinueBtn(`${password}`);
    });

    await test.step('15. Verifying "Welcome to Tracker" title is visible', async () => {
      await trackerDashBoardPage.verifyWelcomeToTrackerTitleIsVisible();
    });

    await test.step("16. Verifying Merkle Science Logo is visible", async () => {
      await trackerDashBoardPage.verifyTrackerMerkelScienceLogoIsDisplayed();
    });

    await test.step("17. Logging out from the application", async () => {
      await trackerDashBoardPage.logoutFromApplication();
    })
  });

  test("QATRKR-TC-10, Hyperlink Privacy Policy should open privacy policy page in new tab. @authentication @authentication-regression", async () => {

    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);

    await test.step("1. Navigating to login page", async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Clicking on privacy policy hyperlink", async () => {
      const [privacyPolicy] = await Promise.all([
        context.waitForEvent("page"),
        await trackerLoginPage.clickOnPrivacyPolicyLink(),
      ])

      const privacyPolicyPage: PrivacyPolicyPage = new PrivacyPolicyPage(privacyPolicy);
      await test.step("3. Verifying Privacy Policy page is opened in new tab", async () => {
        await privacyPolicyPage.verifyPrivacyPolicyPageIsOpenInNewTab(data['TC-006_Login'].title);
      });
    });
  });

  test("QATRKR-TC-11, Hyperlink Terms of Service should open Terms of Service page in new tab. @authentication @authentication-regression", async () => {

    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);

    await test.step("1. Navigating to login page", async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Clicking on terms of service hyperlink", async () => {

      const [termsOfService] = await Promise.all([
        context.waitForEvent("page"),
        await trackerLoginPage.clickOnTermsOfServiceLink(),
      ])

      const termsOfServicePage: TermsOfServicePage = new TermsOfServicePage(termsOfService);
      await test.step("3. Verifying terms of service page is opened in new tab", async () => {
        await termsOfServicePage.verifyTermsAndServicePageIsOpenInNewTab(data['TC-007_Login'].title);
      });
    });
  });

  test("QATRKR-TC-13, Verify login with invalid email. @authentication @authentication-sanity", async () => {

    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);

    await test.step("1. Navigating to login page", async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });
    await test.step("2. Entering the invalid email id", async () => {
      await trackerLoginPage.enterEmailAddress(data["TC-009_Login"].invalidEmail);
    });

    await test.step("3. Clicking on continue button", async () => {
      await trackerLoginPage.clickOnContinueButton();
    });

    await test.step("4. Verifying Error message 'Please enter a valid email address' should be displayed. ", async () => {
      await trackerLoginPage.verifyInvalidEmailErrorMessageIsVisible(data["TC-009_Login"].expectedErrorMessage);
    });
  });

  test("QATRKR-TC-16, Verify the Show and Hide password tool tip. @authentication @authentication-regression", async () => {

    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. On password page, mouse hover on show icon in password field.", async () => {
      await trackerLoginPage.mouseHoverOnshowIconInPasswordField();
    });

    await test.step("4. Verifying Tool tip with message 'Show password' should be displayed", async () => {
      await trackerLoginPage.verifyToolTipShowPasswordIsVisible();
    });

    await test.step("5. On password page, click on show password under 'Password' field.", async () => {
      await trackerLoginPage.clickOnShowIconInPasswordField();
    });

    await test.step("6. Verifying Tool tip with message 'Hide password' should be displayed.", async () => {
      await trackerLoginPage.verifyToolTipHidePasswordIsVisible();
    });
  });

  test("QATRKR-TC-17,QATRKR-TC-18, Verify that the password should be by-default encrypted after click show button password should be decrypted. @authentication @authentication-regression", async () => {

    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Verifying existing email address text", async () => {
      await trackerLoginPage.verifyEmailAddress(`${email}`);
    });

    await test.step("4. Entering the password", async () => {
      await trackerLoginPage.enterPassword(`${password}`);
    });

    await test.step("5. Verify the Encrypted and Decrypted password", async () => {
      await trackerLoginPage.verifyEncryptedAndDecryptedPassword();
    });
  });

  test.skip("QATRKR-TC-24, Verify the error message when user tries to login with email which is from different org. used on login page. @authentication @authentication-regression", async ({ page }) => {

    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Entering the email id", async () => {
      await trackerLoginPage.enterWelcomePageEmail(data["TC-020_Login"].emailAddress);
    });

    await test.step("4. Entering the password", async () => {
      await trackerLoginPage.enterPassword(`${password}`);
    });

    await test.step("5. ckick on Login button", async () => {
      await trackerLoginPage.clickOnLoginButton();
    });

    await test.step("6. verify the Error message", async () => {
      await trackerLoginPage.verifyWrongCredentialsErrorMessage();
    });
  });

  test("QATRKR-TC-26, Click 'Forgot Password?' and verify the app navigation. @authentication @authentication-regression", async () => {

    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. click on Forgot password Link", async () => {
      await trackerLoginPage.clickOnForgotPassword();
    });

    await test.step("4. Verifying Forgot Your Password? text is visible", async () => {
      await trackerLoginPage.verifyForgotPasswordPageHeaderText();
    });
  });

  test("QATRKR-TC-27, Verify 'Forgot Password?' page contents. @authentication @authentication-regression", async () => {

    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. click on Forgot password Link", async () => {
      await trackerLoginPage.clickOnForgotPassword();
    });

    await test.step("4. Verifying Forgot Your Password? page contents", async () => {

      await test.step("4a. Verifying header", async () => {
        await trackerLoginPage.verifyForgotPasswordPageHeaderText();
      });

      await test.step("4b. Verifying sub header", async () => {
        await trackerLoginPage.verifyForgotPasswordPageSubHeader();
      });

      await test.step("4c. verify email field", async () => {
        await trackerLoginPage.verifyForgotPasswordEmailfield(`${email}`);
      });

      await test.step("4d. verify Continue button", async () => {
        await trackerLoginPage.verifyForgotPasswordContinueButton();
      });

      await test.step("4e. Verify Back to login link", async () => {
        await trackerLoginPage.verifyBackToLoginLink();
      });
    });
  });

  test.skip("QATRKR-TC-21, Verify Login with google option. @authentication @authentication-sanity", async ({ page }) => {

    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const trackerDashBoardPage: TrackerDashboardPage = new TrackerDashboardPage(page);

    await test.step("1. Navigating to login page", async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Signing in with google option", async () => {
      await trackerLoginPage.signInWithGoogleOption(data["TC_002_Login"].googleUserEmail, data["TC_002_Login"].googleUserPassword);
    });

    await test.step('4. Verifying "Welcome to Tracker" title is visible', async () => {
      await trackerDashBoardPage.verifyWelcomeToTrackerTitleIsVisible();
    });

    await test.step("5. Logging out from the application", async () => {
      await trackerDashBoardPage.logoutFromApplication();
    })
  });

  test("QATRKR-TC-12, Verify login with unregistered email. @authentication @authentication-sanity", async () => {

    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);

    await test.step("1. Navigating to login page", async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the Invalid email id", async () => {
      await trackerLoginPage.enterEmailAddress(data["TC_003_Login"].invalidEmail);
    });

    await test.step("3. Clicking on continue button", async () => {
      await trackerLoginPage.clickOnContinueButton();
      await page.waitForTimeout(2000);
    });

    await test.step("4. Verifying No Organization found error Popup", async () => {
      await trackerLoginPage.verifyNoOrganizationFoundErrorPopup(data["TC_003_Login"].expectedPopup);
    });
  });

  test("QATRKR-TC-19, Verify login with invalid password. @authentication @authentication-regression", async () => {

    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);

    await test.step("1. Navigating to login page", async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Entering the Invalid password", async () => {
      await trackerLoginPage.enterPassword(data["TC_003_Login"].invalidPassword);
    });

    await test.step("4. Clicking on continue button", async () => {
      await trackerLoginPage.clickOnLoginButton();
    });

    await test.step("5. Verifying Error Message when invalid credentials are entered", async () => {
      await trackerLoginPage.verifyWrongCredentialsErrorMessage();
    });
  });

  test("QATRKR-TC-28, Verify the default values in email address text field. @authentication @authentication-regression", async () => {

    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Clicking on forgot password link.", async () => {
      await trackerLoginPage.clickOnForgotPassword();
    });

    await test.step("4. Verifying default value in email address text field", async () => {
      await trackerLoginPage.verifyEmailAddress(`${email}`);
    });

  });

  test("QATRKR-TC-29,QATRKR-TC-30 Verify the page navigation after click on the 'Resend email' button. @authentication @authentication-regression", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Clicking on forgot password link.", async () => {
      await trackerLoginPage.clickOnForgotPassword();
    });

    await test.step("4. Clicking on continue button", async () => {
      await trackerLoginPage.clickOnLoginButton();
    });

    await test.step("5. Verfying Reset password request elements", async () => {
      await trackerLoginPage.verifyResetPasswordRequesElementsVisible();
    });

    await test.step("6. Clicking on resend email button", async () => {
      await trackerLoginPage.clickOnResendEmail();
    });

    await test.step("7. Verifying the page navigation", async () => {
      await trackerLoginPage.verifyForgotYourPasswordPage(data["TC-015_Login"].title);
    });
  });

  test("QATRKR-TC-31, Verify the page navigation after click on the 'Back to Tracker Demo' button on the 'Forgot Your Password?' page. @authentication @authentication-regression", async () => {

    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Clicking on forgot password link.", async () => {
      await trackerLoginPage.clickOnForgotPassword();
    });

    await test.step("4. Verifying the page navigation", async () => {
      await trackerLoginPage.verifyForgotYourPasswordPage(data["TC-016_Login"].title1);
    });

    await test.step("5. Clicking on 'back to login'  button", async () => {
      await trackerLoginPage.clickOnBackToLogin();
    });

    await test.step("6. Verifying the page navigation", async () => {
      await trackerLoginPage.verifyLoginTrackerDemoPage(data["TC-016_Login"].title2);
    });
  });

  test("QATRKR-TC-22, Verify that user should not be able to login with unregistered google account. @authentication @authentication-regression", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Signing in with google option", async () => {
      await trackerLoginPage.signInWithGoogleOption("sameer3840b@gmail.com", "Pinkey@2023");
      await trackerLoginPage.verifyNoAccessToProductError();
    });
  });
});