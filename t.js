const {chromium}=require('@playwright/test');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.goto('https://practicesoftwaretesting.com/auth/login');
console.log(await p.locator('[data-test]').evaluateAll(e=>e.map(x=>x.getAttribute('data-test'))));
await p.getByTestId('email').fill('customer@practicesoftwaretesting.com');await p.getByTestId('password').fill('welcome01');await p.getByTestId('login-submit').click();
await p.waitForURL(/account/);console.log(p.url(), await p.getByTestId('page-title').textContent(), await p.getByTestId('nav-menu').textContent());
await p.goto('https://practicesoftwaretesting.com/');await p.getByTestId('product-name').first().waitFor();
console.log(await p.locator('[data-test]').evaluateAll(e=>[...new Set(e.map(x=>x.getAttribute('data-test')))]));
await b.close()})()
