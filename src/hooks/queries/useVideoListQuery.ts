import { useInfiniteQuery } from '@tanstack/react-query';

import { VideoListRequest, getVideoList } from '@/apis/shortForm/getVideoList';

export const useVideoListQuery = (request: VideoListRequest) => {
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['videoList'],
    queryFn: ({ pageParam }) => getVideoList(request, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.finished) return undefined;
      return pages.length + 1;
    },
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.videoList),
      pageParams: data.pageParams,
    }),
  });
  return { videoListData: data, isFetching, hasNextPage, fetchNextPage };
};
