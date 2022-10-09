import styled from 'styled-components';
import { remHelper } from 'utils/remHelper';

export const Container = styled.div`
  * {
    font-family: 'arial' !important;
  }
`;

export const Grid = styled.div`
  max-width: 640px;
  margin: ${remHelper[16]} auto 0 auto;
`;
