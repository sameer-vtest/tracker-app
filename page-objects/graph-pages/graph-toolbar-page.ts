import { Locator, Page, expect } from "@playwright/test";
import { GraphPage } from "./graph-page";
import { TrackerDashboardPage } from "../dashboard-pages/dashboard-page";
import { TrackerLoginPage } from "../login-pages/login-page";
import * as fs from 'fs';
import * as os from 'os';
import path from "path";
import { DetailsPanelPage } from "./details-panel-page";

export class GraphToolbarPage {
  readonly page: Page;
  graphPage: GraphPage;
  dashboardPage: TrackerDashboardPage;
  trackerLoginPage: TrackerLoginPage;
  detailsPanelPage: DetailsPanelPage;
  readonly renameGraph: Locator;
  readonly duplicateGraph: Locator;
  readonly moveGraph: Locator;
  readonly deleteGraph: Locator;
  readonly graphNameTextbox: Locator;
  readonly copyToFolder: Locator;
  readonly copyBtn: Locator;
  readonly newFolderBtn: Locator;
  readonly folderSearchBar: Locator;
  readonly duplicatePopupXIcon: Locator;
  readonly searchedFolderName: Locator;
  readonly newFolderTextbox: Locator;
  readonly moveToFolder: Locator;
  readonly moveBtn: Locator;
  readonly graphShareIcon: Locator;
  readonly shareBoardPopup: Locator;
  readonly shareBoardPopupContent: Locator;
  readonly shareBoardPopupXIcon: Locator;
  readonly shareBoardPopupCancelBtn: Locator;
  readonly shareBoardPopupSaveBtn: Locator;
  readonly shareBoardPopupEnablePublicAccess: Locator;
  readonly shareBoardSearchAndSelectTextbox: Locator;
  readonly shareBoardDeleteIcon: Locator;
  readonly shareBoardDeleteConfirmBtn: Locator;
  readonly shareBoardInvitationSentToastMessage: Locator;
  readonly shareBoardTeamMemberSearchBox: Locator;
  readonly shareBoardViewEditDropdownIcon: Locator;
  readonly shareViewOption: Locator;
  readonly shareEditOption: Locator;
  readonly shareDialogCloseIcon: Locator;
  readonly shareGraphLink: Locator;
  readonly shareBoardEnablePasswordProtectToggle: Locator;
  readonly shareGraphPasswordTextField: Locator;
  readonly shareGraphPermissionToastMsg: Locator;
  readonly dragMode: Locator;
  readonly selectionMode: Locator;
  readonly deleteSelectedItems: Locator;
  readonly assetLinks: Locator;
  readonly usdLinks: Locator;
  readonly toggleShowPreferences: Locator;
  readonly annotateComment: Locator;
  readonly commentTextBox: Locator;
  readonly toggleShowLegends: Locator;
  readonly toggleFullScreen: Locator;
  readonly createSuperCluster: Locator;
  readonly superClusterTextbox: Locator;
  readonly saveNameBtn: Locator;
  readonly unmergeCluster: Locator;
  readonly newClusterPopup: Locator;
  readonly toggleShowLegendsPopup: Locator;
  readonly downloadGraphSVG: Locator;
  readonly undoButton: Locator;
  readonly redoButton: Locator;
  readonly deleteGraphPopupHeader: Locator;
  readonly sharedBoardEnterPasswordDialog: Locator;
  readonly sharedBoardPasswordDialogPasswordTextField: Locator;
  readonly sharedBoardPasswordDialogSubmitBtn: Locator;
  readonly backToHomeBtn: Locator;
  readonly detailsPanelCurrencyToggleValue: Locator;
  readonly annotateButton: Locator;
  readonly annotateDialog: Locator;
  readonly useSequencialLayout: Locator;
  readonly useOrganicLayout: Locator;
  readonly zoomInBtn: Locator;
  readonly zoomOutBtn: Locator;
  readonly fitBtn: Locator;
  readonly fixAllNodesInCurrentPosition: Locator;
  readonly addCommentDialog: Locator;

  constructor(page: Page) {
    this.page = page;
    this.renameGraph = this.page.locator("//span[contains(text(),'Rename graph')]");
    this.duplicateGraph = this.page.locator("//span[contains(text(),'Duplicate graph')]");
    this.moveGraph = this.page.locator("//span[contains(text(),'Move graph')]");
    this.deleteGraph = this.page.locator("//span[contains(text(),'Delete graph')]");
    this.graphNameTextbox = this.page.getByPlaceholder('Enter value');
    this.copyToFolder = this.page.locator("//h3[contains(text(),'COPY TO FOLDER')]");
    this.copyBtn = this.page.locator("//button[contains(text(),'Copy')]");
    this.newFolderBtn = this.page.locator("//button[contains(text(),'New')]");
    this.folderSearchBar = this.page.locator('//input[@id="folder-search-input"]');
    this.duplicatePopupXIcon = this.page.locator("//span[contains(text(),'Close')]//parent::button");
    this.searchedFolderName = this.page.locator("//div[contains(@class,'_foldersContainer')]");
    this.newFolderTextbox = this.page.getByPlaceholder('Enter folder name');
    this.moveToFolder = this.page.locator("//h3[contains(text(),'MOVE TO FOLDER')]");
    this.moveBtn = this.page.locator("//button[contains(text(),'Move')]");
    this.graphShareIcon = this.page.locator('//button[contains(@data-tooltip-html,"Share<br/>Ctrl + Shift")]');
    this.shareBoardPopup = this.page.locator("//h3[contains(text(),'Share Board')]");
    this.shareBoardPopupContent = this.page.locator("//label[contains(text(),'SHARE BOARD')]");
    this.shareBoardPopupEnablePublicAccess = this.page.locator("//span[contains(text(),'Enable Public Access')]/parent::span/parent::div/preceding-sibling::button");
    this.shareBoardSearchAndSelectTextbox = this.page.locator("//div[contains(text(),'Search and select')]");
    this.shareBoardPopupXIcon = this.page.locator("//span[contains(text(),'Close')]/parent::button");
    this.shareBoardPopupCancelBtn = this.page.locator("//button[contains(text(),'Cancel')]");
    this.shareBoardPopupSaveBtn = this.page.locator("//button[contains(text(),'Save')]");
    this.shareBoardDeleteIcon = this.page.locator("//div[contains(@class,'permissionOptionsDropdown')]//following-sibling::button");
    this.shareBoardDeleteConfirmBtn = this.page.locator("//button[contains(text(),'Delete')]");
    this.shareBoardTeamMemberSearchBox = page.locator('//input[@class="react-select__input"]');
    this.shareBoardViewEditDropdownIcon = page.getByLabel('Share Board').locator('svg').nth(2);
    this.shareViewOption = page.getByText('Can View');
    this.shareEditOption = page.getByText('Can Edit');
    this.shareDialogCloseIcon = page.getByRole('button', { name: 'Close' });
    this.shareBoardInvitationSentToastMessage = page.locator("//div[contains(.,'Invitation Sent!')]").last();
    this.shareGraphLink = page.locator('//input[@id="share-graph-link"]');
    this.shareBoardEnablePasswordProtectToggle = page.locator("//button[contains(@class,'transition-colors ease-in-out duration')]").last();
    this.shareGraphPasswordTextField = page.locator('//input[@id="share-graph-password"]');
    this.shareGraphPermissionToastMsg = page.locator("//div[contains(.,'Graph permissions updated successfully')]").last();
    this.dragMode = this.page.locator("//button[@data-tooltip-html='Enable Drag Mode']");
    this.selectionMode = this.page.locator("//button[contains(@data-tooltip-html,'Enable Selection Mode')]");
    this.deleteSelectedItems = this.page.locator("//button[contains(@data-tooltip-html,'Remove selected Items')]");
    this.assetLinks = page.locator('//button[@data-tooltip-html="Show Asset values on links"]');
    this.usdLinks = page.locator('//button[@data-tooltip-html="Show USD values on links"]');
    this.toggleShowPreferences = page.locator("//button[contains(@data-tooltip-html,'Show Preferences')]");
    this.annotateComment = page.locator("(//p[contains(text(),'Annotate')]/parent::div/child::div/button)[1]");
    this.commentTextBox = page.locator('//textarea[@placeholder="Enter your comment/note here.."]');
    this.addCommentDialog = page.locator("//div[contains(@class,'rounded-lg text-left overflow-hidden')]");
    this.toggleShowLegends = page.locator('//button[contains(@data-tooltip-html,"Toggle Show Legends<br/>Ctrl + Shift")]');
    this.toggleFullScreen = page.locator("//button[contains(@class,'shadow-sm rounded-md') and contains(@data-tooltip-html,'Toggle Fullscreen<br/>Ctrl + Shift +')]");
    this.createSuperCluster = page.locator("//button[contains(@data-tooltip-html,'Create Supercluster<br/>Ctrl +')]");
    this.superClusterTextbox = page.locator('//input[@id="super-cluster-name-input"]');
    this.saveNameBtn = page.locator("//button[contains(text(),'Save Name')]");
    this.unmergeCluster = page.locator("//button[contains(@data-tooltip-html,'Unmerge Supercluster<br/>Ctrl+ Shift +')]");
    this.newClusterPopup = page.locator("//div[contains(@class,'_createSuperClusterContainer_')]");
    this.toggleShowLegendsPopup = page.locator("//div[contains(@class,'_legendsContainer_')]");
    this.downloadGraphSVG = page.locator("//button[contains(@data-tooltip-html,'Download graph as SVG<br/>Ctrl + Shift +')]")
    this.undoButton = page.locator("//button[contains(@data-tooltip-html,'Undo<br/>Ctrl +')]");
    this.redoButton = page.locator("//button[contains(@data-tooltip-html,'Redo<br/>Ctrl +')]");
    this.deleteGraphPopupHeader = page.locator("//h3[contains(text(),'Delete graph')]");
    this.sharedBoardEnterPasswordDialog = page.locator("//div[contains(@class,'transform transition-all align-middle')]");
    this.sharedBoardPasswordDialogPasswordTextField = page.locator('//input[@id="graph-password-input"]');
    this.sharedBoardPasswordDialogSubmitBtn = page.locator("//button[contains(text(),'Submit')]");
    this.backToHomeBtn = page.locator("//button[contains(text(),'Back to home')]");
    this.detailsPanelCurrencyToggleValue = page.locator("//td[contains(@class,'-tnum-regular')]");
    this.annotateButton = page.locator('//button[contains(@data-tooltip-html,"Annotate<br/>Ctrl + Shift +")]');
    this.annotateDialog = page.locator("//div[contains(@class,'z-max _annotation')]");
    this.useSequencialLayout = page.locator("//button[contains(@data-tooltip-html,'Use sequential layout')]");
    this.useOrganicLayout = page.locator("//button[contains(@data-tooltip-html,'Use organic layout')]");
    this.zoomInBtn = page.locator("//button[contains(@data-tooltip-html,'Zoom In<br/>Ctrl')]");
    this.zoomOutBtn = page.locator("//button[contains(@data-tooltip-html,'Zoom Out<br/>Ctrl')]");
    this.fitBtn = page.locator("//button[contains(@data-tooltip-html,'Fit to screen<br/>Ctrl + ')]");
    this.fixAllNodesInCurrentPosition = page.locator('//button[@data-tooltip-html="Fix all nodes in current position"]');

    this.graphPage = new GraphPage(this.page);
    this.dashboardPage = new TrackerDashboardPage(this.page);
    this.trackerLoginPage = new TrackerLoginPage(this.page);
    this.detailsPanelPage = new DetailsPanelPage(this.page);
  }

  /**
   * This function is used to verify graph dropdown contents
   */
  async verifyGraphDropdownContents() {
    expect(await this.renameGraph.isVisible()).toBeTruthy();
    expect(await this.duplicateGraph.isVisible()).toBeTruthy();
    expect(await this.moveGraph.isVisible()).toBeTruthy();
    expect(await this.deleteGraph.isVisible()).toBeTruthy();
  }

  /**
   * This function is used to rename the graph name
   */
  async renameGraphName(graphName: string, updatedToastMsg: string, deletedToastMsg: string, key: string) {
    await this.renameGraph.click();
    await this.graphNameTextbox.fill(graphName);
    await this.graphNameTextbox.press(key);
    console.log(graphName);
    await this.graphPage.verifyGraphUpdatedSuccessToastMessage(updatedToastMsg);
    await this.page.waitForTimeout(5000);
    const boardName = await this.graphPage.boardName.textContent();
    console.log(boardName);
    expect(boardName).toBe(graphName);
    await this.graphPage.graphDropdown.click();
    await this.renameGraph.click();
    await this.graphNameTextbox.fill(graphName);
    await this.graphNameTextbox.press(key);
    await this.page.waitForTimeout(3000);
    expect(this.graphPage.graphUpdatedSuccessToastMessage.isHidden()).toBeTruthy();
    await this.dashboardPage.clickOnMerkleScienceLogo();
    await this.dashboardPage.verifyWelcomeToTrackerTitleIsVisible();
    await this.dashboardPage.performFileOrFolderSearch(graphName);
    await this.page.locator("//div[contains(text(),'" + graphName.substring(15, 35) + "')]").first().click();
    await this.dashboardPage.openButton.click();
    await this.graphPage.verifyGraphContainerPageIsVisible();
    await this.graphPage.deleteGraphFromBoard(deletedToastMsg);
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * This function is used to rename the graph with view access
   */
  async verifyGraphWithEditOrViewAccess(teamMember: string, dropdownOptions: string, email: string, password: string, graphName: string, expectedText: string) {
    await this.shareGraphToUserWithEditOrViewOption(teamMember, dropdownOptions, expectedText);
    await this.dashboardPage.logoutFromApplication();
    await this.trackerLoginPage.enterEmailAddress(email);
    await this.trackerLoginPage.clickOnContinueButton();
    await this.trackerLoginPage.enterPassword(password);
    await this.trackerLoginPage.clickOnLoginButton();
    await this.dashboardPage.verifyWelcomeToTrackerTitleIsVisible();
    await this.dashboardPage.performFileOrFolderSearch(graphName);
    await this.page.locator("//div[contains(text(),'" + graphName.substring(15, 35) + "')]").first().click();
    await this.dashboardPage.openButton.click();
    await this.page.waitForTimeout(5000);
    await this.graphPage.verifyGraphContainerPageIsVisible();
    if (await this.graphPage.graphDropdown.isHidden()) {
      expect(await this.graphShareIcon.isDisabled()).toBeTruthy();
    }
    else {
      expect(await this.graphShareIcon.isEnabled()).toBeTruthy();
    }
  }

  /**
  * This function is used to click on user profile and logout from application
  */
  async clickUserProfileAndLogout() {
    await this.dashboardPage.userProfileLocator.click();
    await this.dashboardPage.logoutLocator.click();
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * This function is used to relogin and delete the graph name
   */
  async reloginAndDeleteTheGraph(emailAddress: string, password: string, graphName: string, expectedToastMsg: string) {
    await expect(this.trackerLoginPage.loginPageHeader).toBeVisible();
    await this.trackerLoginPage.enterEmailAddress(emailAddress);
    await this.trackerLoginPage.clickOnContinueButton();
    await this.trackerLoginPage.enterPassword(password);
    await this.trackerLoginPage.clickOnLoginButton();
    await this.dashboardPage.verifyWelcomeToTrackerTitleIsVisible();
    await this.dashboardPage.performFileOrFolderSearch(graphName);
    await this.page.locator("//div[contains(text(),'" + graphName.substring(15, 35) + "')]").first().click();
    await this.dashboardPage.openButton.click();
    await this.graphPage.verifyGraphContainerPageIsVisible();
    await this.graphPage.deleteGraphFromBoard(expectedToastMsg);
  }

  /**
   * This function is used to verify duplicate popup contents and perform select and deselect actions on folder
   */
  async verifyDuplicatePopupContentsAndSelectDeselectFolder(newFolder: string) {
    await this.duplicateGraph.click();
    expect(await this.copyToFolder.isVisible()).toBeTruthy();
    expect(await this.duplicatePopupXIcon.isVisible()).toBeTruthy();
    expect(await this.folderSearchBar.isVisible()).toBeTruthy();
    expect(await this.newFolderBtn.isVisible()).toBeTruthy();
    expect(await this.copyBtn.isVisible()).toBeTruthy();
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector("(//div[contains(@class,'foldersContainer')]//span[contains(@class,'text')])[1]", { state: 'visible' });
    await this.folderSearchBar.fill(newFolder);
    await this.searchedFolderName.click();
    expect(this.page.locator('//span[text()="' + newFolder + '"]').isVisible());
    await this.page.waitForTimeout(3000);
    await this.page.locator('//span[text()="' + newFolder + '"]').click();
    await this.page.waitForTimeout(2000);
    expect(this.page.locator('//span[text()="' + newFolder + '"]').isHidden).toBeTruthy();
    await this.page.waitForTimeout(3000);
    await this.duplicatePopupXIcon.click();
    await this.page.waitForTimeout(3000);
    expect(await this.copyToFolder.isHidden()).toBeTruthy();
  }

  /**
   * This function is used to duplicate the graph in existing folder
   */
  async copyGraphToFolderToDuplicateTheGraph(newFolder: string, graphSavedToastMsg: string) {
    await this.graphPage.clickOnGraphDropdown();
    await this.duplicateGraph.click();
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector("(//div[contains(@class,'foldersContainer')]//span[contains(@class,'text')])[1]", { state: 'visible' });
    await this.folderSearchBar.fill(newFolder);
    await this.searchedFolderName.click();
    await this.page.waitForTimeout(3000);
    await this.copyBtn.click();
    await this.graphPage.verifyGraphSavedToastMessage(graphSavedToastMsg);
  }

  /**
   * This function is used to duplicate the graph in newly created folder
   */
  async createFolderAndCopyGraphToFolderToDuplicateTheGraph(folderName: string, graphSavedToastMsg: string, key: string) {
    await this.graphPage.clickOnGraphDropdown();
    await this.duplicateGraph.click();
    await this.page.waitForSelector("(//div[contains(@class,'foldersContainer')]//span[contains(@class,'text')])[1]", { state: 'visible' });
    await this.newFolderBtn.click();
    await this.newFolderTextbox.fill(folderName);
    await this.page.keyboard.press(key);
    await this.page.waitForLoadState('networkidle');
    await this.folderSearchBar.fill(folderName);
    await this.page.waitForLoadState('networkidle');
    await this.searchedFolderName.click();
    await this.copyBtn.click();
    await this.graphPage.verifyGraphSavedToastMessage(graphSavedToastMsg);
  }

  /**
   * This function is used to delete newly created graph and folder
   */
  async deleteNewlyCreatedGraphAndFolder(graph: string, folderName: string, expectedText: string) {
    await this.dashboardPage.clickOnMerkleScienceLogo();
    await this.dashboardPage.performFileOrFolderSearch(graph);
    await this.page
      .locator(
        "//div[contains(@class,'truncate place-content-start') and text()='" + folderName + "']").click();
    await this.page
      .locator(
        "//div[contains(@class,'truncate place-content-start') and text()='" + graph + "']").hover();
    await this.dashboardPage.threeDotsBtn.last().click();
    await this.dashboardPage.deleteBtn.click();
    await this.dashboardPage.deleteFolderConfirmationBtn.click();
    await this.page.waitForTimeout(3000);
    await this.page.locator("//div[contains(@class,'truncate place-content-start') and text()='" + folderName + "']").hover();
    await this.dashboardPage.threeDotsBtn.click();
    await this.dashboardPage.deleteBtn.click();
    await this.dashboardPage.deleteFolderConfirmationBtn.click();
    await this.dashboardPage.filesAndFoldersSearchCloseIcon.click();
    await this.dashboardPage.searchBoardWithoutAccess(folderName, expectedText);
  }

  /**
   * This function is used to verify move popup contents and perform select and deselect actions on folder
   */
  async verifyMovePopupContentsAndSelectDeselectFolder(newFolder: string) {
    await this.moveGraph.click();
    expect(await this.moveToFolder.isVisible()).toBeTruthy();
    expect(await this.duplicatePopupXIcon.isVisible()).toBeTruthy();
    expect(await this.folderSearchBar.isVisible()).toBeTruthy();
    expect(await this.newFolderBtn.isVisible()).toBeTruthy();
    expect(await this.moveBtn.isVisible()).toBeTruthy();
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector("(//div[contains(@class,'foldersContainer')]//span[contains(@class,'text')])[1]", { state: 'visible' });
    await this.folderSearchBar.fill(newFolder);
    await this.searchedFolderName.click();
    expect(this.page.locator('//span[text()="' + newFolder + '"]').isVisible).toBeTruthy();
    await this.page.locator('//span[text()="' + newFolder + '"]').click();
    expect(this.page.locator('//span[text()="' + newFolder + '"]').isHidden).toBeTruthy();
    await this.duplicatePopupXIcon.click();
    await this.page.waitForTimeout(2000);
    expect(await this.moveToFolder.isHidden()).toBeTruthy();
  }

  /**
   * This function is used to move the graph to existing folder
   */
  async moveGraphToFolder(newFolder: string, graphSavedToastMsg: string) {
    await this.graphPage.clickOnGraphDropdown();
    await this.moveGraph.click();
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector("(//div[contains(@class,'foldersContainer')]//span[contains(@class,'text')])[1]", { state: 'visible' });
    await this.folderSearchBar.fill(newFolder);
    await this.searchedFolderName.click();
    await this.page.waitForTimeout(3000);
    await this.moveBtn.click();
    await this.graphPage.verifyGraphMovedSuccessToastMessage(graphSavedToastMsg);
  }

  /**
   * This function is used to move the graph in newly created folder
   */
  async createFolderAndMoveGraphToFolder(folderName: string, graphSavedToastMsg: string, key: string) {
    await this.graphPage.clickOnGraphDropdown();
    await this.moveGraph.click();
    await this.page.waitForSelector("(//div[contains(@class,'foldersContainer')]//span[contains(@class,'text')])[1]", { state: 'visible' });
    await this.newFolderBtn.click();
    await this.newFolderTextbox.fill(folderName);
    await this.page.keyboard.press(key);
    await this.page.waitForLoadState('networkidle');
    await this.folderSearchBar.fill(folderName);
    await this.page.waitForLoadState('networkidle');
    await this.searchedFolderName.click();
    await this.moveBtn.click();
    await this.graphPage.verifyGraphMovedSuccessToastMessage(graphSavedToastMsg);
  }

  /**
   * This function is used to share graph to team member with view access
   */
  async shareGraphToUserWithEditOrViewOption(teamMember: string, dropdownOption: string, expectedText: string) {
    await this.graphShareIcon.click();
    await this.shareBoardTeamMemberSearchBox.fill(teamMember);
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('option', { name: 'aishwarya.prakash@merklescience.com' }).click();
    await this.shareBoardViewEditDropdownIcon.click();
    await this.page.waitForTimeout(1000);
    expect(this.shareEditOption.isVisible).toBeTruthy();
    expect(this.shareViewOption.isVisible).toBeTruthy();
    await this.page.getByText(dropdownOption).first().click();
    await this.shareDialogCloseIcon.click();
    if (await this.shareBoardInvitationSentToastMessage.isVisible()) {
      const actualtext = await this.shareBoardInvitationSentToastMessage.textContent();
      expect(actualtext).toBe(expectedText);
    }
  }

  /**
   * This function is used to verify share board popup contents
   */
  async verifyShareIconContents(ctrlShiftKey: string) {
    await this.graphPage.graphShareIcon.click();
    expect(await this.shareBoardPopup.isVisible()).toBeTruthy();
    expect(await this.shareBoardPopupContent.isVisible()).toBeTruthy();
    expect(await this.shareBoardSearchAndSelectTextbox.isVisible()).toBeTruthy();
    expect(await this.shareBoardPopupEnablePublicAccess.isVisible()).toBeTruthy();
    expect(await this.shareBoardPopupXIcon.isVisible()).toBeTruthy();
    expect(await this.shareBoardPopupCancelBtn.isVisible()).toBeTruthy();
    expect(await this.shareBoardPopupSaveBtn.isVisible()).toBeTruthy();
    await this.shareBoardPopupCancelBtn.click();
    await this.page.waitForTimeout(2000);
    expect(await this.shareBoardPopup.isHidden()).toBeTruthy();
    await this.graphPage.graphShareIcon.click();
    await this.shareBoardPopupXIcon.click();
    await this.page.waitForTimeout(2000);
    expect(await this.shareBoardPopup.isHidden()).toBeTruthy();
    await this.page.keyboard.press(ctrlShiftKey);
    await this.shareBoardPopupXIcon.click();
    await this.page.waitForTimeout(2000);
    expect(await this.shareBoardPopup.isHidden()).toBeTruthy();
  }

  /**
   * This function is used to delete team member in share board popup contents
   */
  async deleteTeamMemberInShareBoardPopup(teamMember: string) {
    await this.graphShareIcon.click();
    await this.shareBoardTeamMemberSearchBox.fill(teamMember);
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('option', { name: 'aishwarya.prakash@merklescience.com' }).click();
    expect(this.shareBoardDeleteIcon.isVisible).toBeTruthy();
    await this.shareBoardDeleteIcon.click();
    await this.shareBoardDeleteConfirmBtn.click();
    await this.page.waitForTimeout(3000);
    expect(await this.shareBoardViewEditDropdownIcon.isHidden()).toBeTruthy();
    await this.shareBoardPopupXIcon.click();
  }

  /**
   * This function is used to verify graph updated success toast message
   */
  async verifyGraphUpdatedSuccessToastMsg(expectedText: string) {
    const actualtext = await this.shareGraphPermissionToastMsg.textContent();
    expect(actualtext).toBe(expectedText);
  }

  /**
   * This function is used to shared graph url, enable toggle, click on save button and verify the toast message
   */
  async verifySharedGraphURLAndEnablePasswordProtectToggle(expectedText: string, passwordText: string) {
    await this.graphShareIcon.click();
    expect(this.shareBoardPopupEnablePublicAccess.isVisible).toBeTruthy();
    expect(this.shareBoardPopupEnablePublicAccess.isDisabled).toBeTruthy();
    await this.shareBoardPopupEnablePublicAccess.click();
    expect(this.shareGraphLink.isVisible).toBeTruthy();
    expect(this.shareBoardEnablePasswordProtectToggle.isVisible).toBeTruthy();
    const sharedLink: string | null = await this.shareGraphLink.getAttribute("value");
    expect(sharedLink).toContain("shared");
    await this.shareBoardPopupSaveBtn.click();
    await this.verifyGraphUpdatedSuccessToastMsg(expectedText)
    await this.graphShareIcon.click();
    await this.enablePasswordProtectToggleAndEnterPassword(passwordText);
    await this.shareBoardPopupSaveBtn.click();
    await this.verifyGraphUpdatedSuccessToastMsg(expectedText)

    return sharedLink;
  }

  /**
   * This function is used to enable password protected toggle and enter password
   */
  async enablePasswordProtectToggleAndEnterPassword(passwordText: string) {
    await this.shareBoardEnablePasswordProtectToggle.click();
    await this.shareGraphPasswordTextField.fill(passwordText);
  }

  /**
   * This function is used to enable toggle, enter password and click on cancel button and X icon in popup
   */
  async enablePasswordProtectToggleAndClickOnCancelBtn(passwordText: string) {
    await this.graphShareIcon.click();
    await this.shareBoardPopupEnablePublicAccess.click();
    await this.enablePasswordProtectToggleAndEnterPassword(passwordText);
    await this.shareBoardPopupCancelBtn.click();
    await this.page.waitForTimeout(2000);
    expect(await this.shareBoardPopup.isVisible()).toBeFalsy();
    await this.graphShareIcon.click();
    expect(this.shareGraphPasswordTextField.isHidden).toBeTruthy();
    await this.shareBoardPopupEnablePublicAccess.click();
    await this.enablePasswordProtectToggleAndEnterPassword(passwordText);
    await this.shareBoardPopupXIcon.click();
    await this.page.waitForTimeout(2000);
    expect(await this.shareBoardPopup.isVisible()).toBeFalsy();
  }

  /**
   * This function is used to enable and disable toggle and click on save button
   */
  async disablePublicAccessAndPasswordProtectedToggle(expectedText: string) {
    await this.graphShareIcon.click();
    await this.shareBoardPopupEnablePublicAccess.click();
    expect(this.shareBoardPopupEnablePublicAccess.isEnabled).toBeTruthy();
    await this.shareBoardPopupSaveBtn.click();
    await this.verifyGraphUpdatedSuccessToastMsg(expectedText)
    await this.graphShareIcon.click();
    await this.shareBoardEnablePasswordProtectToggle.click();
    expect(this.shareBoardPopupEnablePublicAccess.isEnabled).toBeTruthy();
    expect(this.shareBoardPopupSaveBtn.isDisabled).toBeTruthy();
    await this.shareBoardEnablePasswordProtectToggle.click();
    expect(this.shareBoardEnablePasswordProtectToggle.isDisabled).toBeTruthy();
    await this.shareBoardPopupEnablePublicAccess.click();
    expect(this.shareBoardPopupEnablePublicAccess.isDisabled).toBeTruthy();
    await this.shareBoardPopupSaveBtn.click();
    await this.verifyGraphUpdatedSuccessToastMsg(expectedText)
  }

  /**
   * This function is used to enable drag/selection mode
   */
  async enableDragOrSelectionMode() {
    await this.page.waitForLoadState("networkidle");
    const toolTipText = await this.page.locator("//button[contains(@data-tooltip-html,'Enable') and contains(@class,'active')]").getAttribute("data-tooltip-html");
    if (toolTipText?.includes("Drag"))
      await this.selectionMode.click();
    else
      await this.dragMode.click();
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to delete selected items
   */
  async clickOnDeleteSelectedItems() {
    await this.page.waitForLoadState("networkidle");
    if (await this.deleteSelectedItems.isVisible())
      await this.deleteSelectedItems.click();
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to select node and cluster
   */
  async selectNodeCommentCluster(digitalAsset: string) {
    await this.graphPage.fitIcon.click();
    await this.page.waitForTimeout(2000);
    const positions: any = await this.page.evaluate('window.getFinalViewPositions()');
    for (let i = 0; i < Object.keys(positions).length; i++) {
      const nodePosition = Object.keys(positions)[i];
      let responseNodeKey = nodePosition.split('-');
      if (digitalAsset.includes(responseNodeKey[0])) {
        const { x, y } = positions[nodePosition];
        await this.graphPage.graphTitle.click();
        await this.graphPage.canvas.click({
          //position of the node
          modifiers: ['Control'],
          position: {
            x: x,
            y: y,
          },
        });
        await this.page.waitForTimeout(3000);
      }
    }
  }

  /**
   * This function is used to delete the selected node and cluster
   */
  async deleteTheSelectedNodeAndCluster(digitalAsset: string) {
    await this.graphPage.fitIcon.click();
    await this.selectNodeCommentCluster(digitalAsset);
    await this.deleteSelectedItems.click();
  }

  /**
   * This function is used to right click on node
   */
  async rightClickOnNode(expectedAddress: string, digitalAsset: string) {
    await this.graphPage.fitIcon.click();
    await this.page.waitForTimeout(2000);
    const positions: any = await this.page.evaluate('window.getFinalViewPositions()');
    for (let i = 0; i < Object.keys(positions).length; i++) {
      const nodePosition = Object.keys(positions)[i];
      let responseNodeKey = nodePosition.split('-');

      if (expectedAddress.includes(responseNodeKey[1]) && digitalAsset.includes(responseNodeKey[0])) {
        const { x, y } = positions[nodePosition];
        await this.graphPage.graphTitle.click();
        await this.graphPage.canvas.click({
          //position of the node
          button: 'right',
          position: {
            x: x,
            y: y,
          },
        });
        await this.page.waitForTimeout(3000);
      }
    }
  }


  /**
  * This function is used to right click on cluster
  */
  async rightClickOnCluster(expectedAddress: string, digitalAsset: string) {
    await this.graphPage.fitIcon.click();
    await this.page.waitForTimeout(2000);
    const positions: any = await this.page.evaluate('window.getFinalViewPositions()');
    for (let i = 0; i < Object.keys(positions).length; i++) {
      const nodePosition = Object.keys(positions)[i];
      let responseNodeKey = nodePosition.split('-');

      if (expectedAddress.includes(responseNodeKey[1]) && digitalAsset.includes(responseNodeKey[0])) {
        const { x, y } = positions[nodePosition];
        await this.graphPage.graphTitle.click();
        await this.graphPage.canvas.click({
          //position of the node
          button: 'right',
          position: {
            x: x + 3,
            y: y + 60,
          },
        });
        await this.page.waitForTimeout(3000);
      }
    }
  }

  /**
  * This function is used to click on toggle show preferences
  */
  async addAnnotateCommentAndSave(commentName: string) {
    await this.annotateComment.click();
    expect(await this.addCommentDialog.isVisible()).toBeTruthy();
    await this.commentTextBox.fill(commentName);
    await this.shareBoardPopupSaveBtn.click();
  }

  /**
   * This function is used to click on toggle show preferences
   */
  async clickOnToggleShowPreferences() {
    if (await this.toggleShowPreferences.isVisible())
      await this.toggleShowPreferences.click();
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to verify toggle show preferences with hotkeys
   */
  async verifyToggleShowPreferencesWithHotkey(preference: string, key: string) {
    const locator = this.page.locator("//span[contains(text(),'" + preference + "')]/../parent::div/..//button");
    await this.page.keyboard.press(key);
    expect(locator.isVisible()).toBeTruthy();
    await this.page.keyboard.press(key);
    expect(locator.isHidden()).toBeTruthy();
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to enable/disable specified toggle show preferences
   */
  async enableDisableToggleShowPreferences(preference: string) {
    await this.clickOnToggleShowPreferences();
    const locator = this.page.locator("//span[contains(text(),'" + preference + "')]/../parent::div/..//button");
    if (await locator.isVisible())
      await locator.click();
    await this.page.waitForTimeout(3000);
    await this.clickOnToggleShowPreferences();
  }

  /**
   * This function is used to click on toggle show legends and verify the content
   */
  async clickOnToggleShowLegendsAndVerifyTheContent(key: string) {
    if (await this.toggleShowLegends.isVisible())
      await this.page.keyboard.press(key);
    expect(await this.toggleShowLegendsPopup.isVisible()).toBeTruthy();
    await this.toggleShowLegends.click();
    await this.page.waitForTimeout(2000);
    expect(await this.toggleShowLegendsPopup.isHidden()).toBeTruthy();
    await this.page.keyboard.press(key);
    await this.page.waitForTimeout(3000);
    expect(this.page.locator("//div/p[contains(text(),'Node Types')]").isVisible()).toBeTruthy();
    expect(this.page.locator("//div/p[contains(text(),'Known and Unknown Entities')]").isVisible()).toBeTruthy();
    expect(this.page.locator("//div/p[contains(text(),'Entities and color codes')]").isVisible()).toBeTruthy();
    expect(this.page.locator("//div/p[contains(text(),'Address Balance')]").isVisible()).toBeTruthy();
    expect(this.page.locator("//div/p[contains(text(),'Glyphs on Address Nodes')]").isVisible()).toBeTruthy();
    await this.graphPage.canvas.click({
      //position of the node
      position: {
        x: 129,
        y: 212
      }
    });
    await this.page.waitForTimeout(3000);
    expect(await this.toggleShowLegendsPopup.isHidden()).toBeTruthy();
  }

  /**
   * This function is used to click on toggle fullScreen and verify the visibility
   */
  async clickOnToggleFullScreenAndVerifyTheVisibilityOfFullscreen(ctrlKey: string, enterKey: string) {
    const toggleFullScreenStatus = this.page.locator("//button[contains(@class,'active') and contains(@data-tooltip-html,'Toggle Fullscreen<br/>Ctrl + Shift +')]");
    expect(await this.toggleFullScreen.isVisible());
    await this.toggleFullScreen.click();
    await this.page.waitForTimeout(2000);
    expect(await toggleFullScreenStatus.isVisible()).toBeTruthy();
    await this.toggleFullScreen.click();
    await this.page.waitForTimeout(2000);
    expect(await toggleFullScreenStatus.isHidden()).toBeTruthy();
    await this.page.keyboard.press(ctrlKey);
    await this.page.waitForTimeout(2000);
    expect(await toggleFullScreenStatus.isVisible()).toBeTruthy();
    await this.page.keyboard.press(ctrlKey);
    await this.page.waitForTimeout(3000);
    expect(await toggleFullScreenStatus.isHidden()).toBeTruthy();
    await this.toggleFullScreen.click();
    await this.page.keyboard.press(enterKey);
    await this.page.waitForTimeout(4000);
    expect(await toggleFullScreenStatus.isHidden()).toBeTruthy();
  }

  /**
  * This function is used to merge and unmerge created super cluster
  */
  async createSuperClusterAndMergeAndUnmergeSuperCluster(clusterName: string, digitalAsset: string, useHotKey: boolean, ctrlGKey: string, ctrlShiftKey: string) {
    await this.createSuperCluster.click();
    expect(this.newClusterPopup.isVisible()).toBeTruthy();
    await this.page.keyboard.press(ctrlGKey);
    expect(this.newClusterPopup.isHidden()).toBeTruthy();
    await this.createSuperCluster.click();
    await this.superClusterTextbox.fill(clusterName);
    await this.saveNameBtn.click();
    await this.selectNodeCommentCluster(digitalAsset);
    if (useHotKey) {
      await this.page.keyboard.press(ctrlShiftKey);
      await this.graphPage.fitIcon.click();
    }
    else {
      await this.unmergeCluster.click();
      await this.graphPage.fitIcon.click();
    }
  }

  /**
   * This function is used to download, validate and delete SVG file
   */
  async validatingDownloadedSVG(ctrlShiftKey: string, useHotKey: boolean) {
    if (useHotKey) {
      const downloadPromise = this.page.waitForEvent('download');
      await this.page.keyboard.press(ctrlShiftKey);
      const download = await downloadPromise;
      const homeDir = os.homedir();
      const userDir = path.join(homeDir, 'Downloads\\');
      const fileName = download.suggestedFilename();
      await download.saveAs(userDir + fileName);
      console.log("File downloaded successfully");
      await this.page.waitForTimeout(5000);
      const filePath = userDir + fileName;
      expect(filePath.includes(fileName)).toBeTruthy();
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${filePath}`);
      } else {
        console.log(`File not found: ${filePath}`);
      }
      await this.page.waitForTimeout(3000);
    }
    else {
      const downloadPromise = this.page.waitForEvent('download');
      await this.downloadGraphSVG.click();
      const download = await downloadPromise;
      const homeDir = os.homedir();
      const userDir = path.join(homeDir, 'Downloads\\');
      const fileName = download.suggestedFilename();
      await download.saveAs(userDir + fileName);
      console.log("File downloaded successfully");
      await this.page.waitForTimeout(5000);
      const filePath = userDir + fileName;
      expect(filePath.includes(fileName)).toBeTruthy();
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${filePath}`);
      } else {
        console.log(`File not found: ${filePath}`);
      }
      await this.page.waitForTimeout(3000);
    }
  }

  /**
   * This function is used to drag and drop nodes
   */
  async dragAndDropNodes(expectedAddress: string, digitalAsset: string) {
    await this.graphPage.fitIcon.click();
    await this.page.waitForTimeout(2000);
    const positions: any = await this.page.evaluate('window.getFinalViewPositions()');
    for (let i = 0; i < Object.keys(positions).length; i++) {
      const nodePosition = Object.keys(positions)[i];
      let responseNodeKey = nodePosition.split('-');
      if (expectedAddress.includes(responseNodeKey[1]) && digitalAsset.includes(responseNodeKey[0])) {
        const { x, y } = positions[nodePosition];
        await this.graphPage.graphTitle.click();
        await this.graphPage.canvas.hover({
          //position of the node
          position: {
            x: x,
            y: y,
          },
          force: true
        });
        await this.page.mouse.down();
        await this.page.waitForTimeout(2000);
        await this.graphPage.canvas.hover({
          //position of the node
          position: {
            x: x,
            y: y + 130,
          },
          force: true
        });
        await this.page.mouse.up();
        await this.page.waitForTimeout(5000);
      }
    }
  }

  /**
   * This function is used verify delete graph popup and click on popup buttons
   */
  async performDeleteActions(deletedToastMsg: string) {
    await this.graphPage.graphDropdown.click();
    await this.deleteGraph.click();
    await this.page.waitForTimeout(3000);
    expect(await this.deleteGraphPopupHeader.isVisible()).toBeTruthy();
    expect(await this.dashboardPage.deleteCancelBtn.isVisible()).toBeTruthy();
    expect(await this.dashboardPage.deleteXIcon.isVisible()).toBeTruthy();
    expect(await this.graphPage.deletePopupDeleteButton.isVisible()).toBeTruthy();
    await this.dashboardPage.deleteCancelBtn.click();
    await this.graphPage.graphDropdown.click();
    await this.deleteGraph.click();
    await this.dashboardPage.deleteXIcon.click();
    await this.graphPage.deleteGraphFromBoard(deletedToastMsg);
  }

  /**
   * This function is used verify perform random click on canvas
   */
  async performRandomClickOnCanvas() {
    await this.graphPage.canvas.click({
      position: {
        //Random Position
        x: 30,
        y: 13,
      },
      force: true
    });
    await this.page.waitForTimeout(5000);
  }

  /**
   * This function is used verify perform random click on canvas
   */
  async clickOnUndoBtn() {
    await this.undoButton.click();
  }

  /**
   * This function is used to click on transaction link
   */
  async clickOnTransactionLink() {
    await this.page.waitForTimeout(3000);
    await this.graphPage.canvas.click({
      //position of the node
      position: {
        x: 618,
        y: 242,
      },
    });
  }

  /**
   * This function is used to enable asset ot usd link
   */
  async clickAssetOrUSDLink() {
    const toolTipText = await this.page.locator("//button[contains(@data-tooltip-html,'Show') and contains(@class,'active')]").getAttribute("data-tooltip-html");
    if (toolTipText?.includes("Asset"))
      await this.assetLinks.click();
    else
      await this.usdLinks.click();
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to verify currency toggle values
   */
  async verifyCurrencyToggleValues(expectedText: string) {
    //  expect(await this.detailsPanelPage.detailsPanelContainer.isVisible()).toBeTruthy();
    expect(await this.detailsPanelCurrencyToggleValue.textContent()).toBe(expectedText);
  }

  /**
   * This function is used to verify annotate popup
   */
  async verifyAnnotatePopup(expectedAddress: string, digitalAsset: string, useHotKey: boolean, ctrlShiftKey: string) {
    if (useHotKey) {
      await this.page.keyboard.press(ctrlShiftKey);
      await this.detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(expectedAddress, digitalAsset);
      expect(this.annotateDialog.isVisible).toBeTruthy();
    }
    else {
      await this.annotateButton.click();
      await this.detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(expectedAddress, digitalAsset);
      expect(this.annotateDialog.isVisible).toBeTruthy();
    }
  }

  /**
   * This function is used copy shared graph link from shared board popup(without password)
   */
  async copyGraphLinkInSharePopup(expectedText: string) {
    await this.graphPage.graphShareIcon.click();
    await this.shareBoardPopupEnablePublicAccess.click();
    const sharedGraphLink: string | null = await this.shareGraphLink.getAttribute("value");
    await this.shareBoardPopupSaveBtn.click();
    console.log("Shared link: " + sharedGraphLink);
    await this.verifyGraphUpdatedSuccessToastMsg(expectedText)

    return sharedGraphLink;
  }

  /**
   * This function is used to click on node in shared link and verify the details panel container
   */
  async clickOnNodeAndVerifyDetailsPanel(expectedAddress: string, digitalAsset: string) {
    await this.detailsPanelPage.clickOnSpecifiedAddressOnTheBoard(expectedAddress, digitalAsset)
    await this.page.waitForTimeout(5000);
    expect(await this.detailsPanelPage.detailsPanelContainer.isVisible()).toBeTruthy();
  }

  /**
   * This function is used copy shared graph link in shared board popup (with password)
   */
  async copyGraphLinkWithPasswordInSharePopup(expectedText: string, passwordText: string) {
    await this.graphPage.graphShareIcon.click();
    await this.shareBoardPopupEnablePublicAccess.click();
    await this.enablePasswordProtectToggleAndEnterPassword(passwordText);
    const sharedGraphLink: string | null = await this.shareGraphLink.getAttribute("value");
    await this.shareBoardPopupSaveBtn.click();
    console.log("Shared link: " + sharedGraphLink);
    await this.verifyGraphUpdatedSuccessToastMsg(expectedText);

    return sharedGraphLink;
  }

  /**
   * This function is used to enter password in password dailog and click on submit button
   */
  async enterPasswordInSharedGraphLink(expectedAddress: string, digitalAsset: string, passwordText: string) {
    await this.page.waitForTimeout(3000);
    expect(await this.sharedBoardEnterPasswordDialog.isVisible()).toBeTruthy();
    await this.sharedBoardPasswordDialogPasswordTextField.fill(passwordText);
    await this.sharedBoardPasswordDialogSubmitBtn.click();
    await this.clickOnNodeAndVerifyDetailsPanel(expectedAddress, digitalAsset)
  }

  /**
   * This function is used to verify error page contents
   */
  async openSharedGraphVerifyPageAfterDeletingTheGraph() {
    await this.page.waitForTimeout(5000);
    expect(await this.page.getByRole('heading', { name: 'Ooops! That didn\'t go as' }).isVisible()).toBeTruthy()
    expect(await this.backToHomeBtn.isVisible()).toBeTruthy();
  }

  /**
   * This function is used to verify use sequencial/organic layout
   */
  async verifySequencialOrOrganicLayout() {
    await this.page.waitForTimeout(3000);
    expect(await this.page.locator("//button[contains(@class,'text-white hover') and contains(@data-tooltip-html,'Use sequential layout')]").isVisible()).toBeTruthy();
    await this.useOrganicLayout.click();
    await this.page.waitForTimeout(3000);
    expect(await this.page.locator("//button[contains(@class,'text-white hover') and contains(@data-tooltip-html,'Use sequential layout')]").isHidden()).toBeTruthy();
    expect(await this.page.locator("//button[contains(@class,'text-white hover') and contains(@data-tooltip-html,'Use organic layout')]").isVisible()).toBeTruthy();
  }

  /**
   * This function is used to get Canvas size
   */
  async getCanvasSize() {
    const boundingBox = await this.graphPage.canvas.boundingBox();
    return boundingBox;
  }

  /**
   * This function is used to click on zoom in button
   */
  async clickZoomIn(useHotKey: boolean) {
    if (useHotKey) {
      await this.page.keyboard.press('Control+=');
      await this.page.keyboard.press('Control+=');
    }
    else {
      await this.zoomInBtn.click();
    }
    await this.page.waitForTimeout(2000);
  }

  /**
   * This function is used to click on zoom out button
   */
  async clickZoomOut(useHotKey: boolean) {
    if (useHotKey) {
      await this.page.keyboard.press("Control+Minus");
      await this.page.keyboard.press("Control+Minus");
    }
    else {
      await this.zoomOutBtn.click();
    }
    await this.page.waitForTimeout(2000);
  }

  /**
   * This function is used to click on fit icon button
   */
  async clickFitIcon(useHotKey: boolean) {
    if (useHotKey) {
      await this.page.keyboard.press("Control+F");
    }
    else {
      await this.graphPage.fitIcon.click();
    }
    await this.page.waitForTimeout(2000);
  }

  /**
   * This function is used to verify board icons data tooltip messages
   */
  async verifyBoardIconsDataTooltipMessages() {
    await this.page.waitForTimeout(2000);
    expect(await this.fixAllNodesInCurrentPosition.isVisible()).toBeTruthy();
    expect(await this.useSequencialLayout.isVisible()).toBeTruthy();
    expect(await this.useOrganicLayout.isVisible()).toBeTruthy();
    expect(await this.zoomOutBtn.isVisible()).toBeTruthy();
    expect(await this.zoomInBtn.isVisible()).toBeTruthy();
    expect(await this.fitBtn.isVisible()).toBeTruthy();
    expect(await this.assetLinks.isVisible()).toBeTruthy();
    expect(await this.undoButton.isVisible()).toBeTruthy();
    expect(await this.redoButton.isVisible()).toBeTruthy();
    expect(await this.deleteSelectedItems.isVisible()).toBeTruthy();
    expect(await this.createSuperCluster.isVisible()).toBeTruthy();
    expect(await this.dragMode.isVisible()).toBeTruthy();
    expect(await this.selectionMode.isVisible()).toBeTruthy();
    expect(await this.toggleShowLegends.isVisible()).toBeTruthy();
    expect(await this.toggleFullScreen.isVisible()).toBeTruthy();
    expect(await this.toggleShowPreferences.isVisible()).toBeTruthy();
    expect(await this.downloadGraphSVG.isVisible()).toBeTruthy();
    expect(await this.annotateButton.isVisible()).toBeTruthy();
    expect(await this.graphShareIcon.isVisible()).toBeTruthy();
    await this.page.waitForTimeout(2000);
  }
}