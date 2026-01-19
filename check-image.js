const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Go to your portfolio page
  await page.goto('file:///D:/PIAIC/portfolio/index.html');

  // Wait for the profile image to load
  await page.waitForSelector('.profile-image', { state: 'visible' });

  // Verify the image is loaded correctly
  const imageSrc = await page.getAttribute('.profile-image', 'src');
  console.log('Image source:', imageSrc);

  // Check if the image has loaded (naturalWidth > 0 indicates successful load)
  const imageLoaded = await page.evaluate(() => {
    const img = document.querySelector('.profile-image');
    return img.naturalWidth > 0;
  });

  console.log('Image loaded successfully:', imageLoaded);

  // Take a screenshot of the hero section
  await page.locator('.hero').screenshot({ path: 'screenshots/hero-with-image.png' });

  console.log('Screenshot saved as hero-with-image.png');

  await browser.close();
})();