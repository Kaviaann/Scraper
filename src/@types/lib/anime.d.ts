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

export declare function animeSearch(
  name: string,
  callback: (datas: AnimeData[]) => Promise<void>
): Promise<void>;
export declare function animeCharacter(
  name: string,
  callback: (datas: CharacterData[]) => Promise<void>
): Promise<void>;
export declare function animeCompany(name: string): Promise<CompanyData>;
export declare function animeCompanyInfo(name: string): Promise<CompanyInfo>;
