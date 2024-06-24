import { BrowserContext, Page, expect, test } from "@playwright/test";
import { TrackerLoginPage } from "../../page-objects/login-pages/login-page.ts";
import { TrackerDashboardPage } from "../../page-objects/dashboard-pages/dashboard-page.ts";
import { GraphPage } from "../../page-objects/graph-pages/graph-page.ts";
import { allure } from "allure-playwright";
import { DetailsPanelPage } from "../../page-objects/graph-pages/details-panel-page.ts";
import { GraphToolbarPage } from "../../page-objects/graph-pages/graph-toolbar-page.ts";
import { BasePage } from "../../page-objects/utilities-pages/base-pages.ts";

const consts = require("../../constants/dashboard-constants.ts") as Record<string, any>;
const toolBarconsts = require("../../constants/graph-tool-bar-constants.ts") as Record<string, any>;
const data1 = require(`../../test-data/dashboard/dashboard.json`) as Record<string, any>;
const baseurl = process.env.BASE_URL;
const email = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;
const newFolder = "test" + `${Math.random().toString().slice(2, 8)}`;
const newBoard = "board" + `${Math.random().toString().slice(2, 5)}`;
const invalidFolder = "invalid" + `${Math.random().toString().slice(2, 5)}`;

test.describe('Homepage Tests', () => {
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

  test("QATRKR-TC-573,QATRKR-TC-574,QATRKR-TC-1288,QATRKR-TC-1289, Verify User should be able to see the Recent boards selected by default. @dashboard @dashboard-sanity", async () => {
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

    await test.step("5. Verifying Recent tab is selected by default", async () => {
      await dashboardPage.verifySelectedTabInDashboard();
    });

    await test.step("6. Clicking on watched tab", async () => {
      await dashboardPage.clickOnWatchedTab();
    });

    await test.step("7. Verifying Watched tab is selected", async () => {
      await dashboardPage.verifySelectedTabInDashboard();
    });
  });

  test("QATRKR-TC-576,QATRKR-TC-577,QATRKR-TC-578,QATRKR-TC-579,QATRKR-TC-580, Recent board validation tests. @dashboard @dashboard-regression", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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

    await test.step("5. Verifying Recent tab is selected by default", async () => {
      await dashboardPage.verifySelectedTabInDashboard();
    });

    await test.step("6. Verifying Graph", async () => {
      await dashboardPage.verifyRecentTabGraphIsVisible();
    });

    await test.step("7. Search the address", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_011_Dashboard"].address);
    });

    await test.step("8. Clicking on Add to board button and search close button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(3000);
      await graphPage.clickOnSearchCloseButton();
      await dashboardPage.clickOnMerkleScienceLogo();
      await BasePage.reloadPage(page);
    });

    await test.step("9. Verifying Currencies", async () => {
      await dashboardPage.verifyRecentTabCurrenciesIsVisible();
    });

    await test.step("10. Verifying Graphname", async () => {
      await dashboardPage.verifyRecentTabGraphNameIsVisible();
    });

    await test.step("11. Verifying Last Edited", async () => {
      await dashboardPage.verifyRecentTabGraphLastEditedIsVisible();
    });

    await test.step("12. Mouse hover on any of the board in the recent boards section", async () => {
      await dashboardPage.hoverOnTheRecentModifiedBoard();
    });

    await test.step("13. Verifying the below details of the board should be visible", async () => {
      await test.step("13a. Verifying Currencies", async () => {
        await dashboardPage.verifyRecentTabCurrenciesIsVisible();
      });

      await test.step("13b. Verifying Graphname", async () => {
        await dashboardPage.verifyRecentTabGraphNameIsVisible();
      });

      await test.step("13c. Verifying Last Edited", async () => {
        await dashboardPage.verifyRecentTabGraphLastEditedIsVisible();
      });

      await test.step("13d. Verifying Shared link", async () => {
        await dashboardPage.verifySharedLinkIsVisible();
      });

      await test.step("13e. Verifying More Details", async () => {
        await dashboardPage.verifyMoreDetailsIsVisible();
      });

      await test.step("13f. Verifying Open board. ", async () => {
        await dashboardPage.verifyOpenBoardIsVisible();
      });
    });

    await test.step("14. Clicking on More Details and verify below details of board should be visible", async () => {
      await dashboardPage.clickOnMoreDetails();

      await test.step("14a. Verifying board name", async () => {
        await dashboardPage.verifyPreviewBoardNameIsVisible();
      });

      await test.step("14b. Verifying open button", async () => {
        await dashboardPage.verifyOpenButtonIsVisible();
      });

      await test.step("14c. Verifying Shared link ", async () => {
        await dashboardPage.verifySharedLinkTextIsVisible();
      });

      await test.step("14d. Verifying Created By", async () => {
        await dashboardPage.verifyCreatedByIsVisible();
      });

      await test.step("14e. Verifying Created on", async () => {
        await dashboardPage.verifyCreatedOnIsVisible();
      });

      await test.step("14f. Verifying Last Modified on", async () => {
        await dashboardPage.verifyLastModifiedOnIsVisible();
      });

      await test.step("14g. Verifying graph preview ", async () => {
        await dashboardPage.verifyGraphPreviewIsVisible();
      });

      await test.step("14h. Verifying close icon.", async () => {
        await dashboardPage.verifyCloseIconIsVisible();
      });
    });

    await test.step("15. Clicking on open button.", async () => {
      await dashboardPage.clickOnOpenButton();
      await graphPage.deleteGraphFromBoard(data1["TC_011_Dashboard"].deleteToastMessage);
    });

    await test.step("16. Fetching the total count of board available in the recent tab.", async () => {
      await dashboardPage.fetchTotalCountOfBoardInRecentBoards();
    });

    await test.step("17. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-575,QATRKR-TC-581,QATRKR-TC-582, Clicking on Open board button should open board and infinite scroll should work in dashboard. @dashboard @dashboard-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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

    await test.step('5. Verify that boards are visible in dashboard page.', async () => {
      await dashboardPage.verifyDashboardBoardsGrid();
    });

    await test.step("6. Scrolling down to Last Board", async () => {
      await dashboardPage.scrollDownToLastBoard();
    });

    await test.step("7. Verfying that the last board is visible.", async () => {
      await dashboardPage.verifyLastBoardIsVisible();
    });

    await test.step("8. Mouse hover on any of the board in the recent boards section", async () => {
      await dashboardPage.hoverOnTheRecentModifiedBoard();
    });

    await test.step("9. Clicking on open button and verify graph container page should open.", async () => {
      await dashboardPage.clickOnOpenBoardButton();
      await graphPage.verifyGraphContainerPageIsVisible();
    });

    await test.step("10. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1343, Verify Supported Digital Assets page contents. @dashboard @dashboard-regression", async () => {
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

    await test.step("5. Clicking on My profile", async () => {
      await dashboardPage.clickOnUserProfile();
    });

    await test.step("6. Clicking on Supported Digital Assets", async () => {
      await dashboardPage.clickOnSupportedDigitalAssets();
    });

    await test.step("7. Verifying Supported Digital Assets Page Contents ", async () => {
      await dashboardPage.verifySupportedDigitalAssetsPageContents();
    });
  });

  test("QATRKR-TC-1344,QATRKR-TC-1345, Verify that I should be able to search with any available token name. @dashboard @dashboard-regression", async () => {
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

    await test.step("5. Clicking on My profile", async () => {
      await dashboardPage.clickOnUserProfile();
    });

    await test.step("6. Clicking on Supported Digital Assets", async () => {
      await dashboardPage.clickOnSupportedDigitalAssets();
    });

    await test.step("7.Verifying searched Token Name is visible in Digital Asssets", async () => {
      await dashboardPage.validateSearchedTokenIsVisible(
        data1["TC_013_Dashboard"].validTokenName
      );
      await dashboardPage.validateSearchedTokenIsVisible(
        data1["TC_013_Dashboard"].invalidTokenName
      );
    });
  });

  test("QATRKR-TC-1346, Verify that after clearing the search keyword, the frame should again display all the digital assets. @dashboard @dashboard-regression", async () => {
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

    await test.step("5. Clicking on My profile", async () => {
      await dashboardPage.clickOnUserProfile();
    });

    await test.step("6. Clicking on Supported Digital Assets", async () => {
      await dashboardPage.clickOnSupportedDigitalAssets();
    });

    await test.step("7. Validating searched token is visible", async () => {
      await dashboardPage.validateSearchedTokenIsVisible(
        data1["TC_015_Dashboard"].tokenName
      );
    });

    await test.step("8.Clearing the searched token values", async () => {
      await dashboardPage.clearTheSearchedTokenValues();
    });

    await test.step("9. Verifying all the digital assets are visible ", async () => {
      await dashboardPage.verifyAllDigitalAssetsTokenValuesAreVisible();
    });
  });

  test("QATRKR-TC-1347, Click Filter by button and verify the contents. @dashboard @dashboard-regression", async () => {
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

    await test.step("5. Clicking on My profile", async () => {
      await dashboardPage.clickOnUserProfile();
    });

    await test.step("6. Clicking on Supported Digital Assets", async () => {
      await dashboardPage.clickOnSupportedDigitalAssets();
    });

    await test.step("7. Clicking on filterBy button", async () => {
      await dashboardPage.clickOnFilterBy();
    });

    await test.step("8.Verifying the filterby page contents", async () => {
      await dashboardPage.verifyFilterByContents();
    });
  });

  test("QATRKR-TC-1348,QATRKR-TC-1349, Verify clicking on Filter select and unselect blockchain checkbox options. @dashboard @dashboard-regression", async () => {
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

    await test.step("5. Clicking on My profile", async () => {
      await dashboardPage.clickOnUserProfile();
    });

    await test.step("6. Clicking on Supported Digital Assets", async () => {
      await dashboardPage.clickOnSupportedDigitalAssets();
    });

    await test.step("7. Clicking on filterBy button", async () => {
      await dashboardPage.clickOnFilterBy();
    });

    await test.step("8. Clicking on select all button", async () => {
      await dashboardPage.clickOnFilterBySelectAll();
    });

    await test.step("9. Verifying all the checkbox should be selected", async () => {
      await dashboardPage.verifyAllTheFilterByCheckBoxshouldBeSelected();
    });

    await test.step("10. Clicking on Unselect all button", async () => {
      await dashboardPage.clickOnFilterByUnselectAll();
    });

    await test.step("11.Verifying all the checkbox should be unselected", async () => {
      await dashboardPage.verifyAllTheFilterByCheckBoxShouldBeUnselected();
    });
  });

  test("QATRKR-TC-1350,QATRKR-TC-1351, Verify that by selecting any blockchain and clicking on Filter by > Show Selected and Hide Selected values in the list. @dashboard @dashboard-regression", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const trackerDashBoardPage: TrackerDashboardPage = new TrackerDashboardPage(
      page
    );

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

    await test.step("5. Click on user profile", async () => {
      await trackerDashBoardPage.clickOnUserProfile();
    });

    await test.step("6. Verify Supported Digital Asset Frame Visible", async () => {
      await trackerDashBoardPage.clickOnSupportedDigitalAssets();
    });

    await test.step("7. Click on filter by button", async () => {
      await trackerDashBoardPage.clickOnFilterBy();
    });

    await test.step("8. Select blockchain value in filter by", async () => {
      await trackerDashBoardPage.selectBlockChainInFilterBy(
        data1["TC_019_Dashboard"].blockchain
      );
    });

    await test.step("9. Click on show selected button", async () => {
      await trackerDashBoardPage.clickOnShowSelectedButton();
    });

    await test.step("10. Verify the selected block chain value should be visible.", async () => {
      await trackerDashBoardPage.verifySelectedBlockChainvalue();
    });

    await test.step("11. Click on hide selected button", async () => {
      await trackerDashBoardPage.clickOnHideSelectedButton();
    });

    await test.step("12. Verify the Hide selected Button Not visible and show select button visible", async () => {
      await trackerDashBoardPage.verifyHideSelectedButton();
    });
  });

  test("QATRKR-TC-1352,QATRKR-TC-1353, Verify that by selecting any blockchain value and clicking on Apply button should display only the blockchain values matching the selected option and Reset should reset all the values. @dashboard @dashboard-regression", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const trackerDashBoardPage: TrackerDashboardPage = new TrackerDashboardPage(
      page
    );

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

    await test.step("5. Click on user profile", async () => {
      await trackerDashBoardPage.clickOnUserProfile();
    });

    await test.step("6. Verify Supported Digital Asset Frame Visible", async () => {
      await trackerDashBoardPage.clickOnSupportedDigitalAssets();
    });

    await test.step("7. Click on filter by button", async () => {
      await trackerDashBoardPage.clickOnFilterBy();
    });

    await test.step("8. Select blockchain value", async () => {
      await trackerDashBoardPage.selectBlockChainInFilterBy(
        data1["TC_019_Dashboard"].blockchain
      );
    });

    await test.step("9. Click on Apply button", async () => {
      await trackerDashBoardPage.clickOnApplyButton();
    });

    await test.step("10. Verify apply block chain value", async () => {
      await trackerDashBoardPage.verifyBlockchain(
        data1["TC_019_Dashboard"].blockchain
      );
    });

    await test.step("11. Click on Filter By button.", async () => {
      await trackerDashBoardPage.clickOnFilterBy();
    });

    await test.step("12. Click on Reset button.", async () => {
      await trackerDashBoardPage.clickOnFilterByResetButton();
    });

    await test.step("13. Verifying all block chains are visible.", async () => {
      await trackerDashBoardPage.verifyAllBlockChainsAreVisible();
    });
  });

  test("QATRKR-TC-1354, Verify that all the token values should not be duplicated. @dashboard @dashboard-regression", async () => {
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

    await test.step("5. Clicking on My profile", async () => {
      await dashboardPage.clickOnUserProfile();
    });

    await test.step("6. Clicking on My profile", async () => {
      await dashboardPage.clickOnSupportedDigitalAssets();
    });

    await test.step("7. Verify that all the token values displayed should not be duplicated.", async () => {
      await dashboardPage.verifyTokenIsNotDuplicated();
    });
  });

  test("QATRKR-TC-1380,QATRKR-TC-1381, Verify that the Search text field should be displayed even after user scrolls to the bottom of the page. @dashboard @dashboard-sanity", async () => {
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

    await test.step("5. Verify that Search text field should be displayed", async () => {
      await dashboardPage.verifySearchForAddressInputIsVisible();
    });

    await test.step("6. On dashboard, scroll to the bottom of the page.", async () => {
      await dashboardPage.scrollDownToLastBoard();
    });

    await test.step("7. Verify that Search text field should still be displayed", async () => {
      await dashboardPage.verifySearchForAddressInputIsVisible();
    });
  });

  test("QATRKR-TC-1382, Verify that Search bar should be visible when clicked on RECENT and WATCHED sections. @dashboard @dashboard-sanity", async () => {
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

    await test.step("5. Verifying search for address bar is displayed when clicked on Recent tab", async () => {
      await dashboardPage.verifySearchForAddressInputIsVisible();
    });

    await test.step("6. Clicking on watched tab", async () => {
      await dashboardPage.clickOnWatchedTab();
    });

    await test.step("7. Verifying search for address bar is displayed when clicked on Watched tab", async () => {
      await dashboardPage.verifySearchForAddressInputIsVisible();
    });

    await test.step("8. Clicking on shared watchlist tab", async () => {
      await dashboardPage.clickOnSharedWatchlistTab();
    });

    await test.step("9. Verifying search for address bar is displayed when clicked on shared watchlist tab", async () => {
      await dashboardPage.verifySearchForAddressInputIsVisible();
    });
  });

  test("QATRKR-TC-1383,QATRKR-TC-1384,QATRKR-TC-1385,QATRKR-TC-1386,QATRKR-TC-1387,QATRKR-TC-1388,QATRKR-TC-1398,QATRKR-TC-1399,QATRKR-TC-1400,QATRKR-TC-1401,QATRKR-TC-1402,QATRKR-TC-1403,QATRKR-TC-1404,QATRKR-TC-1405,QATRKR-TC-1406,QATRKR-TC-1407,QATRKR-TC-1408,QATRKR-TC-1409,QATRKR-TC-1410,QATRKR-TC-1411, Verify that any search changes should be present in the URL query params for invalid keywords. @dashboard @dashboard-sanity", async () => {
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

    await test.step("5. Search with a invalid token: " + data1["TC_027_Dashboard"].invalidToken, async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_027_Dashboard"].invalidToken);
    });

    await test.step("6. Verify that searching with invalid keyword should display valid warning message and click on 'X' icon.", async () => {
      await dashboardPage.validateInvalidAddress(data1["TC_027_Dashboard"].invalidToken);
    });

    await test.step("7. Search with a valid address: " + data1["TC_027_Dashboard"].validAddress, async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_027_Dashboard"].validAddress);
    });

    await test.step("8. Verify that searched address should be present in the URL query params", async () => {
      const actualUrl = page.url();
      expect(actualUrl).toContain(consts.SEARCHED_KEYWORD + data1["TC_027_Dashboard"].validAddress);
    });

    await test.step("9. Search with a valid transaction: " + data1["TC_029_Dashboard"].validTransaction, async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_029_Dashboard"].validTransaction);
    });

    await test.step("10. Verify that searched transaction should be present in the URL query params", async () => {
      const actualUrl = page.url();
      expect(actualUrl).toContain(consts.SEARCHED_KEYWORD + data1["TC_029_Dashboard"].validTransaction);
    });

    await test.step("11. Search with a valid address and transaction: " + data1["TC_029_Dashboard"].validTransaction, async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_027_Dashboard"].validAddress + " " + data1["TC_027_Dashboard"].validTransaction);
    });

    await test.step("12. Verify that searched address and transaction should be present in the URL query params", async () => {
      const actualUrl = page.url();
      expect(actualUrl).toContain(consts.SEARCHED_KEYWORD + data1["TC_027_Dashboard"].validAddress + "%2C+" + data1["TC_027_Dashboard"].validTransaction);
    });

    await test.step("13. Search multiple addresses seperated by space: " + data1["TC_042_Dashboard"].address1 + " " + data1["TC_042_Dashboard"].address2 + " " + data1["TC_042_Dashboard"].address3, async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_042_Dashboard"].address1 + " " + data1["TC_042_Dashboard"].address2 + " " + data1["TC_042_Dashboard"].address3);
    }
    );

    await test.step("14. Verify that searched result for multiple addresses seperated by space", async () => {
      await dashboardPage.verifySearchResults(data1["TC_042_Dashboard"].address1 + "," + data1["TC_042_Dashboard"].address2 + "," + data1["TC_042_Dashboard"].address3);
      await dashboardPage.clickOnCloseIcon();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("15. Search multiple addresses seperated by comma: " + data1["TC_042_Dashboard"].address1 + " " + data1["TC_042_Dashboard"].address2 + " " + data1["TC_042_Dashboard"].address3, async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_042_Dashboard"].address1 + "," + data1["TC_042_Dashboard"].address2 + "," + data1["TC_042_Dashboard"].address3);
    }
    );

    await test.step("16. Verify that searched result for multiple addresses seperated by comma", async () => {
      await dashboardPage.verifySearchResults(data1["TC_042_Dashboard"].address1 + "," + data1["TC_042_Dashboard"].address2 + "," + data1["TC_042_Dashboard"].address3);
      await dashboardPage.clickOnCloseIcon();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("17. Search multiple addresses seperated by new line: " + data1["TC_042_Dashboard"].address1 + " " + data1["TC_042_Dashboard"].address2 + " " + data1["TC_042_Dashboard"].address3, async () => {
      await dashboardPage.clickAndFillSearchForAddress(
        data1["TC_042_Dashboard"].address1 +
        "\n" +
        data1["TC_042_Dashboard"].address2 +
        "\n" +
        data1["TC_042_Dashboard"].address3
      );
    }
    );

    await test.step("18. Verify that searched result for multiple addresses seperated by new line: ", async () => {
      await dashboardPage.verifySearchResults(
        data1["TC_042_Dashboard"].address1 +
        "," +
        data1["TC_042_Dashboard"].address2 +
        "," +
        data1["TC_042_Dashboard"].address3 +
        "," +
        data1["TC_042_Dashboard"].address4
      );
      await dashboardPage.clickOnCloseIcon();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("19. Search multiple addresses seperated by space, comma and new line: " +
      data1["TC_042_Dashboard"].multipleAddressesWithSpace,
      async () => {
        await dashboardPage.clickAndFillSearchForAddress(
          data1["TC_042_Dashboard"].address1 +
          "," +
          data1["TC_042_Dashboard"].address2 +
          " " +
          data1["TC_042_Dashboard"].address3 +
          "\n" +
          data1["TC_042_Dashboard"].address4
        );
      }
    );

    await test.step("20. Verify that searched multiple addresses seperated by space, comma and new line" +
      data1["TC_042_Dashboard"].address1 +
      " " +
      data1["TC_042_Dashboard"].address2 +
      " " +
      data1["TC_042_Dashboard"].address3 +
      " " +
      data1["TC_042_Dashboard"].address4,
      async () => {
        await dashboardPage.verifySearchResults(
          data1["TC_042_Dashboard"].address1 +
          "," +
          data1["TC_042_Dashboard"].address2 +
          "," +
          data1["TC_042_Dashboard"].address3 +
          "," +
          data1["TC_042_Dashboard"].address4
        );
        await dashboardPage.clickOnCloseIcon();
        await dashboardPage.clickOnSearchClearButton();
      }
    );

    await test.step("21. Search multiple transactions seperated by space: " +
      data1["TC_046_Dashboard"].transaction1 +
      " " +
      data1["TC_046_Dashboard"].transaction2 +
      " " +
      data1["TC_046_Dashboard"].transaction3,
      async () => {
        await dashboardPage.clickAndFillSearchForAddress(
          data1["TC_046_Dashboard"].transaction1 +
          " " +
          data1["TC_046_Dashboard"].transaction2 +
          " " +
          data1["TC_046_Dashboard"].transaction3
        );
      }
    );

    await test.step("22. Verify that searched result for multiple transactions seperated by comma", async () => {
      await dashboardPage.verifySearchResults(
        data1["TC_046_Dashboard"].transaction1 +
        "," +
        data1["TC_046_Dashboard"].transaction2 +
        "," +
        data1["TC_046_Dashboard"].transaction3
      );
      await dashboardPage.clickOnCloseIcon();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("23. Search multiple transactions seperated by comma: " +
      data1["TC_046_Dashboard"].transaction1 +
      " " +
      data1["TC_046_Dashboard"].transaction2 +
      " " +
      data1["TC_046_Dashboard"].transaction3,
      async () => {
        await dashboardPage.clickAndFillSearchForAddress(
          data1["TC_046_Dashboard"].transaction1 +
          "," +
          data1["TC_046_Dashboard"].transaction2 +
          "," +
          data1["TC_046_Dashboard"].transaction3
        );
      }
    );

    await test.step("24. Verify that searched result for multiple transactions seperated by comma", async () => {
      await dashboardPage.verifySearchResults(
        data1["TC_046_Dashboard"].transaction1 +
        "," +
        data1["TC_046_Dashboard"].transaction2 +
        "," +
        data1["TC_046_Dashboard"].transaction3
      );
      await dashboardPage.clickOnCloseIcon();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("25. Search multiple transactions seperated by new line: " +
      data1["TC_046_Dashboard"].transaction1 +
      " " +
      data1["TC_046_Dashboard"].transaction2 +
      " " +
      data1["TC_046_Dashboard"].transaction3,
      async () => {
        await dashboardPage.clickAndFillSearchForAddress(
          data1["TC_046_Dashboard"].transaction1 +
          "\n" +
          data1["TC_046_Dashboard"].transaction2 +
          "\n" +
          data1["TC_046_Dashboard"].transaction3
        );
      }
    );

    await test.step("26. Verify that searched result for multiple transactions seperated by new line", async () => {
      await dashboardPage.verifySearchResults(
        data1["TC_046_Dashboard"].transaction1 +
        "," +
        data1["TC_046_Dashboard"].transaction2 +
        "," +
        data1["TC_046_Dashboard"].transaction3
      );
      await dashboardPage.clickOnCloseIcon();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("27. Search multiple transactions seperated by space, comma and new line: " +
      data1["TC_046_Dashboard"].transaction1 +
      " " +
      data1["TC_046_Dashboard"].transaction2 +
      " " +
      data1["TC_046_Dashboard"].transaction3 +
      " " +
      data1["TC_046_Dashboard"].transaction4,
      async () => {
        await dashboardPage.clickAndFillSearchForAddress(
          data1["TC_046_Dashboard"].transaction1 +
          "," +
          data1["TC_046_Dashboard"].transaction2 +
          " " +
          data1["TC_046_Dashboard"].transaction3 +
          "\n" +
          data1["TC_046_Dashboard"].transaction4
        );
      }
    );

    await test.step("28. Verify that searched multiple transactions seperated by space, comma and new line", async () => {
      await dashboardPage.verifySearchResults(data1["TC_046_Dashboard"].transaction1 + "," + data1["TC_046_Dashboard"].transaction2 + "," + data1["TC_046_Dashboard"].transaction3 + "," + data1["TC_046_Dashboard"].transaction4);
      await dashboardPage.clickOnCloseIcon();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("29. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1389,QATRKR-TC-1390,QATRKR-TC-1391,QATRKR-TC-1392,QATRKR-TC-1393,QATRKR-TC-1394,QATRKR-TC-1395,QATRKR-TC-1396,QATRKR-TC-1397,QATRKR-TC-2271 Verify the contents of search results. @dashboard @dashboard-sanity", async () => {
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

    await test.step("5. Verify that contents of results for searching with valid single address having single currency.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_033_Dashboard"].singleAddressSingleCurrency);
      await dashboardPage.verifySearchResultContents();
      await dashboardPage.verifySearchResultsCount(data1["TC_033_Dashboard"].singleAddressSingleCurrency, data1["TC_033_Dashboard"].addresses);
      await dashboardPage.clickOnCloseIcon();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("6. Verify that contents of results for searching with valid single address having multiple currencies.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_033_Dashboard"].singleAddressMutlipleCurrencies);
      await dashboardPage.verifySearchResultContents();
      await dashboardPage.verifySearchResultsCount(data1["TC_033_Dashboard"].singleAddressMutlipleCurrencies, data1["TC_033_Dashboard"].addresses);
      await dashboardPage.clickOnCloseIcon();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("7. Verify that contents of results for searching with valid single transaction having single currency.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_033_Dashboard"].singleTransactionSingleCurrency);
      await dashboardPage.VerifyTxnResultContents();
      await dashboardPage.verifySearchResultsCount(data1["TC_033_Dashboard"].singleTransactionSingleCurrency, data1["TC_033_Dashboard"].transactions);
      await dashboardPage.clickOnCloseIcon();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("8. Verify that contents of results for searching with valid single tagged address having single currency.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_033_Dashboard"].singleTaggedAddressSingleCurrency);
      await dashboardPage.verifySearchResultContents();
      await dashboardPage.clickOnCloseIcon();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("9. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1412,QATRKR-TC-1413,QATRKR-TC-1414,QATRKR-TC-1415,QATRKR-TC-1416,QATRKR-TC-1417,QATRKR-TC-1418, Verify the contents of details panel for selected nodes and transaction. @dashboard @dashboard-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
    const detailsPanelPage: DetailsPanelPage = new DetailsPanelPage(page);
    const graphToolbarPage: GraphToolbarPage = new GraphToolbarPage(page);

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

    await test.step("5. Verify that I should be able to add single currency to a baord for address with multiple currencies.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_056_Dashboard"].addressWithMultipleCurrencies);
      await dashboardPage.addCurrencyToBoard(data1["TC_056_Dashboard"].Currencies.split(',')[0]);
      await page.waitForTimeout(5000);
      await graphPage.verifyGraphSavedToastMessage(data1["TC_011_Dashboard"].graphSavedToastMessage);
      await graphPage.clickOnSearchCloseButton();
      await graphPage.verifyGraphContainerPageIsVisible();
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data1["TC_056_Dashboard"].addressWithMultipleCurrencies, data1["TC_056_Dashboard"].Currencies.split(',')[0]);
      await detailsPanelPage.verifySpecifiedAddressMatchesWithAddressInDetailsPanel(data1["TC_056_Dashboard"].addressWithMultipleCurrencies);
      await detailsPanelPage.verifySpecifiedCurrencyMatchesWithCurrencyInDetailsPanel(data1["TC_056_Dashboard"].Currencies.split(',')[0]);
      await detailsPanelPage.closeDetailsPanel();
      await graphPage.deleteGraphFromBoard(data1["TC_011_Dashboard"].deleteToastMessage);
      await dashboardPage.verifyBoardExistsAfterDeletion(JSON.stringify(board).slice(1, -1));
    });

    await test.step("6. Verify that I should be able to add address with single currency to a board.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_056_Dashboard"].addressWithSingleCurrency);
      await dashboardPage.addCurrencyToBoard(data1["TC_056_Dashboard"].Currencies.split(',')[1]);
      await page.waitForTimeout(5000);
      await graphPage.verifyGraphSavedToastMessage(data1["TC_011_Dashboard"].graphSavedToastMessage);
      await graphPage.clickOnSearchCloseButton();
      await graphPage.verifyGraphContainerPageIsVisible();
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data1["TC_056_Dashboard"].addressWithSingleCurrency, data1["TC_056_Dashboard"].Currencies.split(',')[1]);
      await detailsPanelPage.verifySpecifiedAddressMatchesWithAddressInDetailsPanel(data1["TC_056_Dashboard"].addressWithSingleCurrency);
      await detailsPanelPage.verifySpecifiedCurrencyMatchesWithCurrencyInDetailsPanel(data1["TC_056_Dashboard"].Currencies.split(',')[1]);
      await detailsPanelPage.closeDetailsPanel();
      await graphPage.deleteGraphFromBoard(data1["TC_011_Dashboard"].deleteToastMessage);
      await dashboardPage.verifyBoardExistsAfterDeletion(JSON.stringify(board).slice(1, -1));
    });

    await test.step("7. Verify that I should be able to add address with multiple currencies to a board.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_056_Dashboard"].addressWithMultipleCurrencies);
      await dashboardPage.addCurrencyToBoard(data1["TC_056_Dashboard"].Currencies.split(',')[0]);
      await page.waitForTimeout(5000);
      await graphPage.verifyGraphSavedToastMessage(data1["TC_011_Dashboard"].graphSavedToastMessage);
      await graphPage.verifyGraphContainerPageIsVisible();
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await dashboardPage.addCurrencyToBoard(data1["TC_056_Dashboard"].Currencies.split(',')[2] + "," + data1["TC_056_Dashboard"].Currencies.split(',')[3]);
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data1["TC_056_Dashboard"].addressWithMultipleCurrencies, data1["TC_056_Dashboard"].Currencies.split(',')[0]);
      await detailsPanelPage.verifySpecifiedAddressMatchesWithAddressInDetailsPanel(data1["TC_056_Dashboard"].addressWithMultipleCurrencies);
      await detailsPanelPage.verifySpecifiedCurrencyMatchesWithCurrencyInDetailsPanel(data1["TC_056_Dashboard"].Currencies.split(',')[0]);
      await detailsPanelPage.closeDetailsPanel();
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data1["TC_056_Dashboard"].addressWithMultipleCurrencies, data1["TC_056_Dashboard"].Currencies.split(',')[2]);
      await detailsPanelPage.verifySpecifiedAddressMatchesWithAddressInDetailsPanel(data1["TC_056_Dashboard"].addressWithMultipleCurrencies);
      await detailsPanelPage.verifySpecifiedCurrencyMatchesWithCurrencyInDetailsPanel(data1["TC_056_Dashboard"].Currencies.split(',')[2]);
      await detailsPanelPage.closeDetailsPanel();
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data1["TC_056_Dashboard"].addressWithMultipleCurrencies, data1["TC_056_Dashboard"].Currencies.split(',')[3]);
      await detailsPanelPage.verifySpecifiedAddressMatchesWithAddressInDetailsPanel(data1["TC_056_Dashboard"].addressWithMultipleCurrencies);
      await detailsPanelPage.verifySpecifiedCurrencyMatchesWithCurrencyInDetailsPanel(data1["TC_056_Dashboard"].Currencies.split(',')[3]);
      await detailsPanelPage.closeDetailsPanel();
      await graphPage.deleteGraphFromBoard(data1["TC_011_Dashboard"].deleteToastMessage);
      await dashboardPage.verifyBoardExistsAfterDeletion(JSON.stringify(board).slice(1, -1));
    });

    await test.step("8. Verify that I should be able to add transaction to a board.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_056_Dashboard"].transactionWithSingleCurrency);
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.verifyGraphSavedToastMessage(data1["TC_011_Dashboard"].graphSavedToastMessage);
      await graphPage.verifyGraphContainerPageIsVisible();
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await graphPage.clickOnSearchCloseButton();
      await detailsPanelPage.verifyTransactionDetails(consts.TRANSFER, data1["TC_056_Dashboard"].transactionWithSingleCurrency, true);
      await graphPage.deleteGraphFromBoard(data1["TC_011_Dashboard"].deleteToastMessage);
      await dashboardPage.verifyBoardExistsAfterDeletion(JSON.stringify(board).slice(1, -1));
    });

    await test.step("9. Verify Remove from list, add to board buttons and Already added tool tip message when searched with address or transaction with single currency.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_056_Dashboard"].addressWithSingleCurrency);
      await dashboardPage.verifyRemoveAndAddToBoardPlusIcon();
      await dashboardPage.clickOnSearchClearButton();

      await dashboardPage.clickAndFillSearchForAddress(data1["TC_056_Dashboard"].transactionWithSingleCurrency);
      await dashboardPage.verifyRemoveAndAddToBoardPlusIcon();

      await dashboardPage.clickAndFillSearchForAddress(data1["TC_056_Dashboard"].addressWithMultipleCurrencies);
      await dashboardPage.addCurrencyToBoard(data1["TC_056_Dashboard"].Currencies.split(',')[0]);
      await page.waitForTimeout(5000);
      await graphPage.verifyGraphContainerPageIsVisible();

      await dashboardPage.verifyAlreadyAddedIcon(data1["TC_056_Dashboard"].Currencies.split(',')[0]);
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphPage.deleteGraphFromBoard(data1["TC_011_Dashboard"].deleteToastMessage);
      await dashboardPage.verifyBoardExistsAfterDeletion(JSON.stringify(board).slice(1, -1));
    });

    await test.step("10. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1251,QATRKR-TC-1252,QATRKR-TC-1253,QATRKR-TC-1254,QATRKR-TC-1255,QATRKR-TC-1256,QATRKR-TC-1257,QATRKR-TC-1263,QATRKR-TC-1264,QATRKR-TC-1265,QATRKR-TC-1266,QATRKR-TC-1267,QATRKR-TC-1268,QATRKR-TC-1269 All folders where you have access should be visible, verify user is able to create rename and delete folder and board. @dashboard @dashboard-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);

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

    await test.step("5. Searching for a folder in files and folders which the user shouldn't have access to", async () => {
      await dashboardPage.performFileOrFolderSearch(invalidFolder);
    });

    await test.step("6. Verifying 'Add a new workspace to organize your boards' is displayed", async () => {
      await dashboardPage.verifyAddANewWorkspaceToOrganizeYourBoardsIsVisible(data1["TC_014_Dashboard"].expectedText);
    });

    await test.step("7. Creating a New folder, Verifying for a folder in files and folders which the user should have access to", async () => {
      await dashboardPage.createNewFolder(newFolder, consts.ENTER);
    });

    await test.step("8. Verifying user should not be able to create 2 folders with same name", async () => {
      await dashboardPage.createFolderAndVerifyAlreadyCreatedToastMessage(newFolder, "Folder name " + newFolder + " already exists", consts.ENTER);
    });

    await test.step("9. Verifying fields by clicking on plus icon on a Folder.", async () => {
      await dashboardPage.verifyFieldsUnderFolderPlusBtn(newFolder);
    });

    await test.step("10. Verify user is able to create a board inside the folder and able to see expand icon when created a board inside the folder", async () => {
      await dashboardPage.createBoardInsideAFolder(newBoard, consts.ENTER);
      await graphPage.verifyGraphContainerPageIsVisible();
      await dashboardPage.clickOnMerkleScienceLogo();
    });

    await test.step("11. Verify user is unable to delete folder when there is a board inside it and validate the toast message", async () => {
      await dashboardPage.clickOnFolderDeleteBtnAndValidateTheToastMessage(newFolder, data1["TC_074_Dashboard"].folderContainsFoldersOrBoardsToastMessage);
    });

    await test.step("12. Verifying user is able to see expand icon when created a board inside the folder and user is able to rename and delete board.", async () => {
      await dashboardPage.searchAndVerifyBoard(newBoard);
      await dashboardPage.renameAndDeleteBoard(newBoard, consts.ENTER);
    });

    await test.step("13. Verifying user is able to rename and delete the existing folder name and validating toast message", async () => {
      await dashboardPage.renameAndDeleteFolder(newFolder, consts.ENTER);
    });

    await test.step("14. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1258,QATRKR-TC-1259,QATRKR-TC-1260,QATRKR-TC-1261,QATRKR-TC-1262, verify user is able to create board and validate board preview contents. @dashboard @dashboard-sanity", async () => {
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

    await test.step("5. Verify user is able to create a new board", async () => {
      await dashboardPage.createABoard(newBoard, consts.ENTER);
      await dashboardPage.clickOnMerkleScienceLogo();
      await dashboardPage.searchAndVerifyBoard(newBoard);
    });

    await test.step("6. Verify user is able to see detailed preview of the board when clicked on the searched board", async () => {
      await dashboardPage.clickOnBoradAndValidateDetailedPreviewContents(newBoard);
      await dashboardPage.clickOnOpenButtonAndVerifyGraphPage();
      await page.waitForTimeout(10000);
      await dashboardPage.clickOnMerkleScienceLogo();
    });

    await test.step("7. Verify user should not be able to create 2 boards with same name", async () => {
      await dashboardPage.createBoardAndVerifyAlreadyCreatedToastMessage(newBoard, data1["TC_074_Dashboard"].boardAlreadyExistExpectedText, consts.ENTER);
      await dashboardPage.performFileOrFolderSearch(newBoard);
      await dashboardPage.renameAndDeleteBoard(newBoard, consts.ENTER);
    });

    await test.step("8. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1270,QATRKR-TC-1271,QATRKR-TC-1272,QATRKR-TC-1273,QATRKR-TC-1274, verify user with view permission should not be able to rename and delete board. @dashboard @dashboard-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphToolbarPage: GraphToolbarPage = new GraphToolbarPage(page);

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

    await test.step("5. Verify user is able to click on Open board icon and navigated to graph page", async () => {
      await dashboardPage.verifyGraphOpenIconAndClickOnIt();
    });

    await test.step("6. Verify user with read permission should not be able to delete the boards", async () => {
      await dashboardPage.createABoard(data1["TC_082_Dashboard"].boardName, consts.ENTER);
      await dashboardPage.clickOnMerkleScienceLogo();
      await dashboardPage.createABoard(newBoard, consts.ENTER);
      await graphToolbarPage.shareGraphToUserWithEditOrViewOption(data1["TC_082_Dashboard"].teamMemberName, data1["TC_082_Dashboard"].canView, data1["TC_082_Dashboard"].graphInvitationToastMessage);
      await dashboardPage.logoutFromApplication();
      await trackerLoginPage.enterEmailAddress(data1["TC_082_Dashboard"].email);
      await trackerLoginPage.clickOnContinueButton();
      await trackerLoginPage.enterPassword(data1["TC_082_Dashboard"].password);
      await trackerLoginPage.clickOnLoginButton();
      await dashboardPage.deleteBoardWithViewAccess(data1["TC_082_Dashboard"].email, newBoard, data1["TC_082_Dashboard"].userDoNotHaveAccessToastMsg);
      await dashboardPage.renameBoardWithViewAccess(newBoard, data1["TC_082_Dashboard"].userDoNotHaveAccessToastMsg, consts.ENTER);
      await dashboardPage.searchBoardWithoutAccess(data1["TC_082_Dashboard"].boardName, data1["TC_014_Dashboard"].expectedText)
      await dashboardPage.reloginAndDeleteTheBoard(`${email}`, `${password}`, newBoard, data1["TC_082_Dashboard"].boardName)
    });

    await test.step("7. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1290,QATRKR-TC-1294,QATRKR-TC-1295,QATRKR-TC-1296,QATRKR-TC-1297,QATRKR-TC-1297,QATRKR-TC-1298,QATRKR-TC-1299,QATRKR-TC-1300,QATRKR-TC-1301,QATRKR-TC-1302,QATRKR-TC-1303,QATRKR-TC-1304,QATRKR-TC-1305,QATRKR-TC-1306,QATRKR-TC-1307,QATRKR-TC-1308,QATRKR-TC-1309,QATRKR-TC-1311 Verify user should be able to see watched address in watched tab and can also update, delete it. @dashboard @dashboard-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
    const graphToolbarPage: GraphToolbarPage = new GraphToolbarPage(page);
    const detailsPanelPage: DetailsPanelPage = new DetailsPanelPage(page);

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

    await test.step("5. Search the address", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_090"].transactionWithSingleCurrency);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
    });

    await test.step("7. Verfying user should be able to see watched address and can also update and remove the address from watchlist in watched tab.", async () => {
      await dashboardPage.verifySearchForAddressInputIsVisible();
      await graphPage.verifyGraphSavedToastMessage(data1["TC_090"].graphSavedToastMessage);
      await graphPage.clickOnSearchCloseButton();
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data1["TC_090"].untaggedAddress, data1["TC_090"].Currency);
      await detailsPanelPage.clickOnWatchBtn();
      await detailsPanelPage.watchTheAddress(data1["TC_090"].watchTypeInput, data1["TC_090"].minDollarValue, data1["TC_090"].maxDollarValue, data1["TC_090"].transferTypeInput, data1["TC_090"].watchAddressSuccessToastMessage);
      const board = JSON.stringify(await graphPage.fetchNewlyCreatedBoardName()).slice(1, -1);

      await dashboardPage.clickOnMerkleScienceLogo();
      await page.waitForTimeout(5000);
      await dashboardPage.clickOnWatchedTab();
      let isWatchedAddressVisible = false;
      isWatchedAddressVisible = await dashboardPage.verifyWatchedAddressIsVisible(board, data1["TC_090"].untaggedAddress);
      expect(isWatchedAddressVisible).toBeTruthy();
      await dashboardPage.clickOnModifyBtnForWatchedAddress(board, data1["TC_090"].untaggedAddress);
      let isUpdateWatchlistDialogVisible = false;
      isUpdateWatchlistDialogVisible = await detailsPanelPage.verifyDialogIsVisible(consts.UPDATE_WATCHLIST);
      expect(isUpdateWatchlistDialogVisible).toBeTruthy();
      await dashboardPage.closeUpdateWatchlistDialog();
      await page.waitForTimeout(2000);
      isUpdateWatchlistDialogVisible = await detailsPanelPage.verifyDialogIsVisible(consts.UPDATE_WATCHLIST);
      expect(isUpdateWatchlistDialogVisible).toBeFalsy();
      await dashboardPage.clickOnModifyBtnForWatchedAddress(board, data1["TC_090"].untaggedAddress);
      await detailsPanelPage.watchTheAddress(data1["TC_090"].updatedWatchTypeInput, data1["TC_090"].updatedMinDollarValue, data1["TC_090"].updatedMaxDollarValue, data1["TC_090"].updatedTransferTypeInput, data1["TC_090"].watchAddressUpdateSuccessToastMessage);
      await dashboardPage.clickOnRemoveBtnForWatchedAddress(board, data1["TC_090"].untaggedAddress, data1["TC_090"].watchlistRemovalToastMessage);
      await page.waitForTimeout(5000);
      isWatchedAddressVisible = await dashboardPage.verifyWatchedAddressIsVisible(board, data1["TC_090"].untaggedAddress);
      expect(isWatchedAddressVisible).toBeFalsy();
      await dashboardPage.deleteTheBoard(board);
    });

    await test.step("8. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-583,QATRKR-TC-1478,QATRKR-TC-1479 Verify that the most recently modified board should be visible first in the Recent tab. @dashboard @dashboard-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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

    await test.step("5. Search the address with single currency", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_011_Dashboard"].address);
    });

    await test.step("6. Verifying auto saved board which is added should be displayed in the RECENT tab.", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await dashboardPage.clickOnMerkleScienceLogo();
      await BasePage.reloadPage(page);
      await dashboardPage.verifyRecentBoard(JSON.stringify(board).slice(1, -1), data1["TC_011_Dashboard"].deleteToastMessage);
    });

    await test.step("7. Search the transaction", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_011_Dashboard"].validTransaction);
    });

    await test.step("8. Verifying auto saved transaction added to board should be displayed in the RECENT tab.", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await dashboardPage.clickOnMerkleScienceLogo();
      await BasePage.reloadPage(page);
      await dashboardPage.verifyRecentBoard(JSON.stringify(board).slice(1, -1), data1["TC_011_Dashboard"].deleteToastMessage);
    });

    await test.step("9. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });
});