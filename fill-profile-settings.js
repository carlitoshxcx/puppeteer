const user = require('./data/user');
const puppeteer = require('puppeteer');

function removeAngular(selector = ''){
  selector = selector.replace('#mat-tab-content-0-1', '.mat-tab-body');
  selector = selector.replace('.ng-untouched', '');
  selector = selector.replace('.ng-pristine', '');
  selector = selector.replace('.ng-invalid', '');
  selector = selector.replace('.ng-valid', '');
  selector = selector.replace('.mat-form-field-disabled', '');
  
  // selector = selector.split('.').reduce((result, value) => {
  //   if (value.indexOf('ng-tns') >= 0) {
  //     const [ found ] = value.split(' ');
  //     result = result.replace(`.${found}`, '');
  //   }
  //   return result;
  // }, selector);

  return selector;
}

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await page.goto('http://localhost:8080/login');
  await page.setViewport({ width: 1200, height: 1500 });

  // Login
  const emailInput = 'body > app-root > div:nth-child(3) > app-authentication > div.auth-wrapper > div > div > div > div > form > mat-form-field.mat-form-field.full-width.mb-2.ng-tns-c133-4.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder.ng-untouched.ng-pristine.ng-invalid > div > div.mat-form-field-flex.ng-tns-c133-4 > div input';
  const passwordInput = 'body > app-root > div:nth-child(3) > app-authentication > div.auth-wrapper > div > div > div > div > form > mat-form-field.mat-form-field.full-width.mb-2.ng-tns-c133-5.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder.ng-untouched.ng-pristine.ng-invalid > div > div.mat-form-field-flex.ng-tns-c133-5 > div';
  const ctaButton = 'body > app-root > div:nth-child(3) > app-authentication > div.auth-wrapper > div > div > div > div > form > button';

  await page.waitForSelector(emailInput);
  await page.click(emailInput);
  await page.keyboard.type(user.email);
  
  await page.waitForSelector(passwordInput);
  await page.click(passwordInput);
  await page.keyboard.type(user.password);

  await page.waitForSelector(ctaButton);
  await Promise.all([
    page.click(ctaButton),
    page.waitForNavigation(),
  ]);

  // GOTO REPO
  await Promise.all([
    page.goto(`http://localhost:8080/profile/settings`),
    page.waitForNavigation()
  ]);

  await page.waitFor(2000); // 2s

  // Fill profile with user.js
  // Country
  const countrySelect = removeAngular('.mat-tab-body > div > div > div > div.col-12.col-sm-8.p-4 > mat-form-field.mat-form-field.quarter-width.mb-3.mat-primary.mat-form-field-type-mat-select.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder > div > div.mat-form-field-flex');
  await page.waitForSelector(countrySelect);
  await page.click(countrySelect);
  const countryOption = '#cdk-overlay-0 > div > div .mat-option';
  await page.waitForSelector(countryOption);
  await page.click(countryOption);

  // Zipcode
  const zipcodeInput = removeAngular('.mat-tab-body > div > div > div > div.col-12.col-sm-8.p-4 > mat-form-field.mat-form-field.has-hint.quarter-width.mb-3.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder > div > div.mat-form-field-flex > div input');
  await page.waitForSelector(zipcodeInput);
  await page.click(zipcodeInput);
  await page.keyboard.type(user.zipcode);

  // Street address
  const streetAddressInput = removeAngular('.mat-tab-body > div > div > div > div.col-12.col-sm-8.p-4 > mat-form-field.mat-form-field.has-hint.half-width.mb-4.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder > div > div.mat-form-field-flex > div input');
  await page.waitForSelector(streetAddressInput);
  await page.click(streetAddressInput);
  await page.keyboard.type(user.street_adress);

  // Street address number
  const streetAddressNumberInput = removeAngular('.mat-tab-body > div > div > div > div.col-12.col-sm-8.p-4 > mat-form-field.mat-form-field.has-hint.quarter-width.mb-4.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder > div > div.mat-form-field-flex > div input');
  await page.waitForSelector(streetAddressNumberInput);
  await page.click(streetAddressNumberInput);
  await page.keyboard.type(user.street_address_number);

  // Complement
  const complementInput = removeAngular('#mat-tab-content-0-1 > div > div > div > div.col-12.col-sm-8.p-4.ng-tns-c480-1 > mat-form-field.mat-form-field.has-hint.half-width.mb-4.ng-tns-c480-1.ng-tns-c133-11.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder.ng-untouched.ng-pristine.ng-valid > div > div.mat-form-field-flex.ng-tns-c133-11 > div input');
  await page.waitForSelector(complementInput);
  await page.click(complementInput);
  await page.keyboard.type(user.complement);

  // Neighborhood
  const neighborhoodInput = removeAngular('#mat-tab-content-0-1 > div > div > div > div.col-12.col-sm-8.p-4.ng-tns-c480-1 > mat-form-field.mat-form-field.has-hint.half-width.mb-4.ng-tns-c480-1.ng-tns-c133-12.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder.ng-untouched.ng-pristine.ng-invalid > div > div.mat-form-field-flex.ng-tns-c133-12 > div');
  await page.waitForSelector(neighborhoodInput);
  await page.click(neighborhoodInput);
  await page.keyboard.type(user.neighborhood);

  // Document Type
  const documentTypeSelect = removeAngular('#mat-tab-content-0-1 > div > div > div > div.col-12.col-sm-8.p-4.ng-tns-c480-1 > div.mt-3.ng-tns-c480-1 > mat-form-field.mat-form-field.third-width.ng-tns-c480-1.ng-tns-c133-13.mat-primary.mat-form-field-type-mat-select.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder.ng-untouched.ng-pristine.ng-invalid > div > div.mat-form-field-flex.ng-tns-c133-13 > div.mat-form-field-infix.ng-tns-c133-13 .mat-select');
  await page.waitForSelector(documentTypeSelect);
  await page.click(documentTypeSelect);
  const documentTypeOption = '#cdk-overlay-1 > div > div .mat-option';
  await page.waitForSelector(documentTypeOption);
  await page.click(documentTypeOption);

  // Document Number
  const documentNumberInput = removeAngular('#mat-tab-content-0-1 > div > div > div > div.col-12.col-sm-8.p-4.ng-tns-c480-1 > div.mt-3.ng-tns-c480-1 > mat-form-field.mat-form-field.third-width.mb-3.pr-1.ng-tns-c480-1.ng-tns-c133-15.mat-primary.mat-form-field-type-mat-input.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-has-label.ng-untouched.ng-pristine.mat-form-field-hide-placeholder.mat-form-field-disabled > div > div.mat-form-field-flex.ng-tns-c133-15 > div.mat-form-field-infix.ng-tns-c133-15 input');
  await page.waitForSelector(documentNumberInput);
  await page.click(documentNumberInput);
  await page.keyboard.type(user.document_number);

  // Birthdate
  const birthdateInput = removeAngular('#mat-tab-content-0-1 > div > div > div > div.col-12.col-sm-8.p-4.ng-tns-c480-1 > div.mt-3.ng-tns-c480-1 > mat-form-field.mat-form-field.third-width.mb-3.ng-tns-c133-17.mat-primary.ng-tns-c480-1.mat-form-field-type-mat-input.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-has-label.mat-form-field-hide-placeholder.ng-untouched.ng-pristine.ng-star-inserted.ng-invalid > div > div.mat-form-field-flex.ng-tns-c133-17 > div.mat-form-field-infix.ng-tns-c133-17 input');
  await page.waitForSelector(birthdateInput);
  await page.click(birthdateInput);
  await page.keyboard.type(user.birthdate);

  // Phone number
  const phoneNumberInput = removeAngular('#mat-tab-content-0-1 > div > div > div > div.col-12.col-sm-8.p-4.ng-tns-c480-1 > div.mb-3.ng-tns-c480-1 > app-intl-tel-input > div > div > input');
  await page.waitForSelector(phoneNumberInput);
  await page.click(phoneNumberInput);
  await page.keyboard.type(user.phone_number);

  // Description
  const descriptionInput = removeAngular ('#mat-tab-content-0-1 > div > div > div > div.col-12.col-sm-8.p-4.ng-tns-c480-1 > div.mt-4.mb-2.mb-sm-1.ng-tns-c480-1 > mat-form-field > div > div.mat-form-field-flex.ng-tns-c133-16 > div.mat-form-field-infix.ng-tns-c133-16 textarea');
  await page.waitForSelector(descriptionInput);
  await page.click(descriptionInput);
  await page.keyboard.type(user.description);

  // Save
  const saveButton = removeAngular ('#mat-tab-content-0-1 > div > div > div > div.col-12.col-sm-8.p-4.ng-tns-c480-1 > button');
  await page.waitForSelector(saveButton);
  await page.click(saveButton);

  await page.waitFor((10 * 60) * 1000); // 10 min opened
  await browser.close();
};

run();