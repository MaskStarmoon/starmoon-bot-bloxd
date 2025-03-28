const puppeteer = require('puppeteer');

// Daftar username yang bisa dipilih
const usernames = [
  "blazed",
  "RangerkIng",
  "ShadowStrike",
  "PhoenixLord",
  "IceStorm",
  "NightFury",
  "RedDemon",
  "MysticWarrior",
  "ThunderBolt",
  "DarkKnight",
  "FlameRider"
];

// Fungsi untuk memilih username acak
function getRandomUsername() {
  const randomName = usernames[Math.floor(Math.random() * usernames.length)];
  const randomNumber = Math.floor(100000 + Math.random() * 900000); // Angka 6 digit
  const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Huruf A-Z
  const randomSuffix = Math.random().toString(36).substr(2, 2).toUpperCase(); // 2 karakter acak

  return `${randomName}${randomLetter}${randomNumber}${randomSuffix}`;
}

// Fungsi utama untuk menjalankan bot
module.exports = async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: true }); // Gunakan headless mode untuk Vercel
    const page = await browser.newPage();
    
    // Masukkan URL yang diinginkan
    const url = "https://crazygames.co.id/game/bloxdhop-io?czy_invite=true&utm_source=invite&g=classic_factions&lobby=dd-world";
    await page.goto(url);

    // Pilih nama acak
    const username = getRandomUsername();
    console.log("Bot masuk dengan username:", username);

    // Gantilah dengan selector yang benar sesuai elemen yang ada di halaman game
    await page.type('#username-input-selector', username);  // Pastikan selector sesuai dengan elemen input
    await page.click('#submit-button-selector');  // Pastikan selector tombol submit sesuai dengan elemen tombol

    // Tunggu beberapa detik untuk memastikan interaksi selesai
    await page.waitForTimeout(5000);  // Tunggu 5 detik

    // Tutup browser
    await browser.close();

    // Response ke client
    res.status(200).json({ message: 'Bot berhasil masuk dengan username: ' + username });
  } catch (error) {
    console.error("Error running bot:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
