const cheerio = require("cheerio");
const BASE_URL = "https://genius.com";

/**
 * SCRAPED BY KAVIAN
 * FORBIDDEN TO SELL OR DELETE MY WM
 */

async function geniusSearch(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`${BASE_URL}/search?q=${encodeURI(query)}`).then(
        (v) => v.text()
      );
      const $ = cheerio.load(res);
      console.log(res);
    } catch (e) {
      reject(e);
    }
  });
}

async function geniusLyric(title, artist) {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${BASE_URL}/${artist.replace(/[ ]/gi, "-")}-${title.replace(
        /[ ]/gi,
        "-"
      )}-lyrics`;
      let res = await fetch(url);
      if (!res.ok) return reject("Lyric Not Found");
      res = await res.text();
      const $ = cheerio.load(res);
      let data = {
        title: "",
        about: "",
        image: "",
        artist: "",
        artistLink: "",
        track: "",
        album: "",
        producer: "",
        producerLink: "",
        url: "",
        lyric: [],
        tags: [],
      };

      // * GET LYRICS
      $("body")
        .find("div[data-lyrics-container]")
        .each((i, e) => {
          for (let el of e.children) {
            if (el.type === "text") {
              data.lyric.push(el.data);
            } else if (el.type === "tag" && el.name === "a") {
              for (let es of el.children[0].children) {
                if (!es.name) {
                  data.lyric.push(es.data);
                } else if (es.name && es.name === "b") {
                  data.lyric.push($(es).text().trim());
                }
              }
            }
          }
        });

      // * ADDITIONAL INFORMATION
      data.title = $("body").find("span.iMpFIj").text().trim();
      data.url = url;
      data.image = $("head").find('meta[property="og:image"]').attr("content");
      data.track =
        $("body")
          .find("div.HeaderArtistAndTracklistdesktop__Tracklist-sc-4vdeb8-2")
          .text()
          .trim() || "";
      data.album =
        $("body")
          .find(
            "div.HeaderArtistAndTracklistdesktop__Tracklist-sc-4vdeb8-2 > a"
          )
          .text()
          .trim() || "";
      data.producer = $("body")
        .find("div.HeaderCredits__List-wx7h8g-3")
        .text()
        .trim();
      data.artistLink = $("body").find("a.jhWHLb").attr("href");
      data.artist = data.artistLink.split("/")[4].replace(/[-]/gi, " ");
      data.producerLink = $("body")
        .find("div.HeaderCredits__List-wx7h8g-3")
        .find("a")
        .attr("href");
      data.about = $("body");

      // * GET TAG
      $("body")
        .find("div.SongTags__Container-xixwg3-1 > a")
        .each((i, el) => {
          data.tags.push({
            name: $(el).text().trim(),
            url: $(el).attr("href"),
          });
        });

      data.about = $("body")
        .find("div.SongDescription__Content-sc-615rvk-2")
        .text()
        .trim();

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  geniusLyric,
};
