import cheerio from "cheerio";

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
            no_watermark: v.play,
            watermark: v.wmplay,
            music: v.music,
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
          no_watermark: video.play,
          watermark: video.wmplay,
          music: video.music,
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
        unique_id: `@${user}`,
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
      music,
    } of posts) {
      result.push({
        title,
        duration,
        origin_cover,
        views: play_count,
        like: digg_count,
        comment: comment_count,
        share: share_count,
        download: download_count,
        saved: collect_count,
        create_time,
        release_date: new Date(create_time * 1000),
        no_watermark: play,
        watermark: wmplay,
        music: music,
      });
    }

    await resolve(result);
  });
}

export { tiktokSearch, tiktokInfo, tiktokUserPost };
