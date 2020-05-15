const puppeteer = require('puppeteer');

/**
 * Get browser
 * Return Promise<Browser>
 */
async function getBrowser() {
  // OPTION 1 - Launch new.
  // const browser = await puppeteer.launch({
  //     headless: false // Puppeteer is 'headless' by default.
  // });

  // OPTION 2 - Connect to existing.
  // /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9225 --no-first-run --no-default-browser-check --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir')
  // /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9225 --no-first-run --no-default-browser-check --user-data-dir=/var/folders/6k/r6c2xmns0gl33pkv7q3wgs0r0000gn/T/vscode-chrome-debug-userdatadir_9222
  // MAC: /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
  // --remote-debugging-port=9223
  // --no-first-run
  // --no-default-browser-check
  // --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir')
  // --user-data-dir=/private/var/folders/6k/r6c2xmns0gl33pkv7q3wgs0r0000gn/T/vscode-chrome-debug-userdatadir_9222/Default
  // --user-data-dir=/var/folders/6k/r6c2xmns0gl33pkv7q3wgs0r0000gn/T/vscode-chrome-debug-userdatadir_9222

  const browserURL = 'http://localhost:9222';
  // const browserWSEndpoint = 'ws://127.0.0.1:9225/devtools/browser/360c7d2b-14a4-4f89-b6ac-175a67b10f56';
  const browser = await puppeteer.connect({ 
    browserURL: browserURL, 
    // browserWSEndpoint: browserWSEndpoint
  });

  return browser;
}

module.exports.getBrowser = getBrowser;