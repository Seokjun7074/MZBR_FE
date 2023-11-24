import { useResetRecoilState } from 'recoil';

import { hashtagState } from '@/store/hashtag';
import {
  editingUUIDState,
  endAtom,
  preparedVideoAtom,
  previewAtom,
  startAtom,
  videoAtom,
} from '@/store/video';

export const useResetVideo = () => {
  const resetStartAtom = useResetRecoilState(startAtom);
  const resetEndAtom = useResetRecoilState(endAtom);
  const resetVideoAtom = useResetRecoilState(videoAtom);
  const resetPreviewAtom = useResetRecoilState(previewAtom);
  const resetPreparedVideoAtom = useResetRecoilState(preparedVideoAtom);
  const resetEditingUUIDState = useResetRecoilState(editingUUIDState);
  const resetHashtagState = useResetRecoilState(hashtagState);

  const resetAllVideoAtom = () => {
    resetStartAtom();
    resetEndAtom();
    resetVideoAtom();
    resetPreviewAtom();
    resetPreparedVideoAtom();
    resetEditingUUIDState();
    resetHashtagState();
  };

  return { resetAllVideoAtom };
};
