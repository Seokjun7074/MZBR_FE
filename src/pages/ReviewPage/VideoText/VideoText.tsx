import { useRecoilState } from 'recoil';

import * as S from '@/pages/ReviewPage/VideoText/VideoText.style';

import { preparedVideoAtom } from '@/store/video';

const VideoText = () => {
  const [preparedVideo, setPreparedVideo] = useRecoilState(preparedVideoAtom);

  return <S.VideoTextWrapper></S.VideoTextWrapper>;
};

export default VideoText;
