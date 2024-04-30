const cron = require('node-schedule')

cron.scheduleJob({ dayOfWeek : 0, hour : 5, minute : 30, tz : 'Asia/Jakarta' }, (date) => {
    console.log("Minggu")
})
cron.scheduleJob({ dayOfWeek : 1, hour : 5, minute : 30, tz : 'Asia/Jakarta' }, (date) => {
    console.log("Senin")
})
cron.scheduleJob({ dayOfWeek : 2, hour : 5, minute : 30, tz : 'Asia/Jakarta' }, (date) => {
    console.log("Selasa")
})
cron.scheduleJob({ dayOfWeek : 3, hour : 5, minute : 30, tz : 'Asia/Jakarta' }, (date) => {
    console.log("Rabu")
})
cron.scheduleJob({ dayOfWeek : 4, hour : 5, minute : 30, tz : 'Asia/Jakarta' }, (date) => {
    console.log("Kamis")
})
cron.scheduleJob({ dayOfWeek : 5, hour : 5, minute : 30, tz : 'Asia/Jakarta' }, (date) => {
    console.log("Jum'at")
    console.log(new Date())
})
cron.scheduleJob({ dayOfWeek : 6, hour : 5, minute : 30, tz : 'Asia/Jakarta' }, (date) => {
    console.log("Sabtu")
})