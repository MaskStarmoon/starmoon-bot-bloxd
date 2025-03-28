const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');

async function runBot() {
  // Start Puppeteer with chrome-aws-lambda
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });
  const page = await browser.newPage();

  // Masukkan URL yang diinginkan
  const url = "https://crazygames.co.id/game/bloxdhop-io?czy_invite=true&utm_source=invite&g=classic_factions&lobby=dd-world";
  await page.goto(url);

  // Pilih nama acak
  const username = getRandomUsername();
  console.log("Bot masuk dengan username:", username);

  // Misalnya, jika ada input field untuk nama pemain, simulasikan mengetikkan username:
  await page.type('#username-input-selector', username);  // Ganti selector sesuai elemen input
  await page.click('#submit-button-selector');  // Ganti selector tombol submit sesuai elemen tombol

  // Tunggu beberapa detik untuk memastikan interaksi selesai
  await page.waitForTimeout(5000);

  // Tutup browser
  await browser.close();
}

runBot().catch(console.error);
