export type AnimeData = {
  title : String,
  link : String,
  thumb : String,
  type : String,
  score : String,
  season : null | String,
  synops : String,
  genres : String[]
}
export type searchCallback = (datas : AnimeData[]) => Promise<void>
export declare function searchAnime(name : string, callback : searchCallback) : Promise<void>