const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');

async function runBot() {
  try {
    // Start Puppeteer with chrome-aws-lambda
    const browser = await puppeteer.launch({
      args: [
        ...chromium.args,
        '--no-sandbox',         // Tambahkan '--no-sandbox' untuk bypass masalah sandbox
        '--disable-setuid-sandbox', // Disable setuid sandbox
        '--disable-dev-shm-usage', // Disable dev/shm usage di Lambda environment
        '--remote-debugging-port=9222', // Untuk debugging jika diperlukan
        '--headless',            // Jalankan headless browser
      ],
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

    // Simulasikan mengetikkan username dan klik tombol submit
    await page.type('#username-input-selector', username);  // Ganti dengan selector yang sesuai
    await page.click('#submit-button-selector');  // Ganti dengan selector yang sesuai

    // Tunggu beberapa detik untuk memastikan interaksi selesai
    await page.waitForTimeout(5000);

    // Tutup browser
    await browser.close();
  } catch (error) {
    console.error("Error running bot:", error);
  }
}

// Fungsi untuk memilih username acak
function getRandomUsername() {
  const usernames = [
    "blazed", "RangerkIng", "ShadowStrike", "PhoenixLord", "IceStorm",
    "NightFury", "RedDemon", "MysticWarrior", "ThunderBolt", "DarkKnight", "FlameRider"
  ];

  const randomName = usernames[Math.floor(Math.random() * usernames.length)];
  const randomNumber = Math.floor(100000 + Math.random() * 900000); // Angka 6 digit
  const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Huruf A-Z
  const randomSuffix = Math.random().toString(36).substr(2, 2).toUpperCase(); // 2 karakter acak

  return `${randomName}${randomLetter}${randomNumber}${randomSuffix}`;
}

runBot().catch(console.error);
