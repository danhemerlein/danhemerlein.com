import styled from 'styled-components';
import { H3, P } from 'styles/elements';
import { remHelper } from 'utils/remHelper';

export const HeadlineThree = styled(H3)`
  margin-bottom: ${remHelper[16]};
  font-weight: bold;
`;

export const Paragraph = styled(P)`
  margin-top: ${remHelper[24]};

  ${({ isFigCaption, theme }) => {
    return isFigCaption
      ? `text-align: center;
        margin-top: ${remHelper[4]};
        margin-bottom: ${remHelper[36]};
        color: ${theme.figCaption};
        `
      : ``;
  }};
`;

export const B = styled.b`
  font-weight: bold;
`;

export const EM = styled.em`
  font-style: italic;
`;

export const ImageContainer = styled.div`
  margin-top: ${remHelper[24]};
`;
