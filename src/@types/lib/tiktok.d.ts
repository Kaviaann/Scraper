export interface ITiktokMusicInfo {
  id: String;
  title: String;
  play: URL;
  author: String;
  original: Boolean;
  duration: Number;
  album: String;
}
export interface ITiktokVideoData {
  title: String;
  cover: URL;
  origin_cover: URL;
  link: URL;
  no_watermark: URL;
  watermark: URL;
  music: ITiktokMusicInfo;
  views: Number;
  like: Number;
  comment: Number | null;
  share: Number;
  download: Number | null;
  save: Number | null;
  create_time: Number;
}
export interface ITiktokPostData {
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
  music: ITiktokMusicInfo;
}

export interface ITiktokSlide {
  author: String;
  username: String;
  profile: String;
  caption: String;
  views: String;
  likes: String;
  comment: String;
  save: String;
  share: String;
  music: String;
  thumbnail: String;
  link: String;
  authorLink: String;
  slides: String[];
}

export interface ITiktokUser {
  photo: String;
  username: String;
  name: String;
  bio: String;
  followers: Number;
  following: Number;
  likes: Number;
  posts: Number;
}

export declare function tiktokSearch(
  query: string
): Promise<ITiktokVideoData[]>;
export declare function tiktokInfo(url: string): Promise<ITiktokVideoData>;
export declare function tiktokUserPost(
  user: string
): Promise<ITiktokPostData[]>;
export declare function tiktokSlide(url: string): Promise<ITiktokSlide>;
export declare function tiktokStalk(username: string): Promise<ITiktokUser>;
