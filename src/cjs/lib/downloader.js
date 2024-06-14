const cheerio = require("cheerio");

async function terabox(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        "https://tera.instavideosave.com/?url=" + url
      ).then((v) => v.json());
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  terabox,
};
