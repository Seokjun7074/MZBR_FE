import { axiosInstance } from '@/apis';
import { ReviewRequest } from '@/types/review';

export const completeVideoEdit = async (request: ReviewRequest) => {
  const response = await axiosInstance.post('/api/v/video/edit', request);
  console.log('[편집 완료]', response);
  return response;
};
