const { chromium, firefox, webkit } = require('playwright');

// Define the viewports for different devices
const viewports = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1920, height: 1080 }
};

// Define the browsers to test
const browsers = [chromium, firefox, webkit];
const browserNames = ['chromium', 'firefox', 'webkit'];

async function testPortfolio() {
  const url = 'file:///D:/PIAIC/portfolio/index.html';

  for (let i = 0; i < browsers.length; i++) {
    const browserType = browsers[i];
    const browserName = browserNames[i];

    console.log(`\nTesting on ${browserName}...`);

    const browser = await browserType.launch({ headless: false }); // Setting headless to false to see the tests
    const context = await browser.newContext();
    const page = await context.newPage();

    // Test on each viewport
    for (const [deviceName, viewport] of Object.entries(viewports)) {
      console.log(`  Testing ${deviceName} viewport (${viewport.width}x${viewport.height})...`);

      // Set viewport
      await page.setViewportSize(viewport);

      // Navigate to the page
      await page.goto(url, { waitUntil: 'networkidle' });

      // Wait for page to load
      await page.waitForTimeout(2000);

      // Take a screenshot
      await page.screenshot({
        path: `screenshots/${browserName}-${deviceName}.png`,
        fullPage: true
      });

      // Check for key UI elements
      const elementsToCheck = [
        { selector: 'nav', name: 'Navigation' },
        { selector: '#hamburger', name: 'Mobile Menu Button' },
        { selector: '.hero', name: 'Hero Section' },
        { selector: '.projects-grid', name: 'Projects Grid' },
        { selector: '#contact-form', name: 'Contact Form' },
        { selector: '#theme-toggle', name: 'Theme Toggle' },
        { selector: '.footer', name: 'Footer' }
      ];

      console.log(`    Checking UI elements on ${deviceName}:`);
      for (const element of elementsToCheck) {
        const isVisible = await page.isVisible(element.selector);
        console.log(`      ${element.name}: ${isVisible ? '✓ Visible' : '✗ Hidden'}`);
      }

      // Check if mobile menu works (only on mobile viewports)
      if (deviceName === 'mobile') {
        // Click the hamburger menu
        const hamburger = await page.$('#hamburger');
        if (hamburger) {
          await hamburger.click();
          await page.waitForTimeout(500);

          // Check if the menu becomes visible
          const navMenuVisible = await page.isVisible('#nav-menu.active');
          console.log(`      Mobile Menu Toggle: ${navMenuVisible ? '✓ Working' : '✗ Not Working'}`);

          // Close the menu again
          await hamburger.click();
          await page.waitForTimeout(500);
        }
      }

      // Check form elements on all viewports
      const formInputs = await page.$$('.form-control, input, textarea');
      console.log(`      Form Inputs Found: ${formInputs.length}`);

      // Check for any JavaScript errors
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      // Perform some interactions to trigger potential errors
      await page.evaluate(() => {
        // Trigger scroll to activate scroll animations
        window.scrollTo(0, document.body.scrollHeight);
        setTimeout(() => window.scrollTo(0, 0), 500);

        // Try to interact with theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
          themeToggle.click();
          setTimeout(() => themeToggle.click(), 1000); // Toggle back
        }
      });

      if (errors.length > 0) {
        console.log(`      JavaScript Errors: ${errors.length}`);
        errors.forEach(error => console.log(`        - ${error}`));
      } else {
        console.log(`      JavaScript Errors: None`);
      }
    }

    await browser.close();
  }

  console.log('\nVisual testing completed!');
  console.log('Screenshots saved in the screenshots/ directory.');
}

// Run the test
testPortfolio().catch(console.error);