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
      <img href="https://github.com/kaviaann" src="https://skillicons.dev/icons?i=html" style="width:100% height:50%">
    </kbd>
     <kbd>
      <img href="https://github.com/kaviaann" src="https://skillicons.dev/icons?i=css" style="width:100% height:50%">
    </kbd>
     <kbd>
      <img href="https://github.com/kaviaann" src="https://skillicons.dev/icons?i=javascript" style="width:100% height:50%">
    </kbd>
     <kbd>
      <img href="https://github.com/kaviaann" src="https://skillicons.dev/icons?i=jquery" style="width:100% height:50%">
    </kbd>
     <kbd>
      <img href="https://github.com/kaviaann" src="https://skillicons.dev/icons?i=nodejs" style="width:100% height:50%">
    </kbd>
  </div>
  <br>
  <kbd>
    <img href="https://github.com/kaviaann" src="https://github-readme-activity-graph.vercel.app/graph?username=kaviaann&theme=tokyo-night" style="width:100%; height:100%">
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
import { animeSearch } from "@kaviaann/scraper";

// CommonJS
const { animeSearch } = require("@kaviaann/scraper");
```

<br>

3. Then use it ( Example for anime scrape )

```js
import { animeSearch } from "@kaviaann/scraper";

animeSearch("Boku No Hero Academia", (datas) => {
  console.log(datas.map((v) => v.title));
  // show all the result title
});
```

<br>
<br>

## Updates

| Date     |       Name       | Feature                                                                                     |
| :------- | :--------------: | :------------------------------------------------------------------------------------------ |
| 30/04/24 |   animeSearch    | Anime Title, Thumbnail, Link, Type, Season, Rating, Synops, Genres                          |
| 17/05/24 |  animeCharacter  | Character Name, Thumbnail, Link, Anime, Other                                               |
| 22/05/24 |   tiktokSearch   | Search Tiktok Video                                                                         |
| 22/05/24 |    tiktokInfo    | Tiktok Video Info                                                                           |
| 22/05/24 |  tiktokUserPost  | Get Random Post Data From User                                                              |
| 26/05/24 |   animeCompany   | Search For Anime Company                                                                    |
| 26/05/24 | animeCompanyInfo | Get all of the first result from animeCompany and get all infos                             |
| 27/05/24 |       igDl       | Get instagram link for media                                                                |
| 27/05/24 |     igStalk      | Get all information from the given username                                                 |
| 27/05/24 |     twitter      | Get twitter link for media ( Video Only )                                                   |
| 15/06/24 |    githubUser    | Get github user info by username                                                            |
| 15/06/24 |   tiktokSlide    | Scrape for tiktok slideshow                                                                 |
| 15/06/24 |   tiktokStalk    | Get tiktok user info by username                                                            |
| 15/06/24 |     terabox      | Get direct download link and file name                                                      |
| 15/06/24 |      drive       | Get direct download link and other infos on drive link                                      |
| 15/06/24 |    mediafire     | Get direct download link and other infos                                                    |
| 27/06/24 |    snackVideo    | Get video URL and other infos                                                               |
| 27/06/24 |     sticker      | Search sticker based on the given query                                                     |
| 27/06/24 |   geniusLyric    | Get lyric from genius based on artist and song name                                         |
| 27/06/24 |    webArchive    | Search Web That's Archived Using API                                                        |
| 27/06/24 |     createQr     | Create QR And Return Buffer                                                                 |
| 27/06/24 |      readQr      | Read QR By Buffer                                                                           |
| 27/06/24 |   mangaSearch    | Search Manga Based On The Given Query                                                       |
| 27/06/24 |      manga       | Get manga info based on the given myanimelist manga url                                     |
| 1/07/24  |        Ai        | Make a class with Ai with feature like celebrityAi, txt2img, txt2speech, and imgrecognition |
| 23/07/24 |    stableDiff    | Stable Diffusion                                                                            |
| 23/07/24 |    animagine     | AnimagineXL Scrape                                                                          |
| 23/07/24 |    omniplexAi    | OmniplexAi                                                                                  |
| 23/07/24 |     Meganei      | Meganei Class with search and info function                                                 |
| 23/07/24 |      cobalt      | All In One Downloader ( AIO )                                                               |
| 23/07/24 |      gofile      | Gofile Downloader                                                                           |
| 23/07/24 |    npmSearch     | Search with Npm                                                                             |
| 23/07/24 |   npmSearchh2    | Search with different SEO                                                                   |
| 23/07/24 |       npm        | Get info about the given package name                                                       |
| 25/07/24 |    omniplexAi    | Omniplex AI With search and chat mode                                                       |
| 25/07/24 |     copilot      | Copilot AI Like                                                                             |

<br>
<br>

## Upcoming

|     Name     | Feature                         |
| :----------: | :------------------------------ |
| Any request? | Contact me! vielynian@gmail.com |
