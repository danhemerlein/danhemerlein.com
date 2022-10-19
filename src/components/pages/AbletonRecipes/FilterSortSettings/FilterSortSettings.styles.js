import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { above } from 'styles/utilities/breakpoints';
import { remHelper } from 'utils/remHelper';

export const Paragraph = styled(P)`
  margin-bottom: ${remHelper[8]};
`;

export const SubmitContainer = styled(FlexContainer)`
  label {
    cursor: pointer;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-gap: ${remHelper[16]};
  grid-template-columns: repeat(2, 1fr);
  margin-top: ${remHelper[16]};

  ${above.desktop`
    grid-template-columns: repeat(4, 1fr);
  `}
`;
