import { HttpResponse, http } from 'msw';

const videoListDummy1 = {
  videos: [
    {
      id: 1,
      videoUuid: 'asdfasdf1',
      masterUrl:
        'https://joo-test-bucket-2023.s3.ap-northeast-2.amazonaws.com/encoded-video/c4730998-77c0-45d2-bb88-781e06d634fd/master.m3u8',
      thumbnailUrl: 'test',
      writer: '작성자1',
      star: 4.5,
      description: 'JMT!!',
    },
    {
      id: 2,
      videoUuid: 'qwerqwer2',
      masterUrl:
        'https://joo-test-bucket-2023.s3.ap-northeast-2.amazonaws.com/encoded-video/c4730998-77c0-45d2-bb88-781e06d634fd/master.m3u8',
      thumbnailUrl: 'test',
      writer: '작성자2',
      star: 4.1,
      description: 'JMT!!JMT!!',
    },
    {
      id: 3,
      videoUuid: 'asdfasdf3',
      masterUrl:
        'https://joo-test-bucket-2023.s3.ap-northeast-2.amazonaws.com/encoded-video/c4730998-77c0-45d2-bb88-781e06d634fd/master.m3u8',
      thumbnailUrl: 'test',
      writer: '작성자3',
      star: 4.8,
      description: 'JMT!!JMT!!ㅋㅋㅋㅋ',
    },
  ],
};

export const shortFormHandler = [
  http.get('/api/b/videos', () => {
    return HttpResponse.json(videoListDummy1);
  }),
  http.get('/api/b/videos', () => {
    return HttpResponse.json(videoListDummy1);
  }),
  http.get('/api/b/videos', () => {
    return HttpResponse.json(videoListDummy1);
  }),
];
