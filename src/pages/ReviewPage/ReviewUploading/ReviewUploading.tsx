import { fetchFile } from '@ffmpeg/ffmpeg';
import styled from 'styled-components';
import { v4 } from 'uuid';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilValue, useResetRecoilState } from 'recoil';

import { Flex } from '@/components/common/Flex/Flex';

import { useFFmpeg } from '@/hooks/useFFmpeg';

import { completeVideoEdit } from '@/apis/videoEdit/completeVideoEdit';
import { getAudioThumbnail } from '@/apis/videoEdit/getAudioThumbnail';
import { getPreviewVideo } from '@/apis/videoEdit/getPreviewViewo';
import { uploadVideo } from '@/apis/videoEdit/uploadVideo';

import { PATH } from '@/constants/path';

import { reviewRequestState } from '@/store/reviewRequest';
import { editingUUIDState, preparedVideoAtom } from '@/store/video';

const ReviewUploading = () => {
  const { ffmpegRef, ffmpegLoaded } = useFFmpeg();
  const navigate = useNavigate();
  const preparedVideo = useRecoilValue(preparedVideoAtom);
  const reviewRequest = useRecoilValue(reviewRequestState);
  const resetEditingUUID = useResetRecoilState(editingUUIDState);

  const makeThumbnail = async () => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return;
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
      console.log(completeStatus);
      resetEditingUUID();
      alert('영상 업로드 완료!');
      navigate(PATH.MAP);
    }
  };
  useEffect(() => {
    if (ffmpegLoaded) handleSubmit();
  }, [ffmpegLoaded]);

  return <ReviewUploadingWrapper>영상을 올리고 있어요!</ReviewUploadingWrapper>;
};

export default ReviewUploading;

const ReviewUploadingWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.l};
`;
