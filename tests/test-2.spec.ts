import { test, expect } from '@playwright/test';

test('add a cap to the cart', async ({ page }) => {
  
  await page.locator('body').click();
  await page.goto('https://www.edgewordstraining.co.uk/demo-site/');
  //await page.getByLabel("Search for:").click();

  await page.getByRole('searchbox', { name: 'Search for:' }).click(); //name: value is not an exact match by default. It's treated more like a substring match. So you could delete "for:" and this would still work.
  await page.getByRole('searchbox', { name: /Search.*/ }).fill('cap'); //You can also use regex
  await page.getByRole('searchbox', { name: 'Search', exact: true}).press('Enter'); //If you want an exact match set the exact: property to true. This line will fail.

  
});