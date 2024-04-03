import { test, expect } from '@playwright/test';

test.beforeEach(async({page})=>{
  await page.goto('https://www.edgewordstraining.co.uk/webdriver2/sdocs/add_record.php')
})

test('test1', async ({ page }) => {
  await page.waitForTimeout(1000)
  //This will fail if we are not logegd in
  await expect(page.locator('h1')).toContainText('Add A Record To the Database');
  await page.waitForTimeout(1000)
});

test('test2', async ({ page }) => {
  await page.waitForTimeout(1000)
  //This will fail if we are not logegd in
  await expect(page.locator('h1')).toContainText('Add A Record To the Database');
  await page.waitForTimeout(1000)
});