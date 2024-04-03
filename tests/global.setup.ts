import { test as setup, expect } from '@playwright/test'
import { STORAGE_STATE } from '../playwright.config'
console.log('Now in global set up')
setup('do login', async ({ page }) => {
    //Setup
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/');
    await page.getByRole('link', { name: 'Login To Restricted Area' }).click();
    await page.getByRole('row', { name: 'User Name?' }).locator('#username').click();
    await page.getByRole('row', { name: 'User Name?' }).locator('#username').fill('edgewords');
    await page.locator('#password').click();
    await page.locator('#password').fill('edgewords123');
    await page.getByRole('link', { name: 'Submit' }).click();
    await page.waitForURL('https://www.edgewordstraining.co.uk/webdriver2/sdocs/add_record.php');
    await page.context().storageState({path: STORAGE_STATE})
})
