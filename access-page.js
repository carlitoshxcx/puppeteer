const utils = require('./helpers/utils');
const selectedBrowser = require('./helpers/browser');
const selectedLogin = require('./helpers/login');

(async () => {
  const browser = await selectedBrowser.getBrowser();
  let page = await utils.getPage(browser);
  await page.setViewport({ width: 1882/2, height: 1150/2 });

  // await selectedLogin.login(browser);

  const pageUrl = `http://localhost:8080/profile/settings`;
  await Promise.all([
    page.goto(pageUrl),
    page.waitForNavigation()
  ]);

  // Get last html content
  page = await utils.getPage(browser);

  // Tap page
  await page.mainFrame().tap('body');

  // Change profile name
  // Name
  const nameInput = utils.removeAngular('#mat-tab-content-0-1 > div > div > div > div.col-12.col-sm-8.p-4.ng-tns-c480-1 > mat-form-field.mat-form-field.full-width.ng-tns-c480-1.ng-tns-c133-5.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder.ng-untouched.ng-pristine.ng-valid.mat-form-field-should-float > div > div.mat-form-field-flex.ng-tns-c133-5 > div input');
  await utils.fillInput(page, nameInput, 'Carlos Caffe Gourmet');

  // Save
  const saveButton = utils.removeAngular('#mat-tab-content-0-1 > div > div > div > div.col-12.col-sm-8.p-4.ng-tns-c480-1 > button');

  // Press call to action button
  await Promise.all([
    page.waitForSelector(saveButton),
    page.focus(saveButton),
    page.keyboard.press('Enter'),
    // page.click(saveButton),
    page.waitForNavigation()
  ]);
})();