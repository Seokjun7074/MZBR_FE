import { axiosInstance } from '@/apis';
import { ReviewRequest } from '@/types/review';

export const completeVideoEdit = async (request: ReviewRequest) => {
  const status = await axiosInstance.post('/api/v/video/edit', request);
  return status.status;
};
