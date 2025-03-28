const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');

async function launchBrowser() {
  const browser = await puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    headless: chromium.headless,
  });
  return browser;
}

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      // Luncurkan browser menggunakan chrome-aws-lambda
      const browser = await launchBrowser();

      // Lakukan apa yang perlu Anda lakukan dengan browser, misalnya mengambil screenshot atau crawling

      // Tutup browser setelah selesai
      await browser.close();

      res.status(200).send('Browser berhasil diluncurkan dan ditutup!');
    } catch (error) {
      res.status(500).send('Terjadi kesalahan saat meluncurkan browser: ' + error.message);
    }
  } else {
    res.status(405).send('Metode tidak diizinkan');
  }
};
