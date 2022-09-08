import styled from 'styled-components';
import { remHelper } from 'utils/remHelper';

export const StyledCloseButton = styled.button`
  cursor: pointer;
  padding: 0;
  border: 0;
  background: transparent;
  width: ${remHelper[24]};
  height: ${remHelper[24]};
  display: block;
`;
