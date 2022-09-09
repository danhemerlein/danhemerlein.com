import styled from 'styled-components';
import { A } from 'styles/elements';
import { globalTransition } from 'styles/utilities';
import { remHelper } from 'utils/remHelper';

export const StyledA = styled(A)`
  padding: ${remHelper[16]};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  border: 5px solid;

  color: ${({ theme }) => {
    return theme.foreground;
  }};

  border-color: ${({ borderColor }) => {
    return borderColor;
  }};

  background: ${({ theme }) => {
    return theme.background;
  }};

  transition: background ${globalTransition}, color ${globalTransition};

  text-decoration: unset;

  &:hover,
  &:focus {
    text-decoration: unset;

    background: ${({ theme }) => {
      return theme.foreground;
    }};
    color: ${({ theme }) => {
      return theme.background;
    }};
  }

  margin-bottom: ${remHelper[16]};
`;
