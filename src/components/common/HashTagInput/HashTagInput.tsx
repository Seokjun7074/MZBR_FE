import HashTag from '@/components/common/HashTag/HashTag';
import * as S from '@/components/common/HashTagInput/HashTagInput.style';

interface HashTagProps {
  tag: string;
  tagList: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeydown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  deleteHashTag: (text: string) => void;
}

const HashTagInput = ({ tag, tagList, onChange, onKeydown, deleteHashTag }: HashTagProps) => {
  return (
    <S.HashTagInputWrapper>
      <S.TagInput
        type="text"
        placeholder="태그를 입력해주세요."
        value={tag}
        onChange={onChange}
        onKeyDown={onKeydown}
      />
      <S.TagContainer>
        {tagList.map((item, idx) => (
          <HashTag key={idx + item} text={item} deleteHashTag={() => deleteHashTag(item)} />
        ))}
      </S.TagContainer>
    </S.HashTagInputWrapper>
  );
};

export default HashTagInput;
