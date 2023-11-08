import styled from 'styled-components';

export const ShortFormPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #0f0f0f;
  overflow: auto;
  scroll-snap-type: y mandatory;

  video {
    background-color: black;
  }
`;

export const ShotFormContainer = styled.div`
  width: 100%;
  height: 100%;
  scroll-snap-align: start;
  padding: 5rem;
`;
