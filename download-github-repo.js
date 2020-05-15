const REPO = require('./data/repo');
const CREDS = require('./data/creds');
const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await page.goto('https://github.com/login');
  await page.setViewport({ width: 1080, height: 700 });

  // LOGIN GITHUB
  const USERNAME_SELECTOR = '#login_field';
  const PASSWORD_SELECTOR = '#password';
  const BUTTON_SELECTOR = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block';

  await page.waitForSelector(USERNAME_SELECTOR);
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(CREDS.username);
  
  await page.waitForSelector(PASSWORD_SELECTOR);
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password);

  await page.waitForSelector(BUTTON_SELECTOR);
  await Promise.all([
    page.click(BUTTON_SELECTOR),
    page.waitForNavigation(),
  ]);

  // GOTO REPO
  await Promise.all([
    page.goto(`https://github.com/${REPO.name}?tab=repositories`),
    page.waitForNavigation()
  ]);

  const NUM_REPOS_SELECTOR = '#user-repositories-list > ul > li';
  const LINK_REPOS_SELECTOR = '#user-repositories-list > ul > li div.col-10.col-lg-9.d-inline-block div.d-inline-block.mb-1 h3 a';

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

    await page.waitForSelector('.file-navigation > .d-flex > get-repo-controller > .position-relative > .btn');
    await page.click('.file-navigation > .d-flex > get-repo-controller > .position-relative > .btn');

    await page.waitForSelector('.position-relative > .get-repo-modal > div > .mt-2 > .flex-1');
    await page.click('.position-relative > .get-repo-modal > div > .mt-2 > .flex-1');

    await page.waitForSelector('.file-navigation > .d-flex > get-repo-controller > .position-relative > .btn');
    await page.click('.file-navigation > .d-flex > get-repo-controller > .position-relative > .btn');
    console.log(`-> Downloaded: ${link}`);
  }

  await page.waitFor((10 * 60) * 1000);

  await browser.close();
};

run();