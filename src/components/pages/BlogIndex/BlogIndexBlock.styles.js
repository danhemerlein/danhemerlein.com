import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { above } from 'styles/utilities/breakpoints';
import { remHelper } from 'utils/remHelper';

export const Block = styled(FlexContainer)`
  height: 340px;
  padding: ${remHelper[16]};
  position: relative;

  ${above.tablet`
    height: 320px;
  `}
`;

export const TextContainer = styled(FlexContainer)`
  z-index: 4;
  padding: ${remHelper[16]};
  color: ${({ theme }) => {
    return theme.foreground;
  }};
  background: ${({ theme }) => {
    return theme.background;
  }};
`;

export const StyledImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Paragraph = styled(P)`
  margin-bottom: ${remHelper[16]};
`;
