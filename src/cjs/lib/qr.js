const sharp = require("sharp");
const fs = require("fs");

async function createQr(query) {
  return new Promise(async (resolve, reject) => {
    try {
      let type = "";
      if (query.startsWith("http")) type = "link";
      else type = "text";
      const body = {
        section: `#${type}`,
        backcolor: "#ffffff",
        frontcolor: "0000",
        gradient_color: "#8900d5",
        pattern: "default",
        marker_out: "default",
        marker_in: "default",
        marker_out_color: "#000000",
        marker_in_center: "#000000",
        marker_top_right_outline: "#000000",
        marker_top_right_center: "#000000",
        marker_bottom_left_outline: "#000000",
        marker_bottom_left_center: "#000000",
        optionlogo: "none",
        logo_size: 100,
        outer_frame: "none",
        label_fonr: "ZCOOLKuaiLe-Regular.svg",
        "label-text-size": 100,
        framecolor: "#000000",
        size: 28,
        level: "H",
      };
      type === "link" ? (body.link = query.split(" ")[0]) : (body.data = query);

      const res = await fetch(
        "https://scanqr.org/qr-code-generator/ajax/process.php",
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Origin: "https://scanqr.org",
            Referer: "https://scanqr.org/qr-code-generator/",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
            "X-Requested-With": "XMLHttpRequest",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "cors",
            Cookie: "qrSession=5f86c945a229238b2316e6718c5c2162",
            Pragma: "no-cache",
            "Cache-Control": "no-cache",
          },
          body: new URLSearchParams(body),
        }
      ).then((v) => v.json());

      return resolve(
        await sharp(Buffer.from(res.content.replace(/\\"/gi, "")))
          .png()
          .toBuffer()
      );
    } catch (e) {
      reject(e);
    }
  });
}

createQr("https://kavian.vercel.app").then((v) =>
  fs.writeFileSync("./hehe.png", v)
);
