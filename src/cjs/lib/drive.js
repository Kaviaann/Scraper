const cheerio = require("cheerio");

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

drive("https://drive.google.com/file/d/1kShKB-qsgp-TO2rp28A_b6YFe3-r2bqs/view")
  .then((v) => console.log(v))
  .catch((v) => console.log(v));

module.exports = {
  drive,
};
