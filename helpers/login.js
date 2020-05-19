const utils = require('../helpers/utils');

/**
 * Login user in marketplace
 * @param browser: Browser
 */
async function rhizom(browser, user) {
  const pageUrl = `http://localhost:8080/login`;
  let page = await utils.getPage(browser);

  await Promise.all([
    page.goto(pageUrl, { waitUntil: 'networkidle0' }),
    page.waitForNavigation({ waitUntil: 'domcontentloaded' })
  ]);

  // Get last html content
  page = await utils.getPage(browser);

  // Tap page
  await page.mainFrame().tap('body');

  const emailInput = 'body > app-root > div:nth-child(3) > app-authentication > div.auth-wrapper > div > div > div > div > form > mat-form-field.mat-form-field.full-width.mb-2.ng-tns-c133-4.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder.mat-form-field-should-float.mat-form-field-autofilled.ng-dirty.ng-valid.ng-touched > div > div.mat-form-field-flex.ng-tns-c133-4 > div input';
  const passwordInput = 'body > app-root > div:nth-child(3) > app-authentication > div.auth-wrapper > div > div > div > div > form > mat-form-field.mat-form-field.full-width.mb-2.ng-tns-c133-5.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder.mat-form-field-should-float.mat-form-field-autofilled.ng-dirty.ng-valid.ng-touched > div > div.mat-form-field-flex.ng-tns-c133-5 > div input';
  const ctaButton = 'body > app-root > div:nth-child(3) > app-authentication > div.auth-wrapper div form > button';

  // Fill email Input
  await utils.fillInput(page, emailInput, user.email);

  // Fill password Input
  await utils.fillInput(page, passwordInput, user.password);

  // Press call to action button
  await page.waitForSelector(ctaButton);
  await Promise.all([
    // page.click(ctaButton),
    page.focus(ctaButton),
    page.keyboard.press('Enter'),
    page.waitForNavigation({ waitUntil: 'domcontentloaded' })
  ]);
}

/**
 * Login in GitHub
 * @param browser: Browser
 */
async function github(browser, user) {
  const pageUrl = `https://github.com/login`;
  const emailInput = '#login_field';
  const passwordInput = '#password';
  const ctaButton = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block';
  const authInput = '#otp';
  const authButton = '#login > div.auth-form-body.mt-3 > form > button';
  let page = await utils.getPage(browser);

  await Promise.all([
    page.goto(pageUrl, { waitUntil: 'networkidle0' }),
    page.waitForNavigation({ waitUntil: 'domcontentloaded' })
  ]);

  await page.waitFor(1000); // 1s

  // Get last html content
  page = await utils.getPage(browser);

  // Tap page
  await page.mainFrame().tap('body');

  // Fill email Input
  await utils.fillInput(page, emailInput, user.email);

  // Fill password Input
  await utils.fillInput(page, passwordInput, user.password);

  // Press call to action button
  await page.waitForSelector(ctaButton);
  // await Promise.all([
    // page.click(ctaButton),
  await page.focus(ctaButton);
  await page.keyboard.press('Enter');
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  // ]);

  await page.waitFor(1000); // 1s

  // Get last html content
  page = await utils.getPage(browser);

  // Tap page
  await page.mainFrame().tap('body');

  // Fill Auth Input
  await utils.fillInput(page, authInput, user.auth);

  // Press auth button
  await page.waitForSelector(authButton);
  // await Promise.all([
    // page.click(authButton),
  await page.focus(authButton);
  await page.keyboard.press('Enter');
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  // ]);
}

module.exports.rhizom = rhizom;
module.exports.github = github;