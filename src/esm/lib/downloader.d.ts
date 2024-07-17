export interface IDrive {
  name: String;
  download: String;
  link: String;
}

export interface ITerabox {
  video?: {
    name: String;
    video: String;
    thumbnail: String;
  }[];
  image?: {
    name: String;
    video: String;
    thumbnail: String;
  };
}

export interface IMediafire {
  name: String;
  filename: String;
  type: String;
  size: String;
  created: Number;
  descHeader: String;
  desc: String;
  media: String;
  link: String;
}

export declare interface ISnackVideo {
  title: String;
  thumbnail: String;
  media: String;
  author: String;
  authorImage: String;
  like: String;
  comment: String;
  share: String;
}

export declare interface ICobaltOptions {
  audio: Boolean;
  aFormat: "best" | "mp3" | "ogg" | "wav" | "opus";
  vCodec: "standar" | "high" | "medium";
  vReso:
    | "max"
    | "8k+?"
    | "4k"
    | "1440p?"
    | "1080p?"
    | "720p?"
    | "480p?"
    | "360p?"
    | "240p?"
    | "144p?";
}

export declare interface ICobaltDownload {
  status: "error" | "redirect" | "stream" | "success" | "rate-limit" | "picker";
  text?: String;
  url?: String;
  pickerType: "images" | "various";
  picker: {
    type?: "video" | "photo";
    url: String;
    thumb?: String;
  };
  audio: string;
}

export declare interface IGoChild {
  id: String;
  parentFolder: String;
  type: "file";
  name: String;
  createTime: Number;
  size: Number;
  downloadCount: Number;
  md5: String;
  mimetype: String;
  servers: String[];
  serverSelected: String;
  link: String;
  thumbnail: String;
}

export declare interface IGofile {
  id: String;
  type: "Folder";
  name: String;
  createTime: Number;
  code: String;
  public: Boolean;
  totalDownloadCount: Number;
  totalSize: Number;
  childrenIds: String[];
  children: IGoChild;
}

export declare function terabox(url: String): Promise<ITerabox>;
export declare function drive(url: String): Promise<IDrive>;
export declare function mediafire(url: String): Promise<IMediafire>;
export declare function snackVideo(url: String): Promise<ISnackVideo>;
export declare function cobalt(
  url: String,
  options: ICobaltOptions
): Promise<ICobaltDownload>;
export declare function gofile(url: String): Promise<IGofile>;
