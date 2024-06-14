export interface IDrive{
  name : String,
  download : String,
  link : String
}

export interface ITerabox{
  video : {
    name : String,
    video : String,
    thumbnail : String
  }[] | null
}