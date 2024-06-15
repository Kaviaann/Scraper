const cheerio = require("cheerio");
const path = require("path");

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

async function drive(url) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!/drive\.google\.com\/file\/d\//gi.test(url))
        return reject("Invalid URL");
      const res = await fetch(url).then((v) => v.text());
      const $ = cheerio.load(res);
      const id = url.split("/")[5];
      const data = {
        name: $("head").find("title").text().split("-")[0].trim(),
        download: `https://drive.usercontent.google.com/uc?id=${id}&export=download`,
        link: url,
      };

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
}

async function mediafire(url) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!/mediafire\.com\/file\//gi.test(url)) return reject("Invalid URL");
      const res = await fetch(url).then((v) => v.text());
      const $ = cheerio.load(res);
      const button = $("body").find(".dl-btn-cont");
      const dlinfo = $("body").find(".dl-info");
      resolve({
        name: $(button).find("div.dl-btn-label").text().trim(),
        filename: $(button).find("div.dl-btn-label").attr("title"),
        type: path.extname($(button).find("div.dl-btn-label").attr("title")),
        size: $(dlinfo)
          .find("ul.details")
          .find("li > span")
          .eq(0)
          .text()
          .trim(),
        created:
          new Date(
            $(dlinfo).find("ul.details").find("li > span").eq(1).text().trim()
          ) - 1,
        descHeader: $(dlinfo).find("div.description > p").eq(0).text().trim(),
        desc: $(dlinfo).find("div.description > p").eq(1).text().trim(),
        media: $(button).find("a.popsok").attr("href"),
        link: url,
      });
    } catch (e) {
      reject(e);
    }
  });
}

mediafire(
  "https://www.mediafire.com/file/fj5fxntcdgzw21u/database.sql/file"
).then((v) => console.log(v));

module.exports = {
  terabox,
  drive,
};
