import { styled } from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

export const Image = styled.img`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;
