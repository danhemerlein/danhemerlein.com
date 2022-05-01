import styled from 'styled-components';
import { FlexContainer } from 'styles/elements';
import { above } from 'styles/utilities/breakpoints';
import { remHelper } from 'utils/remHelper';

export const PageContainer = styled(FlexContainer)`
  padding: ${remHelper[16]} 0;
`;

export const StyledImg = styled.img`
  width: 100%;
`;

export const GoHomeContainer = styled(FlexContainer)`
  width: 100%;
`;

export const MoodboardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${remHelper[16]};

  ${above.tablet`
    flex-direction: row
  `}
`;

export const MoodboardContentInner = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;

  &:first-of-type > img {
    margin-bottom: ${remHelper[16]};
  }

  ${above.tablet`
    ${({ first }) => {
      return first && `margin-right: ${remHelper[8]};`;
    }}
    ${({ second }) => {
      return second && `margin-left: ${remHelper[8]};`;
    }}
    &:first-of-type > img {
      margin-bottom: 0;
    }

    width: 50%;
  `}
`;
