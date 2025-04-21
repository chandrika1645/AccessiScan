exports.runPerformanceCheck = async (url) => {
  const puppeteer = require("puppeteer");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const start = Date.now();
  await page.goto(url, { waitUntil: "load" });
  const loadTime = Date.now() - start;

  const metrics = await page.metrics();
  const domContentLoaded = metrics.DomContentLoaded - metrics.NavigationStart;

  await browser.close();

  return {
    loadTime: `${(loadTime / 1000).toFixed(2)}s`,
    domContentLoaded: `${(domContentLoaded / 1000).toFixed(2)}s`,
  };
};
