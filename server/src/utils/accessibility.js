const puppeteer = require("puppeteer");
const axeSource = require("axe-core").source;

exports.runAccessibilityCheck = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  await page.addScriptTag({ content: axeSource });
  const results = await page.evaluate(async () => {
    return await axe.run();
  });

  await browser.close();
  return results.violations.map((v) => ({
    message: v.description,
    selector: v.nodes[0]?.target.join(" ") || "unknown",
  }));
};
