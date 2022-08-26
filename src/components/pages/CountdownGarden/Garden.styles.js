import styled from 'styled-components';
import { H1, P } from 'styles/elements';
import { above } from 'styles/utilities';
import { remHelper } from 'utils/remHelper';

export const Headline = styled(H1)`
  text-align: center;
  margin-bottom: ${remHelper[16]};
`;

export const Paragraph = styled(P)`
  margin-top: 0;
`;

export const CountdownContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  overflow: hidden;
  flex-wrap: wrap;

  ${above.desktop`
    flex-wrap: nowrap;
  `}
`;

export const LocalCountdown = styled.div`
  margin-top: ${remHelper[16]};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${above.desktop`
    width: 50%;
  `}
`;

export const SavedCountdowns = styled.div`
  margin-top: ${remHelper[16]};
  border: 1px solid black;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: scroll;
  padding: ${remHelper[16]};

  width: 100%;

  ${above.desktop`
    width: 50%;
  `}
`;
