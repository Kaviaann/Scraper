const puppeteer = require('puppeteer')

const chatGpt = async (text, callback = (data) => {return data}) => {

    text.trim() == '' ? text = 'hi' : text.trim()

    const browser = await puppeteer.launch({
        headless : false
    })

    const page = []

    page[0] = await browser.newPage()

    await page[0].goto('https://chat.openai.com')

    await page[0].waitForSelector('body')

    await page[0].type('textarea#prompt-textarea', text)

    await page[0].click('button[data-testid="send-button"]')

    await page[0].waitForSelector('button[disabled]')

    const res = await page[0].$$eval('div[data-message-author-role="assistant"]', result => {
        return result.map(res => {
            const textRes = []

            res.querySelectorAll('p').forEach(v => {
                textRes.push(v.innerText)
            })

            return textRes
        }).flat(1)
    })


    if(!res){
        console.log('Kosong')
    } else {
        callback(res)
    }


    await browser.close()


}


chatGpt('cara kurus tanpa diet', (data) => {
    console.log(data.flat(1).join('\n\n'))
})