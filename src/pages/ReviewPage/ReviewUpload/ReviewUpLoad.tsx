import ArchiveBox from '@assets/ArchiveBox.png';
import Vector from '@assets/Group.png';

import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSetRecoilState } from 'recoil';

import { PATH } from '@/constants/path';

import { videoAtom } from '@/store/video';

import * as S from './ReviewUpLoad.style';

const ReviewUpLoad = () => {
  const { restaurant_id } = useParams<{ restaurant_id: string }>();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const setVideoState = useSetRecoilState(videoAtom);

  const videoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoState({
      file: e.target.files![0],
      url: URL.createObjectURL(e.target.files![0]),
    });
    navigate(PATH.REVIEW_EDIT_CLIP(restaurant_id!));
  };

  const handleNextButtonClick = () => {
    navigate(PATH.REVIEW_EDIT_CLIP(restaurant_id!));
  };

  const handleClickInput = () => {
    inputRef?.current?.click();
  };

  return (
    <S.ReviewUpLoadContainer>
      <S.Heading>리뷰 영상을 업로드 해주세요!</S.Heading>

      <S.UpLoadBox>
        <S.Image src={Vector} alt="Vector Image" />
        <S.ImageCaption>동영상 찍기</S.ImageCaption>
      </S.UpLoadBox>

      <S.UpLoadBox onClick={handleClickInput}>
        <S.Image src={ArchiveBox} alt="Archive Box Image" />
        <S.ImageCaption>동영상 업로드하기</S.ImageCaption>
        <S.VideoInput ref={inputRef} type="file" placeholder="비디오" onChange={videoUpload} />
      </S.UpLoadBox>

      <S.NextButton onClick={handleNextButtonClick}>다음</S.NextButton>
    </S.ReviewUpLoadContainer>
  );
};

export default ReviewUpLoad;
