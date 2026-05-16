import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://fotocentreindia.com/product-category/cameras/');
  
  const products = await page.$$eval('li.product', elements => {
    return elements.map(el => {
      const title = el.querySelector('.woocommerce-loop-product__title')?.innerText;
      const price = el.querySelector('ins .woocommerce-Price-amount bdi')?.innerText || el.querySelector('.woocommerce-Price-amount bdi')?.innerText;
      const url = el.querySelector('a.woocommerce-LoopProduct-link')?.href;
      return { title, price, url };
    });
  });
  
  console.log(JSON.stringify(products.slice(0, 5), null, 2));
  await browser.close();
})();
