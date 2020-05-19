const REPO = require('./data/repo');
const credentials = require('./data/credentials/github');
const utils = require('./helpers/utils');
const selectedBrowser = require('./helpers/browser');
const loginAt = require('./helpers/login');

(async () => {
  const browser = await selectedBrowser.getBrowser();
  let page = await utils.getPage(browser);
  await page.setViewport({ width: 1400, height: 900 });
  // await page.setViewport({ width: 1882/2, height: 1150/2 });
  // const page = await browser.newPage();

  // await loginAt.github(browser, credentials);

  // GOTO REPO
  const pageUrl = `https://github.com/${REPO.name}?tab=repositories`;
  await Promise.all([
    page.goto(pageUrl, { waitUntil: 'networkidle0' }),
    page.waitForNavigation({ waitUntil: 'domcontentloaded' })
  ]);

  // Get last html content
  page = await utils.getPage(browser);

  const NUM_REPOS_SELECTOR = '#user-repositories-list > ul > li';
  const LINK_REPOS_SELECTOR = '#user-repositories-list > ul > li div.col-10.col-lg-9.d-inline-block div.d-inline-block.mb-1 h3 a';

  const cloneButton = '.file-navigation > .d-flex > get-repo-controller > .position-relative > .btn';
  const downloadButton = '.position-relative > .get-repo-modal > div > .mt-2 > .flex-1';

  await page.waitForSelector(NUM_REPOS_SELECTOR);

  const numRepos = await page.$$eval(NUM_REPOS_SELECTOR, list => list.length);
  const linkRepos = await page.$$eval(LINK_REPOS_SELECTOR, links => links.map(link => link.href));

  console.log(`Downloading ${numRepos} repositories.`);

  for (let i = 1; i <= numRepos; i++) {
    const link = linkRepos[i - 1];

    await Promise.all([
      page.goto(link),
      page.waitForNavigation()
    ]);

    await page.waitForSelector(cloneButton);
    // await page.click(cloneButton);
    await page.focus(cloneButton);
    await page.keyboard.press('Enter');
  

    await page.waitForSelector(downloadButton);
    // await page.click(downloadButton);
    await page.focus(downloadButton);
    await page.keyboard.press('Enter');
  
    await page.waitForSelector(cloneButton);
    // await page.click(cloneButton);
    await page.focus(cloneButton);
    await page.keyboard.press('Enter');

    console.log(`-> Downloaded: ${link}`);
  }

  // await page.waitFor((10 * 60) * 1000);

  // await browser.close();
})();