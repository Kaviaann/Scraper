export interface AnimeData {
  title: String;
  link: String;
  thumb: String;
  type: String;
  score: String;
  season: null | String;
  synops: String;
  genres: String[];
}

export interface CharacterAnime {
  title: String;
  link: String;
}

export interface CharacterOther {
  type: String | "manga";
  title: String;
  link: String;
}
export interface CharacterData {
  title: String;
  link: String;
  thumb: String;
  anime: CharacterAnime[];
  other: CharacterOther[];
}
export interface CompanyData {
  name: String;
  small: String;
  link: String;
  thumbnail: String;
}

export interface CompanyInfos {
  from: String;
  main: String;
}

export interface CompanyNews {
  title: String;
  thumbnail: String;
  snippets: String;
  link: String;
  info: {
    author: String;
    author_link: String;
    create_time: Number;
    forum: "";
    tags: [
      {
        type: String;
        link: String;
      }
    ];
  };
}

export interface CompanyAnimes {
  title: String;
  thumbnail: String;
  link: String;
  category: String;
  stars: String;
  users: String;
}
export interface CompanyInfo {
  name: String;
  logo: String;
  create_time: Number;
  favorite: String;
  share: {
    type: String;
    link: String;
  }[];
  infos: CompanyInfos;
  news: CompanyNews[];
  animes: CompanyAnimes[];
}

export declare interface IMangaSearch {
  title: String;
  desc: String;
  id: String;
  link: String;
  thumbnail: String;
  type: String;
  volume: String;
  score: String;
  member: String;
}

export declare interface IManga {
  title: String;
  synops: String;
  thumbnail: String;
  pictures: String;
  score: String;
  attr: {
    type: String;
    text?: String;
    data?: String | String[];
    link?: {
      url: String;
      data: String;
    }[];
  }[];
  character: {
    name: String;
    role: String;
    image: String;
    link: String;
  }[];
}

export declare interface IMeganeiSearch {
  query: String;
  total: Number;
  result: {
    title: String;
    thumbnail: String;
    id: String;
    createTime: Number;
    formatTime: String;
    publisher: String;
    desc: String;
    category: String[];
    tag: String[];
    link: String;
  }[];
}

export declare interface IMeganeiInfo {
  title: String;
  thumbnail: String;
  createTime: Number;
  formatTime: String;
  publisher: String;
  category: String[];
  tag: String[];
  genre: String[];
  info: {
    name: String;
    data: String;
  }[];
  desc: String;
  download: {
    range: String;
    link: {
      type: String;
      link: String;
    };
  };
}

export declare function animeSearch(name: string): Promise<AnimeData[]>;
export declare function animeCharacter(name: string): Promise<CharacterData[]>;
export declare function animeCompany(name: string): Promise<CompanyData>;
export declare function animeCompanyInfo(name: string): Promise<CompanyInfo>;
export declare function mangaSearch(query: String): Promise<IMangaSearch[]>;
export declare class Meganei {
  search(query: String): Promise<IMeganeiSearch>;
  info(url: String): Promise<IMeganeiInfo>;
}
