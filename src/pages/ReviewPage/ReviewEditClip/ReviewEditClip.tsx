import { fetchFile } from '@ffmpeg/ffmpeg';
import { v4 } from 'uuid';

import { useEffect, useRef, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import * as S from '@/pages/ReviewPage/ReviewEditClip/ReviewEditClip.style';

import Slider from '@/components/Review/Slider/Slider';
import VideoPlayer from '@/components/Review/VideoPlayer/VideoPlayer';

import { useFFmpeg } from '@/hooks/useFFmpeg';

import { croppedVideoAtom, endAtom, preparedVideoAtom, startAtom, videoAtom } from '@/store/video';

const ReviewEditClip = () => {
  const videoState = useRecoilValue(videoAtom);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ffmpegRef } = useFFmpeg();

  const startTime = useRecoilValue(startAtom);
  const [endTime, setEndTime] = useRecoilState(endAtom);
  const [preparedVideo, setPreparedVideo] = useRecoilState(preparedVideoAtom);
  const [duration, setDuration] = useState(0);
  const [currentTimeCode, setCurrentTimeCode] = useState(0);
  const croppedVideo = useRecoilValue(croppedVideoAtom);

  const cutVideo = async (url: string) => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return;
    const uuid = v4();
    const outputFileName = `${uuid}.mp4`;
    ffmpeg.FS('writeFile', `inputVideo.mp4`, await fetchFile(url));
    try {
      await ffmpeg.run(
        '-ss',
        String(startTime),
        '-accurate_seek',
        '-i',
        `inputVideo.mp4`,
        '-to',
        String(endTime - startTime),
        '-codec',
        'copy',
        outputFileName,
      );
    } catch (e) {
      console.log('[동영상 자르기 오류]', e);
    }
    const result = ffmpeg.FS('readFile', outputFileName);
    const blob = new Blob([result.buffer], { type: 'video/mp4' });
    const file = new File([blob], outputFileName, { type: 'video/mp4', lastModified: Date.now() });
    const resultPreview = URL.createObjectURL(blob);
    return { resultPreview, file, blob, outputFileName };
  };

  const handelCutVideo = async () => {
    const res = await cutVideo(videoState.url);
    const preparedRes = {
      file: res!.file,
      url: res!.resultPreview,
      blob: res!.blob,
    };
    setPreparedVideo([...preparedVideo, preparedRes]);
    ///
    const presignedUrl = await getPresignedUrl(res!.outputFileName, croppedVideo);
    // 프리사인된 URL을 사용하여 S3에 파일을 업로드합니다.
    await uploadVideo(presignedUrl, preparedRes.blob);
    //서버에 편집요청을 합니다.
    const videoUrl = await uploadComplete(res!.outputFileName);
    //편집이 완료된 영상을 새로운 비디오 플레이어에 띄웁니다.
    console.log(videoUrl);
    alert('구간 자르기 완료');
  };

  async function getPresignedUrl(videoName: string, crop: object) {
    const dto = {
      videoName,
      crop,
    };

    const response = await fetch(`${process.env.SERVER_URL}/api/temp-video/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      throw new Error('Failed to get presigned URL');
    }

    const data = await response.json();
    return data.url; // 백엔드로부터 받은 프리사인된 URL을 반환합니다.
  }

  async function uploadVideo(presignedUrl: string, file: Blob) {
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: file, // 트리밍된 비디오 파일
    });

    if (!response.ok) {
      throw new Error('Failed to upload video');
    }

    console.log('Video uploaded successfully');
  }

  async function uploadComplete(videoName: string) {
    const response = await fetch(
      `${process.env.SERVER_URL}/api/temp-video/upload/${videoName}/upload-complete`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    return data.url;
  }

  useEffect(() => {
    const video = videoRef.current;
    video?.addEventListener('loadedmetadata', () => {
      setEndTime(video.duration);
      setDuration(video.duration);
    });
  }, [videoState]);

  return (
    <S.ReviewEditClipWrapper>
      <S.EditHeader>영상의 구간을 선택해주세요!</S.EditHeader>

      <VideoPlayer videoRef={videoRef} setCurrentTimeCode={setCurrentTimeCode} />
      <div style={{ width: '80%', padding: '0 2rem' }}>
        <Slider
          duration={duration}
          videoRef={videoRef}
          currentTimeCode={currentTimeCode}
          setCurrentTimeCode={setCurrentTimeCode}
        />
      </div>
      <S.NextButton onClick={handelCutVideo}>자르기</S.NextButton>
    </S.ReviewEditClipWrapper>
  );
};

export default ReviewEditClip;
