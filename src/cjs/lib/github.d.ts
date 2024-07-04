export declare interface IGithubPinnedFork {
  name: String;
  author: String;
  link: String;
}

export declare interface IGithubPinnedRepo {
  id: String;
  name: String;
  link: String;
  isForked: Boolean;
  forked: IGithubPinnedFork | null;
}

export declare interface IGithubUser {
  username: String;
  name: String;
  icon: String;
  link: String;
  pinned: IGithubPinnedRepo[];
}

export declare function githubUser(username: String): Promise<IGithubUser>;
