import { HttpResponse, http } from 'msw';

const videoListDummy1 = {
  videoList: [
    {
      videoUUID: 'asdfasdf1',
      videoPath:
        'https://joo-test-bucket-2023.s3.ap-northeast-2.amazonaws.com/encoded-video/c4730998-77c0-45d2-bb88-781e06d634fd/master.m3u8',
    },
    {
      videoUUID: 'qwerqwer2',
      videoPath:
        'https://joo-test-bucket-2023.s3.ap-northeast-2.amazonaws.com/encoded-video/c4730998-77c0-45d2-bb88-781e06d634fd/master.m3u8',
    },
    {
      videoUUID: 'asdfasdf3',
      videoPath:
        'https://joo-test-bucket-2023.s3.ap-northeast-2.amazonaws.com/encoded-video/c4730998-77c0-45d2-bb88-781e06d634fd/master.m3u8',
    },
  ],
  index: 1, // 페이지네이션
  finished: false, // 마지막 비디오 리스트면 true
};
const videoListDummy2 = {
  videoList: [
    {
      videoUUID: 'asdfasdf4',
      videoPath:
        'https://joo-test-bucket-2023.s3.ap-northeast-2.amazonaws.com/encoded-video/c4730998-77c0-45d2-bb88-781e06d634fd/master.m3u8',
    },
    {
      videoUUID: 'qwerqwer5',
      videoPath:
        'https://joo-test-bucket-2023.s3.ap-northeast-2.amazonaws.com/encoded-video/c4730998-77c0-45d2-bb88-781e06d634fd/master.m3u8',
    },
    {
      videoUUID: 'asdfasdf6',
      videoPath:
        'https://joo-test-bucket-2023.s3.ap-northeast-2.amazonaws.com/encoded-video/c4730998-77c0-45d2-bb88-781e06d634fd/master.m3u8',
    },
  ],
  index: 2, // 페이지네이션
  finished: false, // 마지막 비디오 리스트면 true
};
const videoListDummy3 = {
  videoList: [
    {
      videoUUID: 'asdfasdf7',
      videoPath:
        'https://joo-test-bucket-2023.s3.ap-northeast-2.amazonaws.com/encoded-video/c4730998-77c0-45d2-bb88-781e06d634fd/master.m3u8',
    },
    {
      videoUUID: 'qwerqwer8',
      videoPath:
        'https://joo-test-bucket-2023.s3.ap-northeast-2.amazonaws.com/encoded-video/c4730998-77c0-45d2-bb88-781e06d634fd/master.m3u8',
    },
    {
      videoUUID: 'asdfasdf9',
      videoPath:
        'https://joo-test-bucket-2023.s3.ap-northeast-2.amazonaws.com/encoded-video/c4730998-77c0-45d2-bb88-781e06d634fd/master.m3u8',
    },
  ],
  index: 3, // 페이지네이션
  finished: true, // 마지막 비디오 리스트면 true
};

export const shortFormHandler = [
  http.get('/api/b/videos/1', () => {
    return HttpResponse.json(videoListDummy1);
  }),
  http.get('/api/b/videos/2', () => {
    return HttpResponse.json(videoListDummy2);
  }),
  http.get('/api/b/videos/3', () => {
    return HttpResponse.json(videoListDummy3);
  }),
];
