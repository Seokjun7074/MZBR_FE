import * as S from '@/components/Layout/Layout.style';
import Header from '@/components/common/Header/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <S.LayoutWrapper>
      <Header />
      <S.OutletWrapper>{children}</S.OutletWrapper>
    </S.LayoutWrapper>
  );
};

export default Layout;
