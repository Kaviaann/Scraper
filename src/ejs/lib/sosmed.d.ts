export interface TiktokVideoData {
  title: String;
  cover: URL;
  origin_cover: URL;
  no_watermark: URL;
  watermark: URL;
  music: URL;
}
export interface TiktokPostData {
  title: String;
  duration: Number;
  origin_cover: URL;
  views: Number;
  like: Number;
  comment: Number;
  share: Number;
  download: Number;
  saved: Number;
  created_time: Number;
  release_date: Date;
  no_watermark: URL;
  watermark: URL;
  music: URL;
}
export declare function tiktokSearch(query: string): Promise<TiktokVideoData[]>;
export declare function tiktokInfo(url: URL): Promise<TiktokVideoData>;
export declare function tiktokUserPost(user: string): Promise<TiktokPostData[]>;
