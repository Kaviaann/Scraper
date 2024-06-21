const cheerio = require("cheerio");

async function sticker(query, page = 1, type = "sticker") {
  return new Promise(async (resolve, reject) => {
    if (
      !["sticker", "icon", "animated-icon", "uicon"].includes(
        type.trim().replace(/[ ]/gi, "-")
      )
    )
      return reject("Invalid Type");
    try {
      let res = await fetch(
        `https://www.flaticon.com/search/${page}?word=${encodeURI(
          query
        )}&type=${type}`
      );
      if (page !== 1 && !res.ok) return reject("Page Not Found");
      if (!res.ok) return reject("Query Not Found");
      res = await res.text();
      const $ = cheerio.load(res);
      const data = {
        total_get: $("p#total_icon_badge").text().trim(),
        page,
        stickers: [],
      };
      $("ul.icons")
        .find("li[data-id]")
        .each((i, el) => {
          const sticker = {};
          const attr = $(el).attr();
          for (let name of Object.keys(attr)) {
            if (!name) continue;
            const q = name.split("-");
            if (q[0] !== "data") continue;
            if (!attr[q.join("-")]) continue;
            sticker[q[1]] = attr[q.join("-")];
          }
          data.stickers.push(sticker);
        });

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  sticker,
};
