/* <=====  This is an example for CommonJS  =====> */
const { animeSearch } = require("../src/cjs");

animeSearch("Evangelion", (datas) => {
  if (!Buffer.compare(Buffer.from(datas), Buffer.from([])))
    console.log(`Anime Not Found`);
  else {
    // ? Show Result
    const res = datas.map((v, i) => {
      return `\n${i + 1}. Title : ${v.title}\nLink : ${v.link}\nThumbnail : ${
        v.thumb
      }\nType : ${v.type},\nScore ( Rating ) : ${v.score},\nSeason : ${
        v.season
      }\nSynops : ${v.synops
        .split(".")
        .slice(0, 2)
        .join(".")}\nGenres : ${v.genres.join(", ")}`;
    });

    console.log(res.join("\n\n" + "-".repeat(20) + "\n"));
  }
});
