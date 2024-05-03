/* <=====  This is an example for CommonJS  =====> */
import Scraper from '../lib/index.js'

Scraper.searchAnime('Evangelion', (datas) => {
  if(!Buffer.compare(Buffer.from(datas), Buffer.from([]))) console.log(`Anime Not Found`)

  else {
    // ? Show Result
    datas.map((v, i) =>{

      const animeInfo = `\n${i+1}. Title : ${v.title}\ntype : ${v.type},\nScore ( Rating ) : ${v.score},\nSeason : ${v.season}\nSynops : ${v.synops.split('.').slice(0, 2).join('.')}\nGenres : ${v.genres.join(', ')}`
      console.log('\n' + '-'.repeat(20))
      console.log(animeInfo)

    })
  }

})