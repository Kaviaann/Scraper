export interface Twitter {
  desc: String;
  thumbnail: URL;
  video_sd: URL;
  video_hd: URL;
}

export declare function twitter(url: URL): Promise<Twitter>;
