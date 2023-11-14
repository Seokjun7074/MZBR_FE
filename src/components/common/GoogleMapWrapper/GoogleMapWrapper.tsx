import { Status, Wrapper } from '@googlemaps/react-wrapper';

import { Flex } from '@/components/common/Flex/Flex';
import Spinner from '@/components/common/Spinner/Spinner';

const render = (status: Status) => {
  if (status === Status.FAILURE) throw new Error('오류가 발생했습니다.');
  return <Spinner />;
};

const GoogleMapWrapper = ({ children }: { children: React.ReactNode }) => {
  if (!process.env.GOOGLE_MAP_API_KEY) throw new Error('유효한 구글 API 키가 필요합니다.');

  return (
    <Wrapper
      apiKey={process.env.GOOGLE_MAP_API_KEY}
      render={render}
      libraries={['marker']}
      language="KO"
    >
      {children}
    </Wrapper>
  );
};

export default GoogleMapWrapper;
