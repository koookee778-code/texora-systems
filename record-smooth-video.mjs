import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const RECORDINGS_DIR = path.resolve('recordings');
const ARTIFACT_DIR = 'C:\\Users\\mohamed\\.gemini\\antigravity\\brain\\5c91418c-c3a4-415c-b497-76c8bf8af60e';

fs.mkdirSync(RECORDINGS_DIR, { recursive: true });

async function record() {
  console.log('🚀 Starting video recording session on production Cloudflare deployment...');
  
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-gpu']
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: RECORDINGS_DIR,
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();
  console.log('Navigating to https://texora-systems.pages.dev ...');
  await page.goto('https://texora-systems.pages.dev', { waitUntil: 'domcontentloaded' });

  // 1. Initial Hero view
  console.log('Holding on Hero intro for 3 seconds...');
  await page.waitForTimeout(3000);

  // 2. Smoothly scroll through the 3D scrollytelling track
  console.log('Smooth scrolling through 3D scrollytelling track...');
  const totalHero = 3500;
  const step = 40;
  for (let y = 0; y <= totalHero; y += step) {
    await page.evaluate((pos) => window.scrollTo({ top: pos, behavior: 'instant' }), y);
    // Pause slightly longer at key milestones so the viewer can read the cards
    if (y === 900 || y === 1400 || y === 1850 || y === 2300 || y === 2700 || y === 3300) {
      await page.waitForTimeout(1400); // Read card
    } else {
      await page.waitForTimeout(45);
    }
  }

  // 3. Pause at the pure white stage to admire the brand mark T EXORA and clean text
  console.log('Holding at the White Stage (T EXORA)...');
  await page.waitForTimeout(2500);

  // 4. Smoothly scroll into Systems Showcase
  console.log('Scrolling into Systems Showcase...');
  const systemsTarget = 4500;
  for (let y = totalHero; y <= systemsTarget; y += 60) {
    await page.evaluate((pos) => window.scrollTo({ top: pos, behavior: 'instant' }), y);
    await page.waitForTimeout(50);
  }
  await page.waitForTimeout(1800);

  // 5. Smoothly scroll into Interactive Sandbox
  console.log('Scrolling into Interactive Sandbox...');
  const sandboxTarget = 5600;
  for (let y = systemsTarget; y <= sandboxTarget; y += 60) {
    await page.evaluate((pos) => window.scrollTo({ top: pos, behavior: 'instant' }), y);
    await page.waitForTimeout(50);
  }
  await page.waitForTimeout(1000);

  // Interact with POS Cashier: Click on product to add to cart
  console.log('Interacting with POS Cashier Simulator...');
  try {
    const itemBtn = page.locator('#sandbox button').nth(3);
    if (await itemBtn.count() > 0) {
      await itemBtn.click();
      await page.waitForTimeout(800);
      await itemBtn.click();
      await page.waitForTimeout(800);
    }
  } catch (e) {}
  await page.waitForTimeout(1500);

  // 6. Smoothly scroll into Projects, Calculator, Contact & Footer
  console.log('Scrolling through Portfolio, Calculator, and Contact...');
  const fullPageHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = sandboxTarget; y <= fullPageHeight; y += 80) {
    await page.evaluate((pos) => window.scrollTo({ top: pos, behavior: 'instant' }), y);
    await page.waitForTimeout(50);
  }
  await page.waitForTimeout(2000);

  // Close context to save video
  console.log('Closing context to finalize video file...');
  const video = page.video();
  await context.close();
  await browser.close();

  if (video) {
    const rawVideoPath = await video.path();
    console.log(`Raw video saved: ${rawVideoPath}`);

    const finalMp4Path = path.join(RECORDINGS_DIR, 'texora-presentation.mp4');
    const artifactMp4Path = path.join(ARTIFACT_DIR, 'texora-presentation.mp4');

    console.log(`Converting to high-quality MP4 via FFmpeg...`);
    execSync(`ffmpeg -y -i "${rawVideoPath}" -c:v libx264 -pix_fmt yuv420p -preset fast -crf 20 "${finalMp4Path}"`, { stdio: 'inherit' });
    console.log(`MP4 generated: ${finalMp4Path}`);

    // Copy to artifact directory
    fs.copyFileSync(finalMp4Path, artifactMp4Path);
    console.log(`Copied to artifact directory: ${artifactMp4Path}`);
  }

  console.log('🎉 Recording complete!');
}

record().catch((err) => {
  console.error('Recording error:', err);
  process.exit(1);
});
