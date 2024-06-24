import { Locator, Page, expect } from "@playwright/test";
import { GraphPage } from "./graph-page";
import { TrackerDashboardPage } from "../dashboard-pages/dashboard-page";
import { GraphToolbarPage } from "./graph-toolbar-page";
import { log } from "console";

export class DetailsPanelPage {
  readonly page: Page;
  private _graphPage?: GraphPage;
  private _dashboardPage?: TrackerDashboardPage;
  private _graphToolbarPage?: GraphToolbarPage;
  readonly detailsPanelContainer: Locator;
  readonly detailsPanelDigitalAsset: Locator;
  readonly detailsPanelCloseIcon: Locator;
  readonly detailsPanelBackBtn: Locator;
  readonly watchBtn: Locator;
  readonly minDollarValue: Locator;
  readonly maxDollarValue: Locator;
  readonly startWatchingBtn: Locator;
  readonly watchingTheAddressNowToastMessage: Locator;
  readonly WatchUpdateBtn: Locator;
  readonly updatedTheWatcherToastMessage: Locator;
  readonly removeFromWatchlistBtn: Locator;
  readonly watchlistRemovalToastMessage: Locator;
  readonly filterBtn: Locator;
  readonly filterInput: Locator;
  readonly filterApplyBtn: Locator;
  readonly filterBtnRedIcon: Locator;
  readonly filterResetBtn: Locator;
  readonly entityDropdown: Locator;
  readonly balanceTooltip: Locator;
  readonly receivedTooltip: Locator;
  readonly sentTooltip: Locator;
  readonly summaryExpandIcon: Locator;
  readonly summaryPieChart: Locator;
  readonly transfersTooltip: Locator;
  readonly watchlistCloseBtn: Locator;
  readonly removeIcon: Locator;

  constructor(page: Page) {
    this.page = page;

    this.detailsPanelCloseIcon = page.locator("//div[contains(@data-tooltip-html,'File Export')]//following-sibling::div/*[name()='svg']");
    this.detailsPanelBackBtn = page.locator("(//div[contains(@class,'transition')])[1]//*[name()='svg']").first();
    this.watchBtn = page.locator("//button[@data-tooltip-html='Watch']");
    this.minDollarValue = page.locator("//input[@id='minInput']");
    this.maxDollarValue = page.locator("//input[@id='maxInput']");
    this.startWatchingBtn = page.locator("//button[text()='Start Watching']");
    this.WatchUpdateBtn = page.locator("//button[text()='Update']");
    this.watchingTheAddressNowToastMessage = page.locator("//div[contains(text(),'Watching the address now!')]");
    this.updatedTheWatcherToastMessage = page.locator("//div[contains(text(),'Updated the watcher!')]");
    this.removeFromWatchlistBtn = page.locator("//button[contains(text(),'Remove from Watchlist')]");
    this.watchlistRemovalToastMessage = page.locator("//div[contains(text(),'Removed address from watchlist successfully.')]");
    this.detailsPanelContainer = page.locator("(//div[contains(@class,'ease-in-out transition-all transform border')]/parent::div)[2]");
    this.detailsPanelDigitalAsset = page.locator("((//div[contains(@class,'border-b border')]//div[contains(@class,'text-2xs-regular')])[1]//following::span[contains(@class,'text-3xs')])[1]");
    this.filterBtn = page.locator("//img[@alt='filters']");
    this.filterInput = page.locator("//input[contains(@id,'input')]");
    this.filterApplyBtn = page.locator("//button[contains(text(),'Apply')]");
    this.filterBtnRedIcon = page.locator("//img[@alt='filters']/../div[contains(@class,'bg-red')]");
    this.filterResetBtn = page.locator("//button[contains(text(),'Reset')]");
    this.entityDropdown = page.locator("//span[contains(text(),'Entity')]//following::span/*[name()='svg']");
    this.balanceTooltip = page.locator("(//div[contains(text(),'balance')]/./*[name()='svg'][contains(@data-tooltip-html,'This represents the token balances')])");
    this.receivedTooltip = page.locator("(//div[contains(text(),'received')]/./*[name()='svg'][contains(@data-tooltip-html,'This value is calculated based')])");
    this.sentTooltip = page.locator("(//div[contains(text(),'sent')]/./*[name()='svg'][contains(@data-tooltip-html,'This value is calculated based')])");
    this.summaryExpandIcon = page.locator('(//div[@class="text-gray-500"])[2]//*[name()="svg"]');
    this.summaryPieChart = page.locator("//*[contains(@class,'highcharts-series-0 highcharts-pie-series highcharts-tracker')]");
    this.transfersTooltip = page.locator("//div[contains(text(),'transfers')]/./*[name()='svg'][contains(@data-tooltip-html,'This refers to the total number of')]");
    this.watchlistCloseBtn = page.locator("//span[text()='WATCH THE ADDRESS']//parent::div//*[name()='svg']");
    this.removeIcon = page.locator("//button[contains(@data-tooltip-html,'Remove<br/>Ctrl')]")
  }

  get graphPage(): GraphPage {
    if (!this._graphPage) {
      this._graphPage = new GraphPage(this.page);
    }
    return this._graphPage;
  }

  get dashboardPage(): TrackerDashboardPage {
    if (!this._dashboardPage) {
      this._dashboardPage = new TrackerDashboardPage(this.page);
    }
    return this._dashboardPage;
  }

  get graphToolbarPage(): GraphToolbarPage {
    if (!this._graphToolbarPage) {
      this._graphToolbarPage = new GraphToolbarPage(this.page);
    }
    return this._graphToolbarPage;
  }

  /**
   * This function is used to click on the specified address on the board
   */
  async clickOnSpecifiedAddressOnTheBoard(expectedAddress: string, digitalAsset: string) {
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
          position: {
            x: x,
            y: y,
          },
        });
      }
    }
    await this.page.waitForTimeout(5000);
  }

  /**
  * This function is used to hover on the specified address on the board
  */
  async hoverOnSpecifiedAddressOnTheBoard(expectedAddress: string, digitalAsset: string) {
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
        });
      }
    }
    await this.page.waitForTimeout(5000);
  }

  /**
   * This function is used to verify the specified address on the board
   */
  async verifySpecifiedAddressOnTheBoard(expectedAddress: string) {
    await this.graphPage.fitIcon.click();
    await this.page.waitForTimeout(5000);
    const positions: any = await this.page.evaluate('window.getFinalViewPositions()');
    for (let i = 0; i < Object.keys(positions).length; i++) {
      const nodePosition = Object.keys(positions)[i];
      let responseNodeKey = nodePosition.split('-');
      expect(expectedAddress.includes(responseNodeKey[1])).toBeFalsy();
    }
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to verify address in details panel
   */
  async verifySpecifiedAddressMatchesWithAddressInDetailsPanel(address: string) {
    const actualAddress = await this.page.locator("//div[contains(@class,'border-b border')]//div[text()='" + address + "']").textContent();
    expect(actualAddress).toContain(address);
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to verify digital asset in details panel
   */
  async verifySpecifiedCurrencyMatchesWithCurrencyInDetailsPanel(digitalAsset: string) {
    const actualDigitalAsset = this.page.locator("//span[contains(text(),'" + digitalAsset + "')]");
    expect(JSON.stringify(await actualDigitalAsset.textContent())).toContain(digitalAsset);
  }

  /**
   * This function is used to verify transaction details
   */
  async verifyTransactionDetails(transactionType: string, expectedTransactionHash: string, closeDetailsPanel: boolean) {
    await this.graphPage.fitIcon.click();
    await this.page.waitForTimeout(3000);
    if (transactionType === "transfer") {
      await this.graphPage.canvas.click({
        //position of the node
        position: {
          x: 640,
          y: 237,
        },
      });
    } else {
      await this.graphPage.canvas.click({
        //position of the node
        position: {
          x: 629,
          y: 245,
        },
      });
    }
    const actualTransactionHash = this.page.locator("//div[contains(text(),'" + expectedTransactionHash.substring(0, 5) + "')]");
    await actualTransactionHash.click();
    await this.page.waitForTimeout(5000);
    expect(await actualTransactionHash.textContent()).toBe(expectedTransactionHash);
    await this.page.waitForTimeout(3000);
    if (closeDetailsPanel)
      await this.closeDetailsPanel();
  }

  /**
   * This function is used to verify address is copiable in meta data
   */
  async verifySpecifiedAddressIsCopiableInMetadata(address: string) {
    const copyIcon = this.page.locator("//div[contains(@class,'border-b border')]//div[contains(text(),'" + address + "')]/../*[name()='svg']");
    if (await copyIcon.isVisible()) {
      await copyIcon.click();
      const copiedGreenCheckMark = this.page.locator("//div[contains(@class,'border-b border')]//div[contains(text(),'" + address + "')]/../*[name()='svg'][contains(@class,'green')]");
      await expect(copiedGreenCheckMark).toBeVisible();
      await this.page.waitForTimeout(3000);
      await expect(copiedGreenCheckMark).toBeHidden();
    } else {
      console.log(address + " Copy icon is not visible.");

    }
  }

  /**
   * This function is used to verify address is copiable in details panel
   */
  async verifySpecifiedAddressIsCopiableInDetailsPanel(address: string) {
    const copyIcon = this.page.locator("//div[contains(@class,'relative overflow')]//div[contains(text(),'" + address + "')]/../*[name()='svg']");
    if (await copyIcon.first().isVisible()) {
      await copyIcon.first().click();
      const copiedGreenCheckMark = this.page.locator("//div[contains(@class,'relative overflow')]//div[contains(text(),'" + address + "')]/../*[name()='svg'][contains(@class,'green')]");
      await expect(copiedGreenCheckMark).toBeVisible();
      await this.page.waitForTimeout(3000);
      await expect(copiedGreenCheckMark).toBeHidden();
    } else {
      console.log(address + " Copy icon is not visible.");
    }
  }

  /**
   * This function is used to close details panel
   */
  async closeDetailsPanel() {
    if (await this.detailsPanelCloseIcon.isVisible())
      await this.detailsPanelCloseIcon.click();
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to click on details panel back button
   */
  async clickOnDetailsPanelBackBtn() {
    if (await this.detailsPanelBackBtn.isVisible())
      await this.detailsPanelBackBtn.click();
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to click on watch button
   */
  async clickOnWatchBtn() {
    if (await this.watchBtn.isVisible())
      await this.watchBtn.click();
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to verify dialog is visible
   */
  public async verifyDialogIsVisible(dialog: string) {
    const isDialogVisible = await this.page.locator("//*[contains(text(),'" + dialog + "')]").isVisible();
    return isDialogVisible;
  }

  /**
   * This function is used to close watchlist dialog
   */
  public async closeWatchlistDialog() {
    await this.watchlistCloseBtn.click();
  }

  /**
   * This function is used to watch the address
   */
  async watchTheAddress(watchTypeInput: string, minDollarValue: string, maxDollarValue: string, transferTypeInput: string, expectedToastMessage: string) {
    const watchType = await this.page.$$("//div[contains(@class,'full flex items-center')]//p");
    const transferType = await this.page.$$("//div[contains(@class,'full flex flex')]//p[contains(@class,'semibold')]");
    for (let i = 0; i < watchType.length; i++) {
      let watchTypeText = await watchType[i].textContent();
      if (watchTypeText?.includes(watchTypeInput)) {
        await watchType[i].click();
        break;
      }
    }
    if (minDollarValue)
      await this.minDollarValue.fill(minDollarValue);
    if (maxDollarValue)
      await this.maxDollarValue.fill(maxDollarValue);
    for (let j = 0; j < transferType.length; j++) {
      let transferTypeText = await transferType[j].textContent();
      if (transferTypeText?.includes(transferTypeInput)) {
        await transferType[j].click();
        break;
      }
    }
    if (await this.startWatchingBtn.isVisible()) {
      await this.startWatchingBtn.click();
      await this.page.waitForTimeout(2000);
      const actualtext = await this.watchingTheAddressNowToastMessage.textContent();
      expect(actualtext).toMatch(expectedToastMessage);
    } else if (await this.WatchUpdateBtn.isVisible()) {
      await this.WatchUpdateBtn.click();
      await this.page.waitForTimeout(2000);
      const actualtext = await this.updatedTheWatcherToastMessage.textContent();
      expect(actualtext).toMatch(expectedToastMessage);
    }
  }

  /**
   * This function is used to remove address from watchlist
   */
  async removeAddressFromWatchlist(expectedToastMessage: string) {
    await this.clickOnWatchBtn();
    if (await this.removeFromWatchlistBtn.isVisible()) {
      await this.removeFromWatchlistBtn.click();
      await this.page.waitForTimeout(2000);
      const actualtext = await this.watchlistRemovalToastMessage.textContent();
      expect(actualtext).toMatch(expectedToastMessage);
    }
  }

  /**
   * This function is used to fetch digital asset in details panel
   */
  async fetchDigitalAssetFromMetaData() {
    const digitalAsset = await this.detailsPanelDigitalAsset.textContent();
    return digitalAsset;
  }

  /**
   * This function is used to get digital assets count in meta data
   */
  async getDigitalAssetsCountInMetaData() {
    const digitalAsset = this.page.locator("//div[contains(@class,'border-b border')]//span[contains(@class,'text-xs')]").first();
    const digitalAssetCount = await this.page.locator("(//div[contains(@class,'border-b border')]//span[contains(@class,'text-xs')])[2]").textContent();
    const remainingDigitalAssetCount = parseInt(JSON.stringify(digitalAssetCount).slice(1));
    return await digitalAsset.count() + remainingDigitalAssetCount;
  }

  /**
   * This function is used to get digital assets count in address detail
   */
  async getDigitalAssetsCountInAddressDetail() {
    const digitalAssetCount = (await this.page.$$("//div[contains(@class,'relative overflow-y-scroll')]//tr//td//span[contains(@class,'text-xs')]")).length;
    return digitalAssetCount;
  }

  /**
   * This function is used to filter balances
   */
  async filterBalances(balances: string[]) {
    await this.filterBtn.click();
    await this.page.waitForTimeout(2000);
    for (const balance of balances) {
      await this.filterInput.fill(balance);
      await this.page.locator("//span[contains(@data-tooltip-html,'" + balance + "')]//parent::div//preceding-sibling::div").click();
    }
    await this.filterApplyBtn.click();
    await this.page.waitForTimeout(5000);
    await expect(this.filterBtnRedIcon).toBeVisible();
  }

  /**
   * This function is used to verify filtered results in balances tab
   */
  async verifyFilteredResults(balances: string[]) {
    // Extract displayed balances from the grid
    const displayedBalances = await this.page.evaluate(() => {
      const balanceCells = Array.from(document.querySelectorAll('.relative.overflow-y-scroll [class*=text-xs]'));
      return balanceCells.map(cell => cell.textContent?.trim());
    });

    // Verify each displayed balance is in the applied filter list
    for (const balance of displayedBalances) {
      if (!balances.includes(`${balance}`)) {
        throw new Error(`Unexpected balance found in grid: ${balance}`);
      }
    }
  }

  /**
   * This function is used to reset filter
   */
  async resetFilter() {
    await this.filterBtn.click();
    await this.page.waitForTimeout(2000);
    await this.filterResetBtn.click();
    await this.page.waitForTimeout(5000);
    await expect(this.filterBtnRedIcon).not.toBeVisible();
  }

  /**
   * This function is used to select specified tab in details panel
   */
  async clickOnSpecifiedTab(tab: string) {
    await this.page.locator("//button[contains(text(),'" + tab + "')]").click();
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to filter by entity name/type in summary tab
   */
  async filterByEntityNameOrType(entityDropdown: string, entityNameOrType: string[]) {
    await this.filterBtn.click();
    await this.page.waitForTimeout(2000);
    if (entityDropdown === "Entity Type") {
      await this.entityDropdown.click();
      await this.page.locator("//li[contains(@class,'select')]/span[contains(text(),'" + entityDropdown + "')]").click();
    }
    for (const entity of entityNameOrType) {
      await this.filterInput.fill(entity);
      if (entityDropdown === "Entity Type")
        await this.page.locator("//div[contains(@value,'" + entity + "')]//parent::div//preceding-sibling::div").click();
      else
        await this.page.locator("//div[contains(@value,'" + entity + "')]/child::div/*[name()='svg']").click();
    }
    await this.filterApplyBtn.click();
    await this.page.waitForTimeout(5000);
    await expect(this.filterBtnRedIcon).toBeVisible();
  }

  /**
   * This function is used to verify filtered results for entity name in summary tab
   */
  async verifyFilteredResultsForEntityNameInSummaryTab(entityName: string[]) {
    // Extract displayed entity name from the grid
    const displayedEntities = await this.page.evaluate(() => {
      // Define the XPath expression
      let xpath = "//table//button/../..";

      // Evaluate the XPath expression
      const entityCells: Node[] = [];
      const iterator = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

      let node = iterator.iterateNext();
      while (node) {
        entityCells.push(node);
        node = iterator.iterateNext();
      }

      // Map the text content of each entity cell
      return entityCells.map(cell => cell.textContent?.trim());
    });

    // Verify each displayed entity name is in the applied filter list
    for (const entity of displayedEntities) {
      if (entity?.includes(' ...')) {
        let actualEntity = entity.split(' ...');

        if (!entityName.includes(`${actualEntity[0]}`))
          throw new Error(`Unexpected entity found in grid: ${entity[0]}`);
      } else if (!entityName.includes(`${entity}`))
        throw new Error(`Unexpected entity found in grid: ${entity}`);
    }
  }

  /** This function is used to verify the table header of Balances in detail panel for a node
  */
  async verifyTableHeader(headers: string) {
    await this.page.waitForTimeout(3000);
    const tableHeader = headers.split(",");
    for (let i = 0; i < tableHeader.length; i++) {
      expect(await this.page.locator('//div[contains(text(),"' + tableHeader[i] + '")]').first().isVisible()).toBeTruthy();
      await this.page.waitForTimeout(1000);
    }
  }

  /**
   * This function is used to verify the tooltip of Balances headers in detail panel for a node
   */
  async verifyHeadersTooltip() {
    await this.page.waitForTimeout(3000);
    expect(await this.balanceTooltip.isVisible()).toBeTruthy();
    expect(await this.receivedTooltip.isVisible()).toBeTruthy();
    expect(await this.sentTooltip.isVisible()).toBeTruthy();
  }

  /**
   * This function is used to verify the horizontal scroll bar
   */
  async verifyHorizontalScrollBar() {
    await this.page.waitForTimeout(3000);
    const tab = this.page.locator('//div[@class="relative overflow-y-scroll"]');
    await tab.waitFor({ state: 'visible' });
    const scrollWidth = await tab.evaluate(element => element.scrollWidth);
    const clientWidth = await tab.evaluate(element => element.clientWidth);
    console.log(scrollWidth + " " + clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  }

  /**
   * This function is used to verify the vertical scroll bar
   */
  async verifyVerticalScrollBar() {
    await this.page.waitForTimeout(3000);
    const tab = this.page.locator('//div[@class="relative overflow-y-scroll"]');
    await tab.waitFor({ state: 'visible' });
    const scrollHeight = await tab.evaluate(element => element.scrollHeight);
    const clientHeight = await tab.evaluate(element => element.clientHeight);
    console.log(scrollHeight + " " + clientHeight);
    expect(scrollHeight).toBeGreaterThan(clientHeight);
  }

  /**
   * This function is used to verify the table header of Summary in detail panel for a node
   */
  async verifyTableHeaderOfSummary(headers: string) {
    await this.page.waitForTimeout(2000);
    await this.verifyTableHeader(headers);
    expect(await this.page.locator('//div[contains(text(),"Incoming")]').last().isVisible()).toBeTruthy();
    expect(await this.page.locator('//div[contains(text(),"Outgoing")]').last().isVisible()).toBeTruthy();
  }

  /**
  * This function is used to verify the incoming and outgoing exposure values
  */
  async verifyIncomingOutgoingExposureValues(value: string) {
    let expValue;
    await this.page.waitForTimeout(2000);
    const exposureValues = value.split(",");
    for (let i = 0; i < exposureValues.length; i++) {
      expValue = await this.page.locator('//div[contains(text(),"' + exposureValues[i] + '")]//following-sibling::div/div[2]').textContent();
      const value1 = parseFloat(expValue?.slice(2, -2));
      console.log((value1));
      expect((value1)).toBeLessThan(100);
    }
  }

  /**
   * This function is used to click and verify expand icon, direct and indireact exposures
   */
  async clickAndVerifyEntityExpandIcon(entityName: string, directExp: string, inDirectExp: string) {
    await this.page.waitForTimeout(3000)
    await this.page.locator('(//div[contains(text(),"' + entityName + '")]//ancestor::td//following-sibling::td)[3]//*[name()="svg"]').click();
    const directExposure = await this.page.locator("(//div[contains(@class,'text-blue-700 items-center')])[1]").textContent();
    expect(directExposure).toBe(directExp);
    const inDirectExposure = await this.page.locator("(//div[contains(@class,'text-blue-700 items-center')])[2]").textContent();
    expect(inDirectExposure).toBe(inDirectExp);
  }

  /**
   * This function is used to verify the incoming and outgoing values of direct exposure
   */
  async verifyDirectExposureIncomingOutgoingValues(entityName: string, directExposure: string, inDirectExposure: string) {
    let valueLocator1, valueLocator2;
    let incomingValue;
    valueLocator1 = await this.page.locator('(//div[contains(text(),"' + directExposure + '")]//ancestor::td//following-sibling::td/div)[1]').textContent();
    valueLocator2 = await this.page.locator('(//div[contains(text(),"' + inDirectExposure + '")]//ancestor::td//following-sibling::td/div)[1]').textContent();
    const value1 = parseFloat(valueLocator1.slice(1));
    const value2 = parseFloat(valueLocator2.slice(1));
    const incomingOutgoingExpectedValue = value1 + value2;
    console.log(incomingOutgoingExpectedValue);
    await this.page.waitForTimeout(2000)
    incomingValue = await this.page.locator('(//div[contains(text(),"' + entityName + '")]//ancestor::td//following-sibling::td)[2]').textContent();
    const incomingOutgoingReceivedValue = parseFloat(incomingValue.slice(1));
    console.log(incomingOutgoingReceivedValue);

    expect(incomingOutgoingExpectedValue).toBe(incomingOutgoingReceivedValue);
  }

  /**
   * This function is used to verify the incoming and outgoing values of indirect exposure
   */
  async verifyIndirectExposureIncomingOutgoingValues(entityName: string, directExposure: string, inDirectExposure: string) {
    let valueLocator1, valueLocator2;
    let incomingValue;
    valueLocator1 = await this.page.locator('//div[contains(text(),"' + directExposure + '")]//ancestor::td//following-sibling::td/div/div').innerText();
    valueLocator2 = await this.page.locator('//div[contains(text(),"' + inDirectExposure + '")]//ancestor::td//following-sibling::td/div/div').textContent();
    const value1 = valueLocator1.replace('$', '').replace(/,/g, '');
    const value2 = valueLocator2.replace('$', '').replace(/,/g, '');
    const incomingOutgoingExpectedValue = parseFloat(value1 + value2);
    await this.page.waitForTimeout(2000)
    incomingValue = await this.page.locator('(//div[contains(text(),"' + entityName + '")]//ancestor::td//following-sibling::td/div/child::div)[2]').textContent();
    const incomingValue1 = parseFloat(incomingValue.replace('$', '').replace(/,/g, ''));
    expect(incomingOutgoingExpectedValue).toBe(incomingValue1);
  }

  /**
    * This function is used verify "nothing to see over here" text in summary tab
    */
  async verifyNothingToSeeOverHereInSummery() {
    await this.page.waitForTimeout(3000);
    const incomingValuePieChart = this.page.locator("(//div[contains(text(),'Nothing to see over here')])[1]");
    const outGoingValuePieChart = this.page.locator("(//div[contains(text(),'Nothing to see over here')])[2]");
    expect(await incomingValuePieChart.isVisible()).toBeTruthy();
    expect(await outGoingValuePieChart.isVisible()).toBeTruthy();
  }

  /**
   * This function is used to click on '+' icon in counterparties and verify the node
   */
  async clickOnPlusIconAndVerifyNode(counterpartyAddress: string, address: string, digitalAsset: string) {
    await this.page.waitForTimeout(3000);
    await this.page.locator("//div[contains(text(),'" + counterpartyAddress + "')]/ancestor::div/button").first().click();
    await this.page.waitForTimeout(3000);
    await this.clickOnSpecifiedAddressOnTheBoard(address, digitalAsset);
    await this.verifySpecifiedAddressMatchesWithAddressInDetailsPanel(address);
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to verify the tooltip of transfers hearder in counterparty for a node
   */
  async verifyTransfersTooltip() {
    expect(await this.transfersTooltip.isVisible()).toBeTruthy();
  }

  /**
   * This function is used to click on '-' icon in counterparties and verify the node
   */
  async clickOnMinusIcon(counterpartyAddress: string) {
    await this.page.waitForTimeout(3000)
    await this.page.locator("//div[contains(text(),'" + counterpartyAddress + "')]/ancestor::div/button").first().click();
    await this.page.waitForTimeout(3000)
  }

  /**
   * This function is used to click on merkle science logo and open existing graph
   */
  async clickOnMerkleScienceLogoAndOpenExistingGraph(){
    const board = JSON.stringify(await this.graphPage.fetchNewlyCreatedBoardName());
    await this.page.waitForTimeout(5000)
    await this.dashboardPage.clickOnMerkleScienceLogo();
    await this.dashboardPage.selectFilteredGraphName(board.replace(/"/g, '').split('(')[1]);
    await this.dashboardPage.clickOnOpenButton();
  }

  /**
   * This function is used to verify transcation details in transaction tab
   */
  async verifyTransactionDetailsInTransactionsTab(headers: string) {
    const address = await this.page.locator('(//div[@class="cursor-pointer"])[1]').textContent();
    const txnHash = address?.substring(0, 5)
    const actualTransactionHash = this.page.locator("//div[contains(text(),'" + txnHash + "')]");
    await actualTransactionHash.first().click();
    await this.page.waitForTimeout(5000);
    expect(await actualTransactionHash.textContent()).toContain(txnHash);
    const tableHeader = headers.split(",");
    for (let i = 0; i < tableHeader.length; i++) {
      expect(await this.page.locator('//button[contains(text(),"' + tableHeader[i] + '")]').first().isVisible()).toBeTruthy();
    }
    await this.page.waitForTimeout(3000);
    if (this.closeDetailsPanel)
      await this.closeDetailsPanel();
  }

  /**
   * This function is used to verify the sum of deposits and withdrawals with total transfers
   */
  async verifyDepositsWithdrawalsValuesWithTotalTransfers(address: string, digitalAsset: string, deposits: string, withdrawls: string, totalTransfers: string) {
    let valueLocator1, valueLocator2;
    let totalTransferValue;
    await this.verifySpecifiedAddressMatchesWithAddressInDetailsPanel(address);
    valueLocator1 = await this.page.locator('//div[contains(text(),"' + deposits + '")]//following-sibling::div').textContent();
    valueLocator2 = await this.page.locator('//div[contains(text(),"' + withdrawls + '")]//following-sibling::div').textContent();
    const value1 = parseFloat(valueLocator1.replace(/,/g, ''));
    const value2 = parseFloat(valueLocator2.replace(/,/g, ''));
    const sumOfDepositsWithdrawals = (value1 + value2);
    await this.hoverOnSpecifiedAddressOnTheBoard(address, digitalAsset)
    await this.page.waitForTimeout(3000);
    totalTransferValue = await this.page.locator('//div[contains(text(),"' + totalTransfers + '")]//following-sibling::div').textContent();
    const totalTransferValue1 = parseFloat(totalTransferValue.replace('$', '').replace(/,/g, ''));
    expect(sumOfDepositsWithdrawals).toBe(totalTransferValue1);
  }

  /**
   * This function is used to verify counterparty address is copiable in transaction tab
   */
  async verifyCounterpartyAddressIsCopiableInTransactionTab() {
    const counterpartyAddress = await this.page.locator('(//div[@class="cursor-pointer"])[2]').textContent();
    console.log(counterpartyAddress);
    const address = counterpartyAddress?.substring(0, 5);
    const copyIcon = this.page.locator("//div[contains(@class,'relative overflow')]//div[contains(text(),'" + address + "')]/../*[name()='svg']");
    if (await copyIcon.first().isVisible())
      await copyIcon.first().click();
    const copiedGreenCheckMark = this.page.locator("//div[contains(@class,'relative overflow')]//div[contains(text(),'" + address + "')]/../*[name()='svg'][contains(@class,'green')]");
    await expect(copiedGreenCheckMark).toBeVisible();
    await this.page.waitForTimeout(3000);
    await expect(copiedGreenCheckMark).toBeHidden();
    return counterpartyAddress;
  }

  /**
   * This function is used to verify txn hash is copiable in transaction tab
   */
  async verifyTxnHashIsCopiableInTransactionTab() {
    const txnHash = await this.page.locator('(//div[@class="cursor-pointer"])[1]').textContent();
    console.log(txnHash);
    const address = txnHash?.substring(0, 5);
    const copyIcon = this.page.locator("//div[contains(@class,'relative overflow')]//div[contains(text(),'" + address + "')]/../*[name()='svg']");
    if (await copyIcon.first().isVisible())
      await copyIcon.first().click();
    const copiedGreenCheckMark = this.page.locator("//div[contains(@class,'relative overflow')]//div[contains(text(),'" + address + "')]/../*[name()='svg'][contains(@class,'green')]");
    await expect(copiedGreenCheckMark).toBeVisible();
    await this.page.waitForTimeout(3000);
    await expect(copiedGreenCheckMark).toBeHidden();
    return txnHash;
  }

  /**
   * This function is used to verify filtered results for entity type in summary tab
   */
  async verifyFilteredResultsForEntityTypeInSummaryTab(entityType: string[]) {
    // Extract displayed entity type from the grid
    const displayedEntities = await this.page.evaluate(() => {
      // Define the XPath expression
      let xpath = "//table//div[contains(@class,'group relative')]/child::span";

      // Evaluate the XPath expression
      const entityCells: Node[] = [];
      const iterator = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

      let node = iterator.iterateNext();
      while (node) {
        entityCells.push(node);
        node = iterator.iterateNext();
      }

      // Map the text content of each entity cell
      return entityCells.filter((_, index) => index % 2 === 0).map(cell => cell.textContent?.trim());
    });

    // Verify each displayed entity type is in the applied filter list
    for (const entity of displayedEntities) {
      if (!entityType.includes(`${entity}`))
        throw new Error(`Unexpected entity found in grid: ${entity}`);
    }
  }

  /**
  * This function is used to click on '+' icon in transaction tab counterparties and verify the node
  */
  async clickOnPlusIconInTransactionTabAndVerifyNode(digitalAsset: string, tab: string) {
    const counterpartyAddress = await this.page.locator('(//div[@class="cursor-pointer"])[2]').textContent();
    const counterparty = counterpartyAddress?.substring(0, 5)
    if (await this.page.locator("//div[contains(text(),'" + counterparty + "')]/ancestor::div/button[contains(@class,'cursor-pointer disabled:hover:')]").first().isVisible()) {
      await this.page.locator("//div[contains(text(),'" + counterparty + "')]/ancestor::div/button[contains(@class,'cursor-pointer disabled:hover:')]").first().click();
      await this.page.locator('(//div[@class="cursor-pointer"])[2]').click();
      const address: string | null = await this.page.locator("//div[contains(text(),'" + counterparty + "')]").textContent();
      console.log(address);
      await this.page.waitForTimeout(2000);
      await this.clickOnSpecifiedAddressOnTheBoard(JSON.stringify(address), digitalAsset);
      await this.verifySpecifiedAddressMatchesWithAddressInDetailsPanel(JSON.stringify(address).slice(1, -1));
      await this.page.waitForTimeout(2000);
    }
    else {
      await this.page.locator("//div[contains(text(),'" + counterparty + "')]/ancestor::div/button[contains(@class,'cursor-pointer text-gray')]").first().click();
      await this.page.waitForTimeout(2000)
      await this.page.locator("//div[contains(text(),'" + counterparty + "')]/ancestor::div/button[contains(@class,'cursor-pointer disabled:hover:')]").first().click();
      await this.page.locator('(//div[@class="cursor-pointer"])[2]').click();
      const address = await this.page.locator("//div[contains(text(),'" + counterparty + "')]").textContent();
      await this.page.waitForTimeout(2000);
      await this.clickOnSpecifiedAddressOnTheBoard(JSON.stringify(address), digitalAsset);
      await this.verifySpecifiedAddressMatchesWithAddressInDetailsPanel(JSON.stringify(address).slice(1, -1));
      await this.page.waitForTimeout(2000);
    }
  }

  /**
   * This function is used to click on '-' icon in transaction tab counterparties and verify the node
   */
  async clickOnMinusIconInTransactionTabAndVerifyNode() {
    const counterpartyAddress = await this.page.locator('(//div[@class="cursor-pointer"])[2]').textContent();
    const counterparty = counterpartyAddress?.substring(0, 5)
    await this.page.waitForTimeout(3000);
    if (await this.page.locator("//div[contains(text(),'" + counterparty + "')]/ancestor::div/button[contains(@class,'cursor-pointer text-gray')]").first().isVisible()) {
      await this.page.waitForTimeout(3000);
      await this.page.locator("//div[contains(text(),'" + counterparty + "')]/ancestor::div/button[contains(@class,'cursor-pointer text-gray')]").first().click();
      await this.page.waitForTimeout(7000);
      await this.page.locator('(//div[@class="cursor-pointer"])[2]').click();
      const address = await this.page.locator("//div[contains(text(),'" + counterparty + "')]").first().textContent();
      await this.page.waitForTimeout(3000);
      await this.clickOnMerkleScienceLogoAndOpenExistingGraph();
      await this.verifySpecifiedAddressOnTheBoard(JSON.stringify(address));
    }
    else
    {
      await this.page.locator("//div[contains(text(),'"+counterparty+"')]/ancestor::div/button[contains(@class,'cursor-pointer disabled:hover:')]").first().click();
      await this.page.waitForTimeout(5000)
      await this.page.locator("//div[contains(text(),'"+counterparty+"')]/ancestor::div/button[contains(@class,'cursor-pointer text-gray')]").first().click();
      await this.page.waitForTimeout(5000)
      await this.page.locator('(//div[@class="cursor-pointer"])[2]').click();
      const address = await this.page.locator("//div[contains(text(),'" + counterparty + "')]").first().textContent();
      await this.page.waitForTimeout(3000);
      await this.clickOnMerkleScienceLogoAndOpenExistingGraph();
      await this.verifySpecifiedAddressOnTheBoard(JSON.stringify(address));
    }
  }

  /**
  * This function is used to verify the tooltip of remove icon in details panel
  */
  async verifyRemoveIconTooltip() {
    expect(await this.removeIcon.isVisible()).toBeTruthy();
  }

  /**
   * This function is used to remove selected node or cluster
   */
  async removeTheSelectedNodeCluster(expectedAddress: string, digitalAsset: string){
    await this.clickOnSpecifiedAddressOnTheBoard(expectedAddress, digitalAsset)
    await this.verifyRemoveIconTooltip();
    await this.removeIcon.click();
    const board = JSON.stringify(await this.graphPage.fetchNewlyCreatedBoardName());
    await this.page.waitForTimeout(3000);
    expect(await this.detailsPanelContainer.isHidden()).toBeTruthy();
    await this.clickOnMerkleScienceLogoAndOpenExistingGraph();
    await this.verifySpecifiedAddressOnTheBoard(expectedAddress);
  }

  /**
   * This function is used to verify remove icon is displayed in link details panel
   */
  async verifyRemoveIconForSelectedLink(transactionType: string, expectedTransactionHash: string, closeDetailsPanel: boolean) {
    await this.verifyTransactionDetails(transactionType, expectedTransactionHash, closeDetailsPanel)
    expect(await this.removeIcon.isHidden()).toBeTruthy();
    await this.closeDetailsPanel();
    await this.page.waitForTimeout(3000);
  }

   /**
   * This function is used to verify txn hash is copiable in transaction tab
   */
   async verifyFromAndToAddressIsCopiableInLinkTransactionTab(address: string) {
    await this.verifySpecifiedAddressIsCopiableInDetailsPanel(address);
    await this.page.waitForTimeout(3000);
    const copyIcon = this.page.locator("(//div[contains(@class,'relative overflow')]//div[contains(text(),'')]/../*[name()='svg'])[2]")
    if (await copyIcon.first().isVisible())
      await copyIcon.first().click();
    const copiedGreenCheckMark = this.page.locator("//div[contains(@class,'relative overflow')]//div[contains(text(),'')]/../*[name()='svg'][contains(@class,'green')]");
    await expect(copiedGreenCheckMark).toBeVisible();
    await this.page.waitForTimeout(3000);
    await expect(copiedGreenCheckMark).toBeHidden();
    await this.page.waitForTimeout(5000);
    }

  /**
   * This function is used to click on auto investigate button
   */
  async clickOnAutoInvestigateButton(entityName: string) {
    await this.page.locator("//div[contains(text(),'"+entityName+"')]//button").click();
    await this.page.waitForTimeout(5000);
  }

  /**
   * This function is used to get nodes position in the graph
   */
  async getNodePositions(){
    const getNodesPositions = async () => {
      return await this.page.evaluate('window.getFinalViewPositions()') as Record<string, { x: number, y: number }>;
    };
    return getNodesPositions;
  }

  /**
   * This function is used to click on organic or sequential layout
   */
  public async clickOnLayout(layout: string) {
    let layoutButton;

    switch (layout) {
        case "Organic Layout":
            layoutButton = this.graphToolbarPage.useOrganicLayout;
            break;
        case "Sequential Layout":
            layoutButton = this.graphToolbarPage.useSequencialLayout;
            break;
        default:
            throw new Error(`Unknown layout: ${layout}`);
    }

    if (layoutButton) {
        await layoutButton.click();
        await this.page.waitForTimeout(2000);
    }
  }

  /**
   * This function is used to click on Save layout
   */
  async clickOnSaveLayout(){
    await this.graphToolbarPage.fixAllNodesInCurrentPosition.click();
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to get Initial postions of nodes
   */
  async getInitialPositionOfANodes(expectedAddress: string, digitalAsset: string) {
    const getNodePositions = await this.getNodePositions();
    await this.graphPage.fitIcon.click();
    await this.page.waitForTimeout(2000);
    const initialPositions = await getNodePositions();
    const initialNodePosition = initialPositions[`${digitalAsset}-${expectedAddress}`];
    return initialNodePosition;
  }

  /**
   * This function is used to get new postions of nodes
   */
  async getNewPositionOfANodes(expectedAddress: string, digitalAsset: string) {
    const getNodePositions = await this.getNodePositions();
    const newPositions = await getNodePositions();
    const newNodePosition = newPositions[`${digitalAsset}-${expectedAddress}`];
    return newNodePosition;
  }

  /**
   * This function is used to click on organic or seuential layout and validate the positions of node
   */
  async clickOnLayoutAndValidateNodePosition(expectedAddress: string, digitalAsset: string, layout: string, isPositionSame: boolean){
    const initialNodePosition = await this.getInitialPositionOfANodes(expectedAddress, digitalAsset);
    await this.page.waitForTimeout(2000);
    await this.clickOnLayout(layout)
    await this.page.waitForTimeout(2000);
    const newNodePosition = await this.getNewPositionOfANodes(expectedAddress, digitalAsset);
    await this.page.waitForTimeout(2000);
    console.log(`Initial Position: ${JSON.stringify(initialNodePosition)}, New Position: ${JSON.stringify(newNodePosition)}`);
    if(isPositionSame)
      expect(initialNodePosition).toEqual(newNodePosition);
    else
      expect(initialNodePosition).not.toEqual(newNodePosition);
  }
}