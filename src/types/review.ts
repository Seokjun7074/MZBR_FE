export interface ReviewRequest {
  videoUuid: string; //영상의 uuid
  storeId: number; //식당의 pk
  description: string; //영상의 설명
  tags: string[]; //영상의 해시태그
  star: number; // 영상의 별점
  thumbnailName: string;
  audio: Audio;
  clips: Clip[];
  subtitles: Subtitle[];
}

export interface Subtitle {
  text: string; //자막의 텍스트
  startDuration: number; //자막의 시작 시간
  endDuration: number; //자막의 종료 시간
  x: number;
  y: number;
  scale: number; //자막의 크기. 20폰트를 기본으로 함
  rotation: number; // 자막의 회전 정도
  color: number; //자막의 RGB값을 int 형태로 변환한 값
  zIndex: number;
}

export interface Clip {
  fileName: string; //사전에 가편집된 클립의 파일이름
  volume: number;
}

export interface Audio extends Clip {}
