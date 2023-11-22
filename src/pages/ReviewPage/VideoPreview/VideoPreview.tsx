import { v4 } from 'uuid';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';

import * as S from '@/pages/ReviewPage/VideoPreview/VideoPreview.style';

import Spinner from '@/components/common/Spinner/Spinner';

import { getPreviewVideo } from '@/apis/videoEdit/getPreviewViewo';

import { PATH } from '@/constants/path';

import { preparedVideoAtom, previewAtom } from '@/store/video';

const VideoPreview = () => {
  const DUMMY_VIDEO =
    'https://mzbr-temp-video-bucket.s3.ap-northeast-2.amazonaws.com/crop/2ac6fe92-cb3c-4de7-b6bb-1d77ed25e524.mp4';

  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  const preparedVideo = useRecoilValue(preparedVideoAtom);
  const [videoPreview, setVideoPreview] = useRecoilState(previewAtom);
  const [isFetchedUrl, setIdFetchedUrl] = useState(false);

  useEffect(() => {
    const fetchPreviewUrl = async () => {
      const versionId = v4();
      const videoNameList = preparedVideo.map((vido) => vido.videoName);
      try {
        const { url } = await getPreviewVideo(versionId, videoNameList);
        setVideoPreview(url);
        setIdFetchedUrl(true);
      } catch {
        alert('영상 미리보기 생성 중 오류 발생🥲');
        navigate(PATH.MAP);
      }
    };
    fetchPreviewUrl();
  }, []);

  return (
    <>
      {isFetchedUrl ? (
        <S.VideoPreviewWrapper>
          <S.PreviewHeaderText>이대로 업로드할까요?</S.PreviewHeaderText>
          <S.PreviewVideoContainer>
            <S.PreviewVideo crossOrigin="anonymous" autoPlay controls>
              <source src={videoPreview} />
            </S.PreviewVideo>
          </S.PreviewVideoContainer>
          <S.PreviewSection>
            <S.ReviewTitleSubmitButton onClick={() => navigate(PATH.REVIEW_UPLOAD(storeId!))}>
              영상 추가
            </S.ReviewTitleSubmitButton>
            <S.ReviewTitleSubmitButton onClick={() => navigate(PATH.VIDEO_TEXT(storeId!))}>
              음성 / 자막 추가
            </S.ReviewTitleSubmitButton>
          </S.PreviewSection>
          <S.PreviewSection>
            <S.ReviewTitleSubmitButton
              onClick={() => {
                navigate(PATH.VIDEO_UPLOADING(storeId!));
              }}
            >
              이대로 업로드 할래요
            </S.ReviewTitleSubmitButton>
          </S.PreviewSection>
        </S.VideoPreviewWrapper>
      ) : (
        <Spinner message="열심히 영상을 편집하고 있어요!" />
      )}
    </>
  );
};

export default VideoPreview;
