const utils = require('./helpers/utils');
const selectedBrowser = require('./helpers/browser');
const selectedLogin = require('./helpers/login');

async function run() {
  const browser = await selectedBrowser.getBrowser();
  let page = await utils.getPage(browser);
  await page.setViewport({ width: 1500, height: 1400 });

  await selectedLogin.login(browser);

  const pageUrl = `http://localhost:8080/profile/settings`;
  await Promise.all([
    page.goto(pageUrl, { waitUntil: 'networkidle0' }),
    page.waitForNavigation()
  ]);

  // Get last html content
  page = await utils.getPage(browser);

  await page.waitFor((0.1 * 60) * 1000);

  // Tap page
  // await page.mainFrame().tap('body');

  // Change profile name
  // Name
  const nameInput = utils.removeAngular ('#mat-tab-content-0-1 > div > div > div > div.col-12.col-sm-8.p-4.ng-tns-c480-1 > mat-form-field.mat-form-field.full-width.ng-tns-c480-1.ng-tns-c133-5.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder.ng-untouched.ng-pristine.ng-valid.mat-form-field-should-float > div > div.mat-form-field-flex.ng-tns-c133-5 > div input');
  await utils.fillInput(page, nameInput, 'Carlos Caffe 1');
};
run();