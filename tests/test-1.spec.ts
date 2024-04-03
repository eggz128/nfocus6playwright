import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.edgewordstraining.co.uk/webdriver2/');
  await page.getByText('Login To Restricted Area').click();
  
  const username = await page.getByRole('row', { name: 'User Name?' }) //You can capture a locator reference. Note this is not an element as such, but rather how to find the element.
  await username.locator('#username').click(); //So when you use the reference a new search is performed. WebDrivers StaleElement exceptions are not a problem for Playwright.
  await username.locator('#username').fill('edgewords');

  await page.locator('#password').click();
  await page.locator('#password').fill('edgewords123');

  //await page.getByRole('link', { name: 'Submit' }).click();

  //PLaywright adds lots of extensions to CSS. e.g.
  //Relative location searches :left-of()
  //Inner text queries :text("Sometext")
  //Restart a new search with the results of the last one >>
  // if there are multiple matches pick the 1st, 2nd etc (0 indexed) nth=2
  // Is the element visible :visible
  //await page.locator('a:left-of(:text("Clear")):below(:text("Password?")) >> nth=2').click();
  await page.locator('a:left-of(:text("Clear")):below(:text("Password?")):visible') //If thre are multiple matches, PW wont just use the first. You must ensure there is only 1 before performing an action.
        .filter({hasText: 'Submit'}) //One option is to filter the maultiple matches down.
        .click();

  await page.getByRole('link', { name: 'Log Out' }).click();
  //ToDo: handle the JS confirm alert as the recorder didn't do this

  //Generally dont capture things from the page first then assert on them.
  //Instead pass the locator for the thing to capture to expect, then chain your assertion
  await expect(page.locator('body')).toContainText('User is not Logged in');

});


test('all products', async ({ page }) => {
  await page.goto('https://www.edgewordstraining.co.uk/demo-site/');
  const newProducts = await page.getByLabel('Recent Products');
  for (const prod of await newProducts.locator('h2:not(.section-title)').all()) {
    console.log(await prod.textContent());
  };
});
