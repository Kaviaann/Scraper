const cheerio = require("cheerio");

/**
 * SCRAPED BY KAVIAANN
 * FORBIDDEN TO SELL AND DELETE MY WM
 */

async function tiktokSearch(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://tikwm.com/api/feed/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Cookie: "current_language=en",
          "User-Agent":
            "Mozilla/5.0 (Linux Android 10 K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
        },
        body: new URLSearchParams({
          keywords: query,
          count: 10,
          cursor: 0,
          HD: 1,
        }),
      }).then((v) => v.json());
      const videos = response.data.videos;
      if (videos.length === 0) {
        reject("Tidak ada video ditemukan.");
      } else {
        const dann = Math.floor(Math.random() * videos.length);
        const video = videos.map((v) => {
          return {
            title: v.title,
            cover: v.cover,
            origin_cover: v.origin_cover,
            link: `https://www.tiktok.com/@${v.author.unique_id}/video/${v.video_id}`,
            no_watermark: v.play,
            watermark: v.wmplay,
            music: v.music_info,
            views: v.play_count,
            like: v.digg_count,
            comment: v.comment_count || null,
            share: v.share_count,
            download: v.download_count || null,
            save: v.collect_count || null,
            create_time: v.create_time * 1000,
          };
        });

        resolve(video);
      }
    } catch (error) {
      reject(error);
    }
  });
}

async function tiktokInfo(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://tikwm.com/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Cookie: "current_language=en",
          "User-Agent":
            "Mozilla/5.0 (Linux Android 10 K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
        },
        body: new URLSearchParams({
          region: "id",
          url: url,
          count: 10,
          cursor: 0,
          HD: 1,
        }),
      }).then((v) => v.json());
      const video = response.data;
      if (video.length === 0) {
        reject("Tidak ada video ditemukan.");
      } else {
        const result = {
          title: video.title,
          cover: video.cover,
          origin_cover: video.origin_cover,
          link: `https://www.tiktok.com/@${video.author.unique_id}/video/${video.id}`,
          no_watermark: video.play,
          hd: video.hdplay || null,
          watermark: video.wmplay,
          music: video.music,
          no_wm_size: video.size,
          wm_size: video.wm_size,
          hd_size: video.hd_size || null,
          views: video.play_count,
          like: video.digg_count,
          comment: video.comment_count || null,
          share: video.share_count,
          download: video.download_count || null,
          save: video.collect_count,
          create_time: video.create_time * 1000,
        };
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  });
}

async function tiktokUserPost(user) {
  return new Promise(async (resolve, reject) => {
    const result = [];
    const res = await fetch("https://www.tikwm.com/api/user/posts", {
      method: "POST",
      body: new URLSearchParams({
        unique_id: `@${user.replace(/@/gi, "")}`,
        hd: 1,
        cursor: 0,
      }),
    }).then((v) => v.json());
    const posts = res.data.videos;
    for (let {
      title,
      duration,
      play_count,
      origin_cover,
      create_time,
      digg_count,
      share_count,
      download_count,
      collect_count,
      comment_count,
      play,
      wmplay,
      music_info,
      video_id,
      author,
    } of posts) {
      result.push({
        title,
        duration,
        link: `https://www.tiktok.com/@${author.unique_id}/video/${video_id}`,
        origin_cover,
        views: play_count,
        like: digg_count,
        comment: comment_count,
        share: share_count,
        download: download_count,
        saved: collect_count || null,
        create_time,
        no_watermark: play,
        watermark: wmplay,
        music: music_info,
      });
    }

    await resolve(result);
  });
}

async function tiktokSlide(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const origin = "https://ttsave.app/";
      /**
       * @type {RequestInit}
       */
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Content-Type": "application/json",
          Origin: origin,
          Referer: `${origin}/en/slide`,
          "Sec-Fetch-Mode": "cors",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
          // Cookie:
          //   "ttsaveapp_session=eyJpdiI6IkgyRkswa2hpb0pRR21WMFRRS3BwL3c9PSIsInZhbHVlIjoiQUU3SVk0VnkzWHdtKzVjdllKWjZSVForRHRDVi9NK01GeU5wTUZQYWs5eTc5M0RqYzVpQXhrWlNHRWs5SjE0N1dZQ1FqQU5UNGNYOGFaRGE2bXNKWGJiWThhZGlsUlZSVDlHbzVybkFPcldsdHdESzYwMDZidkwzdXVuRWhrSTkiLCJtYWMiOiI4M2YzN2UxZDFhZmQ2YjgwMTJkOTI0MzNkZWJhOGQ0ZWJmOWI0MjBmMmU0Y2E4MDMyODdiNmI3OTY5YzZjYWVmIiwidGFnIjoiIn0%3D;",
        },
        body: JSON.stringify({
          language_id: "1",
          query: url,
        }),
      };
      const res = await fetch(`${origin}/download`, options).then((v) =>
        v.text()
      );
      const $ = cheerio.load(res);
      const data = {
        author: "",
        username: "",
        profile: "",
        caption: "",
        views: "0",
        likes: "0",
        comment: "0",
        save: "0",
        share: "0",
        music: "",
        thumbnail: "",
        slides: [],
        link: url,
        authorLink: "",
      };
      const download = $("div.items-center");
      const attr = $(download).find("div.gap-2").children("div");
      const slides = $(download).find("div#button-download-ready");
      data.author = $(download)
        .find("h2.font-extrabold.text-xl.text-center")
        .text()
        .trim();
      data.username = $(download).find("a[title]").text().trim();
      data.authorLink = $(download).find("a[title]").attr("href");
      data.caption = $(download).find("a[title] + p").text().trim();
      data.views = attr.eq(0).find("span").text().trim() || "0";
      data.likes = attr.eq(1).find("span").text().trim() || "0";
      data.comment = attr.eq(2).find("span").text().trim() || "0";
      data.save = attr.eq(3).find("span").text().trim() || "0";
      data.share = attr.eq(4).find("span").text().trim() || "0";
      data.music = $(download).find("div.mt-5 > span").text().trim() || "";
      $(slides)
        .children("div")
        .each((i, el) => {
          data.slides.push($(el).find("img").attr("src"));
        });
      data.profile = $(slides).find('a[type="profile"]').attr("href");
      data.thumbnail = $(slides).find('a[type="cover"]').attr("href");

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
}

async function tiktokStalk(username) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await fetch(
        "https://tools.revesery.com/stalktk/revesery.php?username=" +
          encodeURI(username.replace(/[^\w\d]/gi, ""))
      );
      if (!res.ok) return reject("User Not Found");
      res = await res.json();
      delete res.base64;
      console.log(res);
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  tiktokSearch,
  tiktokInfo,
  tiktokUserPost,
  tiktokSlide,
  tiktokStalk,
};
