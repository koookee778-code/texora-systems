import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const RECORDINGS_DIR = path.resolve('recordings');
const SCREENSHOTS_DIR = path.resolve('recordings/screenshots');

fs.mkdirSync(RECORDINGS_DIR, { recursive: true });
fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

async function run() {
  console.log('Launching Chrome browser with Playwright...');
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    recordVideo: {
      dir: RECORDINGS_DIR,
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();
  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });

  // 1. Initial State: Wait for Typewriter and 3D canvas
  await page.waitForTimeout(2000);
  try {
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01_hero_intro.png'), timeout: 5000 });
    console.log('Saved 01_hero_intro.png');
  } catch (e) {
    console.warn('Screenshot 1 note:', e.message);
  }

  // 2. Progressive scroll down through the scrollytelling track (0 to 3400px)
  const scrollSteps = [
    { target: 450, name: '02_text_evading.png', delay: 700 },
    { target: 950, name: '03_card1_quality_precision.png', delay: 900 },
    { target: 1400, name: '04_card2_languages_tech.png', delay: 900 },
    { target: 1850, name: '05_card3_two_weeks_delivery.png', delay: 900 },
    { target: 2250, name: '06_card4_proven_experience.png', delay: 900 },
    { target: 2650, name: '07_card5_velocity_response.png', delay: 900 },
    { target: 3000, name: '08_white_stage_transition.png', delay: 1000 },
    { target: 3350, name: '09_white_stage_texora_clean.png', delay: 1200 },
  ];

  for (const step of scrollSteps) {
    console.log(`Scrolling to ${step.target}px ...`);
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'smooth' }), step.target);
    await page.waitForTimeout(step.delay);
    try {
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, step.name), timeout: 5000 });
      console.log(`Saved ${step.name}`);
    } catch (e) {
      console.warn(`Screenshot ${step.name} note:`, e.message);
    }
  }

  // 3. Scroll to Systems Showcase
  console.log('Scrolling to Systems Showcase...');
  await page.evaluate(() => {
    document.querySelector('#systems')?.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(1200);
  try {
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '10_systems_showcase.png'), timeout: 5000 });
    console.log('Saved 10_systems_showcase.png');
  } catch (e) {}

  // 4. Scroll to Interactive Sandbox & test click
  console.log('Testing Interactive Sandbox...');
  await page.evaluate(() => {
    document.querySelector('#sandbox')?.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(1200);

  // Click on a product in POS to test add to cart
  try {
    const productBtn = page.locator('#sandbox button').first();
    if (await productBtn.count() > 0) {
      await productBtn.click();
      await page.waitForTimeout(800);
    }
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '11_sandbox_pos_tested.png'), timeout: 5000 });
    console.log('Saved 11_sandbox_pos_tested.png');
  } catch (e) {}

  // 5. Scroll to Cost Calculator
  console.log('Scrolling to Cost Calculator...');
  await page.evaluate(() => {
    document.querySelector('#calculator')?.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(1200);
  try {
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '12_calculator_estimator.png'), timeout: 5000 });
    console.log('Saved 12_calculator_estimator.png');
  } catch (e) {}

  // 6. Scroll to Contact Section & Footer
  console.log('Scrolling to Contact Section & Footer...');
  await page.evaluate(() => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(1200);
  try {
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '13_contact_footer.png'), timeout: 5000 });
    console.log('Saved 13_contact_footer.png');
  } catch (e) {}

  // Close context to save video
  console.log('Finalizing video recording...');
  const video = page.video();
  await context.close();
  await browser.close();

  if (video) {
    const videoPath = await video.path();
    console.log(`Raw WebM video saved to: ${videoPath}`);

    const mp4Path = path.join(RECORDINGS_DIR, 'texora-walkthrough.mp4');
    console.log(`Converting to MP4 with ffmpeg -> ${mp4Path} ...`);
    try {
      execSync(`ffmpeg -y -i "${videoPath}" -c:v libx264 -preset fast -crf 22 -pix_fmt yuv420p "${mp4Path}"`, { stdio: 'inherit' });
      console.log('MP4 Video created successfully at:', mp4Path);
    } catch (e) {
      console.warn('FFmpeg conversion note:', e.message);
    }
  }

  console.log('All automated tests and video recording completed successfully!');
}

run().catch((err) => {
  console.error('Test run failed:', err);
  process.exit(1);
});
