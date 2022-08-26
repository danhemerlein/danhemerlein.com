import styled from 'styled-components';
import { P } from 'styles/elements';
import { remHelper } from 'utils/remHelper';

export const Container = styled.div`
  margin-bottom: ${remHelper[16]};
`;

export const Paragraph = styled(P)`
  margin: ${remHelper[8]} 0;
`;

export const Button = styled.button`
  background: transparent;
  border: 1px solid black;
  border-radius: 0;
  color: black;
  padding: ${remHelper[8]};
`;
