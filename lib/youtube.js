const cheerio = require('cheerio')


const start = async (url, callback = (data) => {return data}) => {


    const res = await fetch(url)

    const html = await res.text()
    const $ = cheerio.load(html)


    const getMetaTag = (name) =>
        $('meta[name='+name+']').attr('content') ||
        $(`meta[property="og:${name}"]`).attr('content') ||
        $(`meta[name=${name}]`).attr('content');


    const data = {
        url,
        title : $('title').first().text(),
        favicon : $('link[rel="shortcut icon"]').attr('href'),
        // description : $('meta[name=description]').attr('content')
        description : getMetaTag('description'),
        image : getMetaTag('image'),
        tags : getMetaTag('keywords'),
    }

    callback(data)

}


start('https://www.youtube.com/watch?v=dXjKh66BR2U', (data) => {
    console.log(data)
})