import { BrowserContext, Page, test } from "@playwright/test";
import { TrackerLoginPage } from "../../page-objects/login-pages/login-page.ts";
import { TrackerDashboardPage } from "../../page-objects/dashboard-pages/dashboard-page.ts";
import { TrackerProfileSettingsPage } from "../../page-objects/profile-settings-pages/profile-settings.ts";
import { allure } from "allure-playwright";

const data = require(`../../test-data/profile-settings/profile-settings.json`) as Record<string, any>;

const baseurl = process.env.BASE_URL;
const email = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;

test.describe('Profile Tests', () => {
  let context: BrowserContext;
  let page: Page;
  let trackerLoginPage: TrackerLoginPage;
  let dashboardPage: TrackerDashboardPage;
  let trackerProfileSettingPage: TrackerProfileSettingsPage;

  test.beforeEach(async ({ browser }) => {
    // Create a new browser context for each test
    context = await browser.newContext();
    page = await context.newPage();
    trackerLoginPage = new TrackerLoginPage(page);
    dashboardPage = new TrackerDashboardPage(page);
    trackerProfileSettingPage = new TrackerProfileSettingsPage(page);
    allure.suite("Tracker Sanity Suite");
  });

  test.afterEach(async () => {
    // Close the context after each test to ensure isolation
    await context.close();
  });

  test("QATRKR-TC-162, Verify my profile contents. @profile @profile-regression", async () => {

    await test.step("1. Launch the Tracker app: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Enter registered email id and click on the Continue button.", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Now enter valid password and click on the 'Continue' button ", async () => {
      await trackerLoginPage.enterPasswordAndclickContinueBtn(`${password}`);
    });

    await test.step('4. Verifying "Welcome to Tracker" title is visible', async () => {
      await dashboardPage.verifyWelcomeToTrackerTitleIsVisible();
    });

    await test.step("5. Verifying my profile contents, after click on my profile", async () => {
      await dashboardPage.clickOnUserProfile();

      await test.step("5a. Verifying 'Signed In As' is visible", async () => {
        await dashboardPage.verifySignedInAsIsVisible();
      });

      await test.step("5b. Verifying 'Settings' is visible", async () => {
        await dashboardPage.verifySettingsIsVisible();
      });

      await test.step("5c. Verifying 'Supported Digital Assets' is visible", async () => {
        await dashboardPage.verifySupportedDigitalAssetsIsVisible();
      });

      await test.step("5d. Verifying 'Support' is visible", async () => {
        await dashboardPage.verifySupportIsVisible();
      });

      await test.step("5e. Verifying 'Logout' is visible", async () => {
        await dashboardPage.verifyLogoutIsVisible();
      });
    });
  });

  test("QATRKR-TC-163, User should be able to view settings. @profile @profile-sanity", async () => {

    await test.step("1. Launch the Tracker app: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Enter registered email id and click on the Continue button.", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Now enter valid password and click on the 'Continue' button ", async () => {
      await trackerLoginPage.enterPasswordAndclickContinueBtn(`${password}`);
    });

    await test.step('4. Verifying "Welcome to Tracker" title is visible', async () => {
      await dashboardPage.verifyWelcomeToTrackerTitleIsVisible();
    });

    await test.step("5. Clicking on My profile", async () => {
      await dashboardPage.clickOnUserProfile();
    });

    await test.step("6. Verifying User is able to view 'Settings'", async () => {
      await dashboardPage.verifyUserAbleToViewSettings();
    });
  });

  test("QATRKR-TC-164: User should be able to view SUPPORTED DIGITAL ASSETS Frame. @profile @profile-regression", async () => {

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Entering the password and clicking on continue button", async () => {
      await trackerLoginPage.enterPasswordAndclickContinueBtn(`${password}`);
    });

    await test.step('4. Verifying "Welcome to Tracker" title is visible', async () => {
      await dashboardPage.verifyWelcomeToTrackerTitleIsVisible();
    });

    await test.step("5. Clicking on user profile", async () => {
      await dashboardPage.clickOnUserProfile();
    });

    await test.step("6. Verifying Supported Digital Asset is Visible", async () => {
      await dashboardPage.clickOnSupportedDigitalAssets();
    });
  });

  test("QATRKR-TC-165: User should be able to view support popup frame. @profile @profile-regression", async () => {

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Entering the password and clicking on continue button", async () => {
      await trackerLoginPage.enterPasswordAndclickContinueBtn(`${password}`);
    });

    await test.step('4. Verifying "Welcome to Tracker" title is visible', async () => {
      await dashboardPage.verifyWelcomeToTrackerTitleIsVisible();
    });

    await test.step("5. Clicking on user profile", async () => {
      await dashboardPage.clickOnUserProfile();
    });

    await test.step("6. Verifying support is visible", async () => {
      await dashboardPage.verifySupportAndClick();
    });

    await test.step("7. Verifying support popup frame leave us a message frame", async () => {
      await dashboardPage.verifySupportLeaveUsaMessageFrame();
    });
  });

  test("QATRKR-TC-166: Verify the Profile page Contents. @profile @profile-regression", async () => {

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Entering the password and clicking on continue button", async () => {
      await trackerLoginPage.enterPasswordAndclickContinueBtn(`${password}`);
    });

    await test.step('4. Verifying "Welcome to Tracker" title is visible', async () => {
      await dashboardPage.verifyWelcomeToTrackerTitleIsVisible();
    });

    await test.step("5. Clicking on user profile", async () => {
      await dashboardPage.clickOnUserProfile();
    });

    await test.step("6. Clicking on user settings", async () => {
      await dashboardPage.verifyUserAbleToViewSettings();
    });

    await test.step("7. Clicking on user setting profile tab", async () => {
      await trackerProfileSettingPage.clickOnProfileTab();
    });

    await test.step("8. Verifying Profile Setting header", async () => {
      await trackerProfileSettingPage.verfiyUserProfilePageContents();
    });
  });

  test("QATRKR-TC-167: Verify that save changes button of personal information should be displayed by default. @profile @profile-regression", async () => {

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Entering the password and clicking on continue button", async () => {
      await trackerLoginPage.enterPasswordAndclickContinueBtn(`${password}`);
    });

    await test.step('4. Verifying "Welcome to Tracker" title is visible', async () => {
      await dashboardPage.verifyWelcomeToTrackerTitleIsVisible();
    });

    await test.step("5. Clicking on user profile", async () => {
      await dashboardPage.clickOnUserProfile();
    });

    await test.step("6. Clicking on user settings", async () => {
      await dashboardPage.verifyUserAbleToViewSettings();
    });

    await test.step("7. Clicking on user setting profile tab", async () => {
      await trackerProfileSettingPage.clickOnProfileTab();
    });

    await test.step("8. Verifying save changes button disabled in personal information", async () => {
      await trackerProfileSettingPage.verifyPersonalInformationSaveChangesButton();
    });
  });

  test("QATRKR-TC-168: Verify that save changes button of Personal information should be displayed if trying to renter the same first name and last name. @profile @profile-sanity", async () => {

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Entering the password and clicking on continue button", async () => {
      await trackerLoginPage.enterPasswordAndclickContinueBtn(`${password}`);
    });

    await test.step('4. Verifying "Welcome to Tracker" title is visible', async () => {
      await dashboardPage.verifyWelcomeToTrackerTitleIsVisible();
    });

    await test.step("5. Clicking on user profile", async () => {
      await dashboardPage.clickOnUserProfile();
    });

    await test.step("6. Clicking on user settings", async () => {
      await dashboardPage.verifyUserAbleToViewSettings();
    });

    await test.step("7. Clicking on user settings profile tab", async () => {
      await trackerProfileSettingPage.clickOnProfileTab();
    });

    await test.step("8. Verifying save changes button disabled in personal information", async () => {
      await trackerProfileSettingPage.verifyPersonalInformationSaveChangesButton();
    });

    await test.step("9. Enter the First name", async () => {
      await trackerProfileSettingPage.enterFirstName(
        data["TC-046_Profile"].firstName
      );
    });

    await test.step("10. Verifying save changes button disabled in personal information", async () => {
      await trackerProfileSettingPage.verifyPersonalInformationSaveChangesButton();
    });

    await test.step("11. Enter the last name", async () => {
      await trackerProfileSettingPage.enterLastName(
        data["TC-046_Profile"].lastName
      );
    });
    await test.step("12. Verifying save changes button disabled in personal information", async () => {
      await trackerProfileSettingPage.verifyPersonalInformationSaveChangesButton();
    });
  });

  test("QATRKR-TC-169: Verify that Save Changes button of 'Personal Information' should be displayed if First Name or Last Name is empty. @profile @profile-sanity", async () => {

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Entering the password and clicking on continue button", async () => {
      await trackerLoginPage.enterPasswordAndclickContinueBtn(`${password}`);
    });

    await test.step('4. Verifying "Welcome to Tracker" title is visible', async () => {
      await dashboardPage.verifyWelcomeToTrackerTitleIsVisible();
    });

    await test.step("5. Clicking on My profile", async () => {
      await dashboardPage.clickOnUserProfile();
    });

    await test.step("6. Clicking on 'Settings'", async () => {
      await dashboardPage.verifyUserAbleToViewSettings();
    });

    await test.step("7.Clearing the First Name text field data", async () => {
      await trackerProfileSettingPage.modifyThePersonalInformation(
        data["TC_047_Profile"].clear,
        data["TC_047_Profile"].lastName,
        data["TC_047_Profile"].timezone
      );
    });

    await test.step("8. Verifying that the Save Changes button is disabled", async () => {
      await trackerProfileSettingPage.verifyPersonalInformationSaveChangesButton();
    });

    await test.step("9. Adding data in First Name and clear the Last Name text field data.", async () => {
      await trackerProfileSettingPage.modifyThePersonalInformation(
        data["TC_047_Profile"].firstName,
        data["TC_047_Profile"].clear,
        data["TC_047_Profile"].timezone
      );
    });

    await test.step("10. Verifying that the Save Changes button is disabled", async () => {
      await trackerProfileSettingPage.verifyPersonalInformationSaveChangesButton();
    });
  });

  test("QATRKR-TC-170, Verify that user should be able to change First Name and Last Name. @profile @profile-regression", async () => {

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Entering the password and clicking on continue button", async () => {
      await trackerLoginPage.enterPasswordAndclickContinueBtn(`${password}`);
    });

    await test.step('4. Verifying "Welcome to Tracker" title is visible', async () => {
      await dashboardPage.verifyWelcomeToTrackerTitleIsVisible();
    });

    await test.step("5. Clicking on My profile", async () => {
      await dashboardPage.clickOnUserProfile();
    });

    await test.step("6. Clicking on 'Settings'", async () => {
      await dashboardPage.verifyUserAbleToViewSettings();
    });

    await test.step("7. Entering First Name and Last Name text field data and enter different Name.", async () => {
      await trackerProfileSettingPage.modifyThePersonalInformation(
        data["TC_048_Profile"].newFirstName,
        data["TC_048_Profile"].newLastName,
        data["TC_048_Profile"].timezone
      );
    });

    await test.step("8. Clicking on 'Save changes' button", async () => {
      await trackerProfileSettingPage.clickOnSaveChangesProfileInformation();
    });

    await test.step("9. Verifying toast message 'Your details have been updated successfully.' is visible", async () => {
      await trackerProfileSettingPage.verifyToastMessageIsVisible(
        data["TC_048_Profile"].toastMessage
      );
    });

    await test.step("10.Verifing updated name should be visible", async () => {
      await trackerProfileSettingPage.verifyUpdatedFirstAndLastNameIsVisible(
        data["TC_048_Profile"].newFirstName,
        data["TC_048_Profile"].newLastName
      );
    });

    await test.step("11.Revert Back the Profile Information", async () => {
      await trackerProfileSettingPage.modifyThePersonalInformation(
        data["TC_048_Profile"].firstName,
        data["TC_048_Profile"].lastName,
        data["TC_048_Profile"].timezone
      );
    });

    await test.step("12. Clicking on 'Save changes' button", async () => {
      await trackerProfileSettingPage.clickOnSaveChangesProfileInformation();
    });
  });

  test("QATRKR-TC-171, Verify that error message should be displayed if user enters non-alphabets in First Name, Last Name and tries to save the changes. @profile @profile-sanity", async () => {

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Entering the password and clicking on continue button", async () => {
      await trackerLoginPage.enterPasswordAndclickContinueBtn(`${password}`);
    });

    await test.step('4. Verifying "Welcome to Tracker" title is visible', async () => {
      await dashboardPage.verifyWelcomeToTrackerTitleIsVisible();
    });

    await test.step("5. Clicking on My profile", async () => {
      await dashboardPage.clickOnUserProfile();
    });

    await test.step("6. Clicking on 'Settings'", async () => {
      await dashboardPage.verifyUserAbleToViewSettings();
    });

    await test.step("7 Entering non-alphabet chars in First Name And Last text field  ", async () => {
      await trackerProfileSettingPage.modifyThePersonalInformation(
        data["TC_049_Profile"].firstName,
        data["TC_049_Profile"].lastName,
        data["TC_049_Profile"].timezone
      );
    });

    await test.step("8. Clicking on 'Save changes' button", async () => {
      await trackerProfileSettingPage.clickOnSaveChangesProfileInformation();
    });

    await test.step("9. Verifying toast message 'Your details have not been updated.' is visible", async () => {
      await trackerProfileSettingPage.verifyToastMessageIsVisible(
        data["TC_049_Profile"].toastMessage
      );
    });
  });

  test("QATRKR-TC-173, Verify that user should not be able to change password with wrong old password. @profile @profile-sanity", async () => {

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Entering the password and clicking on continue button", async () => {
      await trackerLoginPage.enterPasswordAndclickContinueBtn(`${password}`);
    });

    await test.step('4. Verifying "Welcome to Tracker" title is visible', async () => {
      await dashboardPage.verifyWelcomeToTrackerTitleIsVisible();
    });

    await test.step("5. Clicking on My profile", async () => {
      await dashboardPage.clickOnUserProfile();
    });

    await test.step("6. Clicking on 'Settings'", async () => {
      await dashboardPage.verifyUserAbleToViewSettings();
    });

    await test.step("7. Entering wrong old password", async () => {
      await trackerProfileSettingPage.modifyThePassword(
        data["TC_051_Profile"].wrongOldPassword,
        `${password}`,
        `${password}`
      );
    });

    await test.step("8. Verifying the profile settings page is visible", async () => {
      await page.waitForTimeout(10000);
      await trackerProfileSettingPage.verifyProfileSettingsPageIsVisible();
    });

    await test.step("9. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-174, Verify that user should not be able to change password if old and new password are same. @profile @profile-sanity", async () => {

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Entering the password and clicking on continue button", async () => {
      await trackerLoginPage.enterPasswordAndclickContinueBtn(`${password}`);
    });

    await test.step('4. Verifying "Welcome to Tracker" title is visible', async () => {
      await dashboardPage.verifyWelcomeToTrackerTitleIsVisible();
    });

    await test.step("5. Navigating to settings", async () => {
      await dashboardPage.clickOnUserProfile();
      await dashboardPage.verifyUserAbleToViewSettings();
    });

    await test.step("6. Navigating to profile section", async () => {
      await trackerProfileSettingPage.clickOnProfileTab();
    });

    await test.step("7. Enter correct old password", async () => {
      await trackerProfileSettingPage.enterOldPassword(`${password}`);
    });

    await test.step("8. Enter New Password same as Old Password.", async () => {
      await trackerProfileSettingPage.enterNewPassword(`${password}`);
    });

    await test.step("9. Enter Confirm New Password same as Old Password", async () => {
      await trackerProfileSettingPage.enterConfirmNewPassword(`${password}`);
    });

    await test.step("10. Verify The 'Save Changes' button should be disabled.", async () => {
      await trackerProfileSettingPage.verifyChangePasswordSaveChangesButtonIsDisabled();
    });

    await test.step("11. Verify Red cross should be displayed in front of message 'Old and New Passwords should not match.'", async () => {
      await trackerProfileSettingPage.verifyErrorMessageShowsCrossIcon(
        data["TC_052"].message
      );
    });
  });

  test("QATRKR-TC-175, Verify that user should not be able to change password if new and confirm new passwords are not same. @profile @profile-sanity", async () => {

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Entering the password and clicking on continue button", async () => {
      await trackerLoginPage.enterPasswordAndclickContinueBtn(`${password}`);
    });

    await test.step('4. Verifying "Welcome to Tracker" title is visible', async () => {
      await dashboardPage.verifyWelcomeToTrackerTitleIsVisible();
    });

    await test.step("5. Navigating to Settings", async () => {
      await dashboardPage.clickOnUserProfile();
      await dashboardPage.verifyUserAbleToViewSettings();
    });

    await test.step("6. Navigating to Profile", async () => {
      await trackerProfileSettingPage.clickOnProfileTab();
    });

    await test.step("7. Enter correct old password", async () => {
      await trackerProfileSettingPage.enterOldPassword(`${password}`);
    });

    await test.step("8. Enter New Password same as Old Password.", async () => {
      await trackerProfileSettingPage.enterNewPassword(`${password}`);
    });

    await test.step("9. Enter Confirm New Password which is not same as New Password.", async () => {
      await trackerProfileSettingPage.enterConfirmNewPassword(
        data["TC_053"].confirmNewPassword
      );
    });

    await test.step("10. Verify The 'Save Changes' button should be disabled.", async () => {
      await trackerProfileSettingPage.verifyChangePasswordSaveChangesButtonIsDisabled();
    });

    await test.step("11. Verify Red cross should be displayed in front of message 'Passwords should match.'", async () => {
      await trackerProfileSettingPage.verifyErrorMessageShowsCrossIcon(
        data["TC_053"].message
      );
    });
  });

  test("QATRKR-TC-176, Verify that user should not be able to change password if password or new password has less than 8 chars. @profile @profile-sanity", async () => {

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Entering the password and clicking on continue button", async () => {
      await trackerLoginPage.enterPasswordAndclickContinueBtn(`${password}`);
    });

    await test.step('4. Verifying "Welcome to Tracker" title is visible', async () => {
      await dashboardPage.verifyWelcomeToTrackerTitleIsVisible();
    });

    await test.step("5. Navigating to Settings", async () => {
      await dashboardPage.clickOnUserProfile();
      await dashboardPage.verifyUserAbleToViewSettings();
    });

    await test.step("6. Navigating to profile ", async () => {
      await trackerProfileSettingPage.clickOnProfileTab();
    });

    await test.step("7. Enter correct old password", async () => {
      await trackerProfileSettingPage.enterOldPassword(`${password}`);
    });

    await test.step("8. Enter New Password same as Old Password.", async () => {
      await trackerProfileSettingPage.enterNewPassword(data["TC_054"].password);
    });

    await test.step("9. Enter Confirm New Password same as Old Password", async () => {
      await trackerProfileSettingPage.enterConfirmNewPassword(
        data["TC_054"].password
      );
    });

    await test.step("10. Verify The 'Save Changes' button should be disabled.", async () => {
      await trackerProfileSettingPage.verifyChangePasswordSaveChangesButtonIsDisabled();
    });

    await test.step("11. Verify Red cross should be displayed in front of message 'Should contain at least 8 characters.'", async () => {
      await trackerProfileSettingPage.verifyErrorMessageShowsCrossIcon(
        data["TC_054"].message
      );
    });
  });

  test("QATRKR-TC-177, Verify that user should not be able to change password if password or new password has no numbers. @profile @profile-sanity", async () => {

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Entering the password and clicking on continue button", async () => {
      await trackerLoginPage.enterPasswordAndclickContinueBtn(`${password}`);
    });

    await test.step('4. Verifying "Welcome to Tracker" title is visible', async () => {
      await dashboardPage.verifyWelcomeToTrackerTitleIsVisible();
    });

    await test.step("5. Navigating to Settings", async () => {
      await dashboardPage.clickOnUserProfile();
      await dashboardPage.verifyUserAbleToViewSettings();
    });

    await test.step("6. Navigating to Profile", async () => {
      await trackerProfileSettingPage.clickOnProfileTab();
    });

    await test.step("7. Enter correct old password", async () => {
      await trackerProfileSettingPage.enterOldPassword(`${password}`);
    });

    await test.step("8. Enter New Password same as Old Password.", async () => {
      await trackerProfileSettingPage.enterNewPassword(data["TC_055"].password);
    });

    await test.step("9. Enter Confirm New Password same as Old Password", async () => {
      await trackerProfileSettingPage.enterConfirmNewPassword(
        data["TC_055"].password
      );
    });

    await test.step("10. Verify The 'Save Changes' button should be disabled.", async () => {
      await trackerProfileSettingPage.verifyChangePasswordSaveChangesButtonIsDisabled();
    });

    await test.step("11. Verify Red cross should be displayed in front of message 'Should contain at least 1 numeric character.'", async () => {
      await trackerProfileSettingPage.verifyErrorMessageShowsCrossIcon(
        data["TC_055"].message
      );
    });
  });

  test("QATRKR-TC-172, Verify that user should be able to change the Timezone. @profile @profile-sanity", async () => {

    await test.step("1. Navigating to login page: " + `${baseurl}`, async () => {
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
    });

    await test.step("2. Entering the email id and clicking on continue button", async () => {
      await trackerLoginPage.enterEmailAndclickContinueBtn(`${email}`);
    });

    await test.step("3. Entering the password and clicking on continue button", async () => {
      await trackerLoginPage.enterPasswordAndclickContinueBtn(`${password}`);
    });

    await test.step('4. Verifying "Welcome to Tracker" title is visible', async () => {
      await dashboardPage.verifyWelcomeToTrackerTitleIsVisible();
    });

    await test.step("5. Clicking on My profile", async () => {
      await dashboardPage.clickOnUserProfile();
    });

    await test.step("6. Clicking on 'Settings'", async () => {
      await dashboardPage.verifyUserAbleToViewSettings();
    });

    await test.step("7. Clicking on the Timezone dropdown and select any timezone.", async () => {
      await trackerProfileSettingPage.modifyThePersonalInformation(
        data["TC_050_Profile"].firstName,
        data["TC_050_Profile"].lastName,
        data["TC_050_Profile"].timezone1
      );
    });

    await test.step("8. Clicking on 'Save changes' button", async () => {
      await trackerProfileSettingPage.clickOnSaveChangesProfileInformation();
    });

    await test.step("9. Verifying toast message 'Your details have been updated successfully.' is visible", async () => {
      await trackerProfileSettingPage.verifyToastMessageIsVisible(data["TC_048_Profile"].toastMessage);
    });

    await test.step("10. Revert Back the Personal Information", async () => {
      await trackerProfileSettingPage.modifyThePersonalInformation(
        data["TC_050_Profile"].firstName,
        data["TC_050_Profile"].lastName,
        data["TC_050_Profile"].timezone2
      );
    });

    await test.step("11. Clicking on 'Save changes' button", async () => {
      await trackerProfileSettingPage.clickOnSaveChangesProfileInformation();
    });
  });
});