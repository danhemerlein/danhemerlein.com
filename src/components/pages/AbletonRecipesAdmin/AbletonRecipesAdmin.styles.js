import styled from 'styled-components';
import { P } from 'styles/elements';
import { remHelper } from 'utils/remHelper';

export const Paragraph = styled(P)`
  margin-bottom: ${remHelper[8]};
`;
