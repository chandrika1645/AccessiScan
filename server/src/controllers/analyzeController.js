const { runAccessibilityCheck } = require("../utils/accessibility");
const { runSEOCheck } = require("../utils/seo");
const { runPerformanceCheck } = require("../utils/performance.js");

exports.analyzeWebsite = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const accessibility = await runAccessibilityCheck(url);
    const seo = await runSEOCheck(url);
    const performance = await runPerformanceCheck(url);

    return res.json({
      url,
      issues: { accessibility, seo, performance },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to analyze site" });
  }
};
