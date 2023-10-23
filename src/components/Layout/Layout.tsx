import * as S from '@/components/Layout/Layout.style';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <S.LayoutWrapper>
      <S.OutletWrapper>{children}</S.OutletWrapper>
    </S.LayoutWrapper>
  );
};

export default Layout;
