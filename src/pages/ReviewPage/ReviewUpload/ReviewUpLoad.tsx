import ArchiveBox from '@assets/ArchiveBox.png';
import Vector from '@assets/Group.png';
import { v4 } from 'uuid';

import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { startEditVideo } from '@/apis/videoEdit/startEditVideo';

import { PATH } from '@/constants/path';

import { videoAtom } from '@/store/video';

import * as S from './ReviewUpLoad.style';

const ReviewUpLoad = () => {
  const { restaurant_id } = useParams<{ restaurant_id: string }>();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [videoState, setVideoState] = useRecoilState(videoAtom);

  const videoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoState({
      file: e.target.files![0],
      url: URL.createObjectURL(e.target.files![0]),
    });
  };

  const handleNextButtonClick = async () => {
    const videoUuid = v4();
    const { status } = await startEditVideo(videoUuid);
    if (status === 201) navigate(PATH.REVIEW_EDIT_CLIP(restaurant_id!));
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
      <S.EditConfirmConatiner>
        {videoState.file && <span>{videoState.file?.name} 이 영상을 편집할까요?</span>}
        <S.NextButton onClick={handleNextButtonClick}>다음</S.NextButton>
      </S.EditConfirmConatiner>
    </S.ReviewUpLoadContainer>
  );
};

export default ReviewUpLoad;
