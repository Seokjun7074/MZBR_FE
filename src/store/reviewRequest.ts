import { atom } from 'recoil';

const initState = {
  videoMetadata: {
    videoUUID: '', //영상의 외부 식별자 UUID
    restaurantId: 3, //식당의 ID
    description: 'A short film about the ambiance in our restaurant.', //영상의 설명
    tags: [''],
    duration: 60000, //영상 재생시간의 밀리세컨트 단위
    star: 1, //식당의 별점
    resolution: {
      width: 720, //가로 해상도
      height: 1280, //세로 해상도
    },
    aspectRatio: '9:16', //종횡비
    frameRate: 30, //프레임
    clips: [
      {
        clipId: 1, //클립의 아이디
        clipName: 'clip-name',
        extension: 'mp4',
        durationTime: 40000, //영상의 재생시간
        width: 1000,
        heigth: 1000,
        volume: 0.6, //영상의 오디오 볼륨
        crop: {
          x: 100, //잘라낼 영역의 시작점의 x 좌표(픽셀 단위)
          y: 50, //잘라낼 영역의 시작점의 y 좌표(픽셀 단위)
          zoomFactor: 1.5,
        },
      },
    ],
    //fileAudioTrack과 serverAudioTrack은 둘 중 하나만 존재 가능
    //audio는 배열로 해놓았지만, 현재는 하나만 선택 가능
    audios: [
      {
        audioId: 1,
        fileName: 'userUploadedTrack',
        extension: 'mp3',
        trimStart: 1500, // 선택한 오디오 부분의 시작 시간 (밀리초)
        trimEnd: 61500, // 선택한 오디오 부분의 종료 시간 (밀리초)
        volume: 1.0,
      },
    ],
    serverAudioTrack: {
      audioId: 1,
      trimStart: 1500,
      trimEnd: 61500,
      volume: 1.0,
    },
    subtitles: [
      {
        text: 'Welcome to Our Restaurant',
        startTime: 3000, // 자막 시작시간
        endTime: 7000, // 자막 종료시간
        position: {
          // 자막이 영상의 어느 위치에 있는지
          x: 100,
          y: 50,
        },
        scale: 1.0, // 자막의 크기
        rotation: 0, //자막의 회전정도
        color: 1341, //자막의 색상의 Int형
        zIndex: 1, //자막의 Z-Index
      },
    ],
  },
};

export const reviewRequestState = atom({
  key: 'reviewRequestState',
  default: initState,
});
