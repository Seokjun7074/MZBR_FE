import { useState } from 'react';

import HashTag from '@/components/common/HashTag/HashTag';
import * as S from '@/components/common/HashTagInput/HashTagInput.style';

const HashTagInput = () => {
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);

  const onKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    setTagList([...new Set([...tagList, tag])]);
    setTag('');
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
  };

  return (
    <S.HashTagInputWrapper>
      <S.TagContainer>
        {tagList.map((item, idx) => (
          <HashTag key={idx + item} text={item} />
        ))}
      </S.TagContainer>
      <S.TagInput
        type="text"
        placeholder="태그를 입력해주세요."
        value={tag}
        onChange={handleInput}
        onKeyDown={onKeydown}
      />
    </S.HashTagInputWrapper>
  );
};

export default HashTagInput;
