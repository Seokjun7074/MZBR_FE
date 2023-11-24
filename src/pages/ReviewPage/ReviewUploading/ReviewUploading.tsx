import styled from 'styled-components';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilValue, useResetRecoilState } from 'recoil';

import { Flex } from '@/components/common/Flex/Flex';

import { useFFmpeg } from '@/hooks/useFFmpeg';

import { completeVideoEdit } from '@/apis/videoEdit/completeVideoEdit';
import { getAudioThumbnail } from '@/apis/videoEdit/getAudioThumbnail';
import { uploadFile } from '@/apis/videoEdit/uploadFile';

import { PATH } from '@/constants/path';

import { reviewRequestState } from '@/store/reviewRequest';
import { editingUUIDState, preparedVideoAtom } from '@/store/video';

const ReviewUploading = () => {
  const { makeThumbnail, ffmpegLoaded } = useFFmpeg();
  const navigate = useNavigate();
  const preparedVideo = useRecoilValue(preparedVideoAtom);
  const reviewRequest = useRecoilValue(reviewRequestState);
  const resetEditingUUID = useResetRecoilState(editingUUIDState);

  const uploadThumbnail = async (thumbnailUrl: string, file: Blob) => {
    const response = await uploadFile(thumbnailUrl, file);
    return response.status;
  };

  const handleSubmit = async () => {
    const result = await makeThumbnail(preparedVideo[0]?.videoUrl);
    if (!result?.thumbnailName) return;
    // S3 업로드 URL
    const presignUrl = await getAudioThumbnail(result.thumbnailName);
    // 썸네일 S3업로드
    const uploadStatus = await uploadThumbnail(presignUrl.thumbnailUrl, result.blob);
    // 오디오 있으면 S3업로드
    const thumbnailAdded = { ...reviewRequest, thumbnailName: result.thumbnailName };
    // 최종 업로드 완료 요청
    const completeStatus = await completeVideoEdit(thumbnailAdded);
    if (completeStatus === 200 && uploadStatus === 200) {
      resetEditingUUID();
      alert('영상 업로드 완료!');
      navigate(PATH.MAP);
    }
  };

  useEffect(() => {
    if (ffmpegLoaded) {
      try {
        handleSubmit();
      } catch {
        alert('저장소 업로드 중 오류 발생');
        window.location.replace(PATH.MAP);
      }
    }
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
