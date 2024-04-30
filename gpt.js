const puppeteer = require('puppeteer')


const start = async (text) => {


    const browser = await puppeteer.launch()

    const page = await browser.newPage()

    await page.goto('https://chat.openai.com')

    await page.waitForFunction('document.readyState === "complete"');

    await page.$$eval('p', (v) => {
        console.log(v.map(s => s.innerText))
    })


}


start("hii")