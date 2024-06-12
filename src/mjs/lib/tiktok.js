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

export { tiktokSearch, tiktokInfo, tiktokUserPost };
