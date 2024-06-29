import cheerio from "cheerio";
import FormData from "form-data";
import fs from "fs";

class Ai {
  constructor() {
    this.BASE = "https://boredhumans.com";
    this.BASE_URL = this.BASE + "/apis/boredagi_api.php";
    this.BASE_CDN = this.BASE + "/boredagi_files";
    this.BASE_UPLOAD = this.BASE + "/apis/boredagi_upload.php";
    this.uid = {};
    this.sesh_id = {};
    this.tools = {
      celebrity_ai: 10,
      txt2img: 3,
      img_recognition: 6,
    };
    this.num = 0;
    this.text = {
      10: "I want to talk to someone famous.",
      3: "Can you generate an image?",
      6: "Describe this image for me.",
    };
  }

  // Creds
  getUid() {
    this.uid[this.num] =
      Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  async getSeshId() {
    await this.getUid();
    const res = await fetch(this.BASE_URL, {
      method: "POST",
      body: new URLSearchParams({
        prompt: encodeURIComponent(this.text[this.num]),
        uid: this.uid[this.num],
        sesh_id: "None",
        get_tool: false,
        tool_num: this.num,
      }),
    }).then((v) => v.json());
    if (res.status !== "success") return (this.sesh_id[this.num] = "none");
    return (this.sesh_id[this.num] = res.sesh_id);
  }

  // ? AI
  async celebrityAi(prompt) {
    return new Promise(async (resolve, reject) => {
      try {
        this.num = this.tools.celebrity_ai;
        if (!this.sesh_id[this.num]) await this.getSeshId();
        const data = new URLSearchParams({
          prompt: encodeURIComponent(prompt),
          uid: this.uid[this.num],
          sesh_id: this.sesh_id[this.num],
          get_tool: false,
          tool_num: this.num,
        });

        const res = await fetch(this.BASE_URL, {
          method: "POST",
          body: data,
        }).then((v) => v.json());
        if (res.status !== "success")
          return (async () => {
            await this.getSeshId();
            await this.celebrityAi(prompt);
          })();
        return resolve(res.output);
      } catch (e) {
        reject(e);
      }
    });
  }

  async txt2img(prompt) {
    return new Promise(async (resolve, reject) => {
      try {
        this.num = this.tools.txt2img;
        if (!this.sesh_id[this.num]) await this.getSeshId();
        const data = {
          prompt: encodeURIComponent(prompt),
          uid: this.uid[this.num],
          sesh_id: this.sesh_id[this.num],
          get_tool: false,
          tool_num: this.num,
        };

        const res = await fetch(this.BASE_URL, {
          method: "POST",
          body: new URLSearchParams(data),
        })
          .then((v) => v.json())
          .then((v) =>
            (async () => {
              data.prompt = "yes";

              return await fetch(this.BASE_URL, {
                method: "POST",
                body: new URLSearchParams(data),
              }).then((v) => v.json());
            })()
          );

        if (res.status !== "success")
          return (async () => {
            await this.getSeshId();
            await this.txt2img(prompt);
          })();
        const $ = cheerio.load(res.output);
        await this.getSeshId();
        return resolve($("img").attr("src"));
      } catch (e) {
        reject(e);
      }
    });
  }

  async imageRecognition(url, prompt) {
    return new Promise(async (resolve, reject) => {
      try {
        this.num = this.tools.img_recognition;
        if (!this.sesh_id[this.num]) await this.getSeshId();

        const data = new URLSearchParams({
          prompt: encodeURIComponent(url),
          uid: this.uid[this.num],
          sesh_id: this.sesh_id[this.num],
          get_tool: false,
          tool_num: this.num,
        });

        fetch(this.BASE_URL, {
          method: "POST",
          body: data,
        })
          .then((v) => v.json())
          .then((v) =>
            (async () => {
              data.set("prompt", encodeURIComponent(prompt));
              fetch(this.BASE_URL, {
                method: "POST",
                body: data,
              })
                .then((v) => v.json())
                .then((v) => (async () => {
                  await this.getSeshId()
                  resolve(v.output)
                }));
            })()
          );
      } catch (e) {
        reject(e);
      }
    });
  }
}

const ai = new Ai();
ai.imageRecognition(ai.BASE_CDN + "/667fff314c5c9.jpg", "Apa isinya?");

/*
{
  status: 'success',
  output: 'Gambar tersebut menampilkan seorang karakter dari anime atau manga "O
shi no Ko". Karakter ini memiliki rambut pirang dengan mata biru, mengenakan top
i hitam dengan tulisan "OSHI NO KO" dan bintang putih di atasnya. Dia juga menge
nakan jaket hitam dengan hoodie biru, serta kalung dengan liontin berbentuk perm
ata biru.',
  output_type: 'string',
  tool_num: '6',
  sesh_id: '6af45324-e9e7-4949-9f80-b92ece59c1a3',
  uploads: false,
  tool_name: 'Image_Chat_API'
}
*/

export { Ai };
