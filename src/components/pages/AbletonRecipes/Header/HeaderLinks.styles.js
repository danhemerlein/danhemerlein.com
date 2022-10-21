import Button from 'components/base/Button.js';
import styled from 'styled-components';

import { above } from 'styles/utilities';
import { remHelper } from 'utils/remHelper';

export const HeaderButton = styled(Button)`
  ${above.desktop`
    margin-right: ${remHelper[8]};
  `}

  background: ${({ theme }) => {
    return theme.background;
  }};
`;
