export interface AnimeData {
  title : String,
  link : String,
  thumb : String,
  type : String,
  score : String,
  season : null | String,
  synops : String,
  genres : String[]
}

export interface CharacterAnime {
  title : String,
  link : String
}

export interface CharacterOther {
  type : String | "manga",
  title : String,
  link : String
}
export interface CharacterData {
  title : String,
  link : String,
  thumb : String,
  anime : CharacterAnime[],
  other : CharacterOther[],
}

export declare function animeSearch(name : string, callback : (datas : AnimeData[]) => Promise<void>) : Promise<void>
export declare function animeCharacter(name : string, callback : (datas : CharacterData[]) => Promise<void>) : Promise<void>