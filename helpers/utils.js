/**
 * Remove Angular classes from selector
 * @param selector: string 
 */
function removeAngular(selector = '', removeNg = false) {
  selector = selector.replace('#mat-tab-content-0-1', '.mat-tab-body');
  selector = selector.replace('.ng-untouched', '');
  selector = selector.replace('.ng-pristine', '');
  selector = selector.replace('.ng-invalid', '');
  selector = selector.replace('.ng-valid', '');
  selector = selector.replace('.mat-form-field-disabled', '');
  
  if (removeNg) {
    selector = selector.split('.').reduce((result, value) => {
      if (value.indexOf('ng-tns') >= 0) {
        const [ found ] = value.split(' ');
        result = result.replace(`.${found}`, '');
      }
      return result;
    }, selector);
  }

  return selector;
}

async function getPage(browser) {
  const pages = await browser.pages();
  return new Promise((resolve) => {
    if (pages.length) { resolve(pages[pages.length - 1]); }
  }, (reject) => {
    reject();
  });
}

async function fillInput(page, selector, text) {
  return Promise.all([
    await page.waitForSelector(selector),
    await page.focus(selector),
    await page.$eval(selector, el => el.setSelectionRange(0, el.value.length)),
    await page.keyboard.press('Backspace'),
    await page.keyboard.type(text)
  ]);
}

module.exports.removeAngular = removeAngular;
module.exports.getPage = getPage;
module.exports.fillInput = fillInput;