import styled from 'styled-components';
import { P } from 'styles/elements';
import { remHelper } from 'utils/remHelper';

export const Container = styled.div`
  * {
    font-family: 'arial' !important;
  }
`;

export const Grid = styled.div`
  ${'' /* max-width: 640px; */}
  margin: ${remHelper[16]} auto 0 auto;
  display: grid;
  column-gap: ${remHelper[16]};
  row-gap: ${remHelper[16]};
  grid-template-columns: repeat(4, 1fr);
`;

export const ShowContainer = styled(P)`
  margin-top: ${remHelper[16]};
  label {
    cursor: pointer;
  }
`;
