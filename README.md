<h1 align="center">About Me</h1>


<br>
<br>


<div align="center">
  <kbd>
    <img src="https://avatars.githubusercontent.com/u/138269134?v=4" href="https://github.com/kaviaann" style="width : 250px; height : 250px">
  </kbd>
  <h3>Kaviaann</h3>
  <p>HTML, CSS, Javascript, jQuery, NodeJS</p>
  <br>
  <div>
    <kbd>
      <img href="https://github.com/kaviaann" src="https://skillicons.dev/icons?i=html" style="width:90px; height:90px">
    </kbd>
     <kbd>
      <img href="https://github.com/kaviaann" src="https://skillicons.dev/icons?i=css" style="width:90px; height:90px">
    </kbd>
     <kbd>
      <img href="https://github.com/kaviaann" src="https://skillicons.dev/icons?i=javascript" style="width:90px; height:90px">
    </kbd>
     <kbd>
      <img href="https://github.com/kaviaann" src="https://skillicons.dev/icons?i=jquery" style="width:90px; height:90px">
    </kbd>
     <kbd>
      <img href="https://github.com/kaviaann" src="https://skillicons.dev/icons?i=nodejs" style="width:90px; height:90px">
    </kbd>
  </div>
  <br>
  <kbd>
    <img href="https://github.com/kaviaann" src="https://github-readme-activity-graph.vercel.app/graph?username=kaviaann&theme=tokyo-night" style="width:745px; height:265px">
  </kbd>
</div>


<br>
<br>


## ! Attention !
Eng : This Repository / Package Is On Beta Access And Im Still Making New Scrape, So I Hope For You All Pantience 😋  

Id : Repository / Package Ini Masih Dalam Akses Beta Dan Ak Masih Membuat Scraper Yang Baru, Jadi Dimohon Kesabarannya Yaa 😋


<br>
<br>


## Feature
Kaviaan Scraper can help you scrape another website so easily ( Without Using Puppeteer, etc ) making it can run on a cloud computing platform.
Also with simple structure of the scrape response make you easier to understand 😄  
<br>
<br>
Kaviaann Scraper bisa membantu mu scrape website lain dengan sangat mudah ( Tanpa Menggunakan Puppeteer, dll ) membuat ini bisa berjalan dalam suatu panel ( Server ). Juga dengan struktur respon scrape yang simple membuat kamu lebih mudah untuk mengerti 😄


<br>
<br>


## How To Use

1. Copy Github Repository ( Not Stable )
```
git clone https://github.com/Kaviaann/Scraper.git
```

<br>

Or Using Yarn / Npm To Download Package ( More Stable )
```
//yarn
yarn add @kaviaann/scraper

//npm
npm install @kaviaann/scraper
```

<br>

2. Then import it to your code
```js
// ESM
import Scraper from '@kaviaann/scraper'

// CommonJS
const { searchAnime } = require('@kaviaann/scraper')
```

<br>

3. Then use it ( Example for anime scrape )
```js
import Scraper from '@kaviaann/scraper'


Scraper.searchAnime("Boku No Hero Academia", (datas) => {

  console.log(datas.map(v => v.title)
  // show all the result title

})
```


<br>
<br>


## Updates

| Date | Name | Feature |
| :---- | :----: | :------ |
| 30/04/24 | searchAnime | Anime Title, Type, Season, Rating, Synops, Genres |


<br>
<br>


## Upcoming

| Name | Feature |
| :---: | :----- |
| Google | Google Search Result |
