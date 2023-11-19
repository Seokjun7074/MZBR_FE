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
