import { BrowserContext, Page, test, APIRequestContext, expect} from "@playwright/test";
import { TrackerLoginPage } from "../../page-objects/login-pages/login-page.ts";
import { TrackerDashboardPage } from "../../page-objects/dashboard-pages/dashboard-page.ts";
import { allure } from "allure-playwright";
import { GraphToolbarPage } from "../../page-objects/graph-pages/graph-toolbar-page.ts";
import { GraphPage } from "../../page-objects/graph-pages/graph-page.ts";
import { ApiFunctionPage } from "../../page-objects/utilities-pages/api-function-page.ts";
import { DetailsPanelPage } from "../../page-objects/graph-pages/details-panel-page.ts";

const data1 = require(`../../test-data/graph/graph-toolbar.json`) as Record<string, any>;
const data2 = require(`../../test-data/dashboard/dashboard.json`) as Record<string, any>;
const dashboardconsts = require("../../constants/dashboard-constants.ts") as Record<string, any>;
const toolBarconsts = require("../../constants/graph-tool-bar-constants.ts") as Record<string, any>;
const graphConsts = require("../../constants/graph-constants.ts") as Record<string, any>;
const apiConst = require("../../constants/api-constants.ts") as Record<string, any>;
const baseurl = process.env.BASE_URL;
const email = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;
const newFolder = "test" + `${Math.random().toString().slice(2, 8)}`;
const renamedGraph = "RenamedGraph" + `${Math.random().toString().slice(2, 8)}`;
let requestContext: APIRequestContext;

test.describe('Board Tool Bar Tests', async () => {
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

  test("QATRKR-TC-1283, QATRKR-TC-1284, QATRKR-TC-1285, QATRKR-TC-1286, QATRKR-TC-1287, Verify the contents of graph dropdown and rename the graph. @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph_Toolbar"].address);
    });

    await test.step("6. Clicking  on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(10000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step("7. Verfying graph dropdown contents", async () => {
      await graphPage.clickOnGraphDropdown();
      await graphToolbarPage.verifyGraphDropdownContents();
    });

    await test.step("8. Verfying user able to rename the graph name", async () => {
      await graphToolbarPage.renameGraphName(renamedGraph, data1["TC_002_Graph_Toolbar"].updatedToastMsg, data1["TC_002_Graph_Toolbar"].deletedToastMsg, toolBarconsts.ENTER);
    });

    await test.step("9. Verfying user is unable to rename the graph name with view access", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph_Toolbar"].address);
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphToolbarPage.verifyGraphWithEditOrViewAccess(data1["TC_003_Graph_Toolbar"].teamMemberName, data2["TC_082_Dashboard"].canView, data1["TC_003_Graph_Toolbar"].email, data1["TC_003_Graph_Toolbar"].password, JSON.stringify(board).slice(1, -1), data1["TC_023_Graph_Toolbar"].graphInvitationToastMessage)
      await graphToolbarPage.clickUserProfileAndLogout();
      await graphToolbarPage.reloginAndDeleteTheGraph(`${email}`, `${password}`, JSON.stringify(board).slice(1, -1), data1["TC_002_Graph_Toolbar"].deletedToastMsg)
    });

    await test.step("10. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-567, QATRKR-TC-568, QATRKR-TC-569, QATRKR-TC-570, QATRKR-TC-571, QATRKR-TC-572, verify the contents of copy to board popup and create board to duplicate the graph. @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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
      await dashboardPage.createNewFolder(newFolder, dashboardconsts.ENTER);
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph_Toolbar"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step("7. Verifying the COPY TO FOLDER popup contents, select and deselect it and close popup.", async () => {
      await graphPage.clickOnGraphDropdown();
      await graphToolbarPage.verifyDuplicatePopupContentsAndSelectDeselectFolder(newFolder);
    });

    await test.step("8. Verifying that I should be able to search folder in COPY TO FOLDER popup and copy graph into it.", async () => {
      await graphToolbarPage.copyGraphToFolderToDuplicateTheGraph(newFolder, data2["TC_011_Dashboard"].graphSavedToastMessage);
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphToolbarPage.deleteNewlyCreatedGraphAndFolder(JSON.stringify(board).slice(1, -1), newFolder, data2["TC_014_Dashboard"].expectedText);
    });

    await test.step("9. Verifying that I should be able to create folder in COPY TO FOLDER popup and copy graph into it.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph_Toolbar"].address);
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
      await graphToolbarPage.createFolderAndCopyGraphToFolderToDuplicateTheGraph(newFolder, data2["TC_011_Dashboard"].graphSavedToastMessage, toolBarconsts.ENTER);
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphToolbarPage.deleteNewlyCreatedGraphAndFolder(JSON.stringify(board).slice(1, -1), newFolder, data2["TC_014_Dashboard"].expectedText);
    });

    await test.step("10. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-911, QATRKR-TC-912, QATRKR-TC-913, QATRKR-TC-914, QATRKR-TC-915, QATRKR-TC-916, verify the contents of move board popup and create folder to move the graph. @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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
      await dashboardPage.createNewFolder(newFolder, dashboardconsts.ENTER);
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph_Toolbar"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step("7. Verifying that MOVE TO FOLDER popup contents, select and deselect it and close popup.", async () => {
      await graphPage.clickOnGraphDropdown();
      await graphToolbarPage.verifyMovePopupContentsAndSelectDeselectFolder(newFolder);
    });

    await test.step("8. Verifying that I should be able to search folder in MOVE TO FOLDER popup and move graph into it.", async () => {
      await graphToolbarPage.moveGraphToFolder(newFolder, data1["TC_002_Graph_Toolbar"].movedToastMsg);
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphToolbarPage.deleteNewlyCreatedGraphAndFolder(JSON.stringify(board).slice(1, -1), newFolder, data2["TC_014_Dashboard"].expectedText);
    });

    await test.step("9. Verifying that I should be able to create folder in MOVE TO FOLDER popup and copy graph into it.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph_Toolbar"].address);
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
      await graphToolbarPage.createFolderAndMoveGraphToFolder(newFolder, data1["TC_002_Graph_Toolbar"].movedToastMsg, toolBarconsts.ENTER);
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphToolbarPage.deleteNewlyCreatedGraphAndFolder(JSON.stringify(board).slice(1, -1), newFolder, data2["TC_014_Dashboard"].expectedText);
    });

    await test.step("10. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1325, QATRKR-TC-1326, QATRKR-TC-1327, QATRKR-TC-1328, QATRKR-TC-1329, QATRKR-TC-1331, QATRKR-TC-1332, QATRKR-TC-1333, QATRKR-TC-1334, QATRKR-TC-1335 verify the contents of Share board popup and perform actions related to share board popup. @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph_Toolbar"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step("7. Verifying the Share popup contents, select and deselect it and close popup.", async () => {
      await graphToolbarPage.verifyShareIconContents(toolBarconsts.CTRL_SHIFT_GREATERTHANSYMBOL);
    });

    await test.step("8. Verifying that I should be able to delete the selected team member in SHARE BOARD popup.", async () => {
      await graphToolbarPage.deleteTeamMemberInShareBoardPopup(data1["TC_003_Graph_Toolbar"].teamMemberName);
    });

    await test.step("9. Verifying the graph with view access and deleting the graph.", async () => {
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphToolbarPage.verifyGraphWithEditOrViewAccess(data1["TC_003_Graph_Toolbar"].teamMemberName, data2["TC_082_Dashboard"].canView, data1["TC_003_Graph_Toolbar"].email, data1["TC_003_Graph_Toolbar"].password, JSON.stringify(board).slice(1, -1), data1["TC_023_Graph_Toolbar"].graphInvitationToastMessage)
      await graphToolbarPage.clickUserProfileAndLogout();
      await graphToolbarPage.reloginAndDeleteTheGraph(`${email}`, `${password}`, JSON.stringify(board).slice(1, -1), data1["TC_002_Graph_Toolbar"].deletedToastMsg)
    });

    await test.step("10. Verifying the graph with edit access and deleting the graph.", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph_Toolbar"].address);
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphToolbarPage.verifyGraphWithEditOrViewAccess(data1["TC_003_Graph_Toolbar"].teamMemberName, data2["TC_082_Dashboard"].canEdit, data1["TC_003_Graph_Toolbar"].email, data1["TC_003_Graph_Toolbar"].password, JSON.stringify(board).slice(1, -1), data1["TC_023_Graph_Toolbar"].graphInvitationToastMessage)
      await graphToolbarPage.clickUserProfileAndLogout();
      await graphToolbarPage.reloginAndDeleteTheGraph(`${email}`, `${password}`, JSON.stringify(board).slice(1, -1), data1["TC_002_Graph_Toolbar"].deletedToastMsg)
    });

    await test.step("11. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-2272, QATRKR-TC-1275, QATRKR-TC-1276, QATRKR-TC-1277, QATRKR-TC-1278, QATRKR-TC-1279, QATRKR-TC-1280, Verifying public graph with/without password in share board popup. @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph_Toolbar"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step("7. Verifying toggle and save button disablement in SHARE BOARD popup", async () => {
      await graphToolbarPage.disablePublicAccessAndPasswordProtectedToggle(data1["TC_023_Graph_Toolbar"].shareGraphPermissionToastMsg);
    });

    await test.step("8. Verifying that I should be able to Enable Public Access toggle in SHARE BOARD popup, click on Cancel button and X icon.", async () => {
      await graphToolbarPage.enablePasswordProtectToggleAndClickOnCancelBtn(data1["TC_023_Graph_Toolbar"].sharedBoardPopupPassword);
    });

    await test.step("9. Verifying share board URL contains keyword 'Shared' in Share Board dialog and Enable Public Access toggle in SHARE BOARD popup", async () => {
      await graphToolbarPage.verifySharedGraphURLAndEnablePasswordProtectToggle(data1["TC_023_Graph_Toolbar"].shareGraphPermissionToastMsg, data1["TC_023_Graph_Toolbar"].sharedBoardPopupPassword);
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage);
    });

    await test.step("10. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1338, QATRKR-TC-1339, QATRKR-TC-1341, QATRKR-TC-1355, QATRKR-TC-1356, QATRKR-TC-1360, QATRKR-TC-1361, Verifying that I should be able to click on Show Legends, Toggle Fullscreen and verify the contents and views. @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph_Toolbar"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(3000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step("7. Verifying that I should be able to delete node, comment and cluster", async () => {
      await graphToolbarPage.clickOnToggleShowLegendsAndVerifyTheContent(toolBarconsts.CTRL_SHIFT_L);
    });

    await test.step("8. Clicking on fullscreen toggle and verifying views", async () => {
      await graphToolbarPage.clickOnToggleFullScreenAndVerifyTheVisibilityOfFullscreen(toolBarconsts.CTRL_SHIFT_F, toolBarconsts.ENTER);
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage);
    });

    await test.step("9. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-906, QATRKR-TC-907, QATRKR-TC-909, QATRKR-TC-2273, Verifying user is able to create super cluster and merge & unmerge it. @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph_Toolbar"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(3000);
      await graphPage.clickOnSearchCloseButton();
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
    });

    await test.step("7. Verifying that I should be able to delete node, comment and cluster", async () => {
      await graphToolbarPage.enableDragOrSelectionMode();
      await page.waitForTimeout(3000);
      await graphPage.performSelectionOnCanvas();
    });

    await test.step("8. Clicking on fullscreen toggle and verifying views", async () => {
      await graphToolbarPage.createSuperClusterAndMergeAndUnmergeSuperCluster(data1["TC_074_Graph_Toolbar"].clusterName, data1["TC_074_Graph_Toolbar"].superCluster, false, toolBarconsts.CTRL_G, toolBarconsts.CTRL_SHIFT_G);
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage);
    });

    await test.step("9. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-553, QATRKR-TC-555, Verifying user is able download, validate and delete downloaded SVG file. @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph_Toolbar"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(3000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step("7. Verifying that I should be able to delete node, comment and cluster", async () => {
      await graphToolbarPage.validatingDownloadedSVG(toolBarconsts.CTRL_SHIFT_S, true);
      await graphPage.deleteGraphFromBoard(data1["TC_002_Graph_Toolbar"].deletedToastMsg);
    });

    await test.step("9. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-543, QATRKR-TC-544, QATRKR-TC-545, QATRKR-TC-546, QATRKR-TC-547, Verifying that I should be able to delete node, comment and cluster. @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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
      await dashboardPage.clickAndFillSearchForAddress(data2["TC_042_Dashboard"].address4);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step("7. Verifying that I should be able to delete node, comment and cluster", async () => {
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await graphToolbarPage.rightClickOnNode(data2["TC_042_Dashboard"].address4, data2["TC_056_Dashboard"].Currencies.split(',')[0]);
      await graphToolbarPage.addAnnotateCommentAndSave(data1["TC_066_Graph_Toolbar"].testing);
      await graphToolbarPage.selectNodeCommentCluster(data1["TC_066_Graph_Toolbar"].comment);
      await graphToolbarPage.selectNodeCommentCluster(data2["TC_056_Dashboard"].Currencies.split(',')[0]);
      await graphToolbarPage.deleteSelectedItems.click();
    });

    await test.step("8. Verifying that I should be able to delete node, comment and cluster", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph_Toolbar"].address);
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.verifyGraphContainerPageIsVisible();
      await graphToolbarPage.rightClickOnNode(data1["TC_066_Graph_Toolbar"].nodeAddress, data2["TC_056_Dashboard"].Currencies.split(',')[0]);
      await graphToolbarPage.addAnnotateCommentAndSave(data1["TC_066_Graph_Toolbar"].testing);
      await graphToolbarPage.deleteTheSelectedNodeAndCluster(data1["TC_066_Graph_Toolbar"].comment);
      await graphToolbarPage.deleteTheSelectedNodeAndCluster(data2["TC_056_Dashboard"].Currencies.split(',')[0]);
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage);
    });

    await test.step("9. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-557, QATRKR-TC-558,  QATRKR-TC-565,  QATRKR-TC-566, Verifying that I should be able select multiple nodes, drag and drop nodes in drag mode. @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_111_Graph_Toolbar"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step("7. Verifying that I should be able to drag an drop graph and selecting multiple nodes in drag mode", async () => {
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await graphToolbarPage.dragAndDropNodes(data1["TC_111_Graph_Toolbar"].nodeAddress, data2["TC_056_Dashboard"].Currencies.split(',')[0]);
      await graphPage.performSelectionOnCanvas();
      await graphToolbarPage.selectNodeCommentCluster(data2["TC_056_Dashboard"].Currencies.split(',')[0]);
      await graphToolbarPage.deleteSelectedItems.click();
    });

    await test.step("8. Verifying user is able to select node and cluster in drag mode", async () => {
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph_Toolbar"].address);
      await dashboardPage.clickOnAddToBoard();
      await graphToolbarPage.selectNodeCommentCluster(data1["TC_074_Graph_Toolbar"].comboNode);
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage);
      await page.waitForTimeout(3000);
    });

    await test.step("9. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-538, QATRKR-TC-539, QATRKR-TC-540, QATRKR-TC-541, Verifying that I should be able verify the currency toggle values. @board @board-sanity", async ({ request }) => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
    const graphToolbarPage: GraphToolbarPage = new GraphToolbarPage(page);
    const apiPage: ApiFunctionPage = new ApiFunctionPage(requestContext);
    const responsesPromise = apiPage.captureAPIResponse(page, toolBarconsts.TRANSACTIONS_ENDPOINT_URL, toolBarconsts.POST);
    let assetValue = "";
    let usdValue = "";  

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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_111_Graph_Toolbar"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step("7. Clicking on transaction link and validating currency values", async () => {
      await graphToolbarPage.clickOnTransactionLink();
      await page.waitForTimeout(5000);

      const responses = await responsesPromise;
      const latestResponse = responses[responses.length - 1].body;
      const apiResponse = JSON.parse(latestResponse);
      const results = apiResponse[toolBarconsts.RESULTS];
        if (Array.isArray(results)) {
          results.forEach(async data => {
            assetValue = data.value;
            usdValue = data.value_usd;
          });
          }
        await page.waitForTimeout(3000);
        await graphToolbarPage.verifyCurrencyToggleValues(apiConst.DOLLAR + usdValue);
        await page.waitForTimeout(3000);
        await graphToolbarPage.clickAssetOrUSDLink();
        await graphToolbarPage.verifyCurrencyToggleValues(assetValue);
    });

    await test.step('8. Deleting graph from board', async () => {
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage);
    });

    await test.step("9. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-561, QATRKR-TC-563, QATRKR-TC-564, QATRKR-TC-2274, Verifying that I should be able select multiple nodes, drag and drop nodes in selection mode. @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_111_Graph_Toolbar"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step("7. Verifying user should be able to enable selection mode, select nodes and drag and drop it", async () => {
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await page.waitForTimeout(3000);
      await graphToolbarPage.enableDragOrSelectionMode();
      await graphToolbarPage.selectNodeCommentCluster(data2["TC_056_Dashboard"].Currencies.split(',')[0]);
      await graphToolbarPage.dragAndDropNodes(data1["TC_111_Graph_Toolbar"].nodeAddress, data2["TC_056_Dashboard"].Currencies.split(',')[0]);
      await graphToolbarPage.performRandomClickOnCanvas();
      await graphToolbarPage.clickOnUndoBtn();
      await page.waitForTimeout(5000);
      await graphPage.performSelectionOnCanvas();
      await page.waitForTimeout(3000);
      await graphToolbarPage.dragAndDropNodes(data1["TC_111_Graph_Toolbar"].nodeAddress, data2["TC_056_Dashboard"].Currencies.split(',')[0])
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage);
    });

    await test.step("8. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-215, QATRKR-TC-216, QATRKR-TC-218, Verifying that I should be able to click on annotation button from toolbar. @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_111_Graph_Toolbar"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step("7. Verifying user should be able to enable selection mode, select nodes and drag and drop it", async () => {
      await graphToolbarPage.verifyAnnotatePopup(data1["TC_111_Graph_Toolbar"].nodeAddress, data2["TC_056_Dashboard"].Currencies.split(',')[0], true, toolBarconsts.CTRL_SHIFT_A);
      await page.waitForTimeout(3000);
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage);
    });

    await test.step("8. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1281, QATRKR-TC-2275, Verifying that I should be able to open public shared graph in new tab.(without password) and I should not be able to open public shared graph once the graph is deleted. @board @board-sanity", async () => {
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_111_Graph_Toolbar"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step("7. Verifying that I should be able to open public shared graph(without password) and verifying the public shared graph after deleted", async () => {
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      const board = await graphPage.fetchNewlyCreatedBoardName();
      const graphLink = await graphToolbarPage.copyGraphLinkInSharePopup(data1["TC_023_Graph_Toolbar"].shareGraphPermissionToastMsg);
      await dashboardPage.logoutFromApplication();
      await trackerLoginPage.gotoLoginPage(JSON.stringify(graphLink).slice(1, -1));
      await detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(data1["TC_111_Graph_Toolbar"].nodeAddress, data2["TC_056_Dashboard"].Currencies.split(',')[0])
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
      await graphToolbarPage.reloginAndDeleteTheGraph(`${email}`, `${password}`, JSON.stringify(board).slice(1, -1), data1["TC_002_Graph_Toolbar"].deletedToastMsg);
      await dashboardPage.logoutFromApplication();
      await page.waitForTimeout(5000);
      await trackerLoginPage.gotoLoginPage(JSON.stringify(graphLink).slice(1, -1));
      await graphToolbarPage.openSharedGraphVerifyPageAfterDeletingTheGraph();
    });
  });

  test("QATRKR-TC-1282 Verifying that I should be able to open public shared graph in new tab.(with password). @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_111_Graph_Toolbar"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step("7. Verifying that I should be able to open public shared graph in new tab.(with password)", async () => {
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      const board = await graphPage.fetchNewlyCreatedBoardName();
      const graphLink = await graphToolbarPage.copyGraphLinkWithPasswordInSharePopup(data1["TC_023_Graph_Toolbar"].shareGraphPermissionToastMsg, data1["TC_023_Graph_Toolbar"].sharedBoardPopupPassword);
      await dashboardPage.logoutFromApplication();
      await trackerLoginPage.gotoLoginPage(JSON.stringify(graphLink).slice(1, -1));
      await graphToolbarPage.enterPasswordInSharedGraphLink(data1["TC_111_Graph_Toolbar"].nodeAddress, data2["TC_056_Dashboard"].Currencies.split(',')[0], data1["TC_023_Graph_Toolbar"].sharedBoardPopupPassword)
      await trackerLoginPage.gotoLoginPage(`${baseurl}`);
      await graphToolbarPage.reloginAndDeleteTheGraph(`${email}`, `${password}`, JSON.stringify(board).slice(1, -1), data1["TC_002_Graph_Toolbar"].deletedToastMsg)
    });

    await test.step("8. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-891, QATRKR-TC-892, Verifying that I should be able to click on Use Sequential Layout and Use Organic Layout Icon. @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_111_Graph_Toolbar"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step('7. Verifying sequential and organic layout in a graph', async () => {
      await graphToolbarPage.verifySequencialOrOrganicLayout();
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage);
    });

    await test.step("8. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-548, QATRKR-TC-549, QATRKR-TC-550, QATRKR-TC-551, QATRKR-TC-552, Verifying that I should be able to perform delete actions. @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph_Toolbar"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step("7. Verifying that I should be able to delete graph, able to see success toast message and verifying the deleted board", async () => {
      await graphPage.verifyGraphContainerPageIsVisible();
      const board = await graphPage.fetchNewlyCreatedBoardName();
      await graphToolbarPage.performDeleteActions(data2["TC_011_Dashboard"].deleteToastMessage);
      await dashboardPage.verifyBoardExistsAfterDeletion(JSON.stringify(board).slice(1, -1))
    });

    await test.step("8. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-917, QATRKR-TC-918, QATRKR-TC-919, QATRKR-TC-920, QATRKR-TC-921, QATRKR-TC-922, QATRKR-TC-923, QATRKR-TC-924, QATRKR-TC-925, QATRKR-TC-926, QATRKR-TC-927, QATRKR-TC-928, QATRKR-TC-929,  QATRKR-TC-931, Verifying that user should be able to validate preference tooglr buttons with API responses. @board @board-sanity", async () => {
    const trackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage = new TrackerDashboardPage(page);
    const graphToolbarPage: GraphToolbarPage = new GraphToolbarPage(page);
    const apiPage: ApiFunctionPage = new ApiFunctionPage(requestContext);
    const graphPage: GraphPage = new GraphPage(page);
    const responsesPromise = apiPage.captureAPIResponse(page, toolBarconsts.PREFERENCES_ENDPOINT_URL, toolBarconsts.PUT);

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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph_Toolbar"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(3000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step("7. Enabling and Disabling toggle show preferences button", async () => {
      await graphToolbarPage.verifyToggleShowPreferencesWithHotkey(toolBarconsts.REMOVE_ATTRIBUTION_COLOR_CODES, toolBarconsts.CTRL_SHIFT_P)
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.REMOVE_ATTRIBUTION_COLOR_CODES);
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_CURVED_LINKS);
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_ACTIVITY_DATE_RANGE_ON_THE_LINKS);
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_COMPLETE_VALUES_ON_THE_LINKS);
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.SHOW_COMMENTS_IN_GRAPH);
    });

    const responses = await responsesPromise;
    const latestResponse = responses[responses.length - 1].body;
    const apiResponse = JSON.parse(latestResponse);
    if(apiResponse.board_preferences.discard_node_color === true)
    expect(await apiResponse.board_preferences.discard_node_color).toBeTruthy();
        else
    expect(await apiResponse.board_preferences.discard_node_color).toBeFalsy();

    if(apiResponse.board_preferences.display_activity_date_range_on_links === true)
    expect(await apiResponse.board_preferences.display_activity_date_range_on_links).toBeTruthy();
        else
    expect(await apiResponse.board_preferences.display_activity_date_range_on_links).toBeFalsy();
      
    if(apiResponse.board_preferences.enable_tooltip_on_hover === true)
    expect(await apiResponse.board_preferences.enable_tooltip_on_hover).toBeTruthy();
        else
        expect(await apiResponse.board_preferences.enable_tooltip_on_hover).toBeFalsy();

    if(apiResponse.board_preferences.display_comments === true)
    expect(await apiResponse.board_preferences.display_comments).toBeTruthy();
        else
    expect(await apiResponse.board_preferences.display_comments).toBeFalsy();
    
    if(apiResponse.board_preferences.display_full_value_on_links === true)
    expect(await apiResponse.board_preferences.display_full_value_on_links).toBeTruthy();
        else
    expect(await apiResponse.board_preferences.display_full_value_on_links).toBeFalsy();

    if(apiResponse.board_preferences.display_curved_links === true)
    expect(await apiResponse.board_preferences.display_curved_links).toBeTruthy();
    else
    expect(await apiResponse.board_preferences.display_curved_links).toBeFalsy();

    await test.step('8. Deleting graph from board', async () => {
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage);
    });

    await test.step("9. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-217, QATRKR-TC-554, QATRKR-TC-542, QATRKR-TC-893, QATRKR-TC-894, QATRKR-TC-908, QATRKR-TC-930, QATRKR-TC-1324, QATRKR-TC-1330, QATRKR-TC-1340, QATRKR-TC-1357, QATRKR-TC-1374, QATRKR-TC-1375, QATRKR-TC-1419, QATRKR-TC-1420, QATRKR-TC-1421, QATRKR-TC-1422, QATRKR-TC-1423, QATRKR-TC-1424, QATRKR-TC-1425, QATRKR-TC-1427, QATRKR-TC-1429, QATRKR-TC-1627, QATRKR-TC-1628, Verifying that I should be able to perform zoom-in, zoom-out and fit the screen, verifying board icons tooltip messages. @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph_Toolbar"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
    });
     
    await test.step("7. Performing zoom-in and zoom-out for graph and verifying board icons tooltip messages", async () => {
      await graphToolbarPage.verifyToggleShowPreferencesWithHotkey(toolBarconsts.REMOVE_ATTRIBUTION_COLOR_CODES, toolBarconsts.CTRL_SHIFT_P)
      await graphToolbarPage.clickZoomIn(true);
      await graphToolbarPage.clickFitIcon(true);
      await graphToolbarPage.clickZoomOut(true);
      await graphToolbarPage.clickFitIcon(true);
      await graphToolbarPage.verifyBoardIconsDataTooltipMessages();
    });
    
    await test.step('8. Deleting a graph from board', async () => {
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage);
    });

    await test.step("9. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1321, QATRKR-TC-1322, QATRKR-TC-1323, Verifying that I should be able change, save layouts and verify the positions of node. @board @board-sanity", async () => {
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
      await dashboardPage.clickAndFillSearchForAddress("0xcc29be4ca92d4ecc43c8451fba94c200b83991f6");
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step("7. Verifying the position of nodes with organic and sequential layout without saving the positions of nodes", async () => {
      await graphPage.verifyGraphContainerPageIsVisible();
      await graphToolbarPage.clickOnNodeAndVerifyDetailsPanel("0xcc29be4ca92d4ecc43c8451fba94c200b83991f6", data2["TC_056_Dashboard"].Currencies.split(',')[0])
      await detailsPanelPage.clickOnSpecifiedTab(graphConsts.SUMMARY);
      await detailsPanelPage.clickOnAutoInvestigateButton("LinkPool: Deployer");
      await detailsPanelPage.closeDetailsPanel();
      await detailsPanelPage.clickOnLayoutAndValidateNodePosition("0xcc29be4ca92d4ecc43c8451fba94c200b83991f6", data2["TC_056_Dashboard"].Currencies.split(',')[0], "Organic Layout", false);   
      await page.waitForTimeout(3000);
      await detailsPanelPage.clickOnLayoutAndValidateNodePosition("0xcc29be4ca92d4ecc43c8451fba94c200b83991f6", data2["TC_056_Dashboard"].Currencies.split(',')[0], "Sequential Layout", false); 
    });

    await test.step("8. Verifying the position of nodes with organic and sequential layout by saving the positions of nodes", async () => {
      await detailsPanelPage.clickOnSaveLayout();
      await detailsPanelPage.clickOnLayoutAndValidateNodePosition("0xcc29be4ca92d4ecc43c8451fba94c200b83991f6", data2["TC_056_Dashboard"].Currencies.split(',')[0], "Organic Layout", true);   
      await page.waitForTimeout(3000);
      await detailsPanelPage.clickOnLayoutAndValidateNodePosition("0xcc29be4ca92d4ecc43c8451fba94c200b83991f6", data2["TC_056_Dashboard"].Currencies.split(',')[0], "Sequential Layout", true); 
    });

    await test.step('9. Deleting a graph from board', async () => {
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage);
    });

    await test.step("10. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });
});