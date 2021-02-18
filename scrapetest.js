const fetch = require("node-fetch");

// Function that checks if you can scrape a webpage using fetch and parse.
// Input the url you want to scrape and the content on the page you want
// if it's sent by the server in raw html and doesn't need to be client side rendered using javascript the function will return true
// if the content can't be accessed in the pages markup the function will return false.
// Arguments need to be passed as strings.

async function scrapeTest(url, content) {
  const res = await fetch(url);
  let text = await res.text();
  text = text.toLowerCase();
  const found = text.includes(content.toLowerCase());
  return { text };
}

(async function () {
  console.log(await scrapeTest("https://www.zillow.com/homes/6821-Muleshoe-Ln-Fort-Worth,-TX,-76179_rb/68007060_zpid/", "6821 Muleshoe Ln,"));
})();

// EXAMPLE:
// (async function () {
//     // logs true
//     console.log(await scrapeTest('https://www.coinbase.com/price', 'Bitcoin'));
//     // logs false
//     console.log(await scrapeTest('https://www.marketwatch.com/investing/fund/epgfx/holdings', 'Pikachu'));
// })();

module.exports = scrapeTest;
