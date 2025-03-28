const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');

async function launchBrowser() {
  const browser = await puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    headless: chromium.headless,
    ignoreHTTPSErrors: true, // Menghindari kesalahan SSL
  });
  return browser;
}

module.exports = async (req, res) => {
  try {
    const browser = await launchBrowser();
    res.status(200).send('Browser launched successfully!');
  } catch (error) {
    res.status(500).send('Failed to launch browser: ' + error.message);
  }
};
