const cheerio = require('cheerio')


/**
 * @callback Callback
 * @param {Object[]} datas
 * @param {String} datas[].title
 * @param {String} datas[].type 
 * @param {String} datas[].info
 * @param {String} datas[].synops
 * @param {String[]} datas[].genres
 * 
 */


/**
 * 
 * @param {String} name Anime Name
 * @param {Callback} callback Callback Function
 * @example 
 * 
 * scrape("Boku No Hero Academia", async (datas) => {
 *  
 *  console.log(datas)
 *  // Output :
 * 
 *  // [
 *  //   {
 *  //     title: 'Boku no Hero Academia: Memories',
 *  //     type: 'Special',
 *  //     score: '6.41',
 *  //     synops: 'Rekap Boku no Hero Academia menjelang musim ketujuh.',
 *  //     genres: [ 'Action' ],
 *  //     season: null
 *  //   },
 *  //   ...
 *  // ]
 * 
 * })
 */
const scrape = async (name, callback) => {


    const url = `https://www.mynimeku.com/?s=${encodeURI(name)}`

    const response = await fetch(url)
    const html = await response.text()

    const $ = await cheerio.load(html)

    // Get Children  ( a (Title) & div ( other ))
    const content = $('.flexbox2-content')

    /** @type {Array<{title : String, type : String, info : String, synops : String, genres : String}>} */
    const datas = []

    // console.log(content)

    new Promise(async res => {


        for(let box of content){

            const data = {}

            const el = box.children
            // Object of value [a, div.flexbox-side]
            const child = el.filter(v => v.type === "tag")


            for(const ch of child){

                const chi = ch.children.filter(v => v.type === 'tag')

                // * Check if ch is a element
                if(ch.attribs.title){

                    data.title = ch.attribs.title

                } 
                
                

                // * If ch doesn't have attribute title
                else {

                    for(let si of chi){


                        const type = si.attribs.class.split(' ') ? si.attribs.class.split(' ').shift() : si.attribs.class


                        switch(type){


                            case 'type':

                                data.type = si.children.shift().data

                            break;


                            case 'info':
                                const infos = si.children.filter(v => v.type === 'tag')

                                for(let info of infos){

                                    const infoType = info.attribs.class

                                    if(infoType === 'score' || infoType === 'score full'){

                                        data.score = info.children.filter(v => v.type === 'text').pop().data.trim()

                                    } else if(infoType === 'season'){

                                        data.season = info.children.filter(v => v.type === 'tag').shift().children.shift().data

                                    } else {

                                        console.log(info)

                                    }

                                }

                            break;


                            case 'synops':
                                data.synops = si.children.filter(v => v.type === 'tag').shift().children.shift().data
                            break;


                            case 'genres':
                                const genres = []

                                si.children.shift().children.filter(v => v.type === 'tag').forEach(v => {

                                    genres.push(v.children.shift().data)

                                })

                                data.genres = genres
                                
                            break;


                            default : 
                            break;


                        }


                    }

                }


            }

            data.season ? data.season : data.season = null

            datas.push(data)

        }


    })



    
    callback(datas)


}

scrape("boku no hero academia", async datas => {
    
    
    console.log(datas)


})