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

/**
 * Scraped By Kaviaann
 * Protected By MIT LICENSE
 * Whoever caught removing wm will be sued
 * @param {string} url
 * @param {{
 * audio : Boolean,
 * aFormat : 'best'|'mp3'|'ogg'|'wav'|'opus',
 * vCodec : 'standar'|'high'|'medium',
 * vReso : 'max'|'8k\+?'|'4k'|'1440p?'|'1080p?'|'720p?'|'480p?'|'360p?'|'240p?'|'144p?'
 * }} options
 * @returns {
 *  status : 'stream'|'success'|'picker'|'error'|'redirected'|'rate-limit'|
 * }
 * @author Kaviaann 2024
 * @copyright https://whatsapp.com/channel/0029Vac0YNgAjPXNKPXCvE2e
 */
async function cobalt(
  url,
  options = {
    audio: false,
    aFormat: "mp3",
    vCodec: "standar",
    vReso: "720p",
    mute: false,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!url) return reject("Insert URL!");

      // ? OPTIONS
      let { audio, aFormat, vCodec, vReso, mute } = options;

      const prop = {};
      const data = {
        url: url,
        filenamePattern: "pretty",
      };

      // ? AUDIO
      if (audio) {
        const aFRegex = /best|mp3|ogg|wav|opus/gi;
        if (!aFormat) aFormat = "mp3";
        if (!aFRegex.test(aFormat)) aFormat = "mp3";
        data.isAudioOnly = true;
        data.aFormat = aFormat;
        prop.type = "audio";
        prop.mtype = aFormat;
      }

      // ? VIDEO
      else {
        // ? REGEXP
        const vCRegex = /standar|high|medium/gi;
        const vRRegex =
          /max|8k\+?|4k|1440p?|1080p?|720p?|480p?|360p?|240p?|144p?/gi;

        // ? IF
        if (!vReso) vReso = "720p";
        if (!vCodec) vCodec = "standar";
        if (!vCRegex.test(vCRegex)) vCodec = "standar";
        if (!vRRegex.test(vReso)) vReso = "720p";
        if (!mute) mute = false;

        // ? QUALITY
        if (vReso === "8k+") vReso = "max";

        // ? CODEC
        switch (vCodec) {
          case "standar": {
            vCodec = "h246";
            break;
          }
          case "high": {
            vCodec = "av1";
            break;
          }
          case "medium": {
            vCodec = "vp9";
            break;
          }
          default: {
            vCodec: "h246";
            break;
          }
        }

        data.vCodec = vCodec;
        data.vQuality = vReso;
        data.isAudioOnly = false;
        data.isAudioMuted = mute;
        prop.type = "video";
        prop.hd = /max|8k+?|4k|1440p?/gi.test(vReso);
        prop.quality = vReso === "max" ? "8k+" : vReso;
        prop.codec = vCodec;
        prop.isMuted = mute;
      }

      // ? FETCHING
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
      }).then(async () => {
        const res = await fetch(BASE_API + "/json", {
          method: "POST",
          headers: {
            origin: BASE_URL,
            referer: BASE_URL,
            "user-agent": BASE_URL,
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(data),
        }).then((v) => v.json());

        return resolve({ ...res, ...prop });
      });
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Scraped By Kaviaann
 * Protected By MIT LICENSE
 * Whoever caught removing wm will be sued
 * @description Any Request? Contact me : vielynian@gmail.com
 * @author Kaviaann 2024
 * @copyright https://whatsapp.com/channel/0029Vac0YNgAjPXNKPXCvE2e
 */
async function gofile(url) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!/gofile.io\/d\//gi.test(url)) return reject("Invalid URL!");
      const id = /https:\/\/gofile.io\/d\/([\d\w]+)/gi.exec(url)[1];

      if (!id) return reject("Folder Id Not Found");

      const BASE_API = "https://api.gofile.io";
      const BASE_URL = "https://gofile.io";
      const acc = await fetch(BASE_API + "/accounts", {
        method: "POST",
        headers: {
          origin: BASE_URL,
          referer: `${BASE_URL}/`,
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        },
        body: "{}",
      }).then((v) => v.json());

      if (acc.status !== "ok") return reject("Error making account");
      const { token } = acc.data;

      const content = await fetch(
        BASE_API +
          "/contents/" +
          id +
          "?" +
          new URLSearchParams({ wt: "4fd6sg89d7s6" }),
        {
          method: "GET",
          headers: {
            origin: BASE_URL,
            referer: `${BASE_URL}/`,
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
            authorization: `Bearer ` + token,
          },
        }
      ).then((v) => v.json());

      if (content.status !== "ok") return reject("Error Fetching Content");

      resolve(content.data);
    } catch (e) {
      reject(e);
    }
  });
}

export { drive, mediafire, terabox, snackVideo, cobalt, gofile };
