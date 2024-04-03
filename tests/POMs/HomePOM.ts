import {Page, Locator} from '@playwright/test'

class HomePom {

    page: Page
    loginLink: Locator
    
    constructor(page: Page){
        this.page = page;
        //Locators
        this.loginLink = page.getByText('Login To Restricted Area');
    }

    //ServiceMethods
    async goLogin(){await this.loginLink.click();}

}

export {HomePom as HomePOm};

