import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

import * as S from '@/pages/UserVideoPage/UserVideoPage.style';

import MyInfo from '@/components/User/MyInfo/MyInfo';
import UserInfo from '@/components/User/UserInfo/UserInfo';
import Modal from '@/components/common/Modal/Modal';

import { useUserVideoQuery } from '@/hooks/queries/useUserVideoQuery';
import useModal from '@/hooks/useModal';

import { UserVideo } from '@/types/user';

const UserVideoPage = () => {
  const S3_URL = 'https://mzbr-temp-video-bucket.s3.ap-northeast-2.amazonaws.com/';
  const { userId } = useParams();
  const [isMyProfile, setIsMyProfile] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState('');
  const savedUserId = localStorage.getItem('userId');
  const { userVideoData } = useUserVideoQuery(userId!);
  const { openModal } = useModal();

  useEffect(() => {
    if (savedUserId === userId) setIsMyProfile(true);
  }, [userId, savedUserId]);

  const filterThumbnail = (userVideoData: []) => {
    return userVideoData?.filter((item: UserVideo) => item.thumbnailUrl !== 'thumbnail/');
  };

  const handleClickVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    openModal();
  };

  return (
    <>
      <S.UserVideoPageWrapper>
        {isMyProfile ? <MyInfo /> : <UserInfo userId={userId!} />}
        <S.ThumbnailContainer>
          {userVideoData &&
            filterThumbnail(userVideoData)?.map((item: UserVideo) => (
              <S.ThumbnailImage
                key={item.id}
                crossOrigin="anonymous"
                src={`${S3_URL}${item.thumbnailUrl}`}
                onClick={() => {
                  handleClickVideo(item.masterUrl);
                }}
              />
            ))}
        </S.ThumbnailContainer>
      </S.UserVideoPageWrapper>
      <Modal>
        <S.PlayerContainer>
          <ReactPlayer
            className="react-player"
            url={`${S3_URL}${selectedVideo}`}
            width="29rem"
            height="100%"
            controls={true}
            loop={true}
          />
        </S.PlayerContainer>
      </Modal>
    </>
  );
};

export default UserVideoPage;
