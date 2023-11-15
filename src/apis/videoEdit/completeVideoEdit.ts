import { axiosInstance } from '@/apis';
import { ReviewRequest } from '@/types/review';

export const completeVideoEdit = async (request: ReviewRequest) => {
  const status = await axiosInstance.post('/v/video/edit', request);
  console.log('[편집 완료]', status);
  return status.status;
};
