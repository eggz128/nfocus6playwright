import {test, expect} from "@playwright/test"

test.beforeEach('Runs befofe each test', async ({page})=>{
    await page.goto('https://www.google.com/')
})

test.afterEach('Runs after each test', async ({page})=>{
    await page.goto('https://www.bing.com/')
})

test.beforeAll('Runs just once before *any* tests have executed', async ()=>{
    console.log("Starting tests")
})

test.afterAll('Runs just once after *all* tests have executed', async ()=>{
    console.log("Finished all tests")
})


test.describe('A suite in a file', {tag: '@something'} ,()=>{
    test("Assertion demos @tag1", { tag: ['@smoke','@regression'], annotation: {type:'issue', description: 'This is a description'}},async ({page, browserName})=>{
        //test.skip(browserName === 'chromium', 'skipping on chromium')
        await page.goto("https://www.edgewordstraining.co.uk/webdriver2/docs/forms.html");
        await page.locator('#textInput').fill("Hello world");
        await page.locator('#checkbox').check();
        const heading = page.locator('#right-column > h1');
        
        const slowExpect = expect.configure({timeout: 10000});
        
        await expect(heading).toContainText("For");
        //await expect(heading).toHaveText("For", {timeout: 10000}); //Override default assertion timeout of 5s with 10s (10000ms)
        //
        //await slowExpect.soft(heading).toHaveText("For"); //Fails as "For" is not the exact text
        await slowExpect.soft(heading).toHaveText(/For.*/); //Passes using this RegEx
        
        await page.pause();
    
        //await expect(page.locator('#checkbox')).not.toBeChecked(); //Negate assertions with .not
    
    
        //Image validation
        //1st run will capture browser and os specific images
        //2nd run will compare against previously captured images.
    
        await expect.soft(page).toHaveScreenshot('wholepage.png');
        await expect(page.locator('#textInput')).toHaveScreenshot('textbox.png', {
            maxDiffPixels: 122,
            maxDiffPixelRatio: 0.1,
            threshold: 0.1,
        });
    
    
    
        let rightColText = await page.locator('#right-column').textContent(); //Includes whitespace in HTML file
    
        console.log("The right column text is with textContent is: " + rightColText);
    
        rightColText = await page.locator('#right-column').innerText(); //Captures text after browser layout has happened (eliminating most whitespace)
    
        console.log("The right column text is with innertext is: " + rightColText);
    
        let textBoxText: string = await page.locator('#textInput').textContent() ?? ""; //TS: if textContent() returns null, retuen empty string "" instead
        console.log("The text box contains" + textBoxText); //blank as <input> has no inner text
    
        //Using generic $eval to get the browser to return the INPUT text
        //This will *not* retry or wait
        textBoxText = await page.$eval('#textInput', (el: HTMLInputElement) => el.value); //el is an in browser HTML element - not a Playwright object at all.
        console.log("The text box actually contains: " + textBoxText);
    
        expect(textBoxText).toBe("Hello world");
    
    
    })
    test.describe('A suite in a suite', ()=>{
        test.use({actionTimeout: 10000})
        test("Generic methods", async ({page}) => {
    
            await page.goto("https://www.edgewordstraining.co.uk/webdriver2/docs/forms.html")
        
            const menuLinks = await page.$$eval('#menu a', (links) => links.map((link) => link.textContent))
            console.log(`There are ${menuLinks.length} links`)
        
            console.log("The link texts are:")
        
            for(const iterator of menuLinks){
                console.log(iterator?.trim())
            }
            
            //Prefferred - using retryable Playwright locators
            const preferredLinks = await page.locator('#menu a').all();
            for(const elm of preferredLinks){
                // const elmtext = await elm.textContent();
                // const elmtexttrimmed = elmtext?.trim();
                console.log(`${await elm.textContent().then(text => {return text?.trim()})}`)
            }
        })
        
        test("Waits", async ({page}) => {
            page.setDefaultTimeout(5000); //Setting an action timeout at the test level. Normally ther eis no action timeout (actions will be retried until the test timeout is reached)
            await page.goto('https://www.edgewordstraining.co.uk/webdriver2/docs/dynamicContent.html',{timeout: 20000});
        
            //await page.locator('#delay').click();
            await page.locator('#delay').fill('10');
            await page.getByRole('link', { name: 'Load Content' }).click();
            //await page.locator('#image-holder > img').click({timeout: 5000}); //Should click the apple
            //await page.locator('#image-holder > img').click({timeout: 13000}); //Overriding the action timeout
            await page.waitForSelector('#image-holder > img', {timeout: 12000, state: 'visible'}); //Waiting for an element, rather than an action on an element.
            await page.locator('#image-holder > img').click();
            
            await page.getByRole('link', { name: 'Home' }).click();
        
        })
    })
    
})


test("Waiting for a pop up window", async ({page, context}) => {
    await page.goto("https://www.edgewordstraining.co.uk/webdriver2/docs/dynamicContent.html")

    const [newPage] = await Promise.all([ //When these two "future" actions complete return the new page fixture
        context.waitForEvent('page'),
        page.locator("#right-column > a[onclick='return popUpWindow();']").click()
    ])



    await page.waitForTimeout(2000); //Thread.sleep(2000);

    await newPage.locator('.orange-button').click(); //closes the newly opened popup

    await page.getByRole('link', {name: 'Load Content'}).click();
    



})

