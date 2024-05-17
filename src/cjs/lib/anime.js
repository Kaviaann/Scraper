const cheerio = require('cheerio')

exports.animeSearch = async (name, callback) => {
  const url = `https://www.mynimeku.com/?s=${encodeURI(name)}`;

  const response = await fetch(url);
  const html = await response.text();

  const $ = await cheerio.load(html);

  // Get Children  ( a (Title) & div ( other ))
  const content = $(".flexbox2-content");

  const datas = [];

  // console.log(content)

  new Promise(async (res) => {
    for (let box of content) {
      const data = {
        title : '',
        link : '',
        thumb : '',
        type : '',
        score : '',
        season : null,
        synops : '',
        genres : [],
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
          data.link = ch.attribs.href
          data.thumb = ch.children.filter(v => v.type === 'tag')[0].children.filter(v => v.type === 'tag')[0].attribs.src.split('?')[0]
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
  });

  callback(datas);
};





exports.animeCharacter = async (name, callback) => {

  const res = await fetch(`https://myanimelist.net/character.php?cat=character&q=${encodeURI(name)}`, {
    method : "GET"
  }).then(v => v.text())

  const $ = cheerio.load(res)
  const datas = []


  
  for(let i of $('tr')){
    const data = {
      name : "",
      link : "",
      thumb : "",
      anime : [],
      others : []
    }
    const o = i.children.filter(v => v.type === "tag")

    for(let u of o){
      for(let a of u.children.filter(v => v.type === 'tag')){

        switch(a.name){


          case 'div':{
            data.link = $(a).children('a')[0].attribs.href
            data.thumb = $(a).children('a')[0].children[0].attribs['data-src']
            break;
          }

          case 'a':{
            data.name = $(a)[0].children[0].data
            break;
          }

          case 'small':{
            for(let small of a.children.filter(v => v.type === 'tag')){
              switch(small.name){
                case 'a':{
                  const anime = {
                    title : "",
                    link : ""
                  }

                  anime.url = 'https://myanimelist.net' + small.attribs.href
                  anime.title = small.children[0].data

                  data.anime.push(anime)
                }

                case 'div':{
                  for(let other of small.children.filter(v => v.type === 'tag')){
                    switch(other.name){
                      case 'a':{
                        const others = {
                          type : "",
                          title : "",
                          link : ""
                        }
                        others.type = other.attribs.href.split('/')[1]
                        others.title = other.children[0].data
                        others.link = 'https://myanimelist.net' + other.attribs.href
                        data.others.push(others)
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


    datas.push(data)

  }

  callback(datas)

}