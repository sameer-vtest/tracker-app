import { BrowserContext, Page, test } from "@playwright/test";
import { TrackerLoginPage } from "../../page-objects/login-pages/login-page.ts";
import { TrackerDashboardPage } from "../../page-objects/dashboard-pages/dashboard-page.ts";
import { allure } from "allure-playwright";
import { GraphToolbarPage } from "../../page-objects/graph-pages/graph-toolbar-page.ts";
import { GraphPage } from "../../page-objects/graph-pages/graph-page.ts";
import { DetailsPanelPage } from "../../page-objects/graph-pages/details-panel-page.ts";

const data1 = require(`../../test-data/graph/address-detail.json`) as Record<string, any>;
const data2 = require(`../../test-data/dashboard/dashboard.json`) as Record<string, any>;
const graphConsts = require("../../constants/graph-constants.ts") as Record<string, any>;
const addressDetailConsts = require("../../constants/address-detail-constants.ts") as Record<string, any>;
const toolBarconsts = require("../../constants/graph-tool-bar-constants.ts") as Record<string, any>;
const baseurl = process.env.BASE_URL;
const email = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;

test.describe('Board Address Details Panel Tests', () => {
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

  test("QATRKR-TC-1570, QATRKR-TC-1571, QATRKR-TC-1572, QATRKR-TC-1573, QATRKR-TC-1574, QATRKR-TC-1575, Verifying the headers, tooltips, vertical and horizontal scroll bar in balances tab. @board @board-sanity", async () => {
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_022_Address_Detail"].addressForVerticalScroll);
    });

    await test.step("6. Clicking  on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(10000);
      await graphPage.clickOnSearchCloseButton();
      await graphPage.verifySearchPopupNotDisplayed();
    });

    await test.step("7. Verifying table headers, tooltips and vertical scroll bar of balances tab", async () => {
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data1["TC_022_Address_Detail"].nodeAddressForScroll, data2["TC_056_Dashboard"].Currencies.split(',')[0]);
      await detailsPanelPage.verifyHorizontalScrollBar();
      await detailsPanelPage.verifyVerticalScrollBar();
      await detailsPanelPage.verifyTableHeader(addressDetailConsts.ASSET + "," + addressDetailConsts.BALANCES + "," + addressDetailConsts.RECEIVED + "," + addressDetailConsts.SENT);
      await detailsPanelPage.verifyHeadersTooltip();
    });

    await test.step("8. Deleting the graph from the board", async () => {
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage)
    });

    await test.step("9. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1596, QATRKR-TC-1597, QATRKR-TC-1598, QATRKR-TC-1599, QATRKR-TC-1600, QATRKR-TC-1602, QATRKR-TC-1603, QATRKR-TC-1604, QATRKR-TC-1605, QATRKR-TC-1606, QATRKR-TC-1610, QATRKR-TC-1611, QATRKR-TC-2276, Verifying the headers, expand icon, vertical scroll bar, direct and indirect exposure values in summary tab @board @board-sanity", async () => {
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Address_Detail"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(10000);
      await graphPage.clickOnSearchCloseButton();
      await graphPage.verifySearchPopupNotDisplayed();
    });

    await test.step("7. Verfying table headers, horizontal and vertical scroll bar in summary tab", async () => {
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data1["TC_001_Address_Detail"].nodeAddress2, data2["TC_056_Dashboard"].Currencies.split(',')[0]);
      await detailsPanelPage.clickOnSpecifiedTab(graphConsts.SUMMARY);
      await detailsPanelPage.verifyTableHeaderOfSummary(addressDetailConsts.ENTITY_NAME + "," + addressDetailConsts.ENTITY_TYPE);
      await detailsPanelPage.verifyHorizontalScrollBar();
      await detailsPanelPage.verifyVerticalScrollBar();
    });

    await test.step("8. Verfying direct and indirect incoming and outgoing values in summary tab", async () => {
      await detailsPanelPage.verifyIncomingOutgoingExposureValues(data1["TC_009_Address_Detail"].directIncomingValue + "," + data1["TC_009_Address_Detail"].inDirectIncomingValue + "," + data1["TC_009_Address_Detail"].directOutgoingValue + "," + data1["TC_009_Address_Detail"].inDirectOutgoingValue);
      await detailsPanelPage.clickAndVerifyEntityExpandIcon(data1["TC_016_Address_Detail"].fakePhishing, addressDetailConsts.DIRECT_EXPOSURE, addressDetailConsts.INDIRECT_EXPOSURE);
      await detailsPanelPage.verifyDirectExposureIncomingOutgoingValues(data1["TC_016_Address_Detail"].fakePhishing, data1["TC_016_Address_Detail"].directExposure, data1["TC_016_Address_Detail"].inDirectExposure);
      await detailsPanelPage.verifyIndirectExposureIncomingOutgoingValues(data1["TC_016_Address_Detail"].fakePhishing, data1["TC_016_Address_Detail"].directExposure, data1["TC_016_Address_Detail"].inDirectExposure);
      await detailsPanelPage.closeDetailsPanel();
    });

    await test.step("9. Verfying Nothing to see over here text in summary tab pie chart", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_022_Address_Detail"].addressForPieChartValidation);
      await dashboardPage.clickOnAddToBoard();
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data1["TC_022_Address_Detail"].addressForPieChartValidation, data2["TC_056_Dashboard"].Currencies.split(',')[0]);
      await detailsPanelPage.clickOnSpecifiedTab(graphConsts.SUMMARY);
      await detailsPanelPage.verifyNothingToSeeOverHereInSummery();
    });

    await test.step("10. Deleting the graph from the board", async () => {
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage)
    });

    await test.step("11. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1584, QATRKR-TC-1585, QATRKR-TC-1586, QATRKR-TC-1587, QATRKR-TC-1588, QATRKR-TC-1589, QATRKR-TC-2277, Verifying the counterparties headers, copiable icon, scroll bar, plus and minus icon to verify nodes. @board @board-sanity", async () => {
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Address_Detail"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(10000);
      await graphPage.clickOnSearchCloseButton();
      await graphPage.verifySearchPopupNotDisplayed();
    });

    await test.step("7. Verfying table header, copiable icon, horizontal and vertical scroll bar", async () => {
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data1["TC_001_Address_Detail"].nodeAddress2, data2["TC_056_Dashboard"].Currencies.split(',')[0]);
      await detailsPanelPage.clickOnSpecifiedTab(graphConsts.COUNTERPARTIES);
      await detailsPanelPage.verifyTableHeader(addressDetailConsts.COUNTERPARTY + "," + addressDetailConsts.TYPE + "," + addressDetailConsts.ASSETS + "," + addressDetailConsts.RECEIVED + "," + addressDetailConsts.SENT + "," + addressDetailConsts.TRANSFERS + "," + addressDetailConsts.ACTIVITY);
      await detailsPanelPage.verifyTransfersTooltip();
      await detailsPanelPage.verifyHorizontalScrollBar();
      await detailsPanelPage.verifyVerticalScrollBar();
      await detailsPanelPage.verifySpecifiedAddressIsCopiableInDetailsPanel(data1["TC_026_Address_Detail"].counterpartyAddress.substring(0, 5))
    });

    await test.step("8. Verfying node after clicking on plus and minus icon", async () => {
      await detailsPanelPage.clickOnPlusIconAndVerifyNode(data1["TC_026_Address_Detail"].counterpartyAddress.substring(0, 5), data1["TC_026_Address_Detail"].counterpartyAddress, data1["TC_026_Address_Detail"].currencies.split(',')[0]);
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data1["TC_001_Address_Detail"].nodeAddress2, data2["TC_056_Dashboard"].Currencies.split(',')[0]);
      await detailsPanelPage.clickOnSpecifiedTab(graphConsts.COUNTERPARTIES);
      await detailsPanelPage.clickOnMinusIcon(data1["TC_026_Address_Detail"].counterpartyAddress.substring(0, 5));
      await detailsPanelPage.clickOnMerkleScienceLogoAndOpenExistingGraph();
      await detailsPanelPage.verifySpecifiedAddressOnTheBoard(data1["TC_026_Address_Detail"].counterpartyAddress);
    });

    await test.step("9. Deleting the graph from the board", async () => {
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage)
    });

    await test.step("10. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1521, QATRKR-TC-1524, QATRKR-TC-1525, QATRKR-TC-1526, QATRKR-TC-1527, QATRKR-TC-1528, QATRKR-TC-1529, QATRKR-TC-2278, Verifying the transactions headers, copiable icon, scroll bar, transactions details panel, deposits and withdrawal values. @board @board-sanity", async () => {
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Address_Detail"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
      await graphPage.verifySearchPopupNotDisplayed();
    });

    await test.step("7. Verfying table header, copiable icon, horizontal and vertical scroll bar", async () => {
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data1["TC_001_Address_Detail"].nodeAddress2, data2["TC_056_Dashboard"].Currencies.split(',')[0]);
      await detailsPanelPage.clickOnSpecifiedTab(graphConsts.TRANSACTIONS);
      await detailsPanelPage.verifyTableHeader(addressDetailConsts.TXN_HASH + "," + addressDetailConsts.TYPE + "," + addressDetailConsts.VALUE + "," + addressDetailConsts.ASSETS + "," + addressDetailConsts.DIRECTION + "," + addressDetailConsts.COUNTERPARTY1 + "," + addressDetailConsts.DATE);
      await detailsPanelPage.verifyHorizontalScrollBar();
      await detailsPanelPage.verifyVerticalScrollBar();
      await detailsPanelPage.verifyTxnHashIsCopiableInTransactionTab();
      await detailsPanelPage.verifyCounterpartyAddressIsCopiableInTransactionTab();
    });

    await test.step("8. Verfying transactions details panel, deposits and withdrawal values with total transfer value", async () => {
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data1["TC_001_Address_Detail"].nodeAddress2, data2["TC_056_Dashboard"].Currencies.split(',')[0]);
      await detailsPanelPage.clickOnSpecifiedTab(graphConsts.TRANSACTIONS);
      await detailsPanelPage.verifyDepositsWithdrawalsValuesWithTotalTransfers(data1["TC_001_Address_Detail"].nodeAddress2, data2["TC_056_Dashboard"].Currencies.split(',')[0], addressDetailConsts.DEPOSITS, addressDetailConsts.WITHDRAWALS, addressDetailConsts.TOTALTRANSFERS);
      await detailsPanelPage.verifyTransactionDetailsInTransactionsTab(addressDetailConsts.COUNTERPARTY_SUMMARY + "," + addressDetailConsts.TRANSACTION_DETAILS)
    });

    await test.step("9. Deleting the graph from the board", async () => {
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage)
    });

    await test.step("10. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });
 
  test("QATRKR-TC-1522, QATRKR-TC-1523, Verifying the transactions tab plus and minus icon. @board @board-sanity", async () => {
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Address_Detail"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
      await page.waitForTimeout(2000);
      await graphPage.verifySearchPopupNotDisplayed();
    });

    await test.step("7. Verfying transactions plus and minus icon", async () => {
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data1["TC_001_Address_Detail"].nodeAddress2, data2["TC_056_Dashboard"].Currencies.split(',')[0]);
      await detailsPanelPage.clickOnSpecifiedTab(graphConsts.TRANSACTIONS);
      await detailsPanelPage.clickOnPlusIconInTransactionTabAndVerifyNode(data2["TC_056_Dashboard"].Currencies.split(',')[0], graphConsts.TRANSACTIONS);
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data1["TC_001_Address_Detail"].nodeAddress2, data2["TC_056_Dashboard"].Currencies.split(',')[0]);
      await detailsPanelPage.clickOnSpecifiedTab(graphConsts.TRANSACTIONS);
      await detailsPanelPage.clickOnMinusIconInTransactionTabAndVerifyNode();
    });

    await test.step("8. Deleting the graph from the board", async () => {
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage)
    });

    await test.step("9. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1566, QATRKR-TC-1567, QATRKR-TC-1569, Verifying the remove icon for node and transaction link. @board @board-sanity", async () => {
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_043_Address_Detail"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
      await graphPage.verifySearchPopupNotDisplayed();
    });

    await test.step("7. Verfying remove icon tooltip, remove selected node and link", async () => {
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await detailsPanelPage.verifyRemoveIconForSelectedLink(graphConsts.TRANSFER, data1["TC_043_Address_Detail"].address, false);
      await detailsPanelPage.removeTheSelectedNodeCluster(data1["TC_043_Address_Detail"].nodeAddress1, data2["TC_056_Dashboard"].Currencies.split(',')[0]);
     });

    await test.step("8. Deleting the graph from the board", async () => {
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage)
    });

    await test.step("9. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1538, QATRKR-TC-1539, QATRKR-TC-1540, QATRKR-TC-1541, QATRKR-TC-1542, QATRKR-TC-1543, QATRKR-TC-1544, QATRKR-TC-1545, QATRKR-TC-1546, QATRKR-TC-2279 Verifying the transfer link transaction tab headers, details panel, copiable icon, scroll bar, plus and minus icon. @board @board-sanity", async () => {
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_043_Address_Detail"].address);
    });
  
    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
      await graphPage.verifySearchPopupNotDisplayed();
    });
  
    await test.step("7. Verifying transfer link headers, details panel, copiable icon", async () => {
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await detailsPanelPage.verifyTransactionDetails(graphConsts.TRANSFER, data1["TC_043_Address_Detail"].address, false);
      await detailsPanelPage.clickOnDetailsPanelBackBtn();
      await detailsPanelPage.verifyTableHeader(addressDetailConsts.TXN_HASH + "," + addressDetailConsts.TYPE + "," + addressDetailConsts.VALUE + "," + addressDetailConsts.FROM + "," + addressDetailConsts.ASSETS + "," + addressDetailConsts.DATE); 
      await detailsPanelPage.verifyTxnHashIsCopiableInTransactionTab();
      await detailsPanelPage.verifyFromAndToAddressIsCopiableInLinkTransactionTab(data1["TC_043_Address_Detail"].nodeAddress1.substring(0, 5));
    });

    await test.step("8. Verifying transfer link plus and minus icon for TO address", async () => {
      await detailsPanelPage.clickOnMinusIcon(data1["TC_043_Address_Detail"].nodeAddress1.substring(0, 5));
      await detailsPanelPage.clickOnPlusIconAndVerifyNode(data1["TC_043_Address_Detail"].nodeAddress1.substring(0, 5), data1["TC_043_Address_Detail"].nodeAddress1, data1["TC_026_Address_Detail"].currencies.split(',')[0]);
      await detailsPanelPage.clickOnDetailsPanelBackBtn();
      await detailsPanelPage.clickOnMinusIcon(data1["TC_043_Address_Detail"].nodeAddress1.substring(0, 5));
    });

    await test.step("9. Verifying transfer link plus and minus icon for FROM address", async () => {
      await detailsPanelPage.clickOnMinusIcon(data1["TC_043_Address_Detail"].binanace);
      await detailsPanelPage.clickOnPlusIconAndVerifyNode(data1["TC_043_Address_Detail"].binanace, data1["TC_043_Address_Detail"].nodeAddress2, data1["TC_026_Address_Detail"].currencies.split(',')[0]);
      await detailsPanelPage.clickOnDetailsPanelBackBtn();
      await detailsPanelPage.clickOnMinusIcon(data1["TC_043_Address_Detail"].binanace);
      await detailsPanelPage.clickOnMerkleScienceLogoAndOpenExistingGraph();
      await detailsPanelPage.verifySpecifiedAddressOnTheBoard(data1["TC_043_Address_Detail"].nodeAddress1);
      await detailsPanelPage.verifySpecifiedAddressOnTheBoard(data1["TC_043_Address_Detail"].nodeAddress2);
    });
	
	 await test.step("10. Verfying transfer link transaction tab scroll bars", async () => {
      await page.waitForTimeout(3000)
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_022_Address_Detail"].addressForVerticalScroll);
      await dashboardPage.clickOnAddToBoard();
      await detailsPanelPage.verifyTransactionDetails(graphConsts.TRANSFER, data1["TC_022_Address_Detail"].nodeAddressForScroll, false);
      await detailsPanelPage.clickOnDetailsPanelBackBtn();
      await detailsPanelPage.verifyHorizontalScrollBar();
      await detailsPanelPage.verifyVerticalScrollBar();
      await detailsPanelPage.closeDetailsPanel();
    });
  
    await test.step("11. Deleting the graph from the board", async () => {
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage)
    });
  
    await test.step("12. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
   });
});