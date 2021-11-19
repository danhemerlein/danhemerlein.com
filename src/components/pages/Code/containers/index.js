import styled from 'styled-components';
import { FlexContainer } from 'styles/elements';
import { above } from 'styles/utilities';
import { remHelper } from 'utils';

export const ListLinkContainer = styled(FlexContainer)`
  width: 100%;
  margin-top: ${remHelper[16]};

  ${above.tablet`
    padding-top: ${remHelper[16]};
    border: 1px solid;
    border-color: ${({ theme }) => theme.border};
  `}
`;
