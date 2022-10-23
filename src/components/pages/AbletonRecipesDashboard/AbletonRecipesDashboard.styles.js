import styled from 'styled-components';
import { remHelper } from 'utils/remHelper';

export const Container = styled.div`
  margin-top: 71px;

  * {
    font-family: 'phantom_ghost';
  }
`;

export const Grid = styled.div`
  max-width: 640px;
  margin: ${remHelper[16]} auto 0 auto;
  display: grid;
  row-gap: ${remHelper[16]};
`;
