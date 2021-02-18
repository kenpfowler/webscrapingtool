const cheerio = require("cheerio");
const fetch = require("node-fetch");
const Sheet = require("./sheet");

async function getInfo(counter) {
  //URL variables
  const url = "https://clutch.co/seo-firms?page=";
  const queryParam =
    "&sort_by=&min_project_size=25000&avg_hrly_rate=&employees=&client_focus=&industry_focus=&location%5Bcountry%5D=us&location%5Bcity%5D=&op=Apply&form_id=spm_exposed_form&form_build_id=form-a49L9mNbJmEZTtiisN3f5cVkNB3w1BP5bx6chSn_rzc";
  const coinfo = [];

  // query a page of results
  const res = await fetch(`${url}${counter}${queryParam}`);
  const text = await res.text();
  const $ = await cheerio.load(text);

  // remove an annoying button that looks like an element we want from cherrio DOM.
  $(".website-link-consult-a").remove();

  // uncomment for selecotr for advertising and markeing agencies
  // const names = $(".company_info__wrap a");

  // Search function for SEO
  const names = $(".company-name a");
  let domains = $(".website-link a");

  // create an object with the link value and push to array
  domains.each(function () {
    const link = $(this).attr("href");
    coinfo.push({ domain: link });
  });

  // add a name property called name with the name that corresponds to each link gathered
  names.each(function (i, ele) {
    const name = $(this).text();
    coinfo[i].name = name;
  });
  // returns an array of {name, link} objects from the page
  return coinfo;
}

(async function () {
  let counter = 0;
  let rowsArray = [];

  //loop through the jobs page by page and accumulate them all in a new array.
  while (true) {
    // use function to get an array of objects from a single page
    let rows = await getInfo(counter);
    console.log({
      page: counter,
      rows: rows.length,
    });
    // when there are no results break the loop
    if (rows.length === 0) break;

    // add the page of rows to the master row array
    rowsArray = rowsArray.concat(rows);
    counter++;
  }

  //create a new sheet and load the rows
  const sheet = new Sheet();
  await sheet.load();
  await sheet.addRows(rowsArray, 18);
})();
