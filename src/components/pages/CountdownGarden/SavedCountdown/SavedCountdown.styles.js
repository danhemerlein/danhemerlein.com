import Button from 'components/base/Button';
import styled from 'styled-components';
import { P } from 'styles/elements';
import { remHelper } from 'utils/remHelper';

export const Container = styled.div`
  ${({ index }) => {
    return index > 0 && `margin-top: ${remHelper[16]};`;
  }};
`;

export const Paragraph = styled(P)`
  margin: ${remHelper[8]} 0;
`;

export const StyledButton = styled(Button)`
  display: block;
  margin: ${remHelper[16]} auto 0 auto;
`;
