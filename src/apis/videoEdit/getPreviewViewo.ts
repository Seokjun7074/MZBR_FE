import { axiosInstance } from '@/apis';

export const getPreviewVideo = async (versionId: string, videoNameList: string[]) => {
  const { data } = await axiosInstance.post('/v/video/preview-video', {
    versionId,
    videoNameList,
  });
  return data;
};
