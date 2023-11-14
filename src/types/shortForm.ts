export interface VideoInfo {
  id: number;
  videoUuid: string;
  thumbnailUrl: string;
  masterUrl: string;
  storeName: string;
  writer: string;
  star: number;
  description: string;
  views: number;
}

export interface VideoInfoListResponse {
  videoList: VideoInfo[];
}
