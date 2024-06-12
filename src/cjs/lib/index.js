const path = require("path");
const fs = require("fs");
const modules = {};

for (let file of fs.readdirSync(__dirname)) {
  const type = path.extname(file);
  if (type !== ".js" || file === "index.js") continue;
  Object.assign(modules, require(path.join(__dirname, file)));
}

module.exports = modules;
