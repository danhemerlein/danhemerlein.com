import styled from 'styled-components';
import { above } from 'styles/utilities';

export const H1 = styled.h1`
  text-align: center;
`;

export const Title = styled.p`
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
  margin-top: 1rem;
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
  margin-top: 1rem;
  border: 1px solid black;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: scroll;
  padding: 1rem;

  width: 100%;

  ${above.desktop`
    width: 50%;
  `}
`;
