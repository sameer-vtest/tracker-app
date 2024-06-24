import { BrowserContext, Page, test } from "@playwright/test";
import { TrackerLoginPage } from "../../page-objects/login-pages/login-page.ts";
import { TrackerDashboardPage } from "../../page-objects/dashboard-pages/dashboard-page.ts";
import { TeamMembersPage } from "../../page-objects/profile-settings-pages/team-members-page.ts";
import { allure } from "allure-playwright";

const data = require(`../../test-data/profile-settings/team-members.json`) as Record<string, any>;
const baseurl = process.env.BASE_URL;
const email = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;

test.describe('Team Members Tests', () => {
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

  test("QATRKR-TC-181, Verify the Team Members page contents. @profile @profile-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const teamMembersPage: TeamMembersPage = new TeamMembersPage(page)

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
      await dashboardPage.clickOnUserProfile()
      await dashboardPage.verifyUserAbleToViewSettings();
    });

    await test.step("6. Navigating to Team Members", async () => {
      await teamMembersPage.clickOnTeamMembersSection();
    });

    await test.step("7. Verify Header 'Team Members' should be displayed", async () => {
      await teamMembersPage.verifyPageHeader(data["TC_059"].header);
    });

    await test.step("8. Verify Sub header 'Add Members to your team or Modify their roles here.' should be displayed", async () => {
      await teamMembersPage.verifySubHeader(data["TC_059"].subHeader);
    });

    await test.step("9. Verify Table header 'MEMBERS' should be displayed", async () => {
      await teamMembersPage.verifyTableHeader(data["TC_059"].tableHeader);
    });

    await test.step("10. Verify Table column with names 'NAME', 'EMAIL', 'ROLE' and 'STATUS' should be displayed", async () => {
      await teamMembersPage.verifyTableColumnHeader(data["TC_059"].firstColName, data["TC_059"].secondColName, data["TC_059"].thirdColName, data["TC_059"].fourthColName);
    });

    await test.step("11. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-190, Verifying the Team Members dialog and toggle button for invite member. @profile @profile-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const teamMembersPage: TeamMembersPage = new TeamMembersPage(page)

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
      await dashboardPage.clickOnUserProfile()
      await dashboardPage.verifyUserAbleToViewSettings();
    });

    await test.step("6. Navigating to Team Members", async () => {
      await teamMembersPage.clickOnTeamMembersSection();
    });

    await test.step("7. Verify Header 'Team Members' should be displayed", async () => {
      await teamMembersPage.clickOnInviteMemberButton();
      await teamMembersPage.verifyAddOrEditMemberDialog(true);
    });

    await test.step("8. Verifying enable this member toggle", async () => {
      await teamMembersPage.verifyEnableThisMemberToggle(true);
    });

    await test.step("9. Clicking on cancel button and verifying add member dialog is closed", async () => {
      await teamMembersPage.clickOnCancelButton();
      await teamMembersPage.verifyAddOrEditMemberDialog(false);
    });

    await test.step("10. Clickng on invite menber button and verifying the add member dialog", async () => {
      await teamMembersPage.clickOnInviteMemberButton();
      await teamMembersPage.clickOnCloseIcon();
      await teamMembersPage.verifyAddOrEditMemberDialog(false);
    });

    await test.step("11. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-197, QATRKR-TC-199, QATRKR-TC-200, QATRKR-TC-2281, Verifying the Team Members dialog and selecting member role for edit member. @profile @profile-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const teamMembersPage: TeamMembersPage = new TeamMembersPage(page)

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
      await dashboardPage.clickOnUserProfile()
      await dashboardPage.verifyUserAbleToViewSettings();
    });

    await test.step("6. Navigating to Team Members", async () => {
      await teamMembersPage.clickOnTeamMembersSection();
    });

    await test.step("7. Verify Header 'Team Members' should be displayed", async () => {
      await teamMembersPage.clickOnEditButton(data["TC_036"].email);
      await teamMembersPage.verifyAddOrEditMemberDialog(true);
    });

    await test.step("8. Selecting team member role, verifying success toast message and verifying selected role is displayed", async () => {
      await teamMembersPage.clickAndSelectMemberRoleOption(data["TC_038"].agentRole);
      await teamMembersPage.clickOnSaveBtn();
      await teamMembersPage.verifyTeamMemberSuccessToastMsg(data["TC_039"].successToastMsg)
      await teamMembersPage.verifyTeamMemberRole(data["TC_036"].email, data["TC_038"].agentRole);
      await teamMembersPage.clickOnEditButton(data["TC_036"].email);
      await teamMembersPage.clickAndSelectMemberRoleOption(data["TC_038"].adminRole);
      await teamMembersPage.clickOnSaveBtn();
      await teamMembersPage.verifyTeamMemberSuccessToastMsg(data["TC_039"].successToastMsg)
      await teamMembersPage.verifyTeamMemberRole(data["TC_036"].email, data["TC_038"].adminRole);
    });

    await test.step("9. Clicking on edit button, clickng on cancel button and verifying the enable this member toggle", async () => {
      await teamMembersPage.clickOnEditButton(data["TC_036"].email);
      await teamMembersPage.verifyEnableThisMemberToggle(true);
      await teamMembersPage.clickOnCancelButton();
      await teamMembersPage.verifyAddOrEditMemberDialog(false);
    });

    await test.step("10. Clicking on edit button, clickng on close icon and verifying the edit member dialog", async () => {
      await teamMembersPage.clickOnEditButton(data["TC_036"].email);
      await teamMembersPage.clickOnCloseIcon();
      await teamMembersPage.verifyAddOrEditMemberDialog(false);
    });

    await test.step("11. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-201, QATRKR-TC-202, QATRKR-TC-203, QATRKR-TC-204, QATRKR-TC-205, QATRKR-TC-206, QATRKR-TC-207, QATRKR-TC-208, Verifying the toggle button, first name, last name and email address for edit member. @profile @profile-sanity", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const teamMembersPage: TeamMembersPage = new TeamMembersPage(page)

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
      await dashboardPage.clickOnUserProfile()
      await dashboardPage.verifyUserAbleToViewSettings();
    });

    await test.step("6. Navigating to Team Members", async () => {
      await teamMembersPage.clickOnTeamMembersSection();
    });

    await test.step("7. Clicking on edit button and verifying Header 'Team Members' should be displayed", async () => {
      await teamMembersPage.clickOnEditButton(data["TC_036"].email);
      await teamMembersPage.verifyAddOrEditMemberDialog(true);
    });

    await test.step("8. Verifying enable this member toggle", async () => {
      await teamMembersPage.verifyEnableThisMemberToggle(true);
      await teamMembersPage.verifyEnableThisMemberToggle(false);
      await teamMembersPage.clickOnSaveBtn();
      await teamMembersPage.verifyTeamMemberStatus(data["TC_036"].email, data["TC_040"].enabled);
    });

    await test.step("9. Clicking on edit button, modifying their roles and clicking on cancel button", async () => {
      await teamMembersPage.clickOnEditButton(data["TC_036"].email);
      await teamMembersPage.clickAndSelectMemberRoleOption(data["TC_038"].agentRole);
      await teamMembersPage.clickOnCancelButton();
      await teamMembersPage.verifyTeamMemberRole(data["TC_036"].email, data["TC_038"].adminRole);
      await teamMembersPage.clickOnEditButton(data["TC_036"].email);
      await teamMembersPage.clickAndSelectMemberRoleOption(data["TC_038"].adminRole);
      await teamMembersPage.clickOnCancelButton();
      await teamMembersPage.verifyTeamMemberRole(data["TC_036"].email, data["TC_038"].adminRole);
    });

    await test.step("10. Verifying first name, last name and email address of team member", async () => {
      await teamMembersPage.clickOnEditButton(data["TC_036"].email);
      await teamMembersPage.verifyTeamMemberFirstName(data["TC_046"].firstName);
      await teamMembersPage.verifyTeamMemberLastName(data["TC_046"].lastname);
      await teamMembersPage.verifyTeamMemberEmailAddress(data["TC_046"].emailAddress);
      await teamMembersPage.clickOnCancelButton();
    });

    await test.step("11. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-182, QATRKR-TC-183, QATRKR-TC-184, QATRKR-TC-185, QATRKR-TC-186, QATRKR-TC-187, QATRKR-TC-188, QATRKR-TC-189, QATRKR-TC-191, Verifying the toggle button, first name, last name and email address for edit member. @profile @profile-regression", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const teamMembersPage: TeamMembersPage = new TeamMembersPage(page)

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
      await dashboardPage.clickOnUserProfile()
      await dashboardPage.verifyUserAbleToViewSettings();
    });

    await test.step("6. Navigating to Team Members", async () => {
      await teamMembersPage.clickOnTeamMembersSection();
    });

    await test.step("7. Clicking on Invite Member butoon and verifying the dialog", async () => {
      await teamMembersPage.clickOnInviteMemberButton();
      await teamMembersPage.verifyAddOrEditMemberDialog(true);
      await teamMembersPage.verifyAddMemberDialogContents();
    });

    await test.step("8. Verifying the content and fields in add member dialog", async () => {
      await teamMembersPage.enterFirstName(data["TC_046"].firstName);
      await teamMembersPage.verifyInviteButtonIsDiabled(true);
      await teamMembersPage.enterLastName(data["TC_046"].lastname);
      await teamMembersPage.verifyInviteButtonIsDiabled(true);
      await teamMembersPage.enterFirstName("");
      await teamMembersPage.enterLastName("");
      await teamMembersPage.enterEmail(data["TC_046"].emailAddress);
      await teamMembersPage.verifyInviteButtonIsDiabled(true);
      await teamMembersPage.enterFirstName(data["TC_046"].firstName);
      await teamMembersPage.enterLastName(data["TC_046"].lastname);
      await teamMembersPage.enterEmail(data["TC_046"].emailAddress);
      await teamMembersPage.verifyInviteButtonIsDiabled(false);
      await teamMembersPage.clickOnCancelButton();
    });

    await test.step("9. Verify the failed toast message", async () => {
      await teamMembersPage.clickOnInviteMemberButton();
      await teamMembersPage.enterFirstName(data["TC_046"].firstName);
      await teamMembersPage.enterLastName(data["TC_046"].lastname);
      await teamMembersPage.enterEmail(data["TC_046"].invalidEmailAddress);
      await teamMembersPage.verifyInviteButtonIsDiabled(false);
      await teamMembersPage.clickOnInviteButton();
      await teamMembersPage.verifyTeamMemberFailedToastMsg(data["TC_039"].failedToastMsg)
    });

    await test.step("10. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });

  test("QATRKR-TC-192, QATRKR-TC-193, QATRKR-TC-194, QATRKR-TC-195, QATRKR-TC-196, QATRKR-TC-198, QATRKR-TC-209, QATRKR-TC-210, QATRKR-TC-211, Verifying the toggle button, first name, last name and email address for edit member. @profile @profile-regression", async () => {
    const trackerLoginPage: TrackerLoginPage = new TrackerLoginPage(page);
    const dashboardPage: TrackerDashboardPage = new TrackerDashboardPage(page);
    const teamMembersPage: TeamMembersPage = new TeamMembersPage(page);
    
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
      await dashboardPage.clickOnUserProfile()
      await dashboardPage.verifyUserAbleToViewSettings();
    });

    await test.step("6. Navigating to Team Members", async () => {
      await teamMembersPage.clickOnTeamMembersSection();
    });

    await test.step("7. Clicking on edit button and verifying dialog and contents", async () => {
      await teamMembersPage.clickOnEditButton(data["TC_036"].email);
      await teamMembersPage.verifyAddOrEditMemberDialog(true);
      await teamMembersPage.verifyEditMemberDialogContents();
    });

    await test.step("8. Verifying the fields in edit member dialog", async () => {
      await teamMembersPage.verifyFirstNameField();
      await teamMembersPage.verifyLastNameField();
      await teamMembersPage.verifyEmailField();
      await teamMembersPage.clickOnCancelButton();
    });

    await test.step("9. Verifying the horizontal and vertical scroll bar", async () => {
      await teamMembersPage.verifyHorizontalScrollBar();
      await teamMembersPage.verifyVerticalScrollBar();
    });

    await test.step("10. Logging out from the application", async () => {
      await dashboardPage.logoutFromApplication();
    });
  });
});