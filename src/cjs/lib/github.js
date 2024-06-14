const cheerio = require("cheerio");

/**
 * SCRAPED BY KAVIAANN
 * FORBIDDEN TO SELL AND DELETE MY WM
 */

exports.githubUser = async (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`https://github.com/${username}`).then((v) =>
        v.text()
      );
      const $ = cheerio.load(res);
      const data = {
        username: "",
        name: "",
        // pronouns: "Private",
        icon: "",
        // repo: "0",
        // stared: "0",
        link: `https://github.com/${username}`,
        pinned: [],
      };

      // =============== HEADER =============== //
      // console.log(
      //   $("div[data-turbo-body]").find("div.js-header-wrapper")
      // );

      // =============== MAIN =============== //
      $("main")
        .find("div.Layout-sidebar")
        .children("div")
        .each((i, el) => {
          const profile = $(el).find("div.js-profile-editable-replace");
          const cls = profile.attr("class");
          if (!cls) return;
          const clearfix = $(profile).children("div").first();
          data.icon = $(clearfix)
            .find('a[itemprop="image"]')
            .attr("href")
            .split("?")[0];
          data.name = data.username = $(clearfix)
            .find("span.p-nickname")
            .text()
            .trim();
        });

      $("main")
        .find("div.Layout-main")
        .find("ol.d-flex")
        .children()
        .each((i, el) => {
          const item = $(el).find("div.pinned-item-list-item-content");
          const identity = $(item).find('a[data-view-component="true"]');
          const pin = {
            id: "",
            name: "",
            link: "",
            isForked: false,
            forked: null,
          };
          if ($(item).find("p.mb-2").children().length) {
            const fork = $(item).find("p.mb-2");
            pin.isForked = $(fork)
              .text()
              .trim()
              .toLowerCase()
              .includes("forked");
            pin.forked = {
              name: "",
              author: "",
              link: "",
            };
            pin.forked.link = `https://github.com/${$(fork)
              .find("a")
              .attr("href")}`;
            pin.forked.author = $(fork).find("a").text().trim().split("/")[0];
            pin.forked.name = $(fork).find("a").text().trim().split("/")[1];
          }

          (pin.id = $(identity).attr("id")),
            (pin.name = $(identity).find("span.repo").text().trim()),
            (pin.link = `https://github.com/${$(identity).attr("href")}`);

          data.pinned.push(pin);
        });

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};
