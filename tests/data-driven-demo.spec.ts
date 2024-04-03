import { test, expect } from '@playwright/test';
import { HomePOm } from './POMs/HomePOM'
import LoginPOM from './POMs/LoginPOM';
import AddRecordPOM from './POMs/AddRecordPage';
import data from './test-data/logins.json'


for (let credentials of data) {

    test(`Multiple Usernames and passwords: ${credentials.username}, ${credentials.password}`, async ({ page }) => {
        await page.goto('https://www.edgewordstraining.co.uk/webdriver2/');
        const home = new HomePOm(page);
        await home.goLogin();
        const loginPage = new LoginPOM(page);
        await loginPage.login(credentials.username, credentials.password);
        const addrecordPage = new AddRecordPOM(page);
        expect(await addrecordPage.getBodyText()).toContain('User is Logged in');
    });

}
