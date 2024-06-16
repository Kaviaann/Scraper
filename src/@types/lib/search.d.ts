export interface ISticker {
  id: string;
  name: string;
  name_detail: string;
  color: string;
  premium: string;
  pack: string;
  author: string;
  author_name: string;
  author_website: string;
  author_avatar: string;
  author_icons_text: string;
  author_total_icons_text: string;
  selection: string;
  style: string;
  style_name: string;
  style_slug: string;
  style_color: string;
  style_shape: string;
  team_id: string;
  team_name: string;
  description: string;
  license: string;
  group_id: string;
  pack_id: string;
  pack_name: string;
  author_icons: string;
  family_id: string;
  family_name: string;
  published: string;
  keyword_name: string;
  keyword_link: string;
  tags: string;
  pack_items: string;
  pack_items_text: string;
  pack_sprite: string;
  png: string;
  raw: string;
  icon_type: string;
  category: string;
}

export interface IStickerResponse {
  total_get: string;
  page: number;
  stickers: ISticker[];
}

export declare function sticker(query: String): Promise<IStickerResponse>;
