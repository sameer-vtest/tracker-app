import { Locator, Page, expect } from "@playwright/test";
import { GraphToolbarPage } from "./graph-toolbar-page";

export class GraphPage {
  readonly page: Page;

  private _graphToolbarPage?: GraphToolbarPage;
  readonly bitCoinValue: Locator;
  readonly closeButton: Locator;
  readonly linkCloseButton: Locator;
  readonly searchCloseButton: Locator;
  readonly nodeAddress: Locator;
  readonly linkAddress: Locator;
  readonly canvas: Locator;
  readonly fitIcon: Locator;
  readonly showAssetUSDValuesOnLinks: Locator;
  readonly graphDropdown: Locator;
  readonly deleteGraphButton: Locator;
  readonly deletePopupDeleteButton: Locator;
  readonly boardName: Locator;
  readonly deleteToastMessage: Locator;
  readonly graphSavedToastMessage: Locator;
  readonly graphTitle: Locator;
  readonly graphShareIcon: Locator;
  readonly graphUpdatedSuccessToastMessage: Locator;
  readonly addressesCount: Locator;
  readonly searchTransactions: Locator;
  readonly searchTransactionhash: Locator;
  readonly searchTransactionBlockChain: Locator;
  readonly searchTransactionValue: Locator;
  readonly searchTransactionFees: Locator;
  readonly searchTransactionTime: Locator;
  readonly closeIcon: Locator;
  readonly searchCloseButtonTooltip: Locator;
  readonly addToBoardButton: Locator;
  readonly graphMovedSuccessToastMessage: Locator;
  readonly searchPopup: Locator;
  readonly annotateColorPanelDropdown: Locator;
  readonly annotateColorBlock: Locator;
  readonly annotateLabel: Locator;
  readonly annotateLabelInput: Locator;
  readonly annotateLabelDoneBtn: Locator;
  readonly annotateGlyph: Locator;
  readonly annotateGlyphGreen: Locator;
  readonly annotateGlyphYellow: Locator;
  readonly annotateGlyphOrange: Locator;
  readonly annotateGlyphRed: Locator;
  readonly annotateDeleteBtn: Locator;
  readonly annotateSubmitAttributionInfo: Locator;
  readonly annotateSubmitInfoDialog: Locator;
  readonly annotateSubmitInfoCloseIcon: Locator;
  readonly annotateSubmitInfoCancelBtn: Locator;
  readonly annotateSubmitInfoSubmitBtn: Locator;
  readonly annotateSubmitInfoAddress: Locator;
  readonly annotateSubmitInfoName: Locator;
  readonly annotateSubmitInfoCategory: Locator;
  readonly annotateSubmitInfoDescription: Locator;
  readonly annotateSubmitInfoWebsiteURL: Locator;
  readonly annotateSubmitInfoConfidentialInfo: Locator;
  readonly annotateSubmitInfoSuccessToastMsg: Locator;
  readonly annotateSubmitInfoSelectFiles: Locator;
  readonly annotateReset: Locator;
  readonly linkAnnotateLabel: Locator;
  readonly linkAnnotateGlyph: Locator;
  readonly linkAnnotateReset: Locator;
  readonly linkAnnotateSize: Locator;
  readonly linkAnnotateStyle: Locator;
  readonly linkAnnotateSizeBtn: Locator;
  readonly linkAnnotateStyleDotted: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bitCoinValue = page.getByText("bitcoincash:");
    this.closeButton = page.locator("div:nth-child(4) > .text-gray-500 > path");
    this.linkCloseButton = page.locator("div:nth-child(2) > .text-gray-500");
    this.canvas = page.locator('//canvas[contains(@id,"rg-chart")]');
    this.nodeAddress = page.getByText(
      "0x05c79917a8f6a715ffb9f2890c744fb78bd8213b"
    );
    this.linkAddress = page.getByText(
      "0x05c79917a8f6a715ffb9f2890c744fb78bd8213b"
    );
    this.fitIcon = page.locator("div:nth-child(4) > button:nth-child(3)");
    this.showAssetUSDValuesOnLinks = page.locator(
      '//div[contains(@class,"container")]//button[contains(@data-tooltip-html,"values on links")]'
    );
    this.graphDropdown = page.locator("//div[contains(@class,'boardNameHeader')]/child::div").last();
    this.deleteGraphButton = page.locator(
      "//span[contains(text(),'Delete graph')]"
    );
    this.deletePopupDeleteButton = page.locator(
      "//button[contains(text(),'Delete')]"
    );
    this.boardName = page.locator("//span[contains(@class,'text-sm-regular')]");
    this.deleteToastMessage = page.locator("//div[contains(.,'Graph deleted successfully.')]").last();
    this.graphSavedToastMessage = page.locator("//div[contains(.,'Graph has been saved successfully')]").last();
    this.searchCloseButton = page.locator("//button[.='Close']");
    this.graphTitle = page.locator("//span[contains(text(),'Untitled')]");
    this.graphShareIcon = page.locator('//button[contains(@data-tooltip-html,"Share<br/>Ctrl + Shift")]');
    this.graphUpdatedSuccessToastMessage = page.locator("//div[contains(.,'Graph name updated successfully.')]").last();
    this.addressesCount = page.locator("//span[@class='ml-1']");
    this.searchTransactions = page.locator("//div[contains(text(),'Transactions')]/../div").last();
    this.searchTransactionhash = page.locator("//div[contains(text(),'Transaction hash')]/../div").last();
    this.searchTransactionBlockChain = page.locator("//div[contains(text(),'blockchain')]/../div").last();
    this.searchTransactionValue = page.locator("//div[contains(text(),'Transaction Value:')]/../div").last();
    this.searchTransactionFees = page.locator("//div[contains(text(),'Fees:')]/../div").last();
    this.searchTransactionTime = page.locator("//div[contains(text(),'Transaction time:')]/../div").last();
    this.closeIcon = page.locator("//button[.='Close']");
    this.searchCloseButtonTooltip = page.locator('//button[@data-tooltip-html="Close Panel"] | //button[@data-tooltip-html="Close panel"]');
    this.addToBoardButton = page.locator("[data-tooltip-html='Add to board']");
    this.graphMovedSuccessToastMessage = page.locator("//div[contains(.,'Graph moved successfully.')]").last();
    this.searchPopup = page.locator("//div[contains(@class,'absolute w-full rounded-lg')]");
    this.annotateColorPanelDropdown = page.locator("(//div[contains(@class,'relative inline-block text-left mr-2')]//button/./*[name()='svg'])[1]");
    this.annotateColorBlock = page.locator("(//div[contains(@class,'flex-wrap justify-around')]//button/./*[name()='svg'])[2]");
    this.annotateLabel = page.locator("(//button[contains(@class,'justify-center items-center')])[2]");
    this.annotateLabelInput = page.locator("//input[contains(@id,'label-input')]");
    this.annotateLabelDoneBtn = page.locator("//button[contains(text(),'Done')]");
    this.annotateGlyph = page.locator("(//div[contains(@class,'relative inline-block text-left mr-2')]//button/./*[name()='svg'])[2]");
    this.annotateGlyphGreen = page.locator("//div[contains(@class,'rounded-full bg-green')]/./*[name()='svg']");
    this.annotateGlyphYellow = page.locator("//div[contains(@class,'rounded-full bg-yellow')]/./*[name()='svg']");
    this.annotateGlyphOrange = page.locator("//div[contains(@class,'rounded-full bg-orange')]/./*[name()='svg']");
    this.annotateGlyphRed = page.locator("//div[contains(@class,'rounded-full bg-red')]/./*[name()='svg']");
    this.annotateDeleteBtn = page.locator("//button/span[contains(text(),'Delete')]");
    this.annotateSubmitAttributionInfo = page.locator("//button/span[contains(text(),'Submit attribution info')]");
    this.annotateSubmitInfoDialog = page.locator("//div[contains(@class,'transform transition-all')]");
    this.annotateSubmitInfoCloseIcon = page.locator("//span[contains(text(),'Close')]/parent::button");
    this.annotateSubmitInfoCancelBtn = page.locator("//button[contains(text(),'Cancel')]");
    this.annotateSubmitInfoSubmitBtn = page.locator("//button[contains(text(),'Submit')]");
    this.annotateSubmitInfoAddress = page.locator('//input[@id="entity-id-input"]');
    this.annotateSubmitInfoName = page.locator('//input[@id="suggested-name-input"]');
    this.annotateSubmitInfoCategory = page.locator('//input[@id="category-input"]');
    this.annotateSubmitInfoWebsiteURL = page.locator('//input[@id="website-url-input"]');
    this.annotateSubmitInfoDescription = page.locator('//textarea[@id="description-input"]');
    this.annotateSubmitInfoConfidentialInfo = page.locator('//textarea[@id="conf-info-input"]');
    this.annotateSubmitInfoSuccessToastMsg = page.locator("//div[contains(.,'Attribution info submitted successfully')]").last();
    this.annotateReset = page.locator("(//button[contains(@class,'justify-center items-center')])[3]");
    this.annotateSubmitInfoSelectFiles = page.locator("//button[contains(text(),'Select file')]");
    this.linkAnnotateLabel = page.locator("(//button[contains(@class,'justify-center items-center')])[1]");
    this.linkAnnotateGlyph = page.locator("(//div[contains(@class,'relative inline-block text-left mr-2')]//button/./*[name()='svg'])[4]")
    this.linkAnnotateReset = page.locator("(//button[contains(@class,'justify-center items-center')])[2]");
    this.linkAnnotateSize = page.locator("(//div[contains(@class,'relative inline-block text-left mr-2')]//button/./*[name()='svg'])[2]");
    this.linkAnnotateSizeBtn = page.locator("(//button/button[contains(@class,'flex justify-stretch items-center')])[3]");
    this.linkAnnotateStyle = page.locator("(//div[contains(@class,'relative inline-block text-left mr-2')]//button/./*[name()='svg'])[3]");
    this.linkAnnotateStyleDotted = page.locator("//div[contains(@class,'border-dotted')]");
  }

  get graphToolbarPage(): GraphToolbarPage {
    if (!this._graphToolbarPage) {
      this._graphToolbarPage = new GraphToolbarPage(this.page);
    }
    return this._graphToolbarPage;
  }

  async takeScreenShot() {
    await this.canvas.screenshot({ path: "canvas.png" });
  }

  async performSelectionOnCanvas() {
    await this.canvas.hover({
      timeout: 5000,
      position: {
        //Random Position
        x: 30,
        y: 13,
      },
      force: true
    });
    await this.page.mouse.down();
    await this.canvas.hover({
      timeout: 5000,
      position: {
        x: 1193,
        y: 450,
      },
      force: true
    });
    await this.page.mouse.up();
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to verify graph container page is visible
   */
  async verifyGraphContainerPageIsVisible() {
    await this.page.waitForSelector("//canvas[contains(@id,'rg-chart')]", { state: 'visible' });
    expect(await this.canvas.isVisible()).toBeTruthy();
  }

  /**
   * This function is used to click on show value on links
   */
  async showValuesOnLinks() {
    await this.showAssetUSDValuesOnLinks.click();
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * This function is used to total number of nodes in a board
   */
  async fetchNumberOfNodesInBoard() {
    const positions: any = await this.page.evaluate(
      "window.getFinalViewPositions()"
    );
    const nodes = Object.keys(positions);
    console.log("total nodes: ", nodes.length);
  }

  /**
   * This function is used to fetch newly created board name
   */
  async fetchNewlyCreatedBoardName() {
    await this.page.waitForTimeout(5000);
    const board: string | null = await this.boardName.textContent();
    return board;
  }

  /**
   * This function is used to verify graph saved toast message
   */
  async verifyGraphSavedToastMessage(expectedText: string) {
    if (await this.graphSavedToastMessage.isVisible()) {
      const actualtext = await this.graphSavedToastMessage.textContent();
      expect(actualtext).toBe(expectedText);
    }
  }

  /**
   * This function is used to verify graph updated toast message
   */
  async verifyGraphUpdatedSuccessToastMessage(expectedText: string) {
    if (await this.graphUpdatedSuccessToastMessage.isVisible()) {
      const actualtext = await this.graphUpdatedSuccessToastMessage.textContent();
      expect(actualtext).toBe(expectedText);
    }
  }

  /**
   * This function is used to verify graph updated toast message
   */
  async verifyGraphMovedSuccessToastMessage(expectedText: string) {
    if (await this.graphMovedSuccessToastMessage.isVisible()) {
      const actualtext = await this.graphMovedSuccessToastMessage.textContent();
      expect(actualtext).toBe(expectedText);
    }
  }

  /**
   * This function is used to click on close button in search preview
   */
  async clickOnSearchCloseButton() {
    if (await this.searchCloseButton.first().isVisible()) {
      await this.searchCloseButton.first().click();
    }
  }

  /**
   * This function is used to click on graph dropdown
   */
  async clickOnGraphDropdown() {
    await this.page.waitForTimeout(3000)
    await this.graphDropdown.click();
  }

  /**
   * This function is used to delete graph
   */
  async deleteGraphFromBoard(expectedText: string) {
    await this.graphDropdown.click();
    await this.deleteGraphButton.click();
    await this.deletePopupDeleteButton.click();
    await this.page.waitForTimeout(2000);
    if (await this.deleteToastMessage.isVisible()) {
      const actualtext = await this.deleteToastMessage.textContent();
      expect(actualtext).toBe(expectedText);
    }
    await this.page.waitForTimeout(5000);
  }

  /**
   * This function is used to verify search results count
   */
  public async verifySearchResultsCount(searchCount: string, search: string) {
    const actualResult = await this.page.locator('//div[contains(text(),"' + searchCount + '")]').count() - 1;
    const expectedResult = await this.page.locator('//div[contains(text(),"' + search + '")]/span').textContent();
    expect(actualResult.toString()).toEqual(expectedResult?.slice(1, -1));
  }

  /**
   * This function is used to verify transaction result contents
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
    expect(await this.addToBoardButton.isVisible()).toBeTruthy();
  }

  /**
   * This function is used to verify search popup is not displayed
   */
  public async verifySearchPopupNotDisplayed() {
    const isPopupClosed = await this.searchPopup.isVisible();
    expect(isPopupClosed).not.toBeTruthy();
  }

  /**
   * This function is used to verify annotate popup is displayed
   */
  public async verifyAnnotatePopup() {
    const isPopupDisplayed = await this.graphToolbarPage.annotateDialog.isVisible();
    expect(isPopupDisplayed).toBeTruthy();
  }

  /**
   * This function is used to select color from color panel
   */
  async clickOnColorDropdownAndSelectColor() {
    await this.annotateColorPanelDropdown.click();
    await this.annotateColorBlock.click();
    await this.page.waitForTimeout(3000);
  }

   /**
   * This function is used to update node label
   */
   async annotateAddLabel(label: string){
    await this.annotateLabel.click();
    await this.annotateLabelInput.fill(label);
    await this.annotateLabelDoneBtn.click();
    await this.page.waitForTimeout(3000);
  }

   /**
   * This function is used to add glyph for a node
   */
   async annotateAddGlyph(){
    await this.annotateGlyph.click();
    await this.annotateGlyphGreen.click();
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to add glyph for a node
   */
  async annotateDeleteNode(){
   await this.annotateDeleteBtn.click();
   await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to click on annotate submit Info
   */
   async clickAnnotateSubmitInfo(){
    await this.annotateSubmitAttributionInfo.click();
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to verify submit info dialog
   */
  async verifyAnnotateSubmitAttributeInfoDialog(dialog: boolean){
    if(dialog){
    expect(this.annotateSubmitInfoDialog.isVisible()).toBeTruthy();
    expect(this.annotateSubmitInfoAddress.isVisible()).toBeTruthy();
    expect(this.annotateSubmitInfoWebsiteURL.isVisible()).toBeTruthy();
    expect(this.annotateSubmitInfoCategory.isVisible()).toBeTruthy();
    expect(this.annotateSubmitInfoDescription.isVisible()).toBeTruthy();
    expect(this.annotateSubmitInfoConfidentialInfo.isVisible()).toBeTruthy();
    expect(this.annotateSubmitInfoSubmitBtn.isDisabled()).toBeTruthy();
    }
  }

  /**
   * This function is used to click on annotate submit Info close icon
   */
  async clickAnnotateSubmitInfoCloseIcon(){
    await this.annotateSubmitInfoCloseIcon.click();
    await this.page.waitForTimeout(2000);
  }

  /**
   * This function is used to click on annotate submit Info cancel btn
   */
  async clickAnnotateSubmitInfoCancelBtn(){
    await this.annotateSubmitInfoCancelBtn.click();
    await this.page.waitForTimeout(2000);
  }

  /**
   * This function is used to verify graph updated success toast message
   */
  async verifyAnnotateSubmitInfoSuccessToastMsg(expectedText: string) {
    const actualtext = await this.annotateSubmitInfoSuccessToastMsg.textContent();
    expect(actualtext).toBe(expectedText);
  }

  /**
   * This function is used to click on annotate submit Info submit btn
   */
  async clickAnnotateSubmitInfoSubmitBtn(expectedText: string){
    await this.annotateSubmitInfoSubmitBtn.click();
    await this.verifyAnnotateSubmitInfoSuccessToastMsg(expectedText)
    await this.page.waitForTimeout(2000);
  }

  /**
   * This function is used to verify the address value
   */
  async verifyAnnotateSubmitInfoAddressValue(nodeAddress: string){
    const addressValue = await this.annotateSubmitInfoAddress.getAttribute("value");
    console.log(addressValue);
    expect(addressValue).toBe(nodeAddress)
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to fill Annotate Submit Info Dialog fields
   */
  async fillAnnotateSubmitInfoDialogFields(name: string, category: string, desc: string, ConfInfo: string){
    await this.annotateSubmitInfoName.fill(name);
    await this.annotateSubmitInfoCategory.fill(category);
    await this.annotateSubmitInfoDescription.fill(desc);
    await this.annotateSubmitInfoConfidentialInfo.fill(ConfInfo);
    await this.page.waitForTimeout(2000);
  }

  /**
   * This function is used to click annotate reset button for node
   */
   async annotateResetBtn() {
    await this.annotateReset.click();
    await this.page.waitForTimeout(5000);
  }

   /**
   * This function is used to upload files
   */
   async annotateSubmitInfoUploadFiles() {
    if(await this.annotateSubmitInfoSelectFiles.isVisible()){
    await this.page.waitForTimeout(3000);
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles('Screenshot12.png');
    await this.page.waitForTimeout(3000);
    }
  }

  /**
   * This function is used to verify transaction details
   */
  async rightClickOnLink(transactionType: string) {
    await this.fitIcon.click();
    await this.page.waitForTimeout(3000);
    if (transactionType === "transfer") {
      await this.canvas.click({
        //position of the node
        button: 'right',
        position: {
          x: 640,
          y: 237,
        },
      });
    } else {
      await this.canvas.click({
        //position of the node
        button: 'right',
        position: {
          x: 629,
          y: 245,
        },
      });
    }
  }

  /**
   * This function is used to update link label
   */
  async annotateUpdateLinkLabel(label: string){
    await this.linkAnnotateLabel.click();
    await this.annotateLabelInput.fill(label);
    await this.annotateLabelDoneBtn.click();
    await this.page.waitForTimeout(3000);
  }

   /**
   * This function is used to add glyph for a link
   */
   async annotateAddLinkGlyph(){
    await this.linkAnnotateGlyph.click();
    await this.annotateGlyphGreen.click();
    await this.page.waitForTimeout(2000);
  }

  /**
   * This function is used to click annotate reset button for link
   */
  async annotateLinkResetBtn() {
    await this.linkAnnotateReset.click();
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to click annotate link width size
   */
  async annotateLinkSize() {
    await this.linkAnnotateSize.click();
    await this.linkAnnotateSizeBtn.click();
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to click annotate link style
   */
  async annotateLinkDesign() {
    await this.linkAnnotateStyle.click();
    await this.linkAnnotateStyleDotted.click();
    await this.page.waitForTimeout(3000);
  }
}