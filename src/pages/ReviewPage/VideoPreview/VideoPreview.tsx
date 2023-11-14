import { fetchFile } from '@ffmpeg/ffmpeg';
import { v4 } from 'uuid';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import * as S from '@/pages/ReviewPage/VideoPreview/VideoPreview.style';

import { useFFmpeg } from '@/hooks/useFFmpeg';

import { completeVideoEdit } from '@/apis/videoEdit/completeVideoEdit';
import { getAudioThumbnail } from '@/apis/videoEdit/getAudioThumbnail';
import { getPreviewVideo } from '@/apis/videoEdit/getPreviewViewo';
import { uploadVideo } from '@/apis/videoEdit/uploadVideo';

import { PATH } from '@/constants/path';

import { reviewRequestState } from '@/store/reviewRequest';
import { editingUUIDState, preparedVideoAtom, previewAtom } from '@/store/video';

const VideoPreview = () => {
  const DUMMY_VIDEO =
    'https://mzbr-temp-video-bucket.s3.ap-northeast-2.amazonaws.com/crop/2ac6fe92-cb3c-4de7-b6bb-1d77ed25e524.mp4';

  const { ffmpegRef } = useFFmpeg();
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  const [reviewRequest, setReviewRequest] = useRecoilState(reviewRequestState);
  const [preparedVideo, setPreparedVideo] = useRecoilState(preparedVideoAtom);
  const resetEditingUUID = useResetRecoilState(editingUUIDState);
  const [videoPreview, setVideoPreview] = useRecoilState(previewAtom);

  useEffect(() => {
    const fetchPreviewUrl = async () => {
      const versionId = v4();
      const videoNameList = preparedVideo.map((vido) => vido.videoName);
      const { url } = await getPreviewVideo(versionId, videoNameList);
      setVideoPreview(url);
    };
    fetchPreviewUrl();
  }, []);

  const makeThumbnail = async () => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return;
    // const url = preparedVideo[0] ? preparedVideo[0].videoUrl : DUMMY_VIDEO;
    const url = preparedVideo[0]?.videoUrl;
    const thumbnailName = `${v4()}.jpeg`;

    ffmpeg.FS('writeFile', `inputVideo.mp4`, await fetchFile(url));
    try {
      await ffmpeg.run('-i', 'inputVideo.mp4', '-ss', '00:00:00', '-vframes', '1', thumbnailName);
    } catch (e) {
      console.error('[썸네일 생성 오류]', e);
    }
    const result = ffmpeg.FS('readFile', thumbnailName);
    const blob = new Blob([result.buffer], { type: 'image/jpeg' });
    return { blob, thumbnailName };
  };

  const uploadThumbnail = async (thumbnailUrl: string, file: Blob) => {
    const response = await uploadVideo(thumbnailUrl, file);
    console.log(response.status);
  };

  const handleSubmit = async () => {
    const result = await makeThumbnail();
    if (!result?.thumbnailName) return;
    // S3 업로드 URL
    const presignUrl = await getAudioThumbnail(result.thumbnailName);
    // 썸네일 S3업로드
    await uploadThumbnail(presignUrl.thumbnailUrl, result.blob);
    // 오디오 있으면 S3업로드

    // 최종 업로드 완료 요청
    const completeStatus = await completeVideoEdit(reviewRequest);
    if (completeStatus === 200) {
      resetEditingUUID();
      alert('영상 업로드 완료!');
      navigate(PATH.MAP);
    }
  };

  return (
    <S.VideoPreviewWrapper>
      <S.PreviewHeaderText>이대로 업로드할까요?</S.PreviewHeaderText>
      <S.PreviewVideoContainer>
        {videoPreview && (
          <S.PreviewVideo crossOrigin="anonymous" autoPlay controls src={videoPreview} />
        )}
        {/* <S.PreviewVideo crossOrigin="anonymous" autoPlay controls src={DUMMY_VIDEO} /> */}
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
        <S.ReviewTitleSubmitButton onClick={handleSubmit}>
          이대로 업로드 할래요
        </S.ReviewTitleSubmitButton>
      </S.PreviewSection>
    </S.VideoPreviewWrapper>
  );
};

export default VideoPreview;
