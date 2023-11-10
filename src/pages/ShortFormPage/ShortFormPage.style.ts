import styled from 'styled-components';

export const ShortFormPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #0f0f0f;
  overflow: auto;
  scroll-snap-type: y mandatory;
  &::-webkit-scrollbar {
    display: none;
  }
  video {
    background-color: black;
  }
`;
