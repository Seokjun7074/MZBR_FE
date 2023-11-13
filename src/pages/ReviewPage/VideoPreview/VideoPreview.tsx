import { v4 } from 'uuid';

import { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import * as S from '@/pages/ReviewPage/VideoPreview/VideoPreview.style';

import { getPreviewVideo } from '@/apis/videoEdit/getPreviewViewo';

import { preparedVideoAtom } from '@/store/video';

const VideoPreview = () => {
  const preparedVideoState = useRecoilValue(preparedVideoAtom);
  const [videoPreview, setVideoPreview] = useState<string>('');

  useEffect(() => {
    const fetchPreviewUrl = async () => {
      const versionId = v4();
      const videoNameList = preparedVideoState.map((vido) => vido.videoName);
      const { url } = await getPreviewVideo(versionId, videoNameList);
      console.log(url);
      setVideoPreview(url);
    };
    // fetchPreviewUrl();
  }, []);

  return (
    <S.VideoPreviewWrapper>
      <S.PreviewHeaderText>이대로 업로드할까요?</S.PreviewHeaderText>
      <S.PreviewVideoContainer>
        <S.PreviewVideo
          crossOrigin="anonymous"
          autoPlay
          controls
          src="https://mzbr-temp-video-bucket.s3.ap-northeast-2.amazonaws.com/crop/1c366c63-c45a-456c-9bd6-3249c6f44b0d.mp4"
        />
      </S.PreviewVideoContainer>
      <S.PreviewSection>
        <S.ReviewTitleSubmitButton>영상 추가</S.ReviewTitleSubmitButton>
        <S.ReviewTitleSubmitButton>음성 / 자막 추가</S.ReviewTitleSubmitButton>
      </S.PreviewSection>
      <S.PreviewSection>
        <S.ReviewTitleSubmitButton>이대로 업로드 할래요</S.ReviewTitleSubmitButton>
      </S.PreviewSection>
    </S.VideoPreviewWrapper>
  );
};

export default VideoPreview;
