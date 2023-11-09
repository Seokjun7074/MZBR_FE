export interface VideoResponse {
  restaurantName: string;
  memberName: string;
  memberId: number;
  videoPath: string;
  description: string;
  hashtags: string[];
  commentsCount: number;
  status: string; //like, dislike, none
}

interface VideoInfo {
  videoUUID: string;
  videoPath: string;
}

export interface VideoInfoListResponse {
  videoList: VideoInfo[];
  index: number;
  finished: boolean;
}
