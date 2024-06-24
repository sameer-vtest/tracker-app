import { BrowserContext, test, Page } from "@playwright/test";
import { TrackerLoginPage } from "../../page-objects/login-pages/login-page.ts";
import { TrackerDashboardPage } from "../../page-objects/dashboard-pages/dashboard-page.ts";
import { CompassHomePage } from "../../page-objects/compass-pages/compass-home-page.ts";
import { KYBBHomePage } from "../../page-objects/kybb-pages/kybb-home-page.ts";
import { allure } from "allure-playwright";

const data = require(`../../test-data/dashboard/app-logo.json`) as Record<string, any>;

const baseurl = process.env.BASE_URL;
const email = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;

test.describe('App-logo Tests', () => {
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

  test("QATRKR-TC-1516, Verify that the app logo is present after login.", async () => {

    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const trackerDashBoardPage: TrackerDashboardPage = new TrackerDashboardPage(page);

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
      await trackerDashBoardPage.verifyWelcomeToTrackerTitleIsVisible();
    });

    await test.step('5. Verifying App Logo On Dashboard is visible', async () => {
      await trackerDashBoardPage.verifyAppLogoInDashboard();
    });
  });

  test("QATRKR-TC-1517, Verify the app logo drop down list", async () => {

    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const trackerDashBoardPage: TrackerDashboardPage = new TrackerDashboardPage(page);

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
      await trackerDashBoardPage.verifyWelcomeToTrackerTitleIsVisible();
    });

    await test.step('5. Clicking on app logo menu drop down icon', async () => {
      await trackerDashBoardPage.clickOnAppLogoMenuDropDown();
    });

    await test.step('6. Verifying Drop Down list', async () => {
      await trackerDashBoardPage.verifyAppLogoDropDownMenuList();
    });
  });

  test("QATRKR-TC-1518, User should be able to navigate to COMPASS app by clicking on COMPASS option in app logo dropdown", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    let compassPage: Page = page;

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

    await test.step("5. Click on the drop down icon besides the app logo on dashboard", async () => {
      await dashboardPage.clickOnAppLogoMenuDropDown();
    });

    await test.step("6. Click on COMPASS option.", async () => {
      [compassPage] = await Promise.all([
        context.waitForEvent("page"),
        await dashboardPage.clickOnCompass(),
      ]);
    });
    const compassHomePage: CompassHomePage = new CompassHomePage(compassPage);

    await test.step("7. Verify that " + data["TC_003"].URL + " should open in the new tab.", async () => {
      await compassHomePage.verifyNavigateToCompassPage(data["TC_003"].URL);
    });
  });

  test("QATRKR-TC-1519, User should be able to navigate to KYBB app by clicking on KYBB option in app logo dropdown", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    let kybbPage: Page = page;

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

    await test.step("5. Click on the drop down icon besides the app logo on dashboard", async () => {
      await dashboardPage.clickOnAppLogoMenuDropDown();
    });

    await test.step("6. Click on KYBB option.", async () => {
      [kybbPage] = await Promise.all([
        context.waitForEvent("page"),
        await dashboardPage.clickOnKYBB(),
      ]);
    });
    const KYBBPage: KYBBHomePage = new KYBBHomePage(kybbPage);

    await test.step("7. Verify that " + data["TC_004"].URL + " should open in the new tab.", async () => {
      await KYBBPage.verifyNavigateToKYBBPage(data["TC_004"].URL);
    });

  });

  test("QATRKR-TC-1520, Verify that on any page, by clicking on app logo, app should navigate to the Dashboard", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);

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

    await test.step('5. Open the available board', async () => {
      await dashboardPage.clickOnRecentModifiedBoard();
    });

    await test.step('6. Click on Tracker Logo', async () => {
      await dashboardPage.clickOnMerkleScienceLogo();
    });

    await test.step('7. Verify that the app navigates to the Dashboard', async () => {
      await dashboardPage.verifyWelcomeToTrackerTitleIsVisible();
    });

    await test.step("8. Click on the user profile name on top right of the page.", async () => {
      await dashboardPage.clickOnUserProfile();
    });

    await test.step("9. Click on Settings", async () => {
      await dashboardPage.verifyUserAbleToViewSettings();
    });

    await test.step('10. Click on Tracker Logo', async () => {
      await dashboardPage.clickOnMerkleScienceLogo();
    });

    await test.step('11. Verify that the app navigates to the Dashboard', async () => {
      await dashboardPage.verifyWelcomeToTrackerTitleIsVisible();
    });
  });
});