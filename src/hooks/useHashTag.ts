import { useState } from 'react';

export const useHasgTag = () => {
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);

  const onKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    setTagList([...new Set([...tagList, tag])]);
    setTag('');
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
  };

  return {
    tag,
    tagList,
    onKeydown,
    onChange,
  };
};
