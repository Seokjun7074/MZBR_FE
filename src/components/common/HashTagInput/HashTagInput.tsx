import HashTag from '@/components/common/HashTag/HashTag';
import * as S from '@/components/common/HashTagInput/HashTagInput.style';

import { useHasgTag } from '@/hooks/useHashTag';

const HashTagInput = () => {
  const { tag, tagList, onChange, onKeydown } = useHasgTag();

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
        onChange={onChange}
        onKeyDown={onKeydown}
      />
    </S.HashTagInputWrapper>
  );
};

export default HashTagInput;
