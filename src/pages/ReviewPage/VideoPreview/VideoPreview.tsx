import { useRecoilValue } from 'recoil';

import * as S from '@/pages/ReviewPage/VideoPreview/VideoPreview.style';

import { preparedVideoAtom } from '@/store/video';

const VideoPreview = () => {
  const preparedVideo = useRecoilValue(preparedVideoAtom);
  console.log(preparedVideo);

  return (
    <S.VideoPreviewWrapper>
      <S.PreviewVideoContainer>
        <S.PreviewVideo
          crossOrigin="anonymous"
          autoPlay
          src="https://mzbr-temp-video-bucket.s3.ap-northeast-2.amazonaws.com/crop/1c366c63-c45a-456c-9bd6-3249c6f44b0d.mp4"
        ></S.PreviewVideo>
      </S.PreviewVideoContainer>
    </S.VideoPreviewWrapper>
  );
};

export default VideoPreview;
