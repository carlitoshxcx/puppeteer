const user = require('./data/user');
const puppeteer = require('puppeteer');
const utils = require('./helpers/utils');
const selectedBrowser = require('./helpers/browser');
const selectedLogin = require('./helpers/login');
// import { getBrowser } from './helpers/browser';

async function run() {
  const browser = await selectedBrowser.getBrowser();
  const page = await browser.pages().then(pages => pages[pages.length - 1]);
  await page.setViewport({ width: 1500, height: 1400 });

  await selectedLogin.login(browser);
  
  let pageUrl = `http://localhost:8080/profiles`;
  // let pageUrl = `http://localhost:8080/user/${user.slug}`;
  // await page.goto(pageUrl, { waitUntil: 'networkidle0' });
  await page.goto(pageUrl);

  // GOTO REPO
  // await Promise.all([
  //   page.goto(`http://localhost:8080/admin/users`),
  //   page.waitForNavigation()
  // ]);
  
  // await page.waitFor(2000); // 2s

  // Click to approve
  // const approveFirstButton = utils.removeAngular('#mat-tab-content-0-0 > div > div > app-admin-users-table > mat-table > mat-row:nth-child(2) > mat-cell.mat-cell.cdk-cell.cell-220.text-center.cdk-column-validation_actions.mat-column-validation_actions.ng-star-inserted > button:nth-child(1)');
  // await page.waitForSelector(approveFirstButton);
  // await page.click(approveFirstButton);

  // Click to add certificate
  // const chosseFileInput = 'body > div.swal2-container.swal2-center.swal2-backdrop-show > div > div.swal2-content > input.swal2-file';
  // await page.waitForSelector(chosseFileInput);
  // await page.click(chosseFileInput);

  // Click on approve button
  // const approveButton = 'body > div.swal2-container.swal2-center.swal2-backdrop-show > div > div.swal2-actions > button.swal2-confirm.swal2-styled';
  // await page.waitForSelector(approveButton);
  // await page.click(approveButton);

  // Click on send certification button
  // const sendCertification = 'body > div.swal2-container.swal2-center.swal2-backdrop-show > div > div.swal2-actions > button.swal2-confirm.swal2-styled';
  // await page.waitForSelector(sendCertification);
  // await page.click(sendCertification);

  // Fill profile with user.js
  // Country
  // const countrySelect = utils.removeAngular('.mat-tab-body > div > div > div > div.col-12.col-sm-8.p-4 > mat-form-field.mat-form-field.quarter-width.mb-3.mat-primary.mat-form-field-type-mat-select.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder > div > div.mat-form-field-flex');
  // await page.waitForSelector(countrySelect);
  // await page.click(countrySelect);
  // const countryOption = '#cdk-overlay-0 > div > div .mat-option';
  // await page.waitForSelector(countryOption);
  // await page.click(countryOption);

  // // Zipcode
  // const zipcodeInput = utils.removeAngular('.mat-tab-body > div > div > div > div.col-12.col-sm-8.p-4 > mat-form-field.mat-form-field.has-hint.quarter-width.mb-3.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder > div > div.mat-form-field-flex > div input');
  // await page.waitForSelector(zipcodeInput);
  // await page.click(zipcodeInput);
  // await page.keyboard.type(user.zipcode);

  // // Street address
  // const streetAddressInput = utils.removeAngular('.mat-tab-body > div > div > div > div.col-12.col-sm-8.p-4 > mat-form-field.mat-form-field.has-hint.half-width.mb-4.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder > div > div.mat-form-field-flex > div input');
  // await page.waitForSelector(streetAddressInput);
  // await page.click(streetAddressInput);
  // await page.keyboard.type(user.street_adress);

  // // Street address number
  // const streetAddressNumberInput = utils.removeAngular('.mat-tab-body > div > div > div > div.col-12.col-sm-8.p-4 > mat-form-field.mat-form-field.has-hint.quarter-width.mb-4.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder > div > div.mat-form-field-flex > div input');
  // await page.waitForSelector(streetAddressNumberInput);
  // await page.click(streetAddressNumberInput);
  // await page.keyboard.type(user.street_address_number);

  // // Complement
  // const complementInput = utils.removeAngular('#mat-tab-content-0-1 > div > div > div > div.col-12.col-sm-8.p-4.ng-tns-c480-1 > mat-form-field.mat-form-field.has-hint.half-width.mb-4.ng-tns-c480-1.ng-tns-c133-11.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder.ng-untouched.ng-pristine.ng-valid > div > div.mat-form-field-flex.ng-tns-c133-11 > div input');
  // await page.waitForSelector(complementInput);
  // await page.click(complementInput);
  // await page.keyboard.type(user.complement);

  // // Neighborhood
  // const neighborhoodInput = utils.removeAngular('#mat-tab-content-0-1 > div > div > div > div.col-12.col-sm-8.p-4.ng-tns-c480-1 > mat-form-field.mat-form-field.has-hint.half-width.mb-4.ng-tns-c480-1.ng-tns-c133-12.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder.ng-untouched.ng-pristine.ng-invalid > div > div.mat-form-field-flex.ng-tns-c133-12 > div');
  // await page.waitForSelector(neighborhoodInput);
  // await page.click(neighborhoodInput);
  // await page.keyboard.type(user.neighborhood);

  // // Document Type
  // const documentTypeSelect = utils.removeAngular('#mat-tab-content-0-1 > div > div > div > div.col-12.col-sm-8.p-4.ng-tns-c480-1 > div.mt-3.ng-tns-c480-1 > mat-form-field.mat-form-field.third-width.ng-tns-c480-1.ng-tns-c133-13.mat-primary.mat-form-field-type-mat-select.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder.ng-untouched.ng-pristine.ng-invalid > div > div.mat-form-field-flex.ng-tns-c133-13 > div.mat-form-field-infix.ng-tns-c133-13 .mat-select');
  // await page.waitForSelector(documentTypeSelect);
  // await page.click(documentTypeSelect);
  // const documentTypeOption = '#cdk-overlay-1 > div > div .mat-option';
  // await page.waitForSelector(documentTypeOption);
  // await page.click(documentTypeOption);

  // // Document Number
  // const documentNumberInput = utils.removeAngular('#mat-tab-content-0-1 > div > div > div > div.col-12.col-sm-8.p-4.ng-tns-c480-1 > div.mt-3.ng-tns-c480-1 > mat-form-field.mat-form-field.third-width.mb-3.pr-1.ng-tns-c480-1.ng-tns-c133-15.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-has-label.ng-untouched.ng-pristine.mat-form-field-hide-placeholder.mat-form-field-disabled > div > div.mat-form-field-flex.ng-tns-c133-15 > div.mat-form-field-infix.ng-tns-c133-15 input');
  // await page.waitForSelector(documentNumberInput);
  // await page.click(documentNumberInput);
  // await page.keyboard.type(user.document_number);

  // // Birthdate
  // const birthdateInput = utils.removeAngular('#mat-tab-content-0-1 > div > div > div > div.col-12.col-sm-8.p-4.ng-tns-c480-1 > div.mt-3.ng-tns-c480-1 > mat-form-field.mat-form-field.third-width.mb-3.ng-tns-c133-17.mat-primary.ng-tns-c480-1.mat-form-field-type-mat-input.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder.ng-untouched.ng-pristine.ng-star-inserted.ng-invalid > div > div.mat-form-field-flex.ng-tns-c133-17 > div.mat-form-field-infix.ng-tns-c133-17 input');
  // await page.waitForSelector(birthdateInput);
  // await page.click(birthdateInput);
  // await page.keyboard.type(user.birthdate);

  // // Phone number
  // const phoneNumberInput = utils.removeAngular('#mat-tab-content-0-1 > div > div > div > div.col-12.col-sm-8.p-4.ng-tns-c480-1 > div.mb-3.ng-tns-c480-1 > app-intl-tel-input > div > div > input');
  // await page.waitForSelector(phoneNumberInput);
  // await page.click(phoneNumberInput);
  // await page.keyboard.type(user.phone_number);

  // // Description
  // const descriptionInput = utils.removeAngular ('#mat-tab-content-0-1 > div > div > div > div.col-12.col-sm-8.p-4.ng-tns-c480-1 > div.mt-4.mb-2.mb-sm-1.ng-tns-c480-1 > mat-form-field > div > div.mat-form-field-flex.ng-tns-c133-16 > div.mat-form-field-infix.ng-tns-c133-16 textarea');
  // await page.waitForSelector(descriptionInput);
  // await page.click(descriptionInput);
  // await page.keyboard.type(user.description);

  // // Save
  // const saveButton = utils.removeAngular ('#mat-tab-content-0-1 > div > div > div > div.col-12.col-sm-8.p-4.ng-tns-c480-1 > button');
  // await page.waitForSelector(saveButton);
  // await page.click(saveButton);

  await page.waitFor((60 * 60) * 1000); // 1h opened
  // await browser.close();
};

run();