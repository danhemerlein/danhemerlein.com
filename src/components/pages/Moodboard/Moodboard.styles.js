import styled from 'styled-components';
import { FlexContainer } from 'styles/elements';
import { above } from 'styles/utilities/breakpoints';
import { remHelper } from 'utils/remHelper';

export const PageContainer = styled(FlexContainer)`
  margin: ${remHelper[16]} 0;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: ${remHelper[16]};
`;

export const GoHomeContainer = styled(FlexContainer)`
  width: 100%;
`;

export const MoodboardContent = styled.div`
  width: 100%;
  display: grid;
  column-gap: ${remHelper[16]};
  row-gap: ${remHelper[16]};
  grid-template-columns: repeat(1, 1fr);

  ${above.tablet`
    grid-template-columns: repeat(2, 1fr);
  `}
`;

export const MoodboardContentInner = styled.div`
  display: flex;
  align-items: flex-end;

  img {
    width: 100%;
  }
`;
