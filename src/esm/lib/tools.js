import qrcode from "qrcode";
import jimp from "jimp";
import Reader from "qrcode-reader";
const reader = new Reader();

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

export { createQr, readQr };
