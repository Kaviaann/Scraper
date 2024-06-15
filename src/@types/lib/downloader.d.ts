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

export declare function terabox(url: String): Promise<ITerabox>;
export declare function drive(url: String): Promise<IDrive>;
export declare function mediafire(url: String): Promise<IMediafire>;
