import { test, expect } from '@playwright/test';

test("This is the test name", async ({page}) => {
    await page.goto("webdriver2");

    //You can use CSS or XPath
    //await page.locator("css=#menu > ul > li:nth-child(1) > a > span").click();
    //await page.locator("xpath=//*[@id='menu']/ul/li[1]/a/span").click();

    //But you should try to use locators that dont depend on page HTML DOM structures.
    await page.getByText("Login To Restricted Area").click();
    await page.getByRole('row', { name: 'User Name?' }).locator('#username').click();
    await page.getByRole('row', { name: 'User Name?' }).locator('#username').fill('edgewords');
    await page.locator('#password').click();
    
    await page.locator('#password').fill('edgewords123');
    await page.getByRole('link', { name: 'Submit' }).click();
    await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
    await expect(page.locator('body')).toContainText('User is Logged in');
    await page.locator('#name').click();
    await page.locator('#name').fill('hello');
    await expect(page.locator('#name')).toHaveValue('hello');


    //await page.close(); //Closes the browser
})


test("Dragdrop demo", async ({page}) => {
    await page.goto("webdriver2/docs/cssXPath.html");
    await page.locator('#apple').scrollIntoViewIfNeeded(); //force scroll to the apple. Not because Playwright needs it, but because we want to see it.

    await page.dragAndDrop('#slider a', '#slider a', {targetPosition:{x:100,y:0},force: true} ); //Dont do actionability checks because that will fail as soon as the mouse leaves the "gripper" []
    //Large movements may not work for *this* site. So do small jumps - but big enough to "escape" the gripper []
    // await page.dragAndDrop('#slider a', '#slider a', {targetPosition:{x:30,y:0},force: true} );
    // await page.dragAndDrop('#slider a', '#slider a', {targetPosition:{x:30,y:0},force: true} );
    // await page.dragAndDrop('#slider a', '#slider a', {targetPosition:{x:30,y:0},force: true} );
    // await page.dragAndDrop('#slider a', '#slider a', {targetPosition:{x:30,y:0},force: true} );
    await page.waitForTimeout(2000) //Dumb 2 second wait for us to confirm the above worked.
})
