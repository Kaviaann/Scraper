import cheerio from "cheerio";

const igdl = async (url) => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch("https://v3.igdownloader.app/api/ajaxSearch", {
      method: "POST",
      body: new URLSearchParams({
        recapthaToken: "",
        q: url,
        t: "media",
        lang: "id",
      }),
    })
      .then((v) => v.json())
      .then((v) => v.data);
    if (!res) return reject("Video Bersifat Pribadi");
    const $ = cheerio.load(res);
    const data = {
      thumbnail: $("img").attr().src,
      type: url.includes("reel") ? "video" : "image",
      media: $("div.download-items__btn").children("a").attr("href"),
      link: url,
    };
    resolve(data);
  });
};

const igStalk = async (user) => {
  return new Promise(async (resolve, reject) => {
    await fetch(
      `https://igram.world/api/ig/userInfoByUsername/${user.replace(
        /[^\w\d]/gi,
        ""
      )}`
    )
      .then((v) => v.json())
      .then((v) => v.result)
      .then((v) => resolve(v))
      .catch((v) => reject(v));
  });
};

export { igdl, igStalk };
