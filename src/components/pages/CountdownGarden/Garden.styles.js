import styled from 'styled-components';
import { FlexContainer, H1, P } from 'styles/elements';
import { above } from 'styles/utilities';
import { remHelper } from 'utils/remHelper';

export const Container = styled(FlexContainer)`
  gap: ${remHelper[16]};
  flex-direction: column;

  ${above.desktop`
    flex-direction: row;
  `}
`;

export const Headline = styled(H1)`
  margin-bottom: ${remHelper[16]};
`;

export const Paragraph = styled(P)`
  margin-bottom: ${remHelper[16]};
`;

export const LocalCountdown = styled(FlexContainer)`
  margin-top: ${remHelper[16]};
  width: 100%;
`;

export const SavedCountdowns = styled(FlexContainer)`
  padding: ${remHelper[16]};

  border: 1px solid;

  border-color: ${({ theme }) => {
    return theme.foreground;
  }};

  overflow-y: scroll;
`;
