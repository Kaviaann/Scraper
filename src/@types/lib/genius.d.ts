export declare interface IGeniusLyric {
  title: String;
  about: String;
  image: String;
  artist: String;
  artistLink: String;
  track: String;
  album: String;
  producer: String;
  producerLink: String;
  url: String;
  lyric: String[];
  tags: {
    name: String;
    url: String;
  }[];
}

export declare function geniusLyric(
  title: String,
  artist: String
): Promise<IGeniusLyric>;
