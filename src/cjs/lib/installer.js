const cheerio = require("cheerio");

async function snackVideo(url) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!/snackvideo.com/gi.test(url)) return reject("Invalid URL!");
      const res = await fetch(url).then((v) => v.text());
      const $ = cheerio.load(res);
      const video = $("div.video-box").find("a-video-player");
      const author = $("div.author-info");
      const attr = $("div.action");
      const data = {
        title: $(author)
          .find("div.author-desc > span")
          .children("span")
          .eq(0)
          .text()
          .trim(),
        thumbnail: $(video)
          .parent()
          .siblings("div.background-mask")
          .children("img")
          .attr("src"),
        media: $(video).attr("src"),
        author: $("div.author-name").text().trim(),
        authorImage: $(attr).find("div.avatar > img").attr("src"),
        like: $(attr).find("div.common").eq(0).text().trim(),
        comment: $(attr).find("div.common").eq(1).text().trim(),
        share: $(attr).find("div.common").eq(2).text().trim(),
      };

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
}

snackVideo("https://s.snackvideo.com/p/j9jKr9dR");
