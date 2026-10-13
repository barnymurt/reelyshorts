// Try to load the Gero extension and capture screenshots
import { chromium } from 'playwright';
import { existsSync } from 'node:fs';
import path from 'node:path';

const extPath = 'C:\\Users\\bmurt\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\bgpipimickeadkjlklgciifhnalhdjhe\\2.7.2_0';

if (!existsSync(extPath)) {
  console.error('Extension not found at:', extPath);
  process.exit(1);
}

const browser = await chromium.launchPersistentContext('C:\\Users\\bmurt\\AppData\\Local\\Temp\\opencode\\gero-profile', {
  headless: false,
  args: [
    `--disable-extensions-except=${extPath}`,
    `--load-extension=${extPath}`,
    '--no-sandbox',
  ],
  viewport: { width: 1280, height: 900 },
});

const page = await browser.newPage();

// Try to navigate to the extension's sidepanel
const sidepanelUrl = 'chrome-extension://bgpipimickeadkjlklgciifhnalhdjhe/sidepanel/index.html';
console.log('Navigating to:', sidepanelUrl);

try {
  await page.goto(sidepanelUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'C:\\Dev\\DigitalStagContent\\refs\\gero-extension-sidepanel.png', fullPage: false });
  console.log('Captured sidepanel');
} catch (e) {
  console.error('Sidepanel failed:', e.message);
}

// Also try the popup
const popupUrl = 'chrome-extension://bgpipimickeadkjlklgciifhnalhdjhe/index.html';
try {
  await page.goto(popupUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'C:\\Dev\\DigitalStagContent\\refs\\gero-extension-popup.png', fullPage: false });
  console.log('Captured popup');
} catch (e) {
  console.error('Popup failed:', e.message);
}

await browser.close();
