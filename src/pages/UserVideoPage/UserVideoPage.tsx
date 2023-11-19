import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as S from '@/pages/UserVideoPage/UserVideoPage.style';

import { useUserVideoQuery } from '@/hooks/queries/useUserVideoQuery';

import { UserVideo } from '@/types/user';

const UserVideoPage = () => {
  const S3_URL = 'https://mzbr-temp-video-bucket.s3.ap-northeast-2.amazonaws.com/';
  const { userId } = useParams();
  const [isMyProfile, setIsMyProfile] = useState<boolean>(false);
  const savedUserId = localStorage.getItem('userId');
  const { userVideoData } = useUserVideoQuery(userId!);

  useEffect(() => {
    if (savedUserId === userId) setIsMyProfile(true);
  }, [userId, savedUserId]);

  const filterThumbnail = (userVideoData: []) => {
    return userVideoData?.filter((item: UserVideo) => item.thumbnailUrl !== 'thumbnail/');
  };

  return (
    <S.UserVideoPageWrapper>
      <S.ThumbnailContainer>
        {userVideoData &&
          filterThumbnail(userVideoData)?.map((item: UserVideo) => (
            <S.ThumbnailImage
              key={item.id}
              crossOrigin="anonymous"
              src={`${S3_URL}${item.thumbnailUrl}`}
            />
          ))}
      </S.ThumbnailContainer>
    </S.UserVideoPageWrapper>
  );
};

export default UserVideoPage;
