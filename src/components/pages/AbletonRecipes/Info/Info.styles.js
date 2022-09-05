import styled from 'styled-components';
import { P } from 'styles/elements';
import { remHelper } from 'utils/remHelper';

export const DatePosted = styled(P)`
  text-align: right;
`;

export const OriginalPoster = styled(P)`
  margin-right: ${remHelper[8]};
`;
