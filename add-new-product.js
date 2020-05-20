const selectedBrowser = require('./helpers/browser');
const utils = require('./helpers/utils');
const product = require('./data/product');
const credentials = require('./data/credentials/rhizom');
const loginAt = require('./helpers/login');

(async () => {
  const browser = await selectedBrowser.getBrowser();
  let page = await utils.getPage(browser);
  await page.setViewport({ width: 1400, height: 900 });

  // await page.waitFor(100); // 0.1s

  // LOGIN
  // await loginAt.rhizom(browser, credentials);

  // GOTO REPO
  const pageUrl = `http://localhost:8080/shop/products-management`;
  await Promise.all([
    page.goto(pageUrl),
    page.goto(pageUrl, { waitUntil: 'networkidle0' }),
    page.waitForNavigation()
    // page.waitForNavigation({ waitUntil: 'domcontentloaded' })
  ]);

  await page.waitFor(100); // 0.1s

  // Get last html content
  page = await utils.getPage(browser);

  // Add new product
  const addNewProduct = 'body > app-root > div:nth-child(3) > app-marketplace-marketplace-root > app-marketplace-products-management > div > div > div.row.mb-3 > div:nth-child(2) > a.btn.btn-default.float-right';
  await page.waitForSelector(addNewProduct);
  await Promise.all([
    page.click(addNewProduct),
    // page.waitForNavigation()
    page.waitForNavigation({ waitUntil: 'domcontentloaded' })
  ]);

  // In: http://localhost:8080/shop/products-management/product
  // Get last html content
  page = await utils.getPage(browser);


  // Fill product with product.js
  // CATEGORY
  const categorySelect1 = '#level1 > li';
  await page.waitForSelector(categorySelect1);
  await page.click(categorySelect1);
  const categorySelect2 = '#level2 > li';
  await page.waitForSelector(categorySelect2);
  await page.click(categorySelect2);
  // Next Button
  const categoryNextButton = '#cdk-step-content-0-0 > app-product-category > div > div.text-right.mt-4 > button';
  await page.waitForSelector(categoryNextButton);
  await page.click(categoryNextButton);


  // ABOUT
  // Name
  const nameInput = '#cdk-step-content-0-1 > app-product-info > div > form > div.row > div.col-12.mb-2 > mat-form-field > div > div.mat-form-field-flex.ng-tns-c133-24 > div input';
  await page.waitForSelector(nameInput);
  await page.click(nameInput);
  await page.keyboard.type(product.name);  
  // Descrição
  const descriptionInput = '#cdk-step-content-0-1 > app-product-info > div > form > div.row > div:nth-child(2) > quill-editor > div.ql-container.ql-snow > div.ql-editor.ql-blank';
  await page.waitForSelector(descriptionInput);
  await page.click(descriptionInput);
  await page.keyboard.type(product.description);
  // Next Button
  const aboutNextButton = '#cdk-step-content-0-1 > app-product-info > div > form > div.actions.mt-3 > button.btn.btn-list.m-1.next-btn';
  await page.waitForSelector(aboutNextButton);
  await page.click(aboutNextButton);
  await page.waitFor(100); // 0.1s


  // IMAGES
  // Next Button
  const imageNextButton = '#cdk-step-content-0-2 > app-product-images > div > div.actions.mt-3 > button.btn.btn-list.m-1.next-btn.text-primary';
  await page.waitForSelector(imageNextButton);
  await page.click(imageNextButton);
  await page.waitFor(100); // 0.1s


  // SPECS
  // Spec Resume
  const specResumeInput = '#cdk-step-content-0-3 > app-product-specs > div > form > div > div:nth-child(1) > mat-form-field > div > div.mat-form-field-flex.ng-tns-c133-25 > div.mat-form-field-infix.ng-tns-c133-25 textarea';
  await page.waitForSelector(specResumeInput);
  await page.click(specResumeInput);
  await page.keyboard.type(product.spec_resume);
  // Model
  const modelInput = '#cdk-step-content-0-3 > app-product-specs > div > form > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > mat-form-field > div > div.mat-form-field-flex.ng-tns-c133-26 > div input';
  await page.waitForSelector(modelInput);
  await page.click(modelInput);
  await page.keyboard.type(product.model);
  // Codigo SKU
  const skuCodeInput = '#cdk-step-content-0-3 > app-product-specs > div > form > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > mat-form-field > div > div.mat-form-field-flex.ng-tns-c133-27 > div input';
  await page.waitForSelector(skuCodeInput);
  await page.click(skuCodeInput);
  await page.keyboard.type(product.sku);
  // Codigo UPC
  const upcCodeInput = '#cdk-step-content-0-3 > app-product-specs > div > form > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > mat-form-field > div > div.mat-form-field-flex.ng-tns-c133-28 > div input';
  await page.waitForSelector(upcCodeInput);
  await page.click(upcCodeInput);
  await page.keyboard.type(product.upc);
  // Spec Option Name
  const specOptionNameInput = '#cdk-step-content-0-3 > app-product-specs > div > form > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(1) > mat-form-field > div > div.mat-form-field-flex.ng-tns-c133-29 > div input';
  await page.waitForSelector(specOptionNameInput);
  await page.click(specOptionNameInput);
  await page.keyboard.type(product.option_name);
  // Spec Option Value
  const specOptionValueInput = '#cdk-step-content-0-3 > app-product-specs > div > form > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2) > mat-form-field > div > div.mat-form-field-flex.ng-tns-c133-30 > div';
  await page.waitForSelector(specOptionValueInput);
  await page.click(specOptionValueInput);
  await page.keyboard.type(product.option_value);
  // Next Button
  const specNextButton = '#cdk-step-content-0-3 > app-product-specs > div > div.actions.mt-3 > button.btn.btn-list.m-1.next-btn.text-primary';
  await page.waitForSelector(specNextButton);
  await page.click(specNextButton);
  await page.waitFor(100); // 0.1s


  // SIZE
  // Measure size
  const measureSize = '#cdk-step-content-0-4 > app-product-size > div > div.row.mt-4 > div > form > div > div > div > div.row.mb-2 > div:nth-child(1) > mat-form-field > div > div.mat-form-field-flex.ng-tns-c133-31';
  await page.waitForSelector(measureSize);
  await page.click(measureSize);
  const measureSizeOption = '#cdk-overlay-0 > div > div .mat-option';
  await page.waitForSelector(measureSizeOption);
  await page.click(measureSizeOption);
  // Width
  const sizeWidth = '#cdk-step-content-0-4 > app-product-size > div > div.row.mt-4 > div > form > div > div > div > div.row.mb-2 > div:nth-child(2) > div > mat-form-field > div > div.mat-form-field-flex.ng-tns-c133-33 > div input';
  await page.waitForSelector(sizeWidth);
  await page.click(sizeWidth);
  await page.keyboard.type(product.width);
  // Height
  const sizeHeight = '#cdk-step-content-0-4 > app-product-size > div > div.row.mt-4 > div > form > div > div > div > div.row.mb-2 > div:nth-child(3) > div > mat-form-field > div > div.mat-form-field-flex.ng-tns-c133-34 > div input';
  await page.waitForSelector(sizeHeight);
  await page.click(sizeHeight);
  await page.keyboard.type(product.height);
  // Length
  const sizeLength = '#cdk-step-content-0-4 > app-product-size > div > div.row.mt-4 > div > form > div > div > div > div.row.mb-2 > div:nth-child(4) > div > mat-form-field > div > div.mat-form-field-flex.ng-tns-c133-35 > div input';
  await page.waitForSelector(sizeLength);
  await page.click(sizeLength);
  await page.keyboard.type(product.length);
  // Measure weight
  const measureWeight = '#cdk-step-content-0-4 > app-product-size > div > div.row.mt-4 > div > form > div > div > div > div.row.mb-5 > div.col-6.col-lg-3 > mat-form-field > div > div.mat-form-field-flex.ng-tns-c133-36';
  await page.waitForSelector(measureWeight);
  await page.click(measureWeight);
  const measureWeightOption = '#cdk-overlay-1 > div > div .mat-option';
  await page.waitForSelector(measureWeightOption);
  await page.click(measureWeightOption);
  // Width
  const sizeWeight = '#cdk-step-content-0-4 > app-product-size > div > div.row.mt-4 > div > form > div > div > div > div.row.mb-5 > div:nth-child(2) > mat-form-field > div > div.mat-form-field-flex.ng-tns-c133-38 > div input';
  await page.waitForSelector(sizeWeight);
  await page.click(sizeWeight);
  await page.keyboard.type(product.width);
  // Next Button
  const sizeNextButton = '#cdk-step-content-0-4 > app-product-size > div > div.actions.mt-3 > button.btn.btn-list.m-1.next-btn';
  await page.waitForSelector(sizeNextButton);
  await page.click(sizeNextButton);
  await page.waitFor(100); // 0.1s


  // PRICE
  // Price Input
  const priceInput = '#cdk-step-content-0-5 > app-product-values > div > div:nth-child(2) > div.col-12.col-sm-6.col-lg-4.pr-0.ng-tns-c488-21 > form > mat-form-field > div > div.mat-form-field-flex.ng-tns-c133-39 > div.mat-form-field-infix.ng-tns-c133-39 input';
  await page.waitForSelector(priceInput);
  await page.click(priceInput);
  await page.keyboard.type(product.price);
  // stock Input
  const stockInput = '#cdk-step-content-0-5 > app-product-values > div > div:nth-child(2) > div:nth-child(2) > form > mat-form-field > div > div.mat-form-field-flex.ng-tns-c133-40 > div input';
  await page.waitForSelector(stockInput);
  await page.click(stockInput);
  await page.keyboard.type(product.stock);
  // Publish Button
  const publishButton = 'body > app-root > div:nth-child(3) > app-marketplace-marketplace-root > app-product-creation > div > div > div:nth-child(2) > div.col-10.offset-1.col-sm-6.offset-sm-3.offset-lg-0.col-lg-3 > div > app-product-actions > div:nth-child(1) > div:nth-child(2) > button';
  await page.waitForSelector(publishButton);
  await page.click(publishButton);
  await page.waitFor(2000); // 2s
  // Continue Editing
  const continueEditingButton = 'body > app-root > div:nth-child(3) > app-marketplace-marketplace-root > app-product-creation > app-product-preview-modal > div > div > div > div > div > div.animate-height.show.content > div > button.btn.btn-default.mr-4.ml-4';
  await page.waitForSelector(continueEditingButton);
  await page.click(continueEditingButton);
  await page.waitFor(100); // 0.1s


  // Get last html content
  page = await utils.getPage(browser);


  // Enable Discount
  const enableDiscountButton = '#cdk-step-content-0-5 > app-product-values > div > div:nth-child(3) > div:nth-child(2) > div > div > a';
  await page.waitForSelector(enableDiscountButton);
  await page.click(enableDiscountButton);
  
  // Get last html content
  page = await utils.getPage(browser);
  await page.waitFor(100); // 0.1s

  // Discount Value
  const discountValueInput = '#cdk-step-content-0-5 > app-product-values > div > div:nth-child(3) > div:nth-child(2) > div.discount-wrapper.discount-border.mb-4.ng-tns-c488-21.show.ng-star-inserted > form > div > div.row.mt-3.ng-tns-c488-21 > div:nth-child(1) > mat-form-field > div > div.mat-form-field-flex.ng-tns-c133-47';
  await page.waitForSelector(discountValueInput);
  await page.click(discountValueInput);
  await page.keyboard.type(product.discount_value);
  // Discount Stock
  const discountStockInput = '#cdk-step-content-0-5 > app-product-values > div > div:nth-child(3) > div:nth-child(2) > div.discount-wrapper.discount-border.mb-4.ng-tns-c488-21.show.ng-star-inserted > form > div > div.row.mt-2.ng-tns-c488-21 > div:nth-child(1) > mat-form-field > div > div.mat-form-field-flex.ng-tns-c133-49';
  await page.waitForSelector(discountStockInput);
  await page.click(discountStockInput);
  await page.keyboard.type(product.discount_stock);
  // Discount Initial
  const discountInitialInput = '#cdk-step-content-0-5 > app-product-values > div > div:nth-child(3) > div:nth-child(2) > div.discount-wrapper.discount-border.mb-4.ng-tns-c488-21.show.ng-star-inserted > form > div > div.row.mt-2.ng-tns-c488-21 > div:nth-child(2) > mat-form-field > div > div.mat-form-field-flex.ng-tns-c133-50 > div.mat-form-field-infix.ng-tns-c133-50 input';
  await page.waitForSelector(discountInitialInput);
  await page.click(discountInitialInput);
  await page.waitFor(10); // 0.01s
  await page.click(discountInitialInput);
  await page.keyboard.type(product.discount_initial_date);
  await page.waitFor(10); // 0.3s
  // Discount Final
  const discountFinalInput = '#cdk-step-content-0-5 > app-product-values > div > div:nth-child(3) > div:nth-child(2) > div.discount-wrapper.discount-border.mb-4.ng-tns-c488-21.show.ng-star-inserted > form > div > div.row.mt-2.ng-tns-c488-21 > div:nth-child(3) > mat-form-field > div > div.mat-form-field-flex.ng-tns-c133-51 > div.mat-form-field-infix.ng-tns-c133-51 input';
  await page.waitForSelector(discountFinalInput);
  await page.click(discountFinalInput);
  await page.waitFor(10); // 0.01s
  await page.click(discountFinalInput);
  await page.keyboard.type(product.discount_final_date);
  await page.waitFor(100); // 0.3s
  // Publish Button
  await page.waitForSelector(publishButton);
  await page.click(publishButton);
})();