const fs =  require('fs')
const path = require('path')

fs.opendir('./test', async (err, dir) => {
    const res = dir.readSync()

    fs.readdir(res.path, (err, file) => {
        require(path.resolve(res.path, file[1]))
    })
    console.log(res)
})