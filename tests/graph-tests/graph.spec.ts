import { BrowserContext, Page, expect, test } from "@playwright/test";
import { TrackerLoginPage } from "../../page-objects/login-pages/login-page.ts";
import { TrackerDashboardPage } from "../../page-objects/dashboard-pages/dashboard-page.ts";
import { GraphPage } from "../../page-objects/graph-pages/graph-page.ts";
import { allure } from "allure-playwright";
import { DetailsPanelPage } from "../../page-objects/graph-pages/details-panel-page.ts";
import { GraphToolbarPage } from "../../page-objects/graph-pages/graph-toolbar-page.ts";

const consts = require("../../constants/graph-constants.ts") as Record<string, any>;
const toolBarconsts = require("../../constants/graph-tool-bar-constants.ts") as Record<string, any>;
const data1 = require(`../../test-data/graph/graph.json`) as Record<string, any>;
const data2 = require(`../../test-data/graph/graph-details-panel.json`) as Record<string, any>;
const baseurl = process.env.BASE_URL;
const email = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;

test.describe('Board Details Panel Tests', () => {
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

  test("QATRKR-TC-1444,QATRKR-TC-1445,QATRKR-TC-1446,QATRKR-TC-1447,QATRKR-TC-1448,QATRKR-TC-1449,QATRKR-TC-1450,QATRKR-TC-1451,QATRKR-TC-1452,QATRKR-TC-1453,QATRKR-TC-1454,QATRKR-TC-1455, Verify Graph page should display Search functionality. @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
    let actualUrl = "";

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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(10000);
    });

    await test.step("7. Verfying Search bar is visible on the graph page", async () => {
      await dashboardPage.verifySearchForAddressInputIsVisible();
    });

    await test.step("8. Search with a invalid token: " + data1["TC_002_Graph"].invalidToken, async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_002_Graph"].invalidToken);
    });

    await test.step("9. Verify that searching with invalid keyword should display valid warning message and click on 'X' icon.", async () => {
      await dashboardPage.validateInvalidAddress(data1["TC_002_Graph"].invalidToken);
    });

    await test.step("10. Search with a valid address: " + data1["TC_002_Graph"].validAddress, async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_002_Graph"].validAddress);
    });

    await test.step("11. Verify that searched address should be present in the URL query params", async () => {
      actualUrl = page.url();
      expect(actualUrl).toContain(consts.SEARCHED_KEYWORD + data1["TC_002_Graph"].validAddress);
    });

    await test.step("12. Search with a valid transaction: " + data1["TC_002_Graph"].validTransaction, async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_002_Graph"].validTransaction);
    });

    await test.step("13. Verify that searched transaction should be present in the URL query params", async () => {
      actualUrl = page.url();
      expect(actualUrl).toContain(consts.SEARCHED_KEYWORD + data1["TC_002_Graph"].validTransaction);
    });

    await test.step("14. Search with a valid address and transaction: " + data1["TC_002_Graph"].validTransaction, async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_002_Graph"].validAddress + " " + data1["TC_002_Graph"].validTransaction);
    });

    await test.step("15. Verify that searched address and transaction should be present in the URL query params", async () => {
      actualUrl = page.url();
      expect(actualUrl).toContain(consts.SEARCHED_KEYWORD + data1["TC_002_Graph"].validAddress + "%2C+" + data1["TC_002_Graph"].validTransaction);
    });

    await test.step("16. Verify that contents of results for searching with valid single address having single currency.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_002_Graph"].singleAddressSingleCurrency);
      await dashboardPage.verifySearchResultContents();
    });

    await test.step("17. Verify that contents of results along with tool tip validation for searching with valid single tagged address having single currency.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_002_Graph"].singleTaggedAddressSingleCurrency);
      await dashboardPage.verifySearchResultContents();
    });

    await test.step("18. Verify that contents of results along with tool tip validation for searching with valid single address having multiple currencies.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_002_Graph"].singleAddressMutlipleCurrencies);
      await dashboardPage.verifySearchResultContents();
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphPage.deleteGraphFromBoard(data1["TC_002_Graph"].deleteToastMessage);
      await dashboardPage.verifyBoardExistsAfterDeletion(JSON.stringify(board).slice(1, -1));
    });

    await test.step("19. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1456,QATRKR-TC-1457,QATRKR-TC-1458,QATRKR-TC-1459,QATRKR-TC-1460,QATRKR-TC-1461,QATRKR-TC-1462,QATRKR-TC-1463,QATRKR-TC-1464,QATRKR-TC-1465,QATRKR-TC-1467 Verify Graph page should display Search functionality. @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
    let actualUrl = "";

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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
    });

    await test.step("7. Verfying Search bar is visible on the graph page", async () => {
      await dashboardPage.verifySearchForAddressInputIsVisible();
    });

    await test.step("8. Verify that contents of results for searching with valid single address having multiple currencies.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_014_Graph"].address);
      await dashboardPage.verifySearchResultContents();
      await graphPage.verifySearchResultsCount(data1["TC_014_Graph"].address, data1["TC_014_Graph"].addresses);
      await dashboardPage.clickOnCloseIcon();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("9. Verify that contents of results for searching with valid single transaction having single currency.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_013_Graph"].singleTransactionSingleCurrency);
      await dashboardPage.VerifyTxnResultContents();
      await dashboardPage.verifySearchResultsCount(data1["TC_013_Graph"].singleTransactionSingleCurrency, data1["TC_013_Graph"].transactions);
      await dashboardPage.clickOnCloseIcon();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("10. Search multiple addresses seperated by comma: " + data1["TC_018_Graph"].address1 + " " + data1["TC_018_Graph"].address2 + " " + data1["TC_018_Graph"].address3, async () => {
      await dashboardPage.clickAndFillSearchForAddress(
        data1["TC_018_Graph"].address1 +
        "," +
        data1["TC_018_Graph"].address2 +
        "," +
        data1["TC_018_Graph"].address3
      );
    });

    await test.step("11. Verify that searched result for multiple addresses seperated by comma", async () => {
      await dashboardPage.verifySearchResults(
        data1["TC_018_Graph"].address1 +
        "," +
        data1["TC_018_Graph"].address2 +
        "," +
        data1["TC_018_Graph"].address3
      );
      await dashboardPage.clickOnCloseIcon();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("12. Search multiple addresses seperated by new line: " + data1["TC_018_Graph"].address1 + " " + data1["TC_018_Graph"].address2 + " " + data1["TC_018_Graph"].address3, async () => {
      await dashboardPage.clickAndFillSearchForAddress(
        data1["TC_018_Graph"].address1 +
        "\n" +
        data1["TC_018_Graph"].address2 +
        "\n" +
        data1["TC_018_Graph"].address3
      );
    });

    await test.step("13. Verify that searched result for multiple addresses seperated by new line: ", async () => {
      await dashboardPage.verifySearchResults(
        data1["TC_018_Graph"].address1 +
        "," +
        data1["TC_018_Graph"].address2 +
        "," +
        data1["TC_018_Graph"].address3 +
        "," +
        data1["TC_018_Graph"].address4
      );
      await dashboardPage.clickOnCloseIcon();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("14. Search multiple addresses seperated by space, comma and new line: " +
      data1["TC_018_Graph"].multipleAddressesWithSpace,
      async () => {
        await dashboardPage.clickAndFillSearchForAddress(
          data1["TC_018_Graph"].address1 +
          "," +
          data1["TC_018_Graph"].address2 +
          " " +
          data1["TC_018_Graph"].address3 +
          "\n" +
          data1["TC_018_Graph"].address4
        );
      });

    await test.step("15. Verify that searched multiple addresses seperated by space, comma and new line" +
      data1["TC_018_Graph"].address1 +
      " " +
      data1["TC_018_Graph"].address2 +
      " " +
      data1["TC_018_Graph"].address3 +
      " " +
      data1["TC_018_Graph"].address4,
      async () => {
        await dashboardPage.verifySearchResults(
          data1["TC_018_Graph"].address1 +
          "," +
          data1["TC_018_Graph"].address2 +
          "," +
          data1["TC_018_Graph"].address3 +
          "," +
          data1["TC_018_Graph"].address4
        );
        await dashboardPage.clickOnCloseIcon();
        await dashboardPage.clickOnSearchClearButton();
      });

    await test.step("16. Search multiple transactions seperated by space: " +
      data1["TC_021_Graph"].transaction1 +
      " " +
      data1["TC_021_Graph"].transaction2 +
      " " +
      data1["TC_021_Graph"].transaction3,
      async () => {
        await dashboardPage.clickAndFillSearchForAddress(
          data1["TC_021_Graph"].transaction1 +
          " " +
          data1["TC_021_Graph"].transaction2 +
          " " +
          data1["TC_021_Graph"].transaction3
        );
      });

    await test.step("17. Verify that searched result for multiple transactions seperated by space", async () => {
      await dashboardPage.verifySearchResults(
        data1["TC_021_Graph"].transaction1 +
        "," +
        data1["TC_021_Graph"].transaction2 +
        "," +
        data1["TC_021_Graph"].transaction3
      );
      await dashboardPage.clickOnCloseIcon();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("18. Search multiple transactions seperated by comma: " +
      data1["TC_021_Graph"].transaction1 +
      " " +
      data1["TC_021_Graph"].transaction2 +
      " " +
      data1["TC_021_Graph"].transaction3,
      async () => {
        await dashboardPage.clickAndFillSearchForAddress(
          data1["TC_021_Graph"].transaction1 +
          "," +
          data1["TC_021_Graph"].transaction2 +
          "," +
          data1["TC_021_Graph"].transaction3
        );
      });

    await test.step("19. Verify that searched result for multiple transactions seperated by comma", async () => {
      await dashboardPage.verifySearchResults(
        data1["TC_021_Graph"].transaction1 +
        "," +
        data1["TC_021_Graph"].transaction2 +
        "," +
        data1["TC_021_Graph"].transaction3
      );
      await dashboardPage.clickOnCloseIcon();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("20. Search multiple transactions seperated by new line: " +
      data1["TC_021_Graph"].transaction1 +
      " " +
      data1["TC_021_Graph"].transaction2 +
      " " +
      data1["TC_021_Graph"].transaction3,
      async () => {
        await dashboardPage.clickAndFillSearchForAddress(
          data1["TC_021_Graph"].transaction1 +
          "\n" +
          data1["TC_021_Graph"].transaction2 +
          "\n" +
          data1["TC_021_Graph"].transaction3
        );
      });

    await test.step("21. Verify that searched result for multiple transactions seperated by new line", async () => {
      await dashboardPage.verifySearchResults(
        data1["TC_021_Graph"].transaction1 +
        "," +
        data1["TC_021_Graph"].transaction2 +
        "," +
        data1["TC_021_Graph"].transaction3
      );
      await dashboardPage.clickOnCloseIcon();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("22. Search multiple transactions seperated by space, comma and new line: " +
      data1["TC_021_Graph"].transaction1 +
      " " +
      data1["TC_021_Graph"].transaction2 +
      " " +
      data1["TC_021_Graph"].transaction3 +
      " " +
      data1["TC_021_Graph"].transaction4,
      async () => {
        await dashboardPage.clickAndFillSearchForAddress(
          data1["TC_021_Graph"].transaction1 +
          "," +
          data1["TC_021_Graph"].transaction2 +
          " " +
          data1["TC_021_Graph"].transaction3 +
          "\n" +
          data1["TC_021_Graph"].transaction4
        );
      });

    await test.step("23. Verify that searched multiple transactions seperated by space, comma and new line", async () => {
      await dashboardPage.verifySearchResults(
        data1["TC_021_Graph"].transaction1 +
        "," +
        data1["TC_021_Graph"].transaction2 +
        "," +
        data1["TC_021_Graph"].transaction3 +
        "," +
        data1["TC_021_Graph"].transaction4
      );
      await dashboardPage.clickOnCloseIcon();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("24. Verify that searching for single transaction should display correct results.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_013_Graph"].singleTransactionSingleCurrency);
      await dashboardPage.VerifyTxnResultContents();
      await dashboardPage.verifySearchResultsCount(data1["TC_013_Graph"].singleTransactionSingleCurrency, data1["TC_013_Graph"].transactions);
      await dashboardPage.clickOnCloseIcon();
      await dashboardPage.clickOnSearchClearButton();
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphPage.deleteGraphFromBoard(data1["TC_002_Graph"].deleteToastMessage);
      await dashboardPage.verifyBoardExistsAfterDeletion(JSON.stringify(board).slice(1, -1));
    });

    await test.step("25. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1468,QATRKR-TC-1469,QATRKR-TC-1470,QATRKR-TC-1471,QATRKR-TC-1472,QATRKR-TC-1473 Verify Graph page should display Search functionality close pop up. @board @board-sanity", async () => {
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

    await test.step("5. Search the address", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
    });

    await test.step("7. Verfying Search bar is visible on the graph page", async () => {
      await dashboardPage.verifySearchForAddressInputIsVisible();
    });

    await test.step("8. Verify that by clicking on Close button for single address of single currency should close the popup", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_025_Graph"].address);
      await dashboardPage.clickOnCloseIcon();
      await graphPage.verifySearchPopupNotDisplayed();
    });

    await test.step("9. Verify that by clicking on Close button for single address of multiple currencies should close the popup", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_025_Graph"].addressWithMultipleCurrency);
      await dashboardPage.clickOnCloseIcon();
      await graphPage.verifySearchPopupNotDisplayed();
    });

    await test.step("10. Verify that by clicking on Close button for multiple addresses of single currency should close the popup", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_025_Graph"].multipleAddressSingleCurrency);
      await dashboardPage.clickOnCloseIcon();
      await graphPage.verifySearchPopupNotDisplayed();
    });

    await test.step("11. Verify that by clicking on Close button for multiple addresses of multiple currency should close the popup", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_025_Graph"].multipleAddress);
      await dashboardPage.clickOnCloseIcon();
      await graphPage.verifySearchPopupNotDisplayed();
    });

    await test.step("12. Verify that by clicking on Close button for multiple transactions should close the popup", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_025_Graph"].multipleTransaction);
      await dashboardPage.clickOnCloseIcon();
      await graphPage.verifySearchPopupNotDisplayed();
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphPage.deleteGraphFromBoard(data1["TC_002_Graph"].deleteToastMessage);
      await dashboardPage.verifyBoardExistsAfterDeletion(JSON.stringify(board).slice(1, -1));
    });

    await test.step("13. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-933,QATRKR-TC-934,QATRKR-TC-941,QATRKR-TC-943,QATRKR-TC-1474,QATRKR-TC-1475,QATRKR-TC-1476,QATRKR-TC-1477, QATRKR-TC-1480,QATRKR-TC-1481,QATRKR-TC-1483 Verify the contents of details panel for selected nodes and transaction. @board @board-sanity", async () => {
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

    await test.step("5. Search the address", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
    });

    await test.step("7. Verfying Search bar is visible on the graph page", async () => {
      await dashboardPage.verifySearchForAddressInputIsVisible();
      await graphPage.verifyGraphSavedToastMessage(data1["TC_033_Graph"].graphSavedToastMessage);
      await graphPage.clickOnSearchCloseButton();
      await graphToolbarPage.enableDragOrSelectionMode();
      await graphPage.performSelectionOnCanvas();
      await graphToolbarPage.clickOnDeleteSelectedItems();
    });

    await test.step("8. Verify that I should be able to add single currency to a board for address with multiple currencies.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_033_Graph"].addressWithMultipleCurrencies);
      await dashboardPage.addCurrencyToBoard(data1["TC_033_Graph"].Currencies.split(',')[0]);
      await graphPage.clickOnSearchCloseButton();
      await graphPage.verifyGraphContainerPageIsVisible();
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data1["TC_033_Graph"].addressWithMultipleCurrencies, data1["TC_033_Graph"].Currencies.split(',')[0]);
      await detailsPanelPage.verifySpecifiedAddressMatchesWithAddressInDetailsPanel(data1["TC_033_Graph"].addressWithMultipleCurrencies);
      await detailsPanelPage.verifySpecifiedCurrencyMatchesWithCurrencyInDetailsPanel(data1["TC_033_Graph"].Currencies.split(',')[0]);
      await detailsPanelPage.closeDetailsPanel();
      await graphToolbarPage.clickOnDeleteSelectedItems();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("9. Verify that I should be able to add address with multiple currencies to a board.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_033_Graph"].addressWithMultipleCurrencies);
      await graphPage.verifyGraphContainerPageIsVisible();
      await dashboardPage.addCurrencyToBoard(data1["TC_033_Graph"].Currencies.split(',')[2] + "," + data1["TC_033_Graph"].Currencies.split(',')[3] + "," + data1["TC_033_Graph"].Currencies.split(',')[5]);
      await graphPage.clickOnSearchCloseButton();
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data1["TC_033_Graph"].addressWithMultipleCurrencies, data1["TC_033_Graph"].Currencies.split(',')[2]);
      await detailsPanelPage.verifySpecifiedAddressMatchesWithAddressInDetailsPanel(data1["TC_033_Graph"].addressWithMultipleCurrencies);
      await detailsPanelPage.verifySpecifiedCurrencyMatchesWithCurrencyInDetailsPanel(data1["TC_033_Graph"].Currencies.split(',')[2]);
      await detailsPanelPage.closeDetailsPanel();
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data1["TC_033_Graph"].addressWithMultipleCurrencies, data1["TC_033_Graph"].Currencies.split(',')[3]);
      await detailsPanelPage.verifySpecifiedAddressMatchesWithAddressInDetailsPanel(data1["TC_033_Graph"].addressWithMultipleCurrencies);
      await detailsPanelPage.verifySpecifiedCurrencyMatchesWithCurrencyInDetailsPanel(data1["TC_033_Graph"].Currencies.split(',')[3]);
      await detailsPanelPage.closeDetailsPanel();
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data1["TC_033_Graph"].addressWithMultipleCurrencies, data1["TC_033_Graph"].Currencies.split(',')[5]);
      await detailsPanelPage.verifySpecifiedAddressMatchesWithAddressInDetailsPanel(data1["TC_033_Graph"].addressWithMultipleCurrencies);
      await detailsPanelPage.verifySpecifiedCurrencyMatchesWithCurrencyInDetailsPanel(data1["TC_033_Graph"].Currencies.split(',')[5]);
      await detailsPanelPage.closeDetailsPanel();
      await graphPage.performSelectionOnCanvas();
      await graphToolbarPage.clickOnDeleteSelectedItems();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("10. Verify that I should be able to add address with single currency to a board.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_033_Graph"].addressWithSingleCurrency);
      await dashboardPage.addCurrencyToBoard(data1["TC_033_Graph"].Currencies.split(',')[1]);
      await graphPage.verifyGraphContainerPageIsVisible();
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data1["TC_033_Graph"].addressWithSingleCurrency, data1["TC_033_Graph"].Currencies.split(',')[1]);
      await detailsPanelPage.verifySpecifiedAddressMatchesWithAddressInDetailsPanel(data1["TC_033_Graph"].addressWithSingleCurrency);
      await detailsPanelPage.verifySpecifiedCurrencyMatchesWithCurrencyInDetailsPanel(data1["TC_033_Graph"].Currencies.split(',')[1]);
      await detailsPanelPage.closeDetailsPanel();
      await graphToolbarPage.clickOnDeleteSelectedItems();
      await dashboardPage.clickOnSearchClearButton();
    });

    await test.step("11. Verify that I should be able to add transaction to a board.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_033_Graph"].transactionWithSingleCurrency);
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.verifyGraphContainerPageIsVisible();
      await detailsPanelPage.verifyTransactionDetails(consts.TRANSFER, data1["TC_033_Graph"].transactionWithSingleCurrency, true);
      await graphPage.performSelectionOnCanvas();
      await graphToolbarPage.clickOnDeleteSelectedItems();
    });

    await test.step("12. Verify Remove from list, add to board buttons and Already added tool tip message when searched with address or transaction with single currency.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_033_Graph"].addressWithSingleCurrency);
      await dashboardPage.verifyRemoveAndAddToBoardPlusIcon();
      await dashboardPage.clickOnSearchClearButton();

      await dashboardPage.clickAndFillSearchForAddress(data1["TC_033_Graph"].transactionWithSingleCurrency);
      await dashboardPage.verifyRemoveAndAddToBoardPlusIcon();

      await dashboardPage.clickAndFillSearchForAddress(data1["TC_033_Graph"].addressWithMultipleCurrencies);
      await dashboardPage.addCurrencyToBoard(data1["TC_033_Graph"].Currencies.split(',')[0]);
      await graphPage.verifyGraphContainerPageIsVisible();

      await dashboardPage.verifyAlreadyAddedIcon(data1["TC_033_Graph"].Currencies.split(',')[0]);
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphPage.deleteGraphFromBoard(data1["TC_002_Graph"].deleteToastMessage);
      await dashboardPage.verifyBoardExistsAfterDeletion(JSON.stringify(board).slice(1, -1));
    });

    await test.step("13. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-942,QATRKR-TC-991,QATRKR-TC-993 Verify the address for a node, link and Txn hash are copiable. @board @board-sanity", async () => {
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
      await dashboardPage.clickAndFillSearchForAddress(data2["TC_010"].transactionWithSingleCurrency);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
    });

    await test.step("7. Verfying address for a node, link and Txn hash are copiable.", async () => {
      await dashboardPage.verifySearchForAddressInputIsVisible();
      await graphPage.verifyGraphSavedToastMessage(data2["TC_010"].graphSavedToastMessage);
      await graphPage.clickOnSearchCloseButton();
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data2["TC_010"].untaggedAddress, data2["TC_010"].Currency);
      await detailsPanelPage.verifySpecifiedAddressIsCopiableInMetadata(data2["TC_010"].untaggedAddress);
      await detailsPanelPage.closeDetailsPanel();
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data2["TC_010"].taggedAddress, data2["TC_010"].Currency);
      await detailsPanelPage.verifySpecifiedAddressIsCopiableInMetadata(data2["TC_010"].taggedAddress);
      await detailsPanelPage.closeDetailsPanel();
      await detailsPanelPage.verifyTransactionDetails(consts.TRANSFER, data2["TC_010"].transactionWithSingleCurrency, false);
      await detailsPanelPage.verifySpecifiedAddressIsCopiableInMetadata(data2["TC_010"].transactionWithSingleCurrency);
      await detailsPanelPage.clickOnDetailsPanelBackBtn();
      await detailsPanelPage.verifySpecifiedAddressIsCopiableInMetadata(data2["TC_010"].untaggedAddress);
      await detailsPanelPage.verifySpecifiedAddressIsCopiableInMetadata(data2["TC_010"].taggedAddress);
      await detailsPanelPage.verifySpecifiedAddressIsCopiableInDetailsPanel(data2["TC_010"].transactionWithSingleCurrency.slice(-5));
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphPage.deleteGraphFromBoard(data1["TC_002_Graph"].deleteToastMessage);
      await dashboardPage.verifyBoardExistsAfterDeletion(JSON.stringify(board).slice(1, -1));
    });

    await test.step("8. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-966,QATRKR-TC-967,QATRKR-TC-968,QATRKR-TC-969,QATRKR-TC-970,QATRKR-TC-1291,QATRKR-TC-1292,QATRKR-TC-1293,QATRKR-TC-1309,QATRKR-TC-1310,QATRKR-TC-1312,QATRKR-TC-1318 Verify user should be able to watch the address. @board @board-sanity", async () => {
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
      await dashboardPage.clickAndFillSearchForAddress(data2["TC_010"].transactionWithSingleCurrency);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
    });

    await test.step("7. Verfying user should be able to add, update and remove the address from watchlist in details panel.", async () => {
      await dashboardPage.verifySearchForAddressInputIsVisible();
      await graphPage.verifyGraphSavedToastMessage(data2["TC_010"].graphSavedToastMessage);
      await graphPage.clickOnSearchCloseButton();
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data2["TC_034"].untaggedAddress, data2["TC_010"].Currency);
      await detailsPanelPage.clickOnWatchBtn();
      let isWatchTheAddressDialogVisible = false;
      isWatchTheAddressDialogVisible = await detailsPanelPage.verifyDialogIsVisible(consts.WATCH_THE_ADDRESS);
      expect(isWatchTheAddressDialogVisible).toBeTruthy();
      await detailsPanelPage.closeWatchlistDialog();
      await page.waitForTimeout(2000);
      isWatchTheAddressDialogVisible = await detailsPanelPage.verifyDialogIsVisible(consts.WATCH_THE_ADDRESS);
      expect(isWatchTheAddressDialogVisible).toBeFalsy();
      await detailsPanelPage.clickOnWatchBtn();
      await detailsPanelPage.watchTheAddress(data2["TC_034"].watchTypeInput, data2["TC_034"].minDollarValue, data2["TC_034"].maxDollarValue, data2["TC_034"].transferTypeInput, data2["TC_034"].watchAddressSuccessToastMessage);
      const board = JSON.stringify(await graphPage.fetchNewlyCreatedBoardName()).slice(1, -1);
      await dashboardPage.clickOnMerkleScienceLogo();
      await page.waitForTimeout(5000);
      await dashboardPage.clickOnWatchedTab();
      let isWatchedAddressVisible = false;
      isWatchedAddressVisible = await dashboardPage.verifyWatchedAddressIsVisible(board, data2["TC_034"].untaggedAddress);
      expect(isWatchedAddressVisible).toBeTruthy();
      await dashboardPage.clickOnBoardInWatchedTab(board);
      await graphPage.verifyGraphContainerPageIsVisible();
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data2["TC_034"].untaggedAddress, data2["TC_010"].Currency);
      await detailsPanelPage.clickOnWatchBtn();
      await detailsPanelPage.watchTheAddress(data2["TC_034"].updatedWatchTypeInput, data2["TC_034"].updatedMinDollarValue, data2["TC_034"].updatedMaxDollarValue, data2["TC_034"].updatedTransferTypeInput, data2["TC_034"].watchAddressUpdateSuccessToastMessage);
      await detailsPanelPage.removeAddressFromWatchlist(data2["TC_034"].watchlistRemovalToastMessage);
      await dashboardPage.clickOnMerkleScienceLogo();
      await page.waitForTimeout(5000);
      await dashboardPage.clickOnWatchedTab();
      isWatchedAddressVisible = await dashboardPage.verifyWatchedAddressIsVisible(board, data2["TC_034"].untaggedAddress);
      expect(isWatchedAddressVisible).toBeFalsy();
      await dashboardPage.deleteTheBoard(board);
    });

    await test.step("8. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-994, QATRKR-TC-1006, QATRKR-TC-1007, QATRKR-TC-1008 Verify address, cross-chain, transaction details panels will be fetched from query params. @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
    const graphToolbarPage: GraphToolbarPage = new GraphToolbarPage(page);
    const detailsPanelPage: DetailsPanelPage = new DetailsPanelPage(page);
    let actualUrl = "";
    let expectedUrl = "";

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
      await dashboardPage.clickAndFillSearchForAddress(data2["TC_074"].transactionWithSingleCurrency);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
    });

    await test.step("7. Verifying node blockchain should match with txn hash blockchain and also address, transaction details panels will be fetched from query params.", async () => {
      await dashboardPage.verifySearchForAddressInputIsVisible();
      await graphPage.verifyGraphSavedToastMessage(data2["TC_074"].graphSavedToastMessage);
      await graphPage.clickOnSearchCloseButton();
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data2["TC_074"].untaggedAddress, data2["TC_010"].Currency);

      actualUrl = page.url();
      const nodeDigitalAsset = await detailsPanelPage.fetchDigitalAssetFromMetaData();
      expectedUrl = consts.CURR_CURRENCY + consts.EQUAL + nodeDigitalAsset + consts.AMPERSAND + consts.PANEL_TYPE + consts.EQUAL + consts.ADDRESS + consts.AMPERSAND + consts.PANEL_DATA + consts.EQUAL + data2["TC_074"].untaggedAddress;
      expect(actualUrl).toContain(expectedUrl);
      await detailsPanelPage.closeDetailsPanel();
      await detailsPanelPage.verifyTransactionDetails(consts.TRANSFER, data2["TC_074"].transactionWithSingleCurrency, false);
      actualUrl = page.url();
      const txnHashDigitalAsset = await detailsPanelPage.fetchDigitalAssetFromMetaData();
      expectedUrl = consts.CURR_CURRENCY + consts.EQUAL + txnHashDigitalAsset + consts.AMPERSAND + consts.PANEL_TYPE + consts.EQUAL + consts.TRANSACTION + consts.AMPERSAND + consts.PANEL_DATA + consts.EQUAL + data2["TC_074"].transactionWithSingleCurrency;
      expect(actualUrl).toContain(expectedUrl);
      expect(nodeDigitalAsset).toEqual(txnHashDigitalAsset);
      await detailsPanelPage.clickOnDetailsPanelBackBtn();
      actualUrl = page.url();
      expectedUrl = consts.CURR_CURRENCY + consts.EQUAL + txnHashDigitalAsset + consts.AMPERSAND + consts.PANEL_TYPE + consts.EQUAL + consts.TRANSFER;
      expect(actualUrl).toContain(expectedUrl);
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphPage.deleteGraphFromBoard(data1["TC_002_Graph"].deleteToastMessage);
      await dashboardPage.verifyBoardExistsAfterDeletion(JSON.stringify(board).slice(1, -1));
    });

    await test.step("8. Verifying cross chain transaction details panels will be fetched from query params.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data2["TC_074"].crossChainTransaction);
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await dashboardPage.verifySearchForAddressInputIsVisible();
      await graphPage.verifyGraphSavedToastMessage(data2["TC_074"].graphSavedToastMessage);
      await graphPage.clickOnSearchCloseButton();
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await detailsPanelPage.verifyTransactionDetails(consts.CROSS_CHAIN_TRANSFER, data2["TC_074"].crossChainTransaction, false);
      await detailsPanelPage.clickOnDetailsPanelBackBtn();
      actualUrl = page.url();
      expectedUrl = consts.CURR_CURRENCY + consts.EQUAL + consts.OP + consts.AMPERSAND + consts.PANEL_TYPE + consts.EQUAL + consts.CROSS_CHAIN_TRANSFER;
      expect(actualUrl).toContain(expectedUrl);
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphPage.deleteGraphFromBoard(data1["TC_002_Graph"].deleteToastMessage);
      await dashboardPage.verifyBoardExistsAfterDeletion(JSON.stringify(board).slice(1, -1));
    });

    await test.step("9. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-982, QATRKR-TC-1009 Verify sender and receiver addresses for the nodes should match addresses in details panel for a link and also validate digital asset count. @board @board-sanity", async () => {
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
      await dashboardPage.clickAndFillSearchForAddress(data2["TC_074"].transactionWithSingleCurrency);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
    });

    await test.step("7. Verifying sender and receiver addresses for the nodes should match addresses in details panel for a link.", async () => {
      await dashboardPage.verifySearchForAddressInputIsVisible();
      await graphPage.verifyGraphSavedToastMessage(data2["TC_074"].graphSavedToastMessage);
      await graphPage.clickOnSearchCloseButton();
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await detailsPanelPage.verifyTransactionDetails(consts.TRANSFER, data2["TC_074"].transactionWithSingleCurrency, false);
      await detailsPanelPage.clickOnDetailsPanelBackBtn();
      await detailsPanelPage.verifySpecifiedAddressMatchesWithAddressInDetailsPanel(data2["TC_074"].untaggedAddress);
      await detailsPanelPage.verifySpecifiedAddressMatchesWithAddressInDetailsPanel(data2["TC_074"].receiverAddress);
      await graphPage.deleteGraphFromBoard(data1["TC_002_Graph"].deleteToastMessage);
    });

    await test.step("8. Verifying digital assets count in details panel should match with the total assets count in balances tab.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data2["TC_074"].singleAddressMutlipleCurrencies);
      await dashboardPage.clickOnAddAllToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data2["TC_074"].singleAddressMutlipleCurrencies, data2["TC_010"].Currency);
      const digitalAssetsCountInMetData = await detailsPanelPage.getDigitalAssetsCountInMetaData();
      const digitalAssetsCountInAddressDetail = await detailsPanelPage.getDigitalAssetsCountInAddressDetail();
      expect(digitalAssetsCountInMetData).toEqual(digitalAssetsCountInAddressDetail);
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphPage.deleteGraphFromBoard(data1["TC_002_Graph"].deleteToastMessage);
      await dashboardPage.verifyBoardExistsAfterDeletion(JSON.stringify(board).slice(1, -1));
    });

    await test.step("8. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1024, QATRKR-TC-1025, Verify I should be able to apply and reset filter by token in balances tab", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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
      await dashboardPage.clickAndFillSearchForAddress(data2["TC_092"].singleAddressMutlipleCurrencies);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddAllToBoard();
      await page.waitForTimeout(5000);
    });

    await test.step("7. Verfying I should be able to apply/reset filters in balances tab.", async () => {
      await graphPage.clickOnSearchCloseButton();
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data2["TC_092"].singleAddressMutlipleCurrencies, data2["TC_010"].Currency);
      await page.waitForTimeout(5000);

      await detailsPanelPage.filterBalances(data2["TC_092"].tokens);
      await detailsPanelPage.verifyFilteredResults(data2["TC_092"].tokens);
      const tokenCountAfterFilterApplied = await detailsPanelPage.getDigitalAssetsCountInAddressDetail();

      await detailsPanelPage.resetFilter();
      const tokenCountAfterResettingFilter = await detailsPanelPage.getDigitalAssetsCountInAddressDetail();
      expect(tokenCountAfterFilterApplied).not.toEqual(tokenCountAfterResettingFilter);

      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphPage.deleteGraphFromBoard(data1["TC_002_Graph"].deleteToastMessage);
      await dashboardPage.verifyBoardExistsAfterDeletion(JSON.stringify(board).slice(1, -1));
    });

    await test.step("8. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1049, QATRKR-TC-1050, Verify I should be able to apply and reset entity name filter in summary tab", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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
      await dashboardPage.clickAndFillSearchForAddress(data2["TC_092"].singleAddressMutlipleCurrencies);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddAllToBoard();
      await page.waitForTimeout(5000);
    });

    await test.step("7. Verfying I should be able to apply/reset entity name filter in summary tab.", async () => {
      await graphPage.clickOnSearchCloseButton();
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data2["TC_117"].singleAddressMutlipleCurrencies, data2["TC_010"].Currency);
      await page.waitForTimeout(5000);

      await detailsPanelPage.clickOnSpecifiedTab(consts.SUMMARY);
      await detailsPanelPage.filterByEntityNameOrType(consts.ENTITY_NAME, data2["TC_117"].entityNames);
      await detailsPanelPage.verifyFilteredResultsForEntityNameInSummaryTab(data2["TC_117"].entityNames);

      await detailsPanelPage.resetFilter();
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphPage.deleteGraphFromBoard(data1["TC_002_Graph"].deleteToastMessage);
      await dashboardPage.verifyBoardExistsAfterDeletion(JSON.stringify(board).slice(1, -1));
    });

    await test.step("8. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1056, QATRKR-TC-1057, Verify I should be able to apply and reset entity type filter in summary tab", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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
      await dashboardPage.clickAndFillSearchForAddress(data2["TC_092"].singleAddressMutlipleCurrencies);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddAllToBoard();
      await page.waitForTimeout(5000);
    });

    await test.step("7. Verfying I should be able to apply/reset entity type filter in summary tab.", async () => {
      await graphPage.clickOnSearchCloseButton();
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data2["TC_117"].singleAddressMutlipleCurrencies, data2["TC_010"].Currency);
      await page.waitForTimeout(5000);

      await detailsPanelPage.clickOnSpecifiedTab(consts.SUMMARY);
      await detailsPanelPage.filterByEntityNameOrType(consts.ENTITY_TYPE, data2["TC_117"].entityTypes);
      await detailsPanelPage.verifyFilteredResultsForEntityTypeInSummaryTab(data2["TC_117"].entityTypes);

      await detailsPanelPage.resetFilter();
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphPage.deleteGraphFromBoard(data1["TC_002_Graph"].deleteToastMessage);
      await dashboardPage.verifyBoardExistsAfterDeletion(JSON.stringify(board).slice(1, -1));
    });

    await test.step("8. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });
});