import cheerio from "cheerio";

/**
 * SCRAPED BY KAVIAANN
 * FORBIDDEN TO SELL AND DELETE MY WM
 */

async function igDl(url) {
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
    const data = [];
    const $ = cheerio.load(res);
    const downloads = $("ul");
    $(downloads)
      .find("li")
      .each((i, el) => {
        data.push({
          type: $(el)
            .find("a[title]")
            .attr("title")
            .toLowerCase()
            .includes("photo")
            ? "photo"
            : "video",
          thumbnail:
            $(el).find("img").attr("data-src") || $(el).find("img").attr("src"),
          media: $(el).find("a[title]").attr("href"),
        });
      });
    resolve(data);
  });
}

async function igStalk(user) {
  return new Promise(async (resolve, reject) => {
    await fetch(
      `https://igram.world/api/ig/userInfoByUsername/${user.replace(
        /[^\w\d]/gi,
        ""
      )}`,
      {
        method: "GET",
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        },
      }
    )
      .then((v) => v.json())
      .then((v) => v.result)
      .then((v) => resolve(v))
      .catch((v) => reject(v));
  });
}

export { igDl, igStalk };
