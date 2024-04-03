import { test } from './my-base-test';
import { expect } from '@playwright/test'
import { HomePOm } from './POMs/HomePOM'
import LoginPOM from './POMs/LoginPOM';
import AddRecordPOM from './POMs/AddRecordPage';

test(`Param project test`, async ({ page, person }) => {
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/');
    const home = new HomePOm(page);
    await home.goLogin();
    const loginPage = new LoginPOM(page);
    await loginPage.login(person, "edgewords123");
    const addrecordPage = new AddRecordPOM(page);
    expect(await addrecordPage.getBodyText()).toContain('User is Logged in');
});
