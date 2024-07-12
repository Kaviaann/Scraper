import cheerio from "cheerio";
import path from "path";
import fetch from "node-fetch";

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

async function cobalt(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const BASE_URL = "https://cobalt.tools";
      const BASE_API = "https://api.cobalt.tools/api";
      await fetch(BASE_API + "/json", {
        method: "OPTIONS",
        headers: {
          "access-control-request-method": "POST",
          "access-control-request-headers": "content-type",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
          origin: BASE_URL,
          referer: BASE_URL,
        },
      }).then(async (v) => {
        const res = await fetch(BASE_API + "/json", {
          method: "POST",
          headers: {
            origin: BASE_URL,
            referer: BASE_URL,
            "user-agent": BASE_URL,
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            url: url,
            filenamePattern: "basic",
          }),
        }).then((v) => v.json());

        return resolve(res)
      });
    } catch (e) {
      reject(e);
    }
  });
}

export { drive, mediafire, terabox, snackVideo, cobalt };
