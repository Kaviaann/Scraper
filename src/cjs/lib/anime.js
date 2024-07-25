const cheerio = require("cheerio");

/**
 * SCRAPED BY KAVIAANN
 * FORBIDDEN TO SELL AND DELETE MY WM
 */

async function animeSearch(name) {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `https://www.mynimeku.com/?s=${encodeURI(name)}`;

      const response = await fetch(url);
      const html = await response.text();

      const $ = await cheerio.load(html);

      // Get Children  ( a (Title) & div ( other ))
      const content = $(".flexbox2-content");

      const datas = [];

      for await (let box of content) {
        const data = {
          title: "",
          link: "",
          thumb: "",
          type: "",
          score: "",
          season: null,
          synops: "",
          genres: [],
        };

        const el = box.children;
        // Object of value [a, div.flexbox-side]
        const child = el.filter((v) => v.type === "tag");

        for (const ch of child) {
          const chi = ch.children.filter((v) => v.type === "tag");

          // console.log(ch)

          // * Check if ch is a element
          if (ch.attribs.title) {
            data.title = ch.attribs.title;
            data.link = ch.attribs.href;
            data.thumb = ch.children
              .filter((v) => v.type === "tag")[0]
              .children.filter((v) => v.type === "tag")[0]
              .attribs.src.split("?")[0];
          }

          // * If ch doesn't have attribute title
          else {
            for (let si of chi) {
              const type = si.attribs.class.split(" ")
                ? si.attribs.class.split(" ").shift()
                : si.attribs.class;

              switch (type) {
                case "type":
                  data.type = si.children.shift().data;

                  break;

                case "info":
                  const infos = si.children.filter((v) => v.type === "tag");

                  for (let info of infos) {
                    const infoType = info.attribs.class;

                    if (infoType === "score" || infoType === "score full") {
                      data.score = info.children
                        .filter((v) => v.type === "text")
                        .pop()
                        .data.trim();
                    } else if (infoType === "season") {
                      data.season = info.children
                        .filter((v) => v.type === "tag")
                        .shift()
                        .children.shift().data;
                    } else {
                      console.log(info);
                    }
                  }

                  break;

                case "synops":
                  data.synops = si.children
                    .filter((v) => v.type === "tag")
                    .shift()
                    .children.shift().data;
                  break;

                case "genres":
                  const genres = [];

                  si.children
                    .shift()
                    .children.filter((v) => v.type === "tag")
                    .forEach((v) => {
                      genres.push(v.children.shift().data);
                    });

                  data.genres = genres;

                  break;

                default:
                  break;
              }
            }
          }
        }

        datas.push(data);
      }

      resolve(datas);
    } catch (e) {
      reject(e);
    }
  });
}

async function animeCharacter(name) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        `https://myanimelist.net/character.php?cat=character&q=${encodeURI(
          name
        )}`,
        {
          method: "GET",
        }
      ).then((v) => v.text());

      const $ = cheerio.load(res);
      const datas = [];

      for (let i of $("tr")) {
        const data = {
          name: "",
          link: "",
          thumb: "",
          anime: [],
          others: [],
        };
        const o = i.children.filter((v) => v.type === "tag");

        for (let u of o) {
          for (let a of u.children.filter((v) => v.type === "tag")) {
            switch (a.name) {
              case "div": {
                data.link = $(a).children("a")[0].attribs.href;
                data.thumb =
                  $(a).children("a")[0].children[0].attribs["data-src"];
                break;
              }

              case "a": {
                data.name = $(a)[0].children[0].data;
                break;
              }

              case "small": {
                for (let small of a.children.filter((v) => v.type === "tag")) {
                  switch (small.name) {
                    case "a": {
                      const anime = {
                        title: "",
                        link: "",
                      };

                      anime.url =
                        "https://myanimelist.net" + small.attribs.href;
                      anime.title = small.children[0].data;

                      data.anime.push(anime);
                    }

                    case "div": {
                      for (let other of small.children.filter(
                        (v) => v.type === "tag"
                      )) {
                        switch (other.name) {
                          case "a": {
                            const others = {
                              type: "",
                              title: "",
                              link: "",
                            };
                            others.type = other.attribs.href.split("/")[1];
                            others.title = other.children[0].data;
                            others.link =
                              "https://myanimelist.net" + other.attribs.href;
                            data.others.push(others);
                          }
                        }
                      }
                    }
                  }
                }
                break;
              }
            }
          }
        }

        datas.push(data);
      }
    } catch (e) {
      reject(e);
    }
  });
}

async function animeCompany(name) {
  return new Promise(async (resolve, reject) => {
    const res = await fetch("https://myanimelist.net/company?q=" + name).then(
      (v) => v.text()
    );
    const $ = cheerio.load(res);
    const datas = [];
    if (!$("tr").length) reject("Not Found Any Search Result");
    for (let tr of $("tr")) {
      let data = {
        name: "",
        small: "",
        link: "",
        thumbnail: "",
      };
      for (let td of $(tr).children()) {
        $(td)
          .children()
          .each((i, el) => {
            switch (el.name) {
              case "a": {
                data.link = `https://myanimelist.net${el.attribs.href}`;
                data.name = $(el).text();
              }

              case "div": {
                if ($(el).attr().class !== "picSurround") return;
                data.thumbnail = $(el)
                  .children("a")
                  .children("img")
                  .attr("data-src");
              }

              case "small": {
                data.small = $(el).text();
              }
            }
          });
      }
      datas.push(data);
    }
    resolve(datas);
  });
}

async function animeCompanyInfo(url) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!/myanimelist\.net\/anime\/producer/gi.test(url))
        reject("Invalid URL");
      const res = await fetch(url).then((v) => v.text());
      const $ = cheerio.load(res);
      const data = {
        name: url.split("/").pop(),
        logo: "",
        create_time: 0,
        favorite: "",
        share: [],
        infos: {},
        news: [],
        animes: [],
      };
      for (let content of $("#content").children()) {
        switch ($(content).attr("class")) {
          case "content-left": {
            $(content)
              .children()
              .each((i, el) => {
                switch ($(el).attr("class")) {
                  case "logo": {
                    data.logo = $(el).children("img").attr("data-src");
                    break;
                  }

                  case "mb16": {
                    if ($(el).children().length === 1) {
                      $(el)
                        .children()
                        .children("a")
                        .each((i, el) => {
                          const attr = $(el).attr();
                          data.share.push({
                            type: attr["data-ga-network"],
                            link: attr["href"],
                          });
                        });
                    } else {
                      $(el).children((i, spaceit) => {
                        const res = spaceit.children
                          .map((v, i, arr) => {
                            return `${$(v).text()}`
                              .trim()
                              .replace(/[\n:]/gi, "");
                          })
                          .filter((v) => v);
                        const type = res[0].toLowerCase();
                        if (type === "established")
                          data.create_time = new Date(res[1]) - 1;
                        else if (type === "member favorites")
                          data.favorite = res[1];
                        else if (res.length == 1) data.infos.main = res[0];
                        else {
                          data.infos.from = res[0];
                        }
                      });
                    }
                    break;
                  }
                }
              });
            break;
          }

          case "content-right": {
            $(content)
              .children()
              .each((i, el) => {
                switch (`${$(el).attr("class")}`.split(" ")[0]) {
                  case "news-list": {
                    const news = {
                      title: "",
                      thumbnail: "",
                      snippets: "",
                      link: "",
                      info: {
                        author: "",
                        author_link: "",
                        create_time: 0,
                        forum: "",
                        tags: [],
                      },
                    };
                    $(el)
                      .children()
                      .each((i, el) => {
                        $(el)
                          .children()
                          .each((i, el) => {
                            switch (el.name) {
                              case "a": {
                                news.link = el.attribs.href;
                                news.thumbnail = `${$(el)
                                  .children("img")
                                  .attr("src")}`
                                  .replace(/r\/\w*\//gi, "")
                                  .replace(/\?\w*=[\w\d]*/gi, "");
                                break;
                              }

                              case "div": {
                                $(el)
                                  .children()
                                  .each((i, el) => {
                                    switch (el.name) {
                                      case "p": {
                                        news.title = $(el).children().text();
                                        break;
                                      }

                                      case "div": {
                                        if ($(el).attr("class") === "text")
                                          news.snippets = `${$(
                                            el
                                          ).text()}`.trim();
                                        else {
                                          $(el).children((i, el) => {
                                            const create_date = el.children
                                              .filter(
                                                (v) =>
                                                  v.type === "text" &&
                                                  v.data
                                                    .replace(/[\n]/gi, "")
                                                    .trim()
                                              )
                                              .map((v) => {
                                                const date = v.data
                                                  .replace(/[\n]/gi, "")
                                                  .split("by")[0]
                                                  .trim();
                                                const year =
                                                  new Date().getFullYear();
                                                return (
                                                  new Date(
                                                    `${
                                                      date.split(",")[0]
                                                    } ${year}, ${
                                                      date.split(",")[1]
                                                    }`
                                                  ) - 1
                                                );
                                              })
                                              .filter((v) => v)[0];
                                            if (create_date) {
                                              news.info.create_time =
                                                create_date;
                                            }
                                            $(el)
                                              .children("a")
                                              .each((i, el) => {
                                                const link = $(el).attr("href");
                                                switch (link.split("/")[3]) {
                                                  case "profile": {
                                                    news.info.author_link =
                                                      link;
                                                    news.info.author =
                                                      link.split("/")[4];
                                                    break;
                                                  }

                                                  case "forum": {
                                                    news.info.forum = link;
                                                    break;
                                                  }

                                                  case "news": {
                                                    if (
                                                      link.split("/").length > 4
                                                    ) {
                                                      const tag = link
                                                        .split("/")
                                                        .pop();
                                                      news.info.tags.push({
                                                        type: tag,
                                                        link: link,
                                                      });
                                                    }
                                                    break;
                                                  }
                                                }
                                              });
                                          });
                                        }
                                      }
                                    }
                                  });
                                break;
                              }
                            }
                          });
                      });

                    data.news.push(news);
                    break;
                  }

                  case "js-categories-seasonal": {
                    $(el)
                      .children()
                      .each((i, el) => {
                        const anime = {
                          title: "",
                          thumbnail: "",
                          link: "",
                          category: "",
                          stars: "",
                          users: "",
                        };
                        $(el)
                          .children()
                          .each((i, el) => {
                            switch ($(el).attr("class")) {
                              case "image": {
                                anime.link = $(el).children().attr("href");
                                anime.thumbnail = $(el)
                                  .children()
                                  .children()
                                  .attr("data-src");
                                break;
                              }

                              case "title": {
                                anime.title = $(el).children().text();
                                break;
                              }

                              case "category": {
                                anime.category = $(el).text();
                                break;
                              }

                              case "widget": {
                                $(el)
                                  .children()
                                  .each((i, el) => {
                                    const type = el.attribs.class;
                                    for (let sa of el.children.filter(
                                      (v) => v.type === "text"
                                    )) {
                                      anime[type] = sa.data;
                                    }
                                  });
                                break;
                              }
                            }
                          });
                        data.animes.push(anime);
                      });
                    break;
                  }
                }
              });
            break;
          }
        }
      }
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
}

async function mangaSearch(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        `https://myanimelist.net/manga.php?${new URLSearchParams({ q: query })}`
      ).then((v) => v.text());
      const $ = cheerio.load(res);
      const data = [];
      $("div#content")
        .find("div.list > table > tbody")
        .children("tr")
        .slice(1)
        .each((i, el) => {
          const at = $(el).find("td.ac");
          const manga = {
            title: $(el).find("strong").text().trim(),
            desc: $(el).find("div.pt4").text().trim(),
            // .replace(/read more/gi, "")
            // .replace(/\./gi, "") + "...",
            id: $(el)
              .find("div.picSurround > a")
              .attr("id")
              .replace(/sarea|[^\d]/gi, ""),
            link: $(el).find("div.picSurround > a").attr("href"),
            thumbnail: $(el)
              .find("div.picSurround > a > img")
              .attr("data-srcset")
              .split(" ")[2]
              .split("?")[0]
              .replace(/\/r\/\d+x\d+/gi, ""),
            type: $(at).eq(0).text().trim(),
            volume: $(at).eq(1).text().trim(),
            score: $(at).eq(2).text().trim(),
            member: $(at).eq(3).text().trim() || 0,
          };
          data.push(manga);
        });

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
}

async function manga(url) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!/myanimelist\.net\/manga/gi.test(url)) reject("Invalid URL");
      const res = await fetch(url).then((v) => v.text());
      const $ = cheerio.load(res);
      const BASE_URL = "https://myanimelist.net";
      const con = $("div#content").find("tr").eq(0).children();
      const atr = $(con).eq(0).find("div.leftside");
      const dec = $(con)
        .eq(1)
        .find("div")
        .find("table")
        .find("tr")
        .find("td.pb24");
      const data = {
        title: $("span.h1-title")
          .find('span[itemprop="name"]')
          .contents()
          .eq(0)
          .text(),
        synops: $(dec).find('span[itemprop="description"]').text().trim(),
        thumbnail: $(atr).find("a > img").attr("data-src"),
        pictures: $(atr).find("a").attr("href"),
        score: $(dec).eq(0).find("div.score-label").text().trim(),
        attr: $(atr)
          .find('div[class="spaceit_pad"]')
          .map((i, el) => {
            const ds = {};
            $(el)
              .contents()
              .each((i, el) => {
                switch (el.name) {
                  case "span": {
                    if ($(el).attr("class") === "dark_text")
                      return (ds.type = $(el).text().trim().replace(":", ""));
                    else if (!ds.data) return (ds.data = $(el).text().trim());
                    else if (ds.data && typeof ds.data !== "object") {
                      ds.data = [ds.data, $(el).text().trim()];
                    } else {
                      ds.data.push($(el).text().trim());
                    }
                    break;
                  }

                  case "a": {
                    ds.link = ds.link || [];
                    ds.link.push({
                      url: BASE_URL + $(el).attr("href"),
                      data: $(el).text().trim(),
                    });
                    break;
                  }

                  case undefined: {
                    if (!el.type === "text" || !$(el).text().trim()) return;
                    const text = $(el).text().trim().replace(",", "");
                    text ? (ds.text = text) : "";
                    break;
                  }
                }
              });
            return ds;
          })
          .get(),
        character: [],
      };

      $(dec)
        .eq(3)
        .find("div.detail-characters-list")
        .children("div")
        .each((i, el) => {
          $(el)
            .find("table")
            .each((i, el) => {
              const char = {};
              const td = $(el).find("td");
              char.name = $(td)
                .find('td[class="borderClass"] > a')
                .text()
                .trim();
              char.role = $(td).find("small").text().trim();
              char.link = $(td)
                .find('td[class="borderClass"] > a')
                .attr("href");
              char.image = $(td)
                .find("div.picSurround > a > img")
                .attr("data-src")
                .split("?")[0]
                .replace(/\/r\/\d+x\d+/gi, "");
              data.character.push(char);
            });
        });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
}

class Meganei {
  constructor() {
    this.BASE_URL = "https://meganei.net";
  }

  async search(query) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await fetch(
          this.BASE_URL + "/?" + new URLSearchParams({ s: query })
        );
        if (!res.ok) return reject("Query Not Found!");
        res = await res.text();
        const $ = cheerio.load(res);
        const main = $("body").find("main#main").find("article.post");
        const data = {
          query,
          total: $(main).length,
          result: [],
        };

        for (let i of main) {
          const thumbnail = $(i)
            .find("img")
            .attr("srcset")
            .split(" ")[0]
            .replace("-THUMBNAIL", "")
            .replace(".jpg", "-HEADER.jpg");
          const post = {
            title: $(i).find("h2.entry-title").text().trim(),
            thumbnail: thumbnail.includes("-VOLUME")
              ? thumbnail
              : thumbnail.replace("-0", "-VOLUME-0"),
            id: $(i).attr("id"),
            createTime: new Date($(i).find("time").attr("datetime")) - 1,
            formatTime: $(i).find("time").text().trim(),
            publisher: $(i).find("span.author").text().trim(),
            desc:
              $(i).find("div.entry-content > p").text().trim() +
              "... Baca Selengkapnya",
            category: $(i)
              .attr("class")
              .split(" ")
              .filter((v) => v.includes("category"))
              .map((v) => v.replace("category-", "")),
            tag: $(i)
              .attr("class")
              .split(" ")
              .filter((v) => v.includes("tag"))
              .map((v) => v.replace("tag-", "")),
            link: $(i).find("a").attr("href"),
          };
          data.result.push(post);
        }

        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  }

  async info(url) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!url.includes(this.BASE_URL)) return reject("Invalid URL!");

        let res = await fetch(url);
        if (!res.ok) return reject("URL Not Found");
        res = await res.text();
        const $ = cheerio.load(res);
        const content = $("div#content").children("section");
        const prime = content[0];
        const second = content[1];
        const data = {
          title: $(prime).find("h1.entry-title").text().trim(),
          thumbnail: $(prime).find("img").attr("data-src"),
          createTime: new Date($(prime).find("time").attr("datetime")) - 1,
          formatTime: $(prime).find("time").text().trim(),
          publisher: $(prime).find("span.author").text().trim(),
          category: $(prime)
            .find(".meta-category")
            .children("a")
            .map((i, el) => $(el).text().trim().toLowerCase())
            .get(),
          tag: $(second)
            .find("#tag_cloud-11 > .tagcloud")
            .children("a")
            .map((i, el) => $(el).text().trim().toLowerCase())
            .get(),
          genre: $(second)
            .find("#tag_cloud-10 > .tagcloud")
            .children("a")
            .map((i, el) => $(el).text().trim().toLowerCase())
            .get(),
          info: [],
          desc: $(prime).find("strong").parent().first().text().trim(),
          password: $(second).find("aside#text-7 > .textwidget").text().trim(),
          download: [],
        };

        $(prime)
          .find(".info-komik")
          .children("ul")
          .each((i, el) => {
            $(el)
              .children("li")
              .each((i, el) => {
                data.info.push({
                  name: $(el).find("b").text().trim().toLowerCase(),
                  data: $(el).find("span").text().trim().toLowerCase(),
                });
              });
          });

        $(prime)
          .find(".dwnld > li")
          .each((i, el) => {
            const download = {
              range: $(el).find("span.chapter-range").text().trim(),
              link: $(el)
                .find("span.the-link > a")
                .map((i, el) => {
                  return {
                    type: $(el).text().trim().toLowerCase(),
                    link: $(el).attr("href"),
                  };
                })
                .get(),
            };
            data.download.push(download);
          });

        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  }
}

module.exports = {
  animeSearch,
  animeCharacter,
  animeCompany,
  animeCompanyInfo,
  mangaSearch,
  manga,
  Meganei,
};
