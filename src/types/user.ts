export interface UserVideo {
  id: number;
  videoUuid: string;
  thumbnailUrl: string;
  masterUrl: string;
  storeName: string;
  writerId: number;
  writer: string;
  star: number;
  description: string;
  views: number;
}

export interface UserVideoList {
  videos: UserVideo[];
}

export interface MyInfo {
  nickname: string;
  postCount: number;
  profileImage: null | string;
  subscribeCount: number;
  userId: number;
}
