import { BrowserContext, Page, test, APIRequestContext, expect } from "@playwright/test";
import { TrackerLoginPage } from "../../page-objects/login-pages/login-page.ts";
import { TrackerDashboardPage } from "../../page-objects/dashboard-pages/dashboard-page.ts";
import { GraphPage } from "../../page-objects/graph-pages/graph-page.ts";
import { allure } from "allure-playwright";
import { DetailsPanelPage } from "../../page-objects/graph-pages/details-panel-page.ts";
import { GraphToolbarPage } from "../../page-objects/graph-pages/graph-toolbar-page.ts";
import { ApiFunctionPage } from "../../page-objects/utilities-pages/api-function-page.ts";

const graphConsts = require("../../constants/graph-constants.ts") as Record<string, any>;
const toolBarconsts = require("../../constants/graph-tool-bar-constants.ts") as Record<string, any>;
const graphAnnotationConsts = require("../../constants/graph-annotation-constants.ts") as Record<string, any>;

const data1 = require(`../../test-data/graph/graph-annotation.json`) as Record<string, any>;
const data2 = require(`../../test-data/dashboard/dashboard.json`) as Record<string, any>;
const data3 = require(`../../test-data/graph/graph-toolbar.json`) as Record<string, any>;

const baseurl = process.env.BASE_URL;
const email = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;
let requestContext: APIRequestContext;

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

  test("QATRKR-TC-1489, QATRKR-TC-1490, QATRKR-TC-1491, QATRKR-TC-1492, QATRKR-TC-1514, QATRKR-TC-2280, Verify user is able to apply color, edit label, reset and delete the selected node. @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
    const graphToolbarPage: GraphToolbarPage = new GraphToolbarPage(page);
    const detailsPanelPage: DetailsPanelPage = new DetailsPanelPage(page);
    const apiPage: ApiFunctionPage = new ApiFunctionPage(requestContext);
    const responsesPromise = apiPage.captureAPIResponse(page, 'https://api.tracker.demo.merklescience.com/boardman/api/v3/boards/', 'PATCH');

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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph_Annotation"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step("7. Verifying user is able to add color to node, update label, add glyph and reset it to the node", async () => {
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await graphToolbarPage.rightClickOnNode(data1["TC_001_Graph_Annotation"].nodeAddress1, data2["TC_056_Dashboard"].Currencies.split(',')[0]);
      await graphPage.verifyAnnotatePopup();
      await graphPage.clickOnColorDropdownAndSelectColor();

      const responses = await responsesPromise;
      const payloadResponse = responses[responses.length - 1].payload;
      const apiResponse = JSON.parse(payloadResponse);
      const patchOperation = apiResponse[graphAnnotationConsts.PATCH_OPERATION];
        if (Array.isArray(patchOperation)) {
          patchOperation.forEach(operation => {
              expect(operation.op).toBe(graphAnnotationConsts.REPLACE);
              expect(operation.path).toContain(graphAnnotationConsts.COLOR);
          });
        };

      await graphPage.annotateAddLabel(data1["TC_002_Graph_Annotation"].label);
      
      if (responses.length > 0) {
        const payloadResponse1 = responses[responses.length - 1];
        const apiResponse1 = JSON.parse(payloadResponse1.payload);
        const patchOperation1 = await apiResponse1[graphAnnotationConsts.PATCH_OPERATION];
        if (Array.isArray(patchOperation1)) {
          patchOperation1.forEach(operation1 => {
            expect(operation1.op).toBe(graphAnnotationConsts.REPLACE);
            expect(operation1.path).toContain(graphAnnotationConsts.LABEL_TEXT);
          });
        };
      }

      await graphPage.annotateAddGlyph();

      if (responses.length > 0) {
      const payloadResponse2 = responses[responses.length - 1].payload;
      const apiResponse2 = JSON.parse(payloadResponse2);
      const patchOperation2 = apiResponse2[graphAnnotationConsts.PATCH_OPERATION];
        if (Array.isArray(patchOperation2)) {
          patchOperation2.forEach(operation2 => {
              expect(operation2.op).toBe(graphAnnotationConsts.ADD);
              expect(operation2.path).toContain(graphAnnotationConsts.GLYPHS);
          });
          };
        }

        await graphPage.annotateResetBtn();
         
        if (responses.length > 0) {
          const payloadResponse3 = responses[responses.length - 1];
          const apiResponse3 = JSON.parse(payloadResponse3.payload);
          const patchOperation3 = await apiResponse3[graphAnnotationConsts.PATCH_OPERATION];
          
          if (Array.isArray(patchOperation3)) {
            const operation1 = patchOperation3[0];
            expect(operation1.op).toBe(graphAnnotationConsts.REPLACE);
            expect(operation1.path).toContain(graphAnnotationConsts.COLOR);
    
            const operation2 = patchOperation3[1];
            expect(operation2.op).toBe(graphAnnotationConsts.REMOVE);
            expect(operation2.path).toContain(graphAnnotationConsts.GLYPHS);
    
            const operation3 = patchOperation3[2];
            expect(operation3.op).toBe(graphAnnotationConsts.REPLACE);
            expect(operation3.path).toContain(graphAnnotationConsts.LABEL_TEXT);
        }
      }  
    });

    await test.step("8. Verifying user is able to delete the selected node", async () => {
      await graphPage.annotateDeleteNode();
      await detailsPanelPage.clickOnMerkleScienceLogoAndOpenExistingGraph();
      await detailsPanelPage.verifySpecifiedAddressOnTheBoard(data1["TC_001_Graph_Annotation"].nodeAddress1);
      await graphToolbarPage.performRandomClickOnCanvas();
    });

    await test.step("9. Deleting the graph from the board", async () => {
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage)
    });
  
    await test.step("10. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1484, QATRKR-TC-1485, QATRKR-TC-1486, QATRKR-TC-1487, QATRKR-TC-1488, QATRKR-TC-1515, Verify user is able to apply color, edit label, reset, change width size, design of the link. @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
    const graphToolbarPage: GraphToolbarPage = new GraphToolbarPage(page);
    const apiPage: ApiFunctionPage = new ApiFunctionPage(requestContext);
    const responsesPromise = apiPage.captureAPIResponse(page, graphAnnotationConsts.GRAPH_ANNOTATION_ENDPOINT_URL, graphAnnotationConsts.PATCH);
    
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph_Annotation"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step("7. Verifying user is able to add color to link, update label, add glyph and reset it ", async () => {
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await graphPage.rightClickOnLink(graphConsts.TRANSFER);
      await graphPage.clickOnColorDropdownAndSelectColor();

      const responses = await responsesPromise;
      const payloadResponse = responses[responses.length - 1].payload;
      const apiResponse = JSON.parse(payloadResponse);
      const patchOperation = apiResponse[graphAnnotationConsts.PATCH_OPERATION];
        if (Array.isArray(patchOperation)) {
          patchOperation.forEach(operation => {
              expect(operation.op).toBe(graphAnnotationConsts.REPLACE);
              expect(operation.path).toContain(graphAnnotationConsts.COLOR);
          });
        };

      await graphPage.annotateUpdateLinkLabel(data1["TC_002_Graph_Annotation"].label);

      if (responses.length > 0) {
        const payloadResponse1 = responses[responses.length - 1];
        const apiResponse1 = JSON.parse(payloadResponse1.payload);
        const patchOperation1 = await apiResponse1[graphAnnotationConsts.PATCH_OPERATION];
        if (Array.isArray(patchOperation1)) {
          patchOperation1.forEach(operation1 => {
            expect(operation1.op).toBe(graphAnnotationConsts.REPLACE);
            expect(operation1.path).toContain(graphAnnotationConsts.LABEL_TEXT);
          });
        };
      }

      await graphPage.annotateAddLinkGlyph();

      if (responses.length > 0) {
        const payloadResponse2 = responses[responses.length - 1].payload;
        const apiResponse2 = JSON.parse(payloadResponse2);
        const patchOperation2 = apiResponse2[graphAnnotationConsts.PATCH_OPERATION];
          if (Array.isArray(patchOperation2)) {
            patchOperation2.forEach(operation2 => {
                expect(operation2.op).toBe(graphAnnotationConsts.ADD);
                expect(operation2.path).toContain(graphAnnotationConsts.GLYPHS);
            });
            };
          } 

      await graphPage.annotateLinkResetBtn();

      if (responses.length > 0) {
        const payloadResponse3 = responses[responses.length - 1];
        const apiResponse3 = JSON.parse(payloadResponse3.payload);
        const patchOperation3 = await apiResponse3[graphAnnotationConsts.PATCH_OPERATION];

        if (Array.isArray(patchOperation3)) {
          const operation2 = patchOperation3[0];
          expect(operation2.op).toBe(graphAnnotationConsts.REMOVE);
          expect(operation2.path).toContain(graphAnnotationConsts.GLYPHS);
  
          const operation1 = patchOperation3[1];
          expect(operation1.op).toBe(graphAnnotationConsts.REPLACE);
          expect(operation1.path).toContain(graphAnnotationConsts.LABEL_TEXT);
  
          const operation3 = patchOperation3[2];
          expect(operation3.op).toBe(graphAnnotationConsts.REPLACE);
          expect(operation3.path).toContain(graphAnnotationConsts.COLOR);
      }
    }  
    });

    await test.step("8. Verifying user is able to change link size and style for a selected link", async () => {
      await graphPage.annotateLinkSize();
      const responses = await responsesPromise;
      if (responses.length > 0) {
        const payloadResponse1 = responses[responses.length - 1];
        const apiResponse1 = JSON.parse(payloadResponse1.payload);
        const patchOperation1 = await apiResponse1[graphAnnotationConsts.PATCH_OPERATIONs];
        if (Array.isArray(patchOperation1)) {
          patchOperation1.forEach(operation1 => {
            expect(operation1.op).toBe(graphAnnotationConsts.REPLACE);
            expect(operation1.path).toContain(graphAnnotationConsts.WIDTH);
          });
        };
      }

      await graphPage.annotateLinkDesign();
      if (responses.length > 0) {
        const payloadResponse2 = responses[responses.length - 1];
        const apiResponse2 = JSON.parse(payloadResponse2.payload);
        const patchOperation2 = await apiResponse2[graphAnnotationConsts.PATCH_OPERATION];
        if (Array.isArray(patchOperation2)) {
          patchOperation2.forEach(operation2 => {
            expect(operation2.op).toBe(graphAnnotationConsts.REPLACE);
            expect(operation2.path).toContain(graphAnnotationConsts.LINE_STYLE);
            expect(operation2.value).toBe(graphAnnotationConsts.DOTTED);
          });
        };
      }

      await graphToolbarPage.performRandomClickOnCanvas(); 
    });

    await test.step("9. Deleting the graph from the board", async () => {
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage)
    });
  
    await test.step("10. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-1431, QATRKR-TC-1432, QATRKR-TC-1433, QATRKR-TC-1434, QATRKR-TC-1513, Verify user is able to apply color, edit label, reset and delete the selected cluster. @board @board-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const graphPage: GraphPage = new GraphPage(page);
    const graphToolbarPage: GraphToolbarPage = new GraphToolbarPage(page);
    const detailsPanelPage: DetailsPanelPage = new DetailsPanelPage(page);
    const apiPage: ApiFunctionPage = new ApiFunctionPage(requestContext);
    const responsesPromise = apiPage.captureAPIResponse(page, graphAnnotationConsts.GRAPH_ANNOTATION_ENDPOINT_URL, graphAnnotationConsts.PATCH);
    
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
      await dashboardPage.clickAndFillSearchForAddress(data1["TC_001_Graph_Annotation"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step("7. Verifying user is able to add color to node, update label, add glyph and reset it to the cluster", async () => {
	    await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await graphToolbarPage.rightClickOnCluster(data1["TC_001_Graph_Annotation"].nodeAddress2, data2["TC_056_Dashboard"].Currencies.split(',')[0]);
      await graphPage.verifyAnnotatePopup();
      await graphPage.clickOnColorDropdownAndSelectColor();

      const responses = await responsesPromise;
      const payloadResponse = responses[responses.length - 1].payload;
      const apiResponse = JSON.parse(payloadResponse);
      const patchOperation = apiResponse[graphAnnotationConsts.PATCH_OPERATION];
        if (Array.isArray(patchOperation)) {
          patchOperation.forEach(operation => {
              expect(operation.op).toBe(graphAnnotationConsts.REPLACE);
              expect(operation.path).toContain(graphAnnotationConsts.COLOR);
          });
        };

      await graphPage.annotateUpdateLinkLabel(data1["TC_002_Graph_Annotation"].label);

      if (responses.length > 0) {
        const payloadResponse1 = responses[responses.length - 1];
        const apiResponse1 = JSON.parse(payloadResponse1.payload);
        const patchOperation1 = await apiResponse1[graphAnnotationConsts.PATCH_OPERATION];
        if (Array.isArray(patchOperation1)) {
          patchOperation1.forEach(operation1 => {
            expect(operation1.op).toBe(graphAnnotationConsts.REPLACE);
            expect(operation1.path).toContain(graphAnnotationConsts.LABEL_TEXT);
          });
        };
      }

      await graphPage.annotateAddGlyph();

      if (responses.length > 0) {
        const payloadResponse2 = responses[responses.length - 1].payload;
        const apiResponse2 = JSON.parse(payloadResponse2);
        const patchOperation2 = apiResponse2[graphAnnotationConsts.PATCH_OPERATION];
          if (Array.isArray(patchOperation2)) {
            patchOperation2.forEach(operation2 => {
                expect(operation2.op).toBe(graphAnnotationConsts.ADD);
                expect(operation2.path).toContain(graphAnnotationConsts.GLYPHS);
            });
            };
          } 

      await graphPage.annotateLinkResetBtn();

      if (responses.length > 0) {
        const payloadResponse3 = responses[responses.length - 1];
        const apiResponse3 = JSON.parse(payloadResponse3.payload);
        const patchOperation3 = await apiResponse3[graphAnnotationConsts.PATCH_OPERATION];
        
        if (Array.isArray(patchOperation3)) {
          const operation2 = patchOperation3[0];
          expect(operation2.op).toBe(graphAnnotationConsts.REMOVE);
          expect(operation2.path).toContain(graphAnnotationConsts.GLYPHS);
  
          const operation1 = patchOperation3[1];
          expect(operation1.op).toBe(graphAnnotationConsts.REPLACE);
          expect(operation1.path).toContain(graphAnnotationConsts.COLOR);
  
          const operation3 = patchOperation3[2];
          expect(operation3.op).toBe(graphAnnotationConsts.REPLACE);
          expect(operation3.path).toContain(graphAnnotationConsts.LABEL_TEXT);
      }
    }
    });

    await test.step("8. Verifying user is able to delete the selected cluster", async () => {
      await graphPage.annotateDeleteNode();
      await detailsPanelPage.clickOnMerkleScienceLogoAndOpenExistingGraph();
      await detailsPanelPage.verifySpecifiedAddressOnTheBoard(data1["TC_001_Graph_Annotation"].nodeAddress2);
      await graphToolbarPage.performRandomClickOnCanvas();
    });

    await test.step("9. Deleting the graph from the board", async () => {
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage)
    });
  
    await test.step("10. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-2282, QATRKR-TC-2283, QATRKR-TC-2284, Verifying that I should be able to add and delete comment. @board @board-sanity", async () => {
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
      await dashboardPage.clickAndFillSearchForAddress(data3["TC_001_Graph_Toolbar"].address);
    });

    await test.step("6. Clicking on Add to board button", async () => {
      await dashboardPage.clickOnAddToBoard();
      await page.waitForTimeout(5000);
      await graphPage.clickOnSearchCloseButton();
    });

    await test.step("7. Verifying that I should be able to add and delete comment", async () => {
      await graphToolbarPage.enableDisableToggleShowPreferences(toolBarconsts.DISPLAY_TOOL_TIPS_WHEN_HOVERED_OVER_THE_LINKS);
      await graphPage.verifyGraphContainerPageIsVisible();
      await graphToolbarPage.rightClickOnNode(data3["TC_066_Graph_Toolbar"].nodeAddress, data2["TC_056_Dashboard"].Currencies.split(',')[0]);
      await graphToolbarPage.addAnnotateCommentAndSave(data3["TC_066_Graph_Toolbar"].testing);
      await graphToolbarPage.deleteTheSelectedNodeAndCluster(data3["TC_066_Graph_Toolbar"].comment);
      await graphPage.deleteGraphFromBoard(data2["TC_011_Dashboard"].deleteToastMessage);
    });

    await test.step("8. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });
});