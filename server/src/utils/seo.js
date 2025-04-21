exports.runSEOCheck = async (url) => {
  const puppeteer = require("puppeteer");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  const issues = [];

  const hasMetaDesc = await page
    .$eval("head", (head) => !!head.querySelector('meta[name="description"]'))
    .catch(() => false);

  if (!hasMetaDesc) {
    issues.push({ message: "Missing meta description tag", selector: "head" });
  }

  // Add more SEO rules...

  await browser.close();
  return issues;
};
