import { FrameLocator, Locator, Page, expect } from "@playwright/test";
import { GraphPage } from "../graph-pages/graph-page";
import { TrackerLoginPage } from "../login-pages/login-page";
import { BasePage } from "../utilities-pages/base-pages";
import { DetailsPanelPage } from "../graph-pages/details-panel-page";

export class TrackerDashboardPage {
  readonly page: Page;
  graphPage: GraphPage;
  loginPage: TrackerLoginPage;
  detailsPanelPage: DetailsPanelPage;
  readonly randomString: string;
  readonly graphName: string;
  readonly welcomeMessageLocator: Locator;
  readonly userProfileLocator: Locator;
  readonly logoutLocator: Locator;
  readonly addToBoardButton: Locator;
  readonly saveButton: Locator;
  readonly saveAs: Locator;
  readonly trackerLogo: Locator;
  readonly filesAndFolders: Locator;
  readonly trackerMerkelScienceLogo: Locator;
  readonly searchForAddress: Locator;
  readonly searchAddressClearButton: Locator;
  readonly searchPlaceHolderText: Locator;
  readonly addAllToBoard: Locator;
  readonly merkleScienceLogo: Locator;
  readonly closeButton: Locator;
  readonly loginPageHeader: Locator;
  readonly signInUser: Locator;
  readonly dashboardBoardsGrid: Locator;
  readonly openButton: Locator;
  readonly recentBoard: Locator;
  readonly moreDetails: Locator;
  readonly openBoard: Locator;
  readonly sharedLink: Locator;
  readonly sharedLinkText: Locator;
  readonly closeIcon: Locator;
  readonly createdBy: Locator;
  readonly createdOn: Locator;
  readonly lastModifiedOn: Locator;
  readonly graphPreview: Locator;
  readonly previewBoardName: Locator;
  readonly previewBackBtn: Locator;
  readonly addNewWorkspaceText: Locator;
  readonly searchFilesAndFolders: Locator;
  readonly newFolderBtn: Locator;
  readonly newWorkspace: Locator;
  readonly newFolderName: string;
  readonly threeDotsBtn: Locator;
  readonly renameBtn: Locator;
  readonly deleteBtn: Locator;
  readonly plusIcon: Locator;
  readonly newFolderInsidePlusIcon: Locator;
  readonly newBoardInsidePlusIcon: Locator;
  readonly deleteFolderConfirmationBtn: Locator;
  readonly filesAndFoldersSearchCloseIcon: Locator;
  readonly support: Locator;
  readonly supportedDigitalAssets: Locator;
  readonly settings: Locator;
  readonly signedInAs: Locator;
  readonly profileSettingsText: Locator;
  readonly supportedDigitalAssetsFrame: Locator;
  readonly supportFrame: FrameLocator;
  readonly leaveUsaMessageFrame: FrameLocator;
  readonly searchDigitalAssets: Locator;
  readonly filterBy: Locator;
  readonly tokenName: Locator;
  readonly blockChains: Locator;
  readonly token: Locator;
  readonly board: Locator;
  readonly boardNameText: Locator;
  readonly appLogo: Locator;
  readonly menuIcon: Locator;
  readonly compass: Locator;
  readonly kybb: Locator;
  readonly filterBySelectAll: Locator;
  readonly showSelected: Locator;
  readonly hideSelected: Locator;
  readonly reset: Locator;
  readonly apply: Locator;
  public tokenNameValues;
  readonly blockchains: Locator;
  public blockchainsValues;
  readonly filterByUnselectAll: Locator;
  readonly blockchainValue: Locator;
  readonly watchedTab: Locator;
  readonly recentTabGraph: Locator;
  readonly recentTabGraphName: Locator;
  readonly recentTabCurrencies: Locator;
  readonly recentTabEditedTime: Locator;
  readonly recentTabMoreDetailsPreviewPopup: Locator;
  readonly searchAddresses: Locator;
  readonly searchAddress: Locator;
  readonly searchBlockChain: Locator;
  readonly searchDeleteIcon: Locator;
  readonly searchAddToBoardPlusIcon: Locator;
  readonly searchCloseButtonTooltip: Locator;
  readonly searchAddToBoardButtonTooltip: Locator;
  readonly searchAddAllToBoardButtonTooltip: Locator;
  readonly searchTransactions: Locator;
  readonly searchTransactionhash: Locator;
  readonly searchTransactionBlockChain: Locator;
  readonly searchTransactionValue: Locator;
  readonly searchTransactionFees: Locator;
  readonly searchTransactionTime: Locator;
  readonly alreadyAdded: Locator;
  readonly folderAlreadyExistsToastMessage: Locator;
  readonly newBoardNameTextField: Locator;
  readonly newBoardBtn: Locator;
  readonly boardOpenBtn: Locator;
  readonly boardAlreadyExistsToastMessage: Locator;
  readonly folderContainsFoldersOrBoardsToastMessage: Locator;
  readonly deleteXIcon: Locator;
  readonly deleteCancelBtn: Locator;
  readonly graphOpenIcon: Locator;
  readonly userDoNotHaveAccessToastMessage: Locator;
  readonly entityName: Locator;
  readonly entityType: Locator;
  readonly filesAndFoldersExpandIcon: Locator;
  readonly recentTabModifyBtn: Locator;
  readonly recentTabRemoveAddressFromWatchlistBtn: Locator;
  readonly updateWatchlistCloseBtn: Locator;
  readonly sharedWatchlistTab: Locator;

  constructor(page: Page) {
    this.page = page;

    this.userProfileLocator = page.locator(
      "(//div[@role='menuitem']//button)[2]"
    );
    this.logoutLocator = page.locator("//button[text()='Log out']");
    this.addToBoardButton = page.locator("[data-tooltip-html='Add to board']");
    this.saveButton = page.locator("//button[text()='Save']");
    this.saveAs = page.locator("[id='graph-name-input']");
    this.trackerLogo = page.locator("[src='/assets/Tracker-9edde7e2.svg']");
    this.dashboardBoardsGrid = page.locator("//div[contains(@class,'grid-cols-3')]");
    this.filesAndFolders = page.locator(
      "[class='flex flex-row justify-between w-full']"
    );
    this.trackerMerkelScienceLogo = page.locator(
      'img[alt="merklescience-logo"]'
    );
    this.welcomeMessageLocator = page.locator(
      '//div[contains(text(),"Welcome to Tracker")]'
    );
    this.searchForAddress = page.getByPlaceholder("Search for an address,");
    this.searchAddressClearButton = page.locator("//div[contains(@class,'placeholder')]//following-sibling::*[name()='svg']");
    this.closeButton = page.getByRole("button", { name: "Close" });
    this.openButton = page.locator("//button[text()='Open']");

    this.addAllToBoard = page.getByRole("button", { name: "Add all to board" });
    this.merkleScienceLogo = page.getByRole("link", {
      name: "merklescience-logo",
    });
    this.loginPageHeader = page.locator(
      "[class*='text-xl-semibold text-center']"
    );
    this.signInUser = page.locator("[class*='text-sm font-medium text']");
    this.recentBoard = page
      .locator(
        "//div[contains(@class,'relative group flex flex-col bg-white border')]"
      )
      .first();
    this.moreDetails = page.locator("//button[.='More details']").first();
    this.openBoard = page.locator("//button[.='Open board']").first();
    this.sharedLink = page.locator("(//div[.='Shared link']/../div/div)[1]");
    this.sharedLinkText = page
      .locator("//div[contains(.,'https://tracker')]")
      .last();
    this.closeIcon = page.locator("//button[.='Close']");
    this.createdBy = page.locator("//div[.='CREATED BY']/../div").last();
    this.createdOn = page.locator("//div[.='CREATED ON']/../div").last();
    this.lastModifiedOn = page
      .locator("//div[.='LAST MODIFIED ON']/../div")
      .last();
    this.graphPreview = page.locator('[alt="Graph preview"]');
    this.previewBoardName = page.locator("//button[.='Open']/../div/div");
    this.previewBackBtn = page.locator(
      "[class*='text-gray-700 cursor-pointer']"
    );
    this.addNewWorkspaceText = page
      .locator("//div[.='Add a new workspace to organize your boards']")
      .last();
    this.searchFilesAndFolders = page.locator(
      '[placeholder="FILES AND FOLDERS"]'
    );
    this.newFolderBtn = page.locator("//div[.='New Folder']");
    this.newWorkspace = page.locator('[placeholder="New workspace"]');
    this.threeDotsBtn = page.locator(
      '[class="cursor-pointer z-10 text-blue-600"]'
    );
    this.renameBtn = page.locator("(//div[.='Rename'])[1]");
    this.deleteBtn = page.locator("(//div[.='Delete'])[1]");
    this.plusIcon = page.locator(
      '[class="cursor-pointer z-10 group text-blue-600"]'
    );
    this.newFolderInsidePlusIcon = page.locator("(//div[.='New Folder'])[1]");
    this.newBoardInsidePlusIcon = page.locator("(//div[.='New Board'])[1]");
    this.deleteFolderConfirmationBtn = page.locator(
      "//button[contains(@class,'irreversibleBtn')]"
    );
    this.filesAndFoldersSearchCloseIcon = page.locator(
      "//*[contains(@class,'absolute bottom')]"
    );
    this.support = page.locator("//button[.='Support']").first();
    this.supportedDigitalAssets = page.locator(
      "//button[.='Supported Digital Assets']"
    );
    this.settings = page.locator("//a[.='Settings']");
    this.signedInAs = page.locator("//p[.='Signed in as']");
    this.profileSettingsText = page.locator("//h3[.='Profile Settings']");
    this.supportedDigitalAssets = page.locator(
      "//button[.='Supported Digital Assets']"
    );
    this.supportedDigitalAssetsFrame = page.locator(
      '[class*="flex h-full flex-col "]'
    );
    this.support = page.locator("//button[.='Support']").first();
    this.leaveUsaMessageFrame = page.frameLocator(
      "//h1[.='Leave us a message']"
    );
    this.supportFrame = page.frameLocator(
      'iframe[title="Find more information here"]'
    );
    this.searchDigitalAssets = page.locator('[id="tokenNameFilterInput"]');
    this.filterBy = page.locator("//button[.='Filter by']");
    this.tokenName = page.locator("//span[.='TOKEN NAME']");
    this.blockChains = page.locator("//span[.='BLOCKCHAINS']");
    this.board = page.locator("//div[contains(@class,'relative group')]");
    this.token = page.locator(
      '//img[@alt="TokenImage"]/following-sibling::span[@class="text-xs-medium text-gray-800"]'
    );
    this.boardNameText = page.locator(
      "//div[contains(@class,'font-bold mb') and contains(@class,'text-gray')]"
    );
    this.appLogo = page.locator('[alt="merklescience-logo"]');
    this.menuIcon = page.locator('//button[@aria-haspopup="menu"]');
    this.compass = page.locator("//span[text()='COMPASS']");
    this.kybb = page.locator("//span[text()='KYBB']");
    this.filterBySelectAll = page.locator("//div[.='Select All']");
    this.showSelected = page.locator("//div[.='Show Selected']");
    this.hideSelected = page.locator("//div[.='Hide Selected']");
    this.reset = page.locator("//button[.='Reset']");
    this.apply = page.locator("//button[.='Apply']");
    this.blockchains = page.locator(
      '//img[@alt="BlockchainLogoImage"]/following-sibling::span[@class="text-xs-medium text-gray-800"]'
    );
    this.filterByUnselectAll = page.locator("//div[.='Unselect All']");
    this.blockchainValue = page
      .locator(
        "//div[contains(@class,'flex flex-row justify-start items-center gap')]"
      )
      .first();
    this.watchedTab = page.locator("//span[text()='WATCHED BY ME']");
    this.recentTabGraph = page.locator(
      '(//img[@class="h-full object-cover"])[1]'
    );
    this.recentTabCurrencies = page.locator(
      '(//img[@class="h-full object-cover"]/..//following-sibling::div/div)[1]'
    );
    this.recentTabEditedTime = page.locator(
      '(//img[@class="h-full object-cover"]/..//following-sibling::div/div[3])[1]'
    );
    this.recentTabGraphName = page.locator(
      '(//img[@class="h-full object-cover"]/..//following-sibling::div/div[2])[1]'
    );
    this.recentTabMoreDetailsPreviewPopup = page
      .locator("(//div[contains(@class,'overflow-y-auto')])")
      .last();
    this.searchPlaceHolderText = page.locator('//input[@placeholder="Search for an address, transaction or paste a hash..."]');
    this.searchAddresses = page.locator("//div[contains(text(),'Addresses')]/../div").last();
    this.searchAddress = page.locator("//div[contains(text(),'ADDRESS')]/../div").last();
    this.searchBlockChain = page.locator("//div[contains(text(),'blockchain')]/../span");
    this.searchDeleteIcon = page.locator('//button[@data-tooltip-html="Remove from search list"]');
    this.searchAddToBoardPlusIcon = page.locator('//button[@data-tooltip-html="Remove from search list"]//following-sibling::button');
    this.searchCloseButtonTooltip = page.locator('//button[@data-tooltip-html="Close Panel"] | //button[@data-tooltip-html="Close panel"]');
    this.searchAddToBoardButtonTooltip = page.locator('//button[@data-tooltip-html="Add to board"]');
    this.searchAddAllToBoardButtonTooltip = page.locator('//button[@data-tooltip-html="Add all addresses and transactions to the board"]');
    this.searchTransactions = page.locator("//div[contains(text(),'Transactions')]/../div").last();
    this.searchTransactionhash = page.locator("//div[contains(text(),'Transaction hash')]/../div").last();
    this.searchTransactionBlockChain = page.locator("//div[contains(text(),'blockchain')]/../div").last();
    this.searchTransactionValue = page.locator("//*[contains(text(),'Transaction Value:')]/../*").last();
    this.searchTransactionFees = page.locator("//*[contains(text(),'Fees:')]/../*").last();
    this.searchTransactionTime = page.locator("//*[contains(text(),'Transaction time:')]/../*").last();
    this.alreadyAdded = page.locator('//button[@data-tooltip-html="Already added"]');
    this.folderAlreadyExistsToastMessage = page.locator("//div[contains(text(),'Folder name')]");
    this.newBoardNameTextField = page.getByPlaceholder('New board');
    this.newBoardBtn = page.locator("//div[.='New Board']");
    this.boardOpenBtn = page.locator("//button[contains(text(),'Open')]");
    this.boardAlreadyExistsToastMessage = page.locator("//div[contains(text(),'Board with similar name already exists under this folder.')]");
    this.folderContainsFoldersOrBoardsToastMessage = page.locator("//div[contains(text(),'Folder contains folders or boards. Please move or delete them first.')]");
    this.deleteCancelBtn = page.locator("//button[contains(text(),'Cancel')]");
    this.deleteXIcon = page.locator("//button[contains(@class,'rounded-md text-gray-400')]");
    this.graphOpenIcon = page.locator('#file-21').getByRole('img').nth(2);
    this.userDoNotHaveAccessToastMessage = page.locator("//div[contains(text(),'You do not have access. Please contact your admin.')]");
    this.entityName = page.locator("//div[contains(text(),'entity name')]/following-sibling::div");
    this.entityType = page.locator("//div[contains(text(),'entity type')]//following-sibling::div");
    this.filesAndFoldersExpandIcon = page.locator("//button[contains(@class,'rounded shadow')]").first();
    this.recentTabModifyBtn = page.locator("//div[contains(@class,'rounded-md shadow')]//div[contains(text(),'Modify')]");
    this.recentTabRemoveAddressFromWatchlistBtn = page.locator("//div[contains(@class,'rounded-md shadow')]//div[contains(text(),'Remove address from watchlist')]");
    this.updateWatchlistCloseBtn = page.locator("//span[contains(text(),'Close')]//parent::button");
    this.sharedWatchlistTab = page.locator("//span[text()='SHARED WATCHLIST']");

    this.randomString = `${Math.random().toString().slice(2, 4)}`;
    this.graphName = `Demo${this.randomString}`;
    this.newFolderName = `user${this.randomString}`;

    this.graphPage = new GraphPage(this.page);
    this.loginPage = new TrackerLoginPage(this.page);
    this.detailsPanelPage = new DetailsPanelPage(this.page);
  }

  /**
   * This function is used to Navigate to Tracker Home Page
   */
  async goToTrackeHomePage() {
    await this.trackerLogo.click();
  }

  /**
  * This function is used to Search transaction id
  */
  async verifyGraphOpenIconAndClickOnIt() {
    expect(this.graphOpenIcon.isVisible).toBeTruthy();
    await this.graphOpenIcon.click();
    await this.graphPage.verifyGraphContainerPageIsVisible();
    await this.clickOnMerkleScienceLogo();
  }

  /**
   * This function is used to Logout the user from application
   */
  async logoutFromApplication() {
    const email = process.env.USER_EMAIL;
    await this.userProfileLocator.click();
    const expectedSignInUser = await this.signInUser.textContent();
    expect(expectedSignInUser).toEqual(`${email}`);
    await this.logoutLocator.click();
    await this.page.waitForSelector("[class*='text-xl-semibold text-center']", { state: 'visible' });
    await expect(this.loginPageHeader).toBeVisible();
  }

  /**
   * This function is used to Search transaction id
   */
  async searchTransactionId() {
    await this.searchForAddress.click();
    await this.page.keyboard.press("Control+V");
  }

  /**
   * This function is used to select searched board in files and folders
   */
  async selectFilteredGraphName(graphName: string) {
    await this.searchFilesAndFolders.fill(graphName);
    await this.page.waitForTimeout(5000);
    await this.page
      .locator(
        "//div[contains(@class,'truncate place-content-start') and contains(text(),'" +
        graphName +
        "')]"
      )
      .last().click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickOnOpenButton() {
    await this.openButton.click();
    await this.page.waitForTimeout(5000);
  }

  /**
   * This function is used to Search transaction id
   */
  async clickOnAddToBoard() {
    await this.addToBoardButton.click();
    await this.page.waitForTimeout(5000);
  }

  /**
   * This function is used to Verfy the graph is added to the board
   */
  async verfyGraphIsAdded() {
    const allGraph = await this.filesAndFolders.allTextContents();
    let actualGraphName;
    for (let i = 0; i < allGraph.length; i++) {
      if (allGraph[i] == this.graphName) {
        actualGraphName = allGraph[i];
      }
    }
    expect(actualGraphName).toBe(this.graphName);
  }

  /**
   * This function is used to verify page content that is visble after successful login
   */
  public async verifyWelcomeToTrackerTitleIsVisible() {
    await expect(this.welcomeMessageLocator).toBeVisible();
    await this.filesAndFoldersExpandIcon.click();
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to verify Tracker Merkel Science Logo is displayed after successful login
   */
  public async verifyTrackerMerkelScienceLogoIsDisplayed() {
    expect(this.trackerMerkelScienceLogo.isVisible()).toBeTruthy();
  }

  /**
   * This function is used to verify search input is displayed
   */
  async verifySearchForAddressInputIsVisible() {
    const isSearchBoxVisible = await this.searchForAddress.isVisible();
    expect(isSearchBoxVisible).toBeTruthy();
  }

  /**
   * This function is used to search address or transaction
   */
  async clickAndFillSearchForAddress(address: string) {
    if (await this.searchAddressClearButton.nth(1).isVisible()) {
      await this.searchAddressClearButton.nth(1).click();
      await this.page.waitForTimeout(2000);
      expect(await this.searchForAddress.inputValue()).toEqual("");
    }
    await this.searchForAddress.click();
    await this.searchForAddress.fill(address);
    await this.page.waitForSelector("//input[contains(@placeholder,'Search')]//ancestor::div[contains(@class,'rounded')]//following-sibling::div", { state: 'visible' });
    await this.page.waitForTimeout(5000);
  }

  /**
  * This function is used to validate invalid address
  */
  async validateInvalidAddress(address: string) {
    await this.page.waitForSelector(".p-4.text-2xs-regular.text-gray-400", { state: 'visible' });
    const actualError = await this.page
      .locator(".p-4.text-2xs-regular.text-gray-400")
      .allInnerTexts();
    expect(actualError).toEqual(['"' + address + '"' + " is not an address or a transaction. Please check and try again.",]);
    await this.page.waitForTimeout(3000);
    await this.clickOnSearchClearButton();
  }

  async clickOnAddAllToBoard() {
    await this.addAllToBoard.click();
    await this.page.waitForTimeout(5000);
  }

  async verifyCloseButtonIsVisible() {
    await expect(this.searchAddressClearButton).toBeVisible();
    await this.page.waitForTimeout(2000);
  }

  async clickOnSearchClearButton() {
    await this.searchAddressClearButton.click();
    expect(await this.searchForAddress.inputValue()).toEqual("");
    await expect(this.searchPlaceHolderText).toBeVisible();
  }

  async clickOnMerkleScienceLogo() {
    await this.merkleScienceLogo.click();
    if (await this.filesAndFoldersExpandIcon.isVisible())
      await this.filesAndFoldersExpandIcon.click();
  }

  async verifyModifiedBoardDisplayedFirstInRecentBoards(boardName: string) {
    const actualBoardName = await this.page
      .locator(
        "//div[contains(@class,'relative group')]//div[text()='" +
        boardName +
        "']"
      )
      .nth(0)
      .textContent();
    expect(actualBoardName).toBe(boardName);
  }

  /**
   * This function is used to click on Recent Modified Board
   */
  async clickOnRecentModifiedBoard() {
    await this.page.waitForLoadState("networkidle");
    await this.recentBoard.click();
  }

  /**
   * This function is used to mouse hover on Board
   */
  async hoverOnTheRecentModifiedBoard() {
    await this.page.waitForTimeout(5000);
    await this.recentBoard.hover();
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to verify boards grid in dashboard
   */
  async verifyDashboardBoardsGrid() {
    expect(this.dashboardBoardsGrid.isVisible).toBeTruthy();
    await this.page.waitForTimeout(2000);
  }

  /**
   * This function is used to verify SharedLink is visible
   */
  async verifySharedLinkIsVisible() {
    await this.page.waitForTimeout(3000);
    await expect(this.sharedLink).toBeVisible();
  }

  /**
   * This function is used to verify more details is visible
   */
  async verifyMoreDetailsIsVisible() {
    const isMoreDetailsVisible = await this.moreDetails.isVisible();
    expect(isMoreDetailsVisible).toBeTruthy();
  }

  /**
   * This function is used to verify open board is visible
   */
  async verifyOpenBoardIsVisible() {
    const isOpenBoardVisible = await this.openBoard.isVisible();
    expect(isOpenBoardVisible).toBeTruthy();
  }

  /**
   * This function is used to click on open board
   */
  async clickOnOpenBoardButton() {
    await this.openBoard.click();
    await this.page.waitForTimeout(5000);
  }

  /**
   * This function is used to click on more details
   */
  async clickOnMoreDetails() {
    await this.moreDetails.click();
    expect(this.recentTabMoreDetailsPreviewPopup).toBeVisible();
  }

  /**
   * This function is used to verify 'preview board name' is visible
   */
  async verifyPreviewBoardNameIsVisible() {
    await this.page.waitForTimeout(3000);
    const isBoardNameVisible = await this.previewBoardName.isVisible();
    expect(isBoardNameVisible).toBeTruthy();
  }

  /**
   * This function is used to verify 'open' button is visible
   */
  async verifyOpenButtonIsVisible() {
    const isOpenVisible = await this.openButton.isVisible();
    expect(isOpenVisible).toBeTruthy();
  }

  /**
   * This function is used to verify 'SharedLink' is visible
   */
  async verifySharedLinkTextIsVisible() {
    const isSharedLinkVisible = await this.sharedLinkText.isVisible();
    expect(isSharedLinkVisible).toBeTruthy();
  }

  /**
   * This function is used to verify 'created by' is visible
   */
  async verifyCreatedByIsVisible() {
    const isCreatedByVisible = await this.createdBy.isVisible();
    expect(isCreatedByVisible).toBeTruthy();
  }
  /**
   * This function is used to verify 'created on' is visible
   */
  async verifyCreatedOnIsVisible() {
    const isCreatedOnVisible = await this.createdOn.isVisible();
    expect(isCreatedOnVisible).toBeTruthy();
  }

  /**
   * This function is used to verify 'last modified on' is visible
   */
  async verifyLastModifiedOnIsVisible() {
    const isLastModifiedOnVisible = await this.lastModifiedOn.isVisible();
    expect(isLastModifiedOnVisible).toBeTruthy();
  }

  /**
   * This function is used to verify 'graph preview' is visible
   */
  async verifyGraphPreviewIsVisible() {
    const isGraphPreviewVisible = await this.graphPreview.isVisible();
    expect(isGraphPreviewVisible).toBeTruthy();
  }

  /**
   * This function is used to verify 'closeIcon' is visible
   */
  async verifyCloseIconIsVisible() {
    const isCloseIconVisible = await this.closeIcon.isVisible();
    expect(isCloseIconVisible).toBeTruthy();
  }

  /**
   * This function is used to verify 'back' button is visible in preview section
   */
  async verifyPreviewBackButtonIsVisible() {
    const isPreviewBackBtnVisible = await this.previewBackBtn.isVisible();
    expect(isPreviewBackBtnVisible).toBeTruthy();
  }

  /**
   * This function is used to click on close icon
   */
  async clickOnCloseIcon() {
    await this.closeIcon.click();
  }

  /**
   * this function is used to create a New folder and verify it
   */
  async createNewFolder(folder: string, key: string) {
    await this.newFolderBtn.click();
    await this.newWorkspace.fill(folder);
    await this.page.keyboard.press(key);
    await this.page.waitForTimeout(3000);
    await this.page.waitForSelector("(//ul[@id='file-list']//div[contains(@class,'start')])[1]", { state: 'visible' });
    await this.performFileOrFolderSearch(folder);
    const isFolderVisible = await this.page.locator(
      "//div[contains(@class,'truncate place-content-start') and text()='" + folder + "']").isVisible();
    expect(isFolderVisible).toBeTruthy();
  }

  /**
   * This function is used to search for folder or board
   */
  async performFileOrFolderSearch(search: string) {
    await this.searchFilesAndFolders.fill(search);
    await this.page.waitForTimeout(5000);
  }

  /**
   * this function is used to rename and delete folder
   */
  async renameAndDeleteFolder(folder: string, key: string) {
    await BasePage.reloadPage(this.page);
    await this.filesAndFoldersExpandIcon.click();
    await this.page.waitForSelector("(//ul[@id='file-list']//div[contains(@class,'start')])[1]", { state: 'visible' });
    await this.searchFilesAndFolders.click();
    await this.searchFilesAndFolders.fill(folder);
    await this.page.waitForTimeout(10000);
    await this.page.locator(
      "//div[contains(@class,'truncate place-content-start') and text()='" + folder + "']").hover();
    await expect(this.threeDotsBtn).toBeVisible();
    await this.threeDotsBtn.click();
    await expect(this.renameBtn).toBeVisible();
    await expect(this.deleteBtn).toBeVisible();
    await this.renameFolder(folder, key);
    await this.performFileOrFolderSearch(folder + "1234");
    await this.threeDotsBtn.click();
    await this.deleteBtn.click();
    await this.deleteCancelBtn.click();
    await this.threeDotsBtn.click();
    await this.deleteBtn.click();
    await this.deleteXIcon.click();
    await this.threeDotsBtn.click();
    await this.deleteBtn.click();
    await this.deleteFolderConfirmationBtn.click();
  }

  async clickOnFolderDeleteBtnAndValidateTheToastMessage(folder: string, expectedText: string) {
    await this.page.waitForSelector("(//ul[@id='file-list']//div[contains(@class,'start')])[1]", { state: 'visible' });
    await this.searchFilesAndFolders.click();
    await this.searchFilesAndFolders.fill(folder);
    await this.page.waitForTimeout(3000);
    await this.page.locator(
      "//div[contains(@class,'truncate place-content-start') and text()='" + folder + "']").hover();
    await expect(this.threeDotsBtn).toBeVisible();
    await this.threeDotsBtn.click();
    await this.deleteBtn.click();
    await this.deleteFolderConfirmationBtn.click();
    const actualtext = await this.folderContainsFoldersOrBoardsToastMessage.textContent();
    expect(actualtext).toBe(expectedText);
  }

  /**
   * this function is used to rename folder
   */
  async renameFolder(folder: string, key: string) {
    await this.renameBtn.click();
    await this.newFolderBtn.click();
    await this.newWorkspace.fill(folder + "1234");
    await this.page.keyboard.press(key);
    await this.page.waitForTimeout(3000);
    await this.page.waitForSelector("(//ul[@id='file-list']//div[contains(@class,'start')])[1]", { state: 'visible' });
  }

  /**
   * this function is used to rename board
   */
  async renameBoard(board: string, key: string) {
    await this.renameBtn.click();
    await this.newBoardNameTextField.click();
    await this.newBoardNameTextField.fill(board + "1234");
    await this.page.keyboard.press(key);
    await this.page.waitForTimeout(3000);
  }

  /**
   * this function is used to create folder with existing name and verify toast message
   */
  async createFolderAndVerifyAlreadyCreatedToastMessage(folder: string, expectedText: string, key: string) {
    await this.newFolderBtn.click();
    await this.newWorkspace.fill(folder);
    await this.page.keyboard.press(key);
    const actualtext = await this.folderAlreadyExistsToastMessage.textContent();
    expect(actualtext).toContain(expectedText);
  }

  /**
   * this function is used to click on Plus Icon and verify the Fields.
   */
  async verifyFieldsUnderFolderPlusBtn(folder: string) {
    await this.page.waitForTimeout(5000);
    await this.page
      .locator(
        "//div[contains(@class,'truncate place-content-start') and text()='" + folder + "']").hover();
    expect(this.plusIcon).toBeVisible();
    await this.plusIcon.first().click();
    await expect(this.newFolderInsidePlusIcon).toBeVisible();
    await expect(this.newBoardInsidePlusIcon).toBeVisible();
  }

  /**
   * this function is used to create board inside a folder
   */
  async createBoardInsideAFolder(board: string, key: string) {
    await this.newBoardInsidePlusIcon.click();
    await this.newBoardNameTextField.fill(board);
    await this.newBoardNameTextField.press(key);
  }

  /**
   * this function is used to create board
   */
  async createABoard(board: string, key: string) {
    await this.page.waitForSelector("(//ul[@id='file-list']//div[contains(@class,'start')])[1]", { state: 'visible' });
    await this.newBoardBtn.click();
    await this.newBoardNameTextField.fill(board);
    await this.newBoardNameTextField.press(key);
    await this.page.waitForTimeout(5000);
  }

  /**
   * this function is used to create board with existing name and verify toast message
   */
  async createBoardAndVerifyAlreadyCreatedToastMessage(board: string, expectedText: string, key: string) {
    await this.page.waitForSelector("(//ul[@id='file-list']//div[contains(@class,'start')])[1]", { state: 'visible' });
    await this.newBoardBtn.click();
    await this.newBoardNameTextField.fill(board);
    await this.page.keyboard.press(key);
    await this.page.waitForTimeout(3000);
    const actualtext = await this.boardAlreadyExistsToastMessage.textContent();
    expect(actualtext).toContain(expectedText);
  }

  /**
   * this function is used to search and validate board name
   */
  async searchAndVerifyBoard(board: string) {
    await this.page.waitForSelector("(//ul[@id='file-list']//div[contains(@class,'start')])[1]", { state: 'visible' });
    await this.performFileOrFolderSearch(board);
    const isBoardVisible = await this.page
      .locator("//div[contains(@class,'truncate place-content-start') and text()='" + board + "']").isVisible();
    expect(isBoardVisible).toBeTruthy();
  }

  /**
  * this function is used to rename and delete board
  */
  async renameAndDeleteBoard(board: string, key: string) {
    await this.page.waitForSelector("(//ul[@id='file-list']//div[contains(@class,'start')])[1]", { state: 'visible' });
    await this.page
      .locator(
        "//div[contains(@class,'truncate place-content-start') and text()='" + board + "']").hover();
    await expect(this.threeDotsBtn.last()).toBeVisible();
    await this.threeDotsBtn.last().click();
    await expect(this.renameBtn.last()).toBeVisible();
    await expect(this.deleteBtn.last()).toBeVisible();
    await this.renameBoard(board, key);
    await this.searchFilesAndFolders.fill(board + "1234");
    await this.page.keyboard.press(key);
    await this.page.waitForTimeout(3000);
    await this.threeDotsBtn.last().click();
    await this.deleteBtn.click();
    await this.deleteCancelBtn.click();
    await this.threeDotsBtn.last().click();
    await this.deleteBtn.click();
    await this.deleteXIcon.click();
    await this.threeDotsBtn.last().click();
    await this.deleteBtn.click();
    await this.deleteFolderConfirmationBtn.click();
    await this.filesAndFoldersSearchCloseIcon.click();
  }

  /**
  * this function is used to delete board with view access
  */
  async deleteBoardWithViewAccess(expectedText: string, board: string, expectedToastMsg: string) {
    await this.page.waitForLoadState('networkidle');
    if (await this.filesAndFoldersExpandIcon.isVisible())
      await this.filesAndFoldersExpandIcon.click();
    await this.userProfileLocator.click();
    const expectedSignInUser = await this.signInUser.textContent();
    expect(expectedSignInUser).toEqual(expectedText);
    await this.page.waitForTimeout(5000);
    await this.searchFilesAndFolders.click();
    await this.searchFilesAndFolders.fill(board);
    await this.page.waitForTimeout(3000);
    await this.page
      .locator(
        "//div[contains(@class,'truncate place-content-start') and text()='" + board + "']").hover();
    await expect(this.threeDotsBtn.last()).toBeVisible();
    await this.threeDotsBtn.last().click();
    await this.deleteBtn.click();
    await this.deleteFolderConfirmationBtn.click();
    const userDoNotHaveAccessToastMsg = await this.userDoNotHaveAccessToastMessage.textContent();
    expect(userDoNotHaveAccessToastMsg).toBe(expectedToastMsg)
    await this.page.waitForTimeout(3000);
    expect(this.page.locator("//h4").isVisible).toBeTruthy();
    expect(this.page.locator("//p[1]").isVisible).toBeTruthy();
    expect(this.page.locator("//p[2]").isVisible).toBeTruthy();
    await this.clickOnMerkleScienceLogo();
  }

  /**
  * this function is used to rename board with view access
  */
  async renameBoardWithViewAccess(board: string, expectedToastMsg: string, key: string) {
    await this.page.waitForSelector("(//ul[@id='file-list']//div[contains(@class,'start')])[1]", { state: 'visible' });
    await this.searchFilesAndFolders.click();
    await this.searchFilesAndFolders.fill(board);
    await this.page.waitForTimeout(5000);
    await this.page
      .locator(
        "//div[contains(@class,'truncate place-content-start') and text()='" + board + "']").hover();
    await expect(this.threeDotsBtn.last()).toBeVisible();
    await this.threeDotsBtn.last().click();
    await this.renameBoard(board, key);
    const userDoNotHaveAccessToastMsg = await this.userDoNotHaveAccessToastMessage.textContent();
    expect(userDoNotHaveAccessToastMsg).toBe(expectedToastMsg)
    await this.page.waitForTimeout(3000);
    expect(this.page.locator("//h4").isVisible).toBeTruthy();
    expect(this.page.locator("//p[1]").isVisible).toBeTruthy();
    expect(this.page.locator("//p[2]").isVisible).toBeTruthy();
    await this.clickOnMerkleScienceLogo();
  }

  /**
   * this function is used to relogin with user credentials and delete the newly created board
   */
  async reloginAndDeleteTheBoard(emailAddress: string, password: string, newBoard: string, board: string) {
    await this.page.waitForLoadState('networkidle');
    await this.userProfileLocator.click();
    await this.logoutLocator.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.loginPageHeader).toBeVisible();
    await this.loginPage.enterEmailAddress(emailAddress);
    await this.loginPage.clickOnContinueButton();
    await this.loginPage.enterPassword(password);
    await this.loginPage.clickOnLoginButton();
    await this.verifyWelcomeToTrackerTitleIsVisible();
    await this.performFileOrFolderSearch(newBoard)
    await this.page.waitForTimeout(2000);
    await this.threeDotsBtn.click();
    await this.deleteBtn.click();
    await this.deleteFolderConfirmationBtn.click();
    await this.page.waitForTimeout(3000);
    await this.performFileOrFolderSearch(board)
    await this.page.waitForTimeout(2000);
    await this.threeDotsBtn.click();
    await this.deleteBtn.click();
    await this.deleteFolderConfirmationBtn.click();
  }

  /**
  * this function is used to search boardname without access to the board and verify it
  */
  async searchBoardWithoutAccess(board: string, expectedText: string) {
    await this.page.waitForSelector("(//ul[@id='file-list']//div[contains(@class,'start')])[1]", { state: 'visible' });
    await this.searchFilesAndFolders.click();
    await this.searchFilesAndFolders.fill(board);
    await this.page.waitForTimeout(3000);
    await this.verifyAddANewWorkspaceToOrganizeYourBoardsIsVisible(expectedText);
  }

  /**
   * this function is used to validate detailed preview of board in dashboard
   */
  async clickOnBoradAndValidateDetailedPreviewContents(board: string) {
    const boardName = this.page.locator("//div[contains(@class,'truncate place-content-start') and text()='" + board + "']")
    expect(await boardName.isVisible()).toBeTruthy();
    await boardName.click();
    await this.page.waitForTimeout(3000);
    expect(await this.previewBoardName.isVisible()).toBeTruthy();
    expect(await this.boardOpenBtn.isVisible()).toBeTruthy();
    await this.verifySharedLinkTextIsVisible();
    await this.verifyCreatedByIsVisible();
    await this.verifyCreatedOnIsVisible();
    await this.verifyLastModifiedOnIsVisible();
  }

  /**
  * this function is used to click on open button and verify the graph page
  */
  async clickOnOpenButtonAndVerifyGraphPage() {
    await this.boardOpenBtn.click();
    await this.page.waitForTimeout(10000);
    await this.graphPage.verifyGraphContainerPageIsVisible();
  }

  /**
   * This function is used to verify 'Add a new workspace to organize your boards' is visible
   */
  async verifyAddANewWorkspaceToOrganizeYourBoardsIsVisible(expectedText: string) {
    await this.page.waitForTimeout(10000);
    const actualtext = await this.addNewWorkspaceText.textContent();
    expect(actualtext).toBe(expectedText);
  }

  /**
   * This function is used to verify 'Signed In As' is visible
   */
  async verifySignedInAsIsVisible() {
    const isSignedInAsVisible = await this.signedInAs.isVisible();
    expect(isSignedInAsVisible).toBeTruthy();
  }

  /**
   * This function is used to verify 'Settings' is visible
   */
  async verifySettingsIsVisible() {
    const isSettingsVisible = await this.settings.isVisible();
    expect(isSettingsVisible).toBeTruthy();
  }

  /**
   * This function is used to verify 'Supported Digital Assets' is visible
   */
  async verifySupportedDigitalAssetsIsVisible() {
    const isSupportedDigitalAssetsVisible =
      await this.supportedDigitalAssets.isVisible();
    expect(isSupportedDigitalAssetsVisible).toBeTruthy();
  }

  /**
   * This function is used to click on 'Supported Digital Assets'
   */
  async clickOnSupportedDigitalAssets() {
    const isSupportedDigitalAssetsVisible =
      await this.supportedDigitalAssets.isVisible();
    expect(isSupportedDigitalAssetsVisible).toBeTruthy();
    await this.page.waitForLoadState("networkidle");
    await this.supportedDigitalAssets.click();
    await this.page.waitForTimeout(5000);
    const isSupportedDigitalAssetsFrameVisible =
      await this.supportedDigitalAssetsFrame.isVisible();
    expect(isSupportedDigitalAssetsFrameVisible).toBeTruthy();
    this.blockchainsValues = await this.blockchains.allTextContents();
    this.tokenNameValues = await this.token.allTextContents();
  }

  /**
   * This function is used to verify 'Support' is visible
   */
  async verifySupportIsVisible() {
    const isSupportVisible = await this.support.isVisible();
    expect(isSupportVisible).toBeTruthy();
  }

  /**
   * This function is used to verify 'Logout' is visible
   */
  async verifyLogoutIsVisible() {
    const isLogoutVisible = await this.logoutLocator.isVisible();
    expect(isLogoutVisible).toBeTruthy();
  }

  /**
   * This function is used to click on User profile
   */
  async clickOnUserProfile() {
    await this.userProfileLocator.click();
  }

  /**
   * This function is used to verify user able to view the settings
   */
  async verifyUserAbleToViewSettings() {
    await this.settings.click();
    await this.page.waitForTimeout(5000);
    await expect(this.profileSettingsText).toBeVisible();
  }

  /**TC-043
   * This function is used to verify 'Support' is visible
   */
  async verifySupportAndClick() {
    const isSupportVisible = await this.support.isVisible();
    expect(isSupportVisible).toBeTruthy();
    await this.page.waitForTimeout(5000);
    await this.support.click();
  }

  /**
   * This function is used to verify 'Support frame is visible
   */
  async verifySupportLeaveUsaMessageFrame() {
    await expect(this.supportFrame.getByTestId("widget-title")).toBeVisible();
  }

  /**
   * This function is used to verify Supported Digital Assets page Contents
   */
  async verifySupportedDigitalAssetsPageContents() {
    await this.page.waitForLoadState("networkidle");
    //search Digital Assets
    const isSearchDigitalAssetsVisible =
      await this.searchDigitalAssets.isVisible();
    expect(isSearchDigitalAssetsVisible).toBeTruthy();

    //filterBy
    const isFilterByVisible = await this.filterBy.isVisible();
    expect(isFilterByVisible).toBeTruthy();

    //Token Name
    const isTokenNameVisible = await this.tokenName.isVisible();
    expect(isTokenNameVisible).toBeTruthy();

    //BlockChains
    const isBlockChainsVisible = await this.blockChains.isVisible();
    expect(isBlockChainsVisible).toBeTruthy();
  }

  /**
   * This function is used to fetch total count of board in recent boards
   */
  async fetchTotalCountOfBoardInRecentBoards() {
    const graphs = await this.page.$$(
      "//div[contains(@class,'relative group')]"
    );
    const graphCount = graphs.length;
    console.log("Number of Boards: ", graphCount);
  }

  /**
   * This function is used to verify last board is visible
   */
  async verifyLastBoardIsVisible() {
    const isLastBoardVisible = await this.board.last().isVisible();
    expect(isLastBoardVisible).toBeTruthy();
  }

  /**
   * This function is used to scroll down to the last board
   */
  async scrollDownToLastBoard() {
    const element = this.board.last();
    await element.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to click on last board.
   */
  async clickOnLastBoard() {
    await this.board.last().hover();
    await this.openBoard.click();
  }

  /**
   * This function is used to Search any available token name in digital assets
   */
  async validateSearchedTokenIsVisible(tokenName: string) {
    if (tokenName != "") {
      await this.searchDigitalAssets.fill(tokenName);
      await this.page.waitForTimeout(5000);
      if ((await this.page.locator("//tbody").count()) == 0) {
        console.log("Token is invalid.");
      } else {
        const tokens = await this.page.$$(
          "//div[contains(@class,'items-center')]//span[contains(@class,'text-xs-medium text-gray-500')]"
        );
        for (let i = 0; i < tokens.length; i++) {
          let actualToken = await tokens[i].textContent();
          expect(actualToken).toContain(tokenName);
        }
      }
    } else {
      console.log("Token is empty.");
    }
  }

  /**
   * This function is used to App logo validation with snapshots
   */
  async verifyAppLogoInDashboard() {
    const isAppLogoOnDashboardisVisible = await this.appLogo.isVisible();
    expect(isAppLogoOnDashboardisVisible).toBeTruthy();
  }
  /**
   * This function is used to Click on App Logo menu dropdown icon
   */
  async clickOnAppLogoMenuDropDown() {
    await this.menuIcon.click();
  }
  /**
   * This function is used to Verify the App Logo menu drop down list
   */
  public async verifyAppLogoDropDownMenuList() {
    const isCompassOptionisDisplayed = await this.compass.isVisible();
    expect(isCompassOptionisDisplayed).toBeTruthy();
    const isKybbOptionisDisplayed = await this.kybb.isVisible();
    expect(isKybbOptionisDisplayed).toBeTruthy();
  }

  /**
   * This function is used to click on Compass
   */
  async clickOnCompass() {
    await this.compass.click();
  }

  /**
   * This function is used to click on KYBB
   */
  async clickOnKYBB() {
    await this.kybb.click();
  }

  /**
   * This function is used to clear the search token values
   */
  async clearTheSearchedTokenValues() {
    await this.searchDigitalAssets.clear();
    await this.page.waitForTimeout(5000);
  }

  /**
   * This function is used to verify all the digital assets token values are visible
   */
  async verifyAllDigitalAssetsTokenValuesAreVisible() {
    await this.page.waitForTimeout(3000);
    const actualTokenNameValue = await this.token.allTextContents();
    expect(
      JSON.stringify(actualTokenNameValue) ==
      JSON.stringify(this.tokenNameValues)
    ).toBeTruthy();
  }

  /**
   * This function is used to click on the filterby button
   */
  async clickOnFilterBy() {
    await this.filterBy.click();
  }

  /**
   * This function is used to verify SUPPORTED DIGITAL ASSETS filter by contents
   */
  async verifyFilterByContents() {
    //select All
    const isSelectAllVisible = await this.filterBySelectAll.isVisible();
    expect(isSelectAllVisible).toBeTruthy();

    //ShowSelected
    const isShowSelectedVisible = await this.showSelected.isVisible();
    expect(isShowSelectedVisible).toBeTruthy();

    //Reset
    const isResetVisible = await this.reset.isVisible();
    expect(isResetVisible).toBeTruthy();

    //Apply
    const isApplyVisible = await this.apply.isVisible();
    expect(isApplyVisible).toBeTruthy();

    //block chains
    const BlockChainElement = await this.page.$$(
      "//div[contains(@class,'flex flex-row justify-start items-center gap')]"
    );
    console.log(`List of block chains below:`);
    for (const element of BlockChainElement) {
      console.log(await element.textContent());
      expect(await element.textContent()).toBeTruthy();
    }
  }

  /**
   * This function is used to click on show selected button
   */
  async clickOnShowSelectedButton() {
    await this.page.waitForLoadState("networkidle");
    await this.showSelected.click();
    await this.page.waitForTimeout(3000);
  }
  /**
   * This function is used to click on hide selected button
   */
  async clickOnHideSelectedButton() {
    await this.page.waitForLoadState("load");
    await this.hideSelected.click();
  }
  /**
   * This function is used to click on apply button
   */
  async clickOnApplyButton() {
    await this.apply.click();
    await this.page.waitForTimeout(5000);
  }

  /**
   * This function is used to click on the filter by select all button
   */
  async clickOnFilterBySelectAll() {
    await this.filterBySelectAll.click();
  }

  /**
   * This function is used to click on the filter by unselect all button
   */
  async clickOnFilterByUnselectAll() {
    await this.filterByUnselectAll.click();
  }

  /**
   * This function is used to verify all the filter by checkbox should be selected
   */
  async verifyAllTheFilterByCheckBoxshouldBeSelected() {
    await this.page.waitForTimeout(2000);
    const BlockChainElement = await this.page.$$(
      "//div[contains(@class,'items-center flex bg-blue')]"
    );
    for (const element of BlockChainElement) {
      expect(await element.isVisible()).toBeTruthy();
    }
  }

  /**
   * This function is used to verify all the filter by checkbox should be unselected
   */
  async verifyAllTheFilterByCheckBoxShouldBeUnselected() {
    await this.page.waitForTimeout(2000);
    const BlockChainElement = await this.page.$$(
      "//div[contains(@class,'items-center flex bg-white')]"
    );
    for (const element of BlockChainElement) {
      expect(await element.isVisible()).toBeTruthy();
    }
  }

  /**
   * This function is used to select block chain value under supported digital assets filter by
   */
  async selectBlockChainInFilterBy(blockchain: string) {
    const blockChainValues = await this.page.$$(
      "//div[contains(@class,'flex flex-row justify-start items-center gap')]"
    );
    for (const value of blockChainValues) {
      if (blockchain === (await value.textContent())) {
        await value.click();
        break;
      }
    }
  }

  /**
   * This function is used to verify show selected block chain value
   */
  async verifySelectedBlockChainvalue() {
    const isBlockChainValueisVisible = await this.blockchainValue.isVisible();
    expect(isBlockChainValueisVisible).toBeTruthy();
  }
  /**
   * This function is used to verify hide button and show button
   */
  async verifyHideSelectedButton() {
    const isHideSelectedButtonNotVisible = await this.hideSelected.isHidden();
    expect(isHideSelectedButtonNotVisible).toBeTruthy();
    const isShowSelectedButtonVisible = await this.showSelected.isVisible();
    expect(isShowSelectedButtonVisible).toBeTruthy();
  }

  /**
   * This function is used to verify apply block chain matching values
   */
  async verifyBlockchain(blockchain: string) {
    const BlockChainElement = await this.page.$$(
      '//img[@alt="BlockchainLogoImage"]/following-sibling::span[@class="text-xs-medium text-gray-800"]'
    );
    for (const element of BlockChainElement) {
      expect(await element.textContent()).toBe(blockchain);
    }
  }

  /**
   * This function is used to click on filter by reset button
   */
  async clickOnFilterByResetButton() {
    await this.reset.click();
    await this.page.waitForTimeout(5000);
  }

  /**
   * This function is used to verify all block chains are visible
   */
  async verifyAllBlockChainsAreVisible() {
    await this.page.waitForTimeout(5000);
    const actualBlockhainValue = await this.blockchains.allTextContents();
    const isAllBlockchainAreVisible =
      actualBlockhainValue.length == this.blockchainsValues.length;
    expect(isAllBlockchainAreVisible).toBeTruthy();
  }

  /**
   * This function is used to verify token is not duplicated
   */
  async verifyTokenIsNotDuplicated() {
    await this.page.waitForTimeout(5000);
    const tokenValue = await this.page
      .locator(
        "//div[contains(@class,'flex items-center rounded')]/following-sibling::span"
      )
      .allTextContents();
    const duplicates = tokenValue.filter(
      (value, index, self) => self.indexOf(value) !== index
    );
    if (duplicates.length > 0) {
      console.error("Duplicate values found:", duplicates);
      throw new Error("Duplicate values found");
    } else {
      console.log("No duplicate entries found");
    }
    expect(duplicates.length > 0).toBeFalsy();
  }

  /**
   * This function is used to verify default tab in dashboard
   */
  async verifySelectedTabInDashboard() {
    const defaultTab = this.page.locator("//span[text()='RECENT']");
    const isSelected = await defaultTab
      ?.getAttribute("aria-current")
      .then((currentTab) => currentTab?.includes("page"));

    if (isSelected) {
      console.log("Recent tab is selected by default.");
    } else {
      console.log("Watched tab is selected.");
    }
  }

  /**
   * This function is used to click on Watched tab in dashboard
   */
  async clickOnWatchedTab() {
    await this.watchedTab.click();
    await this.page.waitForTimeout(5000);
  }

  /**
   * This function is used to click on Shared Watchlist tab in dashboard
   */
  async clickOnSharedWatchlistTab() {
    await this.sharedWatchlistTab.click();
    await this.page.waitForTimeout(5000);
  }

  /**
   * This function is used to verify recent tab graph is visible
   */
  async verifyRecentTabGraphIsVisible() {
    const isRecentTabGraphVisible = await this.recentTabGraph.isVisible();
    expect(isRecentTabGraphVisible).toBeTruthy();
  }

  /**
   * This function is used to verify recent tab currencies is visible
   */
  async verifyRecentTabCurrenciesIsVisible() {
    const isRecentTabCurrenciesVisible =
      await this.recentTabCurrencies.isVisible();
    expect(isRecentTabCurrenciesVisible).toBeTruthy();
  }

  /**
   * This function is used to verify recent tab graph name is visible
   */
  async verifyRecentTabGraphNameIsVisible() {
    const isRecentTabGraphNameVisible =
      await this.recentTabGraphName.isVisible();
    expect(isRecentTabGraphNameVisible).toBeTruthy();
  }

  /**
   * This function is used to verify recent tab graph last edited is visible
   */
  async verifyRecentTabGraphLastEditedIsVisible() {
    const isRecentTabGraphLastEditedVisible =
      await this.recentTabEditedTime.isVisible();
    expect(isRecentTabGraphLastEditedVisible).toBeTruthy();
  }

  /**
   * This function is used to fetch and verify graph name
   */
  async verifyRecentBoard(board: string, expectedToastMsg: string) {
    await this.page.waitForTimeout(5000);
    const recentTabGraphName = await this.page
      .locator(
        "//div[contains(@class,'justify-start items-star')]//following-sibling::div"
      )
      .first()
      .textContent();
    expect(board).toBe(recentTabGraphName);
    console.log(board);
    console.log(recentTabGraphName);

    await this.hoverOnTheRecentModifiedBoard();
    await this.clickOnOpenBoardButton();
    await this.graphPage.verifyGraphContainerPageIsVisible();
    await this.graphPage.deleteGraphFromBoard(expectedToastMsg);
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * This function is used to verify the search results
   */
  public async verifySearchResults(search: string) {
    const searchData = search.split(",");
    for (let i = 0; i < searchData.length; i++) {
      const searchResult = this.page.locator('//div[contains(text(),"' + searchData[i] + '")]');
      for (let j = 0; j < await searchResult.count(); j++) {
        expect(await searchResult.nth(j).textContent()).toBe(searchData[i]);
      }
    }
  }

  /**
   * This function is used to verify contents of search results
   */
  public async verifySearchResultContents() {
    const addressesCount = await this.page.locator("//span[contains(text(),'(')]").last().textContent();
    let resultsCount = Number(addressesCount?.slice(1, -1));
    if (resultsCount == 1) {
      expect(await this.searchAddresses.isVisible()).toBeTruthy();
      expect(await this.searchAddress.isVisible()).toBeTruthy();
      if (await this.entityName.isVisible())
        expect(await this.entityName.isVisible()).toBeTruthy();
      if (await this.entityType.isVisible())
        expect(await this.entityType.isVisible()).toBeTruthy();
      expect(await this.searchBlockChain.isVisible()).toBeTruthy();
      expect(await this.closeIcon.isVisible()).toBeTruthy();
      await this.closeIcon.hover();
      expect(await this.searchCloseButtonTooltip.isVisible()).toBeTruthy();
      expect(await this.addToBoardButton.isVisible()).toBeTruthy();
      await this.addToBoardButton.hover();
      expect(await this.searchAddToBoardButtonTooltip.isVisible()).toBeTruthy();
    }
    else {
      const searchResult = this.page.locator('//div[contains(@class,"2xs-semibold")]');
      for (let j = 0; j < await searchResult.count(); j++) {
        await searchResult.nth(j).click();
        expect(await this.searchAddresses.isVisible()).toBeTruthy();
        expect(await this.searchAddress.isVisible()).toBeTruthy();
        if (await this.entityName.isVisible())
          expect(await this.entityName.isVisible()).toBeTruthy();
        if (await this.entityType.isVisible())
          expect(await this.entityType.isVisible()).toBeTruthy();
        expect(await this.searchBlockChain.isVisible()).toBeTruthy();
        expect(await this.searchDeleteIcon.isVisible()).toBeTruthy();
        await this.searchDeleteIcon.hover();
        expect(await this.searchDeleteIcon.isVisible()).toBeTruthy();
        expect(await this.searchAddToBoardPlusIcon.isVisible()).toBeTruthy();
        await this.searchAddToBoardPlusIcon.hover();
        expect(await this.searchAddToBoardPlusIcon.isVisible()).toBeTruthy();
        expect(await this.closeIcon.isVisible()).toBeTruthy();
        await this.closeIcon.hover();
        expect(await this.searchCloseButtonTooltip.isVisible()).toBeTruthy();
        expect(await this.addAllToBoard.isVisible()).toBeTruthy();
        await this.addAllToBoard.hover();
        expect(await this.searchAddAllToBoardButtonTooltip.isVisible()).toBeTruthy();
      }
    }
  }

  /**
   * This function is used to verify contents of search results For Single Transaction With Single Currency
   */
  public async VerifyTxnResultContents() {
    expect(await this.searchTransactions.isVisible()).toBeTruthy();
    expect(await this.searchTransactionhash.isVisible()).toBeTruthy();
    expect(await this.searchTransactionBlockChain.isVisible()).toBeTruthy();
    expect(await this.searchTransactionValue.isVisible()).toBeTruthy();
    expect(await this.searchTransactionFees.isVisible()).toBeTruthy();
    expect(await this.searchTransactionTime.isVisible()).toBeTruthy();
    expect(await this.closeIcon.isVisible()).toBeTruthy();
    expect(await this.searchCloseButtonTooltip.isVisible()).toBeTruthy();
    expect(await this.addToBoardButton.isVisible()).toBeTruthy();
    await this.addToBoardButton.hover();
    expect(await this.searchAddToBoardButtonTooltip.isVisible()).toBeTruthy();
  }

  /**
   * This function is used to verify the search results
   */
  public async verifySearchResultsCount(searchCount: string, search: string) {
    const actualResult = await this.page.locator('//div[contains(text(),"' + searchCount + '")]').count() - 1;
    const expectedResult = await this.page.locator('//div[contains(text(),"' + search + '")]/span').textContent();
    expect(actualResult.toString()).toEqual(expectedResult?.slice(1, -1));
  }

  /**
   * This function is used to add currency to board
   */
  public async addCurrencyToBoard(currency: string) {
    const currencies = currency.split(",");
    for (let i = 0; i < currencies.length; i++) {
      const searchResult = this.page.locator('//div[contains(text(),"' + currencies[i] + '")]').last();
      if (JSON.stringify(await searchResult.textContent()).includes(currencies[i])) {
        await this.page.waitForTimeout(2000);
        await searchResult.click();
        await this.clickOnAddToBoard();
      }
    }
  }

  /**
   * This function is used to verify board exists after deletion
   */
  public async verifyBoardExistsAfterDeletion(board: string) {
    if (await this.filesAndFoldersExpandIcon.isVisible())
      await this.filesAndFoldersExpandIcon.click();
    await this.page.waitForSelector("(//ul[@id='file-list']//div[contains(@class,'start')])[1]", { state: 'visible' });
    await this.searchFilesAndFolders.fill(JSON.stringify(board).slice(1, -1));
    await this.page.waitForTimeout(5000);
    const isBoardVisible = await this.page.locator("//div[contains(@class,'truncate place-content-start') and text()='" + board + "']").isVisible();
    expect(isBoardVisible).toBeFalsy();
    expect(await this.addNewWorkspaceText.isVisible()).toBeTruthy();
  }

  /**
   * This function is used to verify remove and add to board plus icon
   */
  public async verifyRemoveAndAddToBoardPlusIcon() {
    expect(await this.searchDeleteIcon.isVisible()).toBeFalsy();
    expect(await this.searchAddToBoardPlusIcon.isVisible()).toBeFalsy();
  }

  /**
   * This function is used to verify already added icon
   */
  public async verifyAlreadyAddedIcon(currency: string) {
    await this.page.waitForLoadState("networkidle");
    const currencies = currency.split(",");
    for (let i = 0; i < currencies.length; i++) {
      const searchResult = this.page.locator('//div[contains(text(),"' + currencies[i] + '")]').last();
      if (JSON.stringify(await searchResult.textContent()).includes(currencies[i])) {
        await searchResult.click();
        expect(await this.alreadyAdded.isVisible()).toBeTruthy();
        expect(await this.addToBoardButton.isHidden()).toBeTruthy();
      }
    }
  }

  /**
   * This function is used to verify watched address is visible in Watched tab
   */
  public async verifyWatchedAddressIsVisible(board: string, address: string) {
    console.log("//span[contains(text(),'" + board + "')]//ancestor::div/preceding-sibling::div/span[contains(text(),'" + address.substring(address.length - 13) + "')]");
    const isAddressWatched = await this.page.locator("//span[contains(text(),'" + board + "')]//ancestor::div/preceding-sibling::div/span[contains(text(),'" + address.substring(address.length - 13) + "')]").isVisible();
    return isAddressWatched;
  }

  /**
   * This function is used to click on modify button for an address in Watched tab
   */
  async clickOnModifyBtnForWatchedAddress(board: string, address: string) {
    const isAddressWatched = await this.page.locator("//span[contains(text(),'" + board + "')]//ancestor::div/preceding-sibling::div/span[contains(text(),'" + address.substring(address.length - 13) + "')]").isVisible();
    if (isAddressWatched) {
      await this.page.locator("//span[contains(text(),'" + board + "')]//ancestor::div/preceding-sibling::div/span[contains(text(),'" + address.substring(address.length - 13) + "')]//ancestor::div[contains(@class,'flex flex-col gap')]//following-sibling::div").last().click();
      await this.recentTabModifyBtn.click();
      await this.page.waitForTimeout(3000);
    }
  }

  /**
   * This function is used to click on remove address from watchlist button for an address in Watched tab
   */
  async clickOnRemoveBtnForWatchedAddress(board: string, address: string, expectedToastMessage: string) {
    const isAddressWatched = await this.page.locator("//span[contains(text(),'" + board + "')]//ancestor::div/preceding-sibling::div/span[contains(text(),'" + address.substring(address.length - 13) + "')]").isVisible();
    if (isAddressWatched) {
      await this.page.locator("//span[contains(text(),'" + board + "')]//ancestor::div/preceding-sibling::div/span[contains(text(),'" + address.substring(address.length - 13) + "')]//ancestor::div[contains(@class,'flex flex-col gap')]//following-sibling::div").last().click();
      await this.recentTabRemoveAddressFromWatchlistBtn.click();
      await this.page.waitForTimeout(2000);
      const actualtext = await this.detailsPanelPage.watchlistRemovalToastMessage.textContent();
      expect(actualtext).toMatch(expectedToastMessage);
      await this.page.waitForTimeout(3000);
    }
  }

  /**
   * this function is used to delete the board
   */
  async deleteTheBoard(board: string) {
    await this.performFileOrFolderSearch(board.replace(/"/g, '').split('(')[1]);
    await this.page.waitForTimeout(2000);
    await this.threeDotsBtn.last().click();
    await this.deleteBtn.click();
    await this.deleteFolderConfirmationBtn.click();
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to close update watchlist dialog
   */
  public async closeUpdateWatchlistDialog() {
    await this.updateWatchlistCloseBtn.click();
  }

  /**
   * This function is used to click on board in watched tab
   */
  public async clickOnBoardInWatchedTab(board: string) {
    await this.page.locator("//span[contains(text(),'" + board + "')]/parent::a").click();
    await this.page.waitForTimeout(5000);
  }
}