import { Locator, Page, expect } from "@playwright/test";

export class TeamMembersPage {
  readonly page: Page;
  readonly teamMembersTab: Locator;
  readonly header: Locator;
  readonly subHeader: Locator;
  readonly tableHeader: Locator;
  readonly tableColumnHeader: Locator;
  readonly inviteMemberButton: Locator;
  readonly addOrEditMemberDialog: Locator;
  readonly enableThisMemberToggle: Locator;
  readonly inviteBtn: Locator;
  readonly cancelBtn: Locator;
  readonly closeIcon: Locator;
  readonly memberRoleDropdown: Locator;
  readonly saveBtn: Locator;
  readonly teamMemberSuccessToastMsg: Locator;
  readonly teamMemberFailedToastMsg: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly emailAddress: Locator;

  constructor(page: Page) {
    this.page = page;
    this.teamMembersTab = page.locator("//a[text()='Team Members']")
    this.header = page.locator("//h3[text()='Team Members']");
    this.subHeader = page.locator("//p[contains(@class,'text-sm-regular text-gray')]");
    this.tableHeader = page.locator("//h5[text()='MEMBERS']");
    this.tableColumnHeader = page.locator("//thead//th");
    this.inviteMemberButton = page.locator("//button[text()='Invite Member']");
    this.addOrEditMemberDialog = page.locator("//div[contains(@class,'shadow-xl transform')]");
    this.enableThisMemberToggle = page.locator("//span[contains(text(),'Enable this Member')]/parent::span//parent::div//preceding-sibling::button");
    this.inviteBtn = page.locator('//button[text()="Invite"]');
    this.cancelBtn = page.locator("//button[contains(text(),'Cancel')]");
    this.closeIcon = page.locator("//span[contains(text(),'Close')]/parent::button");
    this.memberRoleDropdown = page.locator('//div[@class="relative"]/button');
    this.saveBtn = page.locator("//button[contains(text(),'Save')]");
    this.teamMemberSuccessToastMsg = page.locator("//div[contains(.,'Team member details updated successfully.')]").last();
    this.teamMemberFailedToastMsg = page.locator("//div[contains(.,'Failed to add team member. Please try again.')]").last();
    this.firstName = page.locator('//input[@id="teamModalFirstName"]');
    this.lastName = page.locator('//input[@id="teamModalLastName"]');
    this.emailAddress = page.locator('//input[@id="teamModalEmail"]');
  }

  /**
   * This function is used to click team member section
   */
  async clickOnTeamMembersSection() {
    await this.teamMembersTab.click();
  }

  /**
   * This function is used to verify page header
   */
  async verifyPageHeader(expectedHeader: string) {
    const actualHeader = await this.header.textContent();
    expect(actualHeader).toBe(expectedHeader)
  }

  /**
   * This function is used to verify sub header
   */
  async verifySubHeader(expectedSubHeader: string) {
    const actualSubHeader = await this.subHeader.textContent();
    expect(actualSubHeader).toBe(expectedSubHeader);
  }

  /**
   * This function is used to verify table header
   */
  async verifyTableHeader(expectedHeader: string) {
    const actualHeader = await this.tableHeader.textContent();
    expect(actualHeader).toBe(expectedHeader);
  }

  /**
   * This function is used to verify table column header
   */
  async verifyTableColumnHeader(expectedFirstColName: string, expectedSecondColName: string, expectedThirdColName: string, expectedFourthColName: string) {
    const actualFirstColName = await this.tableColumnHeader.nth(0).textContent();
    expect(actualFirstColName?.toUpperCase()).toBe(expectedFirstColName);

    const actualSecondColName = await this.tableColumnHeader.nth(1).textContent();
    expect(actualSecondColName?.toUpperCase()).toBe(expectedSecondColName);

    const actualThirdColName = await this.tableColumnHeader.nth(2).textContent();
    expect(actualThirdColName?.toUpperCase()).toBe(expectedThirdColName);

    const actualFourthColName = await this.tableColumnHeader.nth(3).textContent();
    expect(actualFourthColName?.toUpperCase()).toBe(expectedFourthColName);
  }

  /**
   * This function is used to verify invite member button
   */
  async verifyInviteMemberButtonIsVisible() {
    await expect(this.inviteMemberButton).toBeVisible();
  }

  /**
   * This function is used to click on invite member button
   */
  async clickOnInviteMemberButton() {
    await this.inviteMemberButton.click();
    expect(await this.inviteBtn.isDisabled()).toBeTruthy();
  }

  /**
   * This function is used to click on invite button
   */
  async clickOnInviteButton() {
    await this.inviteBtn.click();
    await this.page.waitForTimeout(1000);
  }

   /**
   * This function is used to verify add or edit member dialog
   */
  async verifyAddOrEditMemberDialog(dialog: boolean) {
    if(dialog){
    expect(await this.addOrEditMemberDialog.isVisible()).toBeTruthy();
    }
    else{
      expect(await this.addOrEditMemberDialog.isVisible()).toBeFalsy();
    }
  }

   /**
   * This function is used to verify toggle button
   */
  async verifyEnableThisMemberToggle(isDisabled: boolean) {
    if(isDisabled){
    expect(await this.enableThisMemberToggle.isChecked()).toBeTruthy();
    await this.enableThisMemberToggle.click();
    await this.page.waitForTimeout(3000);
    expect(await this.enableThisMemberToggle.isChecked()).toBeFalsy();
    }
    else{
      expect(await this.enableThisMemberToggle.isChecked()).toBeFalsy();
      await this.enableThisMemberToggle.click();
      expect(await this.enableThisMemberToggle.isChecked()).toBeTruthy();
    }
  }

   /**
   * This function is used to click on cancel button
   */
  async clickOnCancelButton() {
    await this.cancelBtn.click();
    await this.page.waitForTimeout(5000);
  }

   /**
   * This function is used to click on close icon
   */
  async clickOnCloseIcon() {
    await this.closeIcon.click();
    await this.page.waitForTimeout(2000);
  }

  /**
   * This function is used to scroll
   */
  async scrollUntilVisible(containerSelector: string, elementSelector: string, maxScrollAttempts: number = 7) {
    const container = this.page.locator(containerSelector);
    const element = this.page.locator(elementSelector);

    for (let attempt = 0; attempt < maxScrollAttempts; attempt++) {
      if (await element.isVisible()) {
        return true;
      }
      const containerHandle = await container.elementHandle();
      if (containerHandle) {
        await this.page.evaluate((container) => {
          container.scrollBy(0, 800); // Adjust the scroll amount as needed
        }, containerHandle);
      }
      await this.page.waitForTimeout(2000);
    }
  }

  /**
   * This function is used to click on edit button
   */
  async clickOnEditButton(username: string){
    const container = "//div[contains(@class,'overflow-y-auto')]";
    const editBtnSelector = '//td[contains(text(),"'+username+'")]//following-sibling::td[3]/button';
    await this.scrollUntilVisible(container, editBtnSelector);

    const editBtn = this.page.locator('//td[contains(text(),"'+username+'")]//following-sibling::td[3]/button');
    await editBtn.waitFor({ state: 'visible' });
    await editBtn.click();
    await this.page.waitForTimeout(2000);
  }

  /**
   * This function is used to click on save button
   */
  async clickOnSaveBtn() {
    await this.saveBtn.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * This function is used to select and verify member role
   */
  async clickAndSelectMemberRoleOption(roleType: string){
    await this.memberRoleDropdown.click();
    expect(await this.page.locator("//li/span/span[contains(text(),'Agent')]").isVisible()).toBeTruthy();
    expect(await this.page.locator("//li/span/span[contains(text(),'Admin')]").isVisible()).toBeTruthy();
    const role = this.page.locator('//li/span/span[contains(text(),"'+roleType+'")]');
    await role.click();
  }
    
  /**
   * This function is used to verify team member role
   */
  async verifyTeamMemberRole(name: string, roleType: string) {
    const selectedRole = this.page.locator('//td[contains(text(),"'+name+'")]//following-sibling::td/span[contains(text(),"'+roleType+'")]');
    expect(await selectedRole.isVisible()).toBeTruthy();
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to verify team member success toast message
   */
  async verifyTeamMemberSuccessToastMsg(expectedText: string) {
    const actualtext = await this.teamMemberSuccessToastMsg.textContent();
    expect(actualtext).toBe(expectedText);
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to verify team member success toast message
   */
  async verifyTeamMemberFailedToastMsg(expectedText: string) {
    const actualtext = await this.teamMemberFailedToastMsg.textContent();
    expect(actualtext).toBe(expectedText);
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to verify team member status
   */
  async verifyTeamMemberStatus(name: string, status: string) {
    const selectedRole = this.page.locator('//td[contains(text(),"'+name+'")]//following-sibling::td/span[contains(text(),"'+status+'")]');
    expect(await selectedRole.isVisible()).toBeTruthy();
    await this.page.waitForTimeout(3000);
  }

  /**
   * This function is used to fill first name
   */
  async enterFirstName(fName: string){
    await this.firstName.fill(fName);
  }

  /**
   * This function is used to fill last name
   */
  async enterLastName(lName: string){
    await this.lastName.fill(lName);
  }
  
  /**
   * This function is used to fill last name
   */
  async enterEmail(email: string){
    await this.emailAddress.fill(email);
  }

  /**
   * This function is used to verify the first name of the team member
   */
  async verifyTeamMemberFirstName(fName: string){
    const firstName = await this.firstName.getAttribute("value");
    console.log(firstName);
    expect(firstName).toBe(fName)
    await this.page.waitForTimeout(2000);
  }

  /**
   * This function is used to verify the first name of the team member
   */
    async verifyTeamMemberLastName(lName: string){
      const lastName = await this.lastName.getAttribute("value");
      console.log(lastName);
      expect(lastName).toBe(lName)
      await this.page.waitForTimeout(2000);
    }

  /**
   * This function is used to verify the email address of the team member
   */
    async verifyTeamMemberEmailAddress(email: string){
      const emailAddr = await this.emailAddress.getAttribute("value");
      console.log(emailAddr);
      expect(emailAddr).toBe(email)
      await this.page.waitForTimeout(2000);
    }

  /**
   * This function is used to verify the add member dialog contents
   */
    async verifyAddMemberDialogContents(){
      expect(await this.firstName.isVisible()).toBeTruthy();
      expect(await this.lastName.isVisible()).toBeTruthy();
      expect(await this.emailAddress.isVisible()).toBeTruthy();
      expect(await this.memberRoleDropdown.isVisible()).toBeTruthy();
      expect(await this.enableThisMemberToggle.isVisible()).toBeTruthy();
      expect(await this.cancelBtn.isVisible()).toBeTruthy();
      expect(await this.closeIcon.isVisible()).toBeTruthy();
      expect(await this.inviteBtn.isVisible()).toBeTruthy();
    }

    /**
   * This function is used to verify the edit member dialog contents
   */
    async verifyEditMemberDialogContents(){
      expect(await this.firstName.isVisible()).toBeTruthy();
      expect(await this.lastName.isVisible()).toBeTruthy();
      expect(await this.emailAddress.isVisible()).toBeTruthy();
      expect(await this.memberRoleDropdown.isVisible()).toBeTruthy();
      expect(await this.enableThisMemberToggle.isVisible()).toBeTruthy();
      expect(await this.cancelBtn.isVisible()).toBeTruthy();
      expect(await this.closeIcon.isVisible()).toBeTruthy();
      expect(await this.saveBtn.isVisible()).toBeTruthy();
    }

  /**
   * This function is used to verify invite button is disabled
   */
    async verifyInviteButtonIsDiabled(isDisabled: boolean){
      await this.page.waitForTimeout(2000);
      if(isDisabled)
      expect(await this.inviteBtn.isDisabled()).toBeTruthy();
      else
      expect(await this.inviteBtn.isDisabled()).toBeFalsy();
    }

  /**
   * This function is used to verify the first name field is disabled
   */
     async verifyFirstNameField(){
      expect(await this.firstName.isDisabled()).toBeTruthy();
    }

  /**
   * This function is used to verify the last name field is disabled
   */
    async verifyLastNameField(){
      expect(await this.lastName.isDisabled()).toBeTruthy();
    }

  /**
   * This function is used to verify the email address field is disabled
   */
    async verifyEmailField(){
      expect(await this.emailAddress.isDisabled()).toBeTruthy();
    }

    /**
   * This function is used to verify the horizontal scroll bar
   */
  async verifyHorizontalScrollBar() {
    await this.page.waitForTimeout(3000);
    const tab = this.page.locator("//div[contains(@class,'overflow-y-auto border')]");
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
    const tab = this.page.locator("//div[contains(@class,'overflow-y-auto border')]");
    await tab.waitFor({ state: 'visible' });
    const scrollHeight = await tab.evaluate(element => element.scrollHeight);
    const clientHeight = await tab.evaluate(element => element.clientHeight);
    console.log(scrollHeight + " " + clientHeight);
    expect(scrollHeight).toBeGreaterThan(clientHeight);
  }
}
