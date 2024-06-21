const cheerio = require("cheerio");
const BASE_URL = "https://genius.com";

/**
 * SCRAPED BY KAVIAN
 * FORBIDDEN TO SELL OR DELETE MY WM
 */

async function geniusSearch(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`${BASE_URL}/search?q=${encodeURI(query)}`).then(
        (v) => v.text()
      );
      const $ = cheerio.load(res);
      console.log(res);
    } catch (e) {
      reject(e);
    }
  });
}

async function geniusLyrics(title, artist) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        `${BASE_URL}/${artist.replace(/[ ]/gi, "-")}-${title.replace(
          /[ ]/gi,
          "-"
        )}-lyrics`
      ).then((v) => v.text());
      const $ = cheerio.load(res);
      let lyric = [];
      $("body")
        .find("div[data-lyrics-container] > a")
        .each((i, e) => {
          $(e)
            .find("span")
            .each((i, e) => {
              for (let el of e.children) {
                if (el?.name === "b") {
                  lyric.push(`${$(el).text()}`);
                }
                if (el.type === "text") {
                  lyric.push(`${el.data}\n`);
                }
              }
              lyric.push("\n");
            });
        });
      console.log(lyric.join(""));
    } catch (e) {
      reject(e);
    }
  });
}

geniusLyrics("lamour de ma vie", "billie eilish");
