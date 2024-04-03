import {Page, Locator} from '@playwright/test'

export default class AddRecordPOM {

    page: Page
    #bodyTextLocator: Locator
    
    constructor(page: Page){
        this.page = page;
        //Locators
        this.#bodyTextLocator = this.page.locator('body')
        //page.waitForURL('**/addrecord.php',{timeout: 5000})
    }

    //ServiceMethods
    async getBodyText(){
        return await this.#bodyTextLocator.textContent();
    }

}