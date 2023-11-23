// import { useNavigate } from 'react-router-dom';

// import { useMutation } from '@tanstack/react-query';

// import { startEditVideo } from '@/apis/videoEdit/startEditVideo';

// import { PATH } from '@/constants/path';

// export const useStartEditVideoMutation = (storeId: string) => {
//   const navigate = useNavigate();

//   const startEditVideoMutation = useMutation({
//     mutationFn: (videoUuid: string) => startEditVideo(videoUuid),
//     onSuccess: ({ status }) => {
//       if (status === 201) {
//         navigate(PATH.REVIEW_EDIT_CLIP(storeId!), { state: { videoUuid } });
//       }
//     },
//     onError: () => {},
//   });
//   return startEditVideoMutation;
// };
