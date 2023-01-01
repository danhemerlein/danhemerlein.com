import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';

import { above } from 'styles/utilities/breakpoints';
import yanThemeArray from 'styles/yanArray';
import { remHelper } from 'utils/remHelper';
import { getRandomItem } from '../AbletonRecipesAdmin/helperFuntions';

export const Block = styled(FlexContainer)`
  height: 340px;
  padding: ${remHelper[16]};
  position: relative;

  ${({ titleLength }) => {
    return `background: radial-gradient(
        circle at top left,
        ${getRandomItem(yanThemeArray, titleLength)},
        transparent 100%
      ),
      radial-gradient(
        circle at top right,
        ${getRandomItem(yanThemeArray, titleLength * 2)},
        transparent 50%
      ),
      radial-gradient(
        at bottom left,
        ${getRandomItem(yanThemeArray, titleLength * 3)},
        transparent 50%
      ),
      radial-gradient(
        at bottom right,
        ${getRandomItem(yanThemeArray, titleLength * 4)},
        transparent 100%
      );`;
  }};

  ${above.tablet`
    height: 320px;
  `}
`;

export const TextContainer = styled(FlexContainer)`
  z-index: 4;
  color: ${({ theme }) => {
    return theme.foreground;
  }};
`;

export const Paragraph = styled(P)`
  margin-bottom: ${remHelper[16]};
  padding: ${remHelper[4]};
  background: ${({ theme }) => {
    return theme.background;
  }};
`;
