import styled from 'styled-components';
import { P, StyledCloseButton } from 'styles/elements';
import { above, globalTransition } from 'styles/utilities';

import { remHelper } from 'utils/remHelper';

export const StyledToolTip = styled.div`
  opacity: 0;
  z-index: 5;
  visibility: hidden;
  position: absolute;
  top: -100%;
  right: 0;
  width: 75%;
  height: 100%;
  background-color: ${({ theme }) => {
    return theme.background;
  }};
  color: ${({ theme }) => {
    return theme.foreground;
  }};
  border-color: ${({ theme }) => {
    return theme.border;
  }};
  border: 1px solid;

  padding: ${remHelper[16]};

  transition: opacity ${globalTransition};

  overflow-y: scroll;

  ${({ toolTipOpen }) => {
    return (
      toolTipOpen &&
      `
        opacity: 1;
        visibility: visible;
      `
    );
  }};

  ${above.tablet`
    top: 0;
  `}
`;

export const CloseButton = styled(StyledCloseButton)`
  margin-left: auto;
`;

export const DT = styled(P)`
  font-weight: bold;
  line-height: 1.24;
  text-decoration: underline;
  display: inline;
`;

export const DD = styled(P)`
  margin: ${remHelper[8]};
  line-height: 1.24;
`;
