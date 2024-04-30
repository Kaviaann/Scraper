const puppeteer = require('puppeteer')

const chatGpt = async (text, callback = (data) => {return data}) => {

    if(text.trim() == ''){
        return callback(["Hello! How can i assist you today?"])
    } else text.trim()

    const browser = await puppeteer.launch({
        headless : false
    })

    const page = await browser.newPage()

    await page.goto('https://chat.openai.com')

    await page.waitForSelector('body')

    await page.type('textarea#prompt-textarea', text)

    await page.click('button[data-testid="send-button"]')

    await page.waitForSelector('button[disabled]')

    const res = await page.$$eval('div[data-message-author-role="assistant"]', result => {
        return result.map(res => {
            const textRes = []

            const div = res.querySelector('div')

            div.querySelectorAll('div > p').forEach(v => {
                textRes.push(v.innerText)
            })
            
            div.querySelectorAll('code').forEach(v => {
                textRes.push(`\`${v.innerText}\``)
            })

            div.querySelectorAll('ol > li').forEach((v, id) => {
                textRes.push(`*${id+1}.* ${v.innerText}`)
            })

            div.querySelectorAll('ul > li').forEach((v, id) => {
                textRes.push(`*${id+1}.* ${v.innerText}`)
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


// chatGpt('cara jadi ganteng', (data) => {
//     console.log(data.flat(1).join('\n\n'))
// })


module.exports = { chatGpt }