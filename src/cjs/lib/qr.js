const qrcode = require("qrcode");
const jimp = require("jimp");
const reader = new (require("qrcode-reader"))();

async function createQr(query) {
  return new Promise(async (resolve, reject) => {
    try {
      return resolve(await qrcode.toBuffer(query));
    } catch (e) {
      return reject(e);
    }
  });
}

async function readQr(buffer) {
  return new Promise(async (resolve, reject) => {
    try {
      reader.callback = (err, value) => {
        return resolve(value);
      };

      jimp.read(buffer, (err, image) => {
        reader.decode(image.bitmap);
      });
    } catch (e) {
      return reject(e);
    }
  });
}

module.exports = {
  createQr,
  readQr,
};
