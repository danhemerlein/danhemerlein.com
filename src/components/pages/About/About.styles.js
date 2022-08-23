import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { above } from 'styles/utilities/breakpoints';
import { remHelper } from 'utils/remHelper';

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;

  ${above.tablet`
    height: 75%;
  `}

  ${above.desktop`
    flex-direction: row;
  `}
`;

export const ImageContainer = styled(FlexContainer)`
  width: 100%;
  justify-content: center;
  max-width: 352px;
  margin: 0 auto;

  ${above.tablet`
    width: 100%;
  `}

  ${above.desktop`
    max-width: unset;
    justify-content: flex-end;
    width: 50%;
    padding-right: ${remHelper[8]};
  `};
`;

export const TextContainer = styled(FlexContainer)`
  width: 100%;
  margin-top: ${remHelper[16]};

  ${above.tablet`
    width: 75%;
    margin-left: auto;
    margin-right: auto;
  `}

  ${above.desktop`
    margin-top: 0;
    width: 50%;
  `}
`;

export const TextContainerInner = styled.div`
  position: relative;

  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  ${above.desktop`
    max-width: 75%;
    padding-left: ${remHelper[8]};
  `}
`;

export const StyledP = styled(P)`
  line-height: 1.24;
  position: relative;

  margin: ${remHelper[8]};
  margin-left: ${remHelper[16]};
  margin-right: 0;
`;

export const StyledButton = styled.button`
  cursor: pointer;
  font-family: 'custom_serif';
  padding: ${remHelper[4]};
  background: transparent;
  border: 1px solid;

  border-color: ${({ theme }) => {
    return theme.border;
  }};

  color: ${({ theme }) => {
    return theme.foreground;
  }};

  border-radius: 100%;
  width: 2.4rem;
  height: 2.4rem;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;
