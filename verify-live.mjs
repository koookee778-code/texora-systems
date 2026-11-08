import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const RECORDINGS_DIR = path.resolve('recordings');
const SCREENSHOTS_DIR = path.resolve('recordings/screenshots');

fs.mkdirSync(RECORDINGS_DIR, { recursive: true });
fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

async function verify() {
  console.log('Testing live site: https://texora-systems.pages.dev ...');
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
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
  await page.goto('https://texora-systems.pages.dev', { waitUntil: 'networkidle' });

  // 1. Initial State: Centered Emblem in Deep Royal Blue
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01_live_hero_center.png') });
  console.log('Captured: 01_live_hero_center.png');

  // 2. Smooth Scroll down through the 5 articles and 3D dodging
  const steps = [
    { y: 850, name: '02_dodge_art1_quality.png', label: 'Article 1 Right, Emblem swoops Left' },
    { y: 1350, name: '03_dodge_art2_languages.png', label: 'Article 2 Left, Emblem swoops Right' },
    { y: 1850, name: '04_dodge_art3_two_weeks.png', label: 'Article 3 Right, Emblem swoops Left' },
    { y: 2350, name: '05_dodge_art4_experience.png', label: 'Article 4 Left, Emblem swoops Right' },
    { y: 2850, name: '06_dodge_art5_velocity.png', label: 'Article 5 Right, Emblem swoops Left' },
    { y: 3600, name: '07_white_stage_revealing.png', label: 'White stage arrived - Sequential reveal' },
  ];

  for (const step of steps) {
    console.log(`Scrolling to ${step.y}px (${step.label})...`);
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'smooth' }), step.y);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, step.name) });
    console.log(`Captured: ${step.name}`);
  }

  // Allow sequential reveal animation to finish and capture full complete TEXORA
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '08_white_stage_texora_complete.png') });
  console.log('Captured: 08_white_stage_texora_complete.png');

  // Dwell in the white stage
  await page.evaluate(() => window.scrollTo({ top: 4200, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '09_white_stage_dwell_centered.png') });
  console.log('Captured: 09_white_stage_dwell_centered.png');

  // Continue to Systems Showcase
  await page.evaluate(() => {
    document.querySelector('#systems')?.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '10_systems_showcase.png') });

  // Continue to Interactive Sandbox
  await page.evaluate(() => {
    document.querySelector('#sandbox')?.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '11_sandbox.png') });

  // Finalize video recording
  console.log('Finalizing video...');
  const video = page.video();
  await context.close();
  await browser.close();

  if (video) {
    const videoPath = await video.path();
    const mp4Path = path.join(RECORDINGS_DIR, 'texora-live-walkthrough.mp4');
    try {
      execSync(`ffmpeg -y -i "${videoPath}" -c:v libx264 -preset fast -crf 22 -pix_fmt yuv420p "${mp4Path}"`, { stdio: 'inherit' });
      console.log('MP4 Video created successfully at:', mp4Path);
    } catch (e) {
      console.warn('FFmpeg note:', e.message);
    }
  }

  console.log('Verification completed successfully!');
}

verify().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
