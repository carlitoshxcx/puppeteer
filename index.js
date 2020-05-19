const selectedBrowser = require('./helpers/browser');
const utils = require('./helpers/utils');
const credentials = require('./data/credentials/rhizom');
const loginAt = require('./helpers/login');
const launch = require('./.vscode/launch');

(async () => {
  const browser = await selectedBrowser.getBrowser();
  let page = await utils.getPage(browser);
  await page.setViewport({ width: 1400, height: 900 });
  // await page.setViewport({ width: 1882/2, height: 1150/2 });
  console.log('launch', launch);
  await loginAt.rhizom(browser, credentials);

  // GOTO REPO
  const pageUrl = `https://github.com/${REPO.name}?tab=repositories`;
  await Promise.all([
    page.goto(pageUrl, { waitUntil: 'networkidle0' }),
    page.waitForNavigation({ waitUntil: 'domcontentloaded' })
  ]);

  // Get last html content
  // page = await utils.getPage(browser);

  // const NUM_REPOS_SELECTOR = '#user-repositories-list > ul > li';
  // const LINK_REPOS_SELECTOR = '#user-repositories-list > ul > li div.col-10.col-lg-9.d-inline-block div.d-inline-block.mb-1 h3 a';

  // const cloneButton = '.file-navigation > .d-flex > get-repo-controller > .position-relative > .btn';
  // const downloadButton = '.position-relative > .get-repo-modal > div > .mt-2 > .flex-1';

  // await page.waitForSelector(NUM_REPOS_SELECTOR);

  // const linkRepos = await page.$$eval(LINK_REPOS_SELECTOR, links => links.map(link => link.href));
})();