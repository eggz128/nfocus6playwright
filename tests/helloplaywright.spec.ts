import { test, expect } from '@playwright/test'; //Equiv to c# using. Brings in Playwright objects for us to use
//Brings in the test() method for defining tests, and expect for assertions (none in this file)


//Playwright test method takes 2 args:
//1) Name of the test
//2) async function callback - this contains our test code. 'page' is our browser.
test("This is my first test", async function({page}){ //it would be more usual to use fat arrow notation : async ({page}) => {
    //wd c# equivalent
    //driver.URL = "https://www.edgewordstraining.co.uk/demo-site/";
    await page.goto("https://www.edgewordstraining.co.uk/demo-site/");
    //driver(browser) ... locator ... action
    //driver.FindElement(By.CssSelector("[title='Search for:'")).Click();
    await page.getByRole('searchbox', { name: 'Search for:' }).click();
    await page.getByRole('searchbox', { name: 'Search for:' }).fill('belt'); //Pre-clears text field before typing
    await page.getByRole('searchbox', { name: 'Search for:' }).clear(); //If you comment this out the text entered will be 'beltbelt' as pressSequentially() just simulates keypresses and doesn't pre clear fields.
    
    await page.getByRole('searchbox', { name: 'Search for:' }).pressSequentially("belt", {delay: 500}) //Does not pre clear. Delay slows down typing.
    await page.getByRole('searchbox', { name: 'Search for:' }).press('Enter'); //equivalent to WD .SendKeys(Keys.Enter);
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await page.getByRole('link', { name: 'View cart ' }).click(); //That weird  is an arrow on the site. But since name: is actually more of a "contains" you could delete it and this would still work.
    await page.getByLabel('Remove this item').click();
    await page.getByRole('link', { name: 'Return to shop' }).click();

    //Chaining searches.
    //driver.FindElement(By.CssSelector("#menu-item-42")).FindElement(By.LinkText("Home")).CLick();
    await page.locator('#menu-item-42').getByRole('link', { name: 'Home' }).click(); //Playwright element searches can be chained just like in WD.
});

