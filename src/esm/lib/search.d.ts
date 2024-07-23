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

export declare interface INpmSearch {
  name: String;
  scope: String;
  version: String;
  description: String;
  keywords: String[];
  date: String;
  links: {
    npm: String;
  };
  author: {
    name: String;
  };
  publisher: {
    username: String;
    email: String;
  };
  maintainers: {
    username: String;
    email: String;
  }[];
}

export declare interface INpmSearchs {
  formData: {
    search: {
      q: {
        value: String;
      };
    };
  };
  objects: {
    package: {
      author: {
        name: String;
        email: String;
      };
      name: String;
      scope: String;
      version: String;
      description: String;
      keywords: String[];
      keywordsTruncated: Boolean;
      date: {
        ts: Number;
        rel: String;
      };
      links: {
        npm: String;
        bugs: String;
        homepage: String;
        repository: String;
      };
      publisher: {
        name: String;
        avatars: {
          small: String;
          medium: String;
          large: String;
        };
      };
      maintainers: {
        username: String;
        email: StaticRange;
      }[];
    };
    flags: {
      insecure: 0;
    };
    score: {
      final: Number;
      detail: {
        quality: Number;
        popularity: Number;
        maintenance: Number;
      };
    };
    searchScore: Number;
  }[];
  total: Number;
  time: String;
  pagination: {
    perPage: Number;
    page: Number;
  };
  url: String;
  hidePQM: null;
  user: null;
  auditLogEnabled: false;
  userEmailVerified: null;
  csrftoken: String;
  notifications: [];
}

export declare interface INpmPackage {
  canEditPackage: Boolean;
  auditLogEnabled?: Boolean;
  capsule: {
    name: String;
    description: String;
    maintainers: String[];
    "dist-tags": {
      latest: String;
      next?: String;
    };
    lastPublish: {
      maintainer: String;
      time: String;
    };
    types: {
      [key: string]: String;
    };
  };
  dependents: {
    dependentsCount: Number;
    dependentsTruncated: String[];
  };
  downloads: {
    downloads: Number;
    label: String;
  }[];
  isStarred: Boolean;
  ghapi: String;
  isSecurityPlaceholder: Boolean;
  linkingAllowedForPackage: Boolean;
  package: String;
  packageLinkingCallToActionHref: null;
  packageUrl: String;
  packageVersion: {
    author: {
      name: String;
      avatars: {
        large: String;
        medium: String;
        small: String;
      };
    };
    description: String;
    keywords: String[];
    deprecations: String[];
    dependencies: { [key: string]: String };
    maintainers: {
      name: String;
      avatars: {
        small: String;
        medium: String;
        large: String;
      };
    }[];
    repository: String;
    homepage: String;
    name: String;
    license: String;
    version: String;
    versions: String[];
  };
  packument: {
    author: {
      name: String;
      avatars: {
        large: String;
        medium: String;
        small: String;
      };
    };
    description: String;
    keywords: String[];
    deprecations: String[];
    dependencies: { [key: string]: String };
    maintainers: {
      name: String;
      avatars: {
        small: String;
        medium: String;
        large: String;
      };
    }[];
    repository: String;
    homepage: String;
    name: String;
    license: String;
    version: String;
    versions: {
      version: String;
      date: {
        ts: Number;
        rel: String;
      };
      dist: {
        shasum: String;
        fileCount: Number;
        integrity: String;
        tarball: String;
        unpackedSize: Number;
        signatures: {
          keyid: String;
          sig: String;
        }[];
      };
    }[];
    distTags: {
      latest: String;
      next: String;
    };
  };
  private: Boolean;
  provenance: {
    enabled: Boolean;
    feedbackUrl: String;
  };
  scope: String;
  starAction: String;
  versionsDownloads: { [key: string]: Number };
  readme: {
    data: String;
    ref: "readme" | String;
  };
  undefined: Boolean;
  documentContext: {
    "readme.data": "readme";
  };
  user: null;
  userEmailVerified: null;
  csrftoken: String;
  notifications: [];
}

export declare function sticker(query: String): Promise<IStickerResponse>;
export declare function geniusLyric(
  title: String,
  artist: String
): Promise<IGeniusLyric>;
export declare function webArchive(query: String): Promise<{
  url: String;
  archived_snapshot: {
    clotest: {
      status: String;
      available: Boolean;
      url: String;
      timestamp: String;
    };
  };
}>;
export declare function npmSearch(query: String): Promise<INpmSearch[]>;
export declare function npmSearch2(query: String): Promise<INpmSearchs>;
export declare function npm(packageName: String): Promise<INpmPackage>;
