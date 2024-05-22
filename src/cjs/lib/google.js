const cheerio = require("cheerio");

const googleSearch = async (query) => {
  const res = await fetch(`https://google.com/search?q=${query}`).then((v) =>
    v.text()
  );
  const $ = cheerio.load(res);

  console.log(res);
};

googleSearch("kucing");
