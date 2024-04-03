import { test, expect } from '@playwright/test';

test('test', async ({ page }, testInfo) => {
  await page.goto('https://www.edgewordstraining.co.uk/webdriver2/');
  await page.getByRole('link', { name: 'Access Basic Examples Area' }).click();
  await page.getByRole('link', { name: 'Forms' }).click();
  await page.locator('#textInput').click();
  await page.locator('#textInput').fill('Hello World');
  await page.locator('#two').check();
  await page.screenshot({path: 'myshot.png'}) 
  await page.screenshot({path: 'myfullshot.png', 
                        fullPage: true,
                        mask: [page.locator('#theForm > table')],
                        maskColor: 'rgba(23, 20, 217,0.5)',
                        style: '#theForm > table {border: 10px dotted red}'});
                        
  await page.pdf({path: 'mypage.pdf'});

  console.log("Attaching a screenshot");
  await testInfo.attach('Masked Screenshot', {path: 'myfullshot.png'})
  await testInfo.attach('Some random text attachment', {body: "Some text", contentType: 'text/plain'})
  let screenshot = await page.screenshot();
  await testInfo.attach('No file needed for this screenshot', {body: screenshot, contentType:'image/png'})




});