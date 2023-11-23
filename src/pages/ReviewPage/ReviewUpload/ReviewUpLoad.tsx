import ArchiveBox from '@assets/ArchiveBox.png';

import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import { useStartEdit } from '@/hooks/videoEdit/useStartEdit';

import { videoAtom } from '@/store/video';

import * as S from './ReviewUpLoad.style';

const ReviewUpLoad = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [videoState, setVideoState] = useRecoilState(videoAtom);
  const { handleNextButtonClick } = useStartEdit(storeId!);

  const videoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoState({
      file: e.target.files![0],
      url: URL.createObjectURL(e.target.files![0]),
    });
  };

  const handleClickInput = () => {
    inputRef?.current?.click();
  };

  return (
    <S.ReviewUpLoadContainer>
      <S.Heading>리뷰 영상을 업로드 해주세요!</S.Heading>
      <S.UpLoadBox onClick={handleClickInput}>
        <S.Image src={ArchiveBox} alt="Archive Box Image" />
        <S.ImageCaption>동영상 업로드하기</S.ImageCaption>
        <S.VideoInput
          ref={inputRef}
          type="file"
          placeholder="비디오"
          onChange={videoUpload}
          accept=".mp4"
        />
      </S.UpLoadBox>
      <S.EditConfirmConatiner>
        {videoState.file && <span>{videoState.file?.name} 이 영상을 편집할까요?</span>}
        <S.NextButton onClick={handleNextButtonClick}>다음</S.NextButton>
      </S.EditConfirmConatiner>
    </S.ReviewUpLoadContainer>
  );
};

export default ReviewUpLoad;
