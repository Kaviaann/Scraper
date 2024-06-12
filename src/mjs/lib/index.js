import path, { dirname } from "path";
import fs from "fs";
import { pathToFileURL } from "url";
const __dirname = path.resolve("src/mjs/lib/");
const modules = {};

for (let file of fs.readdirSync(__dirname)) {
  const type = path.extname(file);
  const filepath = pathToFileURL(path.join(__dirname, file));
  if (type !== ".js" || file === "index.js") continue;
  Object.assign(modules, await import(filepath));
}

export default modules;
