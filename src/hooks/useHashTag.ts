import { useState } from 'react';

import { useRecoilState } from 'recoil';

import { hashtagState } from '@/store/hashtag';

export const useHasgTag = () => {
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useRecoilState<string[]>(hashtagState);

  const onKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    setTagList([...new Set([...tagList, tag])]);
    setTag('');
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
  };

  const deleteHashTag = (text: string) => {
    const deletedList = tagList.filter((item) => item !== text);
    setTagList(deletedList);
  };

  return {
    tag,
    tagList,
    onKeydown,
    onChange,
    deleteHashTag,
  };
};
