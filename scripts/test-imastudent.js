import { chromium } from 'playwright';

(async () => {
  console.log('Testing Playwright on imastudent.com...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  try {
    const response = await page.goto('https://www.imastudent.com/all-cameras', { waitUntil: 'domcontentloaded', timeout: 30000 });
    console.log(`Response Status: ${response.status()}`);
    
    // Check if there is a Cloudflare/bot challenge
    const title = await page.title();
    console.log(`Page Title: ${title}`);
    
    // Try to get some products
    // Note: I am guessing the CSS class here, will just dump outerHTML of body if needed
    const html = await page.content();
    if (html.includes('Cloudflare') || html.includes('Just a moment')) {
      console.log('Bot protection detected!');
    } else {
      console.log('Successfully bypassed bot protection using Playwright!');
      // Let's see what the product cards look like
      const products = await page.$$eval('.product-layout', elements => {
         return elements.length;
      }).catch(() => 0);
      console.log(`Found ${products} products matching .product-layout`);
    }
    
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
})();
