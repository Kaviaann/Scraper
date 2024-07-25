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

export declare interface IAnimagineOptions {
  prompt: String;
  negative: String;
  style:
    | "(none)"
    | "Cinematic"
    | "Photographic"
    | "Anime"
    | "Manga"
    | "Digital Art"
    | "Pixel art"
    | "Fantasy art"
    | "Neonpunk"
    | "3D Model";
  sampler:
    | "DDIM"
    | "Euler a"
    | "Euler"
    | "DPM++ 2M Karras"
    | "DPM++ 2M SDE Karras"
    | "DPM++ SDE Karras";
  quality: "(none)" | "Light" | "Standard" | "Heavy";
  width: Number;
  height: Number;
  ratio:
    | "Custom"
    | "640 x 1536"
    | "832 x 1216"
    | "1024 x 1024"
    | "1152 x 896"
    | "1344 x 768"
    | "768 x 1344"
    | "896 x 1152"
    | "1216 x 832"
    | "1536 x 640";
}

export declare interface IAnimagineGallery {
  image: {
    path: String;
    url: String;
    size?: String | null;
    orig_name: String;
    mime_type?: String | null;
    is_stream: Boolean;
  };
  caption?: String | null;
}

export declare interface IOmniplexSearch {
  webPages?: {
    value: {
      name: String;
      url: String;
      snippet: String;
    }[];
  };
  videos?: {
    value: {
      thumbnailUrl: String;
      hostPageUrl: String;
    }[];
  };
  images?: {
    value: {
      thumbnailUrl: String;
      hostPageUrl: String;
    }[];
  };
}

export declare interface IOmniplexResponse {
  mode: "chat" | "search";
  data: String;
  search?: IOmniplexSearch;
}

export declare interface ICopilotResponse {
  data: String;
  search?: IOmniplexSearch;
  questions: String[];
}

export declare function stableDiff(
  prompt: String,
  negative: String
): Promise<IStableDiffusion>;
export declare function animagine(
  Options: IAnimagineOptions
): Promise<IAnimagineGallery[]>;
export declare function omniplexAi(
  prompt: String,
  system: String
): Promise<IOmniplexResponse>;
export declare function copilot(
  prompt: String,
  system: String
): Promise<ICopilotResponse>;
