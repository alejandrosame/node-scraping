const puppeteer = require('puppeteer');
const $ = require('cheerio');
//const potusParse = require('./potusParse');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto(url);
    let html = await page.content();
    
    const presidents = [];
    for (let i = 0; i < 45; i++) {
      let url = $('big > a', html)[i].attribs.href;
      await page.goto('https://en.wikipedia.org' + url);
      let htmlPotus = await page.content();

      presidents.push({
          name: $('.firstHeading', htmlPotus).text(),
          birthday: $('.bday', htmlPotus).text(),
      });
    }

    console.log(presidents);
  } catch (err){
    console.log(err);
  }
  
  await browser.close();
}

run();