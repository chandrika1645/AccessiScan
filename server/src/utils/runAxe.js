const puppeteer = require('puppeteer');
const axeCore = require('axe-core');

module.exports = async function runAxe(url) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.addScriptTag({ content: axeCore.source });

  const results = await page.evaluate(async () => {
    return await axe.run(document, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa'],
      },
    });
  });

  await browser.close();

  return results.violations.map((violation) => {
    return violation.nodes.map((node) => ({
      code: violation.id,
      context: node.html,
      message: violation.help,
      type: violation.impact || 'notice',
      typeCode:
        violation.impact === 'critical'
          ? 1
          : violation.impact === 'serious'
          ? 1
          : violation.impact === 'moderate'
          ? 2
          : 3,
    }));
  }).flat();
};
