import * as S from '@/pages/ShortFormPage/ShortFormPage.style';

import ShotFormContainer from '@/components/ShortForm/ShotFormContainer/ShotFormContainer';

const ShortFormPage = () => {
  return (
    <S.ShortFormPageWrapper>
      <ShotFormContainer />
      <ShotFormContainer />
      <ShotFormContainer />
    </S.ShortFormPageWrapper>
  );
};

export default ShortFormPage;
