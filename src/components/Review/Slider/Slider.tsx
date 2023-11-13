import * as S from '@components/Review/Slider/Slider.style';

import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { endAtom, startAtom } from '@/store/video';

interface SliderProps {
  duration: number;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  currentTimeCode: number;
  setCurrentTimeCode: React.Dispatch<React.SetStateAction<number>>;
}

const Slider = ({ duration, videoRef, currentTimeCode, setCurrentTimeCode }: SliderProps) => {
  const GAP = 0;
  // 실제 시작,종료 값
  const [rangeMinValue, setRangeMinValue] = useRecoilState(startAtom);
  const [rangeMaxValue, setRangeMaxValue] = useRecoilState(endAtom);
  // 색으로 보이는 부분
  const [rangeMinPercent, setRangeMinPercent] = useState(0);
  const [rangeMaxPercent, setRangeMaxPercent] = useState(0);

  const currentTimeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTimeCode(parseFloat(e.target.value));
    if (videoRef?.current) {
      videoRef.current.currentTime = parseFloat(e.target.value);
    }
  };

  const minValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeMinValue(parseFloat(e.target.value));
    if (videoRef?.current) {
      videoRef.current.currentTime = parseFloat(e.target.value);
    }
  };

  const maxValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeMaxValue(parseFloat(e.target.value));
    if (videoRef?.current) {
      videoRef.current.currentTime = parseFloat(e.target.value);
    }
  };

  useEffect(() => {
    const twoRangeHandler = () => {
      if (rangeMaxValue - rangeMinValue < GAP) {
        setRangeMaxValue(rangeMinValue + GAP);
        setRangeMinValue(rangeMaxValue - GAP);
      } else {
        setRangeMinPercent((rangeMinValue / duration) * 100);
        setRangeMaxPercent(100 - (rangeMaxValue / duration) * 100);
      }
    };
    twoRangeHandler();
  }, [rangeMinValue, rangeMaxValue]);

  return (
    <S.SlideWrapper>
      <S.FilterPriceSlide>
        <S.FilterPriceSlideInner
          $rangeMinPercent={rangeMinPercent}
          $rangeMaxPercent={rangeMaxPercent}
        />
      </S.FilterPriceSlide>
      <S.FilterPriceRangeWrap>
        <S.CurrentRange
          type="range"
          min={0}
          step="0.2"
          max={duration - GAP}
          value={currentTimeCode}
          onChange={currentTimeHandler}
        />
        <S.FilterPriceRangeMin
          type="range"
          min={0}
          max={duration - GAP}
          step="0.2"
          value={rangeMinValue}
          onChange={minValueHandler}
        />
        <S.FilterPriceRangeMax
          type="range"
          min={0 + GAP}
          max={duration}
          step="0.2"
          value={rangeMaxValue}
          onChange={maxValueHandler}
        />
      </S.FilterPriceRangeWrap>
    </S.SlideWrapper>
  );
};

export default Slider;
