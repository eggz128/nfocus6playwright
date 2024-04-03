import { test as teardown, expect } from '@playwright/test'

console.log("Now in global teardown")

teardown('logout', async ({ page }) => {
    //Teardown
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.accept().catch(() => { });
    });
    await page.getByRole('link', { name: 'Log Out' }).click();
    await expect(page.locator('h1')).toContainText('Access and Authentication');
    await page.close();
})