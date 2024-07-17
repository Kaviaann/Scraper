export declare class Ai {
  BASE: "https://boredhumans.com";
  BASE_URL: "https://boredhumans.com/apis/boredagi_api.php";
  BASE_CDN: "https://boredhumans.com/boredagi_files";
  BASE_UPLOAD: "https://boredhumans.com/apis/boredagi_upload.php";
  uid: { [tool_num: number]: String };
  sesh_id: { [tool_num: number]: String };
  tools: {
    celebrity_ai: 10;
    txt2img: 3;
    img_recognition: 6;
    txt2speech: 116;
  };
  num: 0;
  text: { [tool_num: number]: String };
  getUid(): String;
  #getSeshId(): Promise<String>;
  celebrityAi(prompt: String): Promise<String>;
  txt2img(prompt: String): Promise<String>;
  imageRecognition(url: String, prompt: String): Promise<String>;
  txt2speech(prompt: String): Promise<String>;
}

export declare interface IStableDiffusion {
  images: {
    url: String;
    width: Number;
    height: Number;
    content_type: String;
  }[];
  timings: {
    inference: Number;
  };
  seed: Number;
  has_nsfw_concept: Boolean[];
  prompt: String;
}

export declare function stableDiff(
  prompt: String,
  negative: String
): Promise<IStableDiffusion>;
