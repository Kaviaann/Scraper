export interface TiktokVideoData {
  title: String;
  cover: URL;
  origin_cover: URL;
  link: URL;
  no_watermark: URL;
  watermark: URL;
  music: TiktokMusicInfo;
  views: Number;
  like: Number;
  comment: Number | null;
  share: Number;
  download: Number | null;
  save: Number | null;
  create_time: Number;
}

export interface TiktokMusicInfo {
  id: String;
  title: String;
  play: URL;
  author: String;
  original: Boolean;
  duration: Number;
  album: String;
}
export interface TiktokPostData {
  title: String;
  duration: Number;
  origin_cover: URL;
  views: Number;
  like: Number;
  comment: Number | null;
  share: Number;
  download: Number | null;
  saved: Number | null;
  created_time: Number;
  no_watermark: URL;
  watermark: URL;
  music: TiktokMusicInfo;
}
export declare function tiktokSearch(query: string): Promise<TiktokVideoData[]>;
export declare function tiktokInfo(url: URL): Promise<TiktokVideoData>;
export declare function tiktokUserPost(user: string): Promise<TiktokPostData[]>;
