import { chromium } from 'playwright';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\mohamed\\.gemini\\antigravity\\brain\\5c91418c-c3a4-415c-b497-76c8bf8af60e';

async function run() {
  console.log('Testing live site: https://texora-systems.pages.dev ...');
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1
  });

  const page = await context.newPage();
  await page.goto('https://texora-systems.pages.dev', { waitUntil: 'networkidle' });

  // 1. Hero Intro (scrollY = 0)
  await page.waitForTimeout(1000);
  const shot1 = path.join(ARTIFACT_DIR, '01_final_hero_intro_big_logo.png');
  await page.screenshot({ path: shot1 });
  console.log('Saved:', shot1);

  // 2. Flight & Chapter 1 Glass Card (scrollY = 900)
  await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'instant' }));
  await page.waitForTimeout(600);
  const shot2 = path.join(ARTIFACT_DIR, '02_final_descent_article.png');
  await page.screenshot({ path: shot2 });
  console.log('Saved:', shot2);

  // 3. Flight & Chapter 3 Sprint Roadmap (scrollY = 1900)
  await page.evaluate(() => window.scrollTo({ top: 1900, behavior: 'instant' }));
  await page.waitForTimeout(600);
  const shot3 = path.join(ARTIFACT_DIR, '03_final_texora_letters_added.png');
  await page.screenshot({ path: shot3 });
  console.log('Saved:', shot3);

  // 4. Pure White Stage: [T]EXORA Brand Formation & Subtitle (scrollY = 3900)
  await page.evaluate(() => window.scrollTo({ top: 3900, behavior: 'instant' }));
  await page.waitForTimeout(1400); // Allow sequential letter animation to complete
  const shot4 = path.join(ARTIFACT_DIR, '04_final_texora_centered_dwell.png');
  await page.screenshot({ path: shot4 });
  console.log('Saved:', shot4);

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
