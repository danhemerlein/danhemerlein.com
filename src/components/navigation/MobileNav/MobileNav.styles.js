import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { remHelper } from 'utils/remHelper';

export const ListItem = styled(P)`
  margin-bottom: ${remHelper[16]};
  color: ${({ theme }) => {
    return theme.foreground;
  }};
`;

export const StyledHR = styled.hr`
  width: 50%;
  border: 1px solid;
  border-color: ${({ theme }) => {
    return theme.border;
  }};

  margin-bottom: ${remHelper[16]};
`;

export const RadioContainer = styled(FlexContainer)`
  margin-top: ${remHelper[8]};
`;

export const InputContainer = styled.div`
  margin-top: ${remHelper[16]};
  height: 100%;
  display: inline-flex;
`;
