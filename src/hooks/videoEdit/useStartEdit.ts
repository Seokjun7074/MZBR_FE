import { v4 } from 'uuid';

import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import { startEditVideo } from '@/apis/videoEdit/startEditVideo';

import { PATH } from '@/constants/path';

import { reviewRequestState } from '@/store/reviewRequest';
import { editingUUIDState } from '@/store/video';

export const useStartEdit = (storeId: string) => {
  const navigate = useNavigate();
  const [editingUUID, setEditingUUID] = useRecoilState(editingUUIDState);
  const [reviewRequest, setReviewRequest] = useRecoilState(reviewRequestState);

  const handleNextButtonClick = async () => {
    let videoUuid = '';
    if (editingUUID === '') {
      videoUuid = v4(); // 편집될 영상의 식별자
      setEditingUUID(videoUuid);
      setReviewRequest({ ...reviewRequest, videoUuid });
      const status = await startEditVideo(videoUuid);
      if (status.status === 201) {
        navigate(PATH.REVIEW_EDIT_CLIP(storeId), { state: { videoUuid } });
        return;
      }
      throw new Error('영상편집 세팅 실패');
    } else {
      videoUuid = editingUUID;
      navigate(PATH.REVIEW_EDIT_CLIP(storeId), { state: { videoUuid } });
    }
  };

  return { handleNextButtonClick };
};
