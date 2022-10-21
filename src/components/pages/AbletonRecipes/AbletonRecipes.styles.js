import styled from 'styled-components';
import { FlexContainer } from 'styles/elements';
import { above } from 'styles/utilities';
import { remHelper } from 'utils/remHelper';

export const Container = styled.div`
  * {
    font-family: 'phantom_ghost';
  }
`;

export const LoadMoreButtonContainer = styled(FlexContainer)`
  margin: ${remHelper[16]} 0;
`;
export const Grid = styled.div`
  margin: ${remHelper[16]} auto 0 auto;
  display: grid;
  row-gap: ${remHelper[16]};
  column-gap: ${remHelper[16]};

  max-width: ${({ gridLayout }) => {
    if (gridLayout === '1x') {
      return '640px';
    }
  }};

  grid-template-columns: ${({ gridLayout }) => {
    if (gridLayout === '4x') {
      return 'repeat(2, 1fr)';
    }

    if (gridLayout === '2x') {
      return 'repeat(2, 1fr)';
    }
    if (gridLayout === '1x') {
      return 'repeat(1, 1fr)';
    }
  }};

  ${above.desktop`
    grid-template-columns: ${({ gridLayout }) => {
      if (gridLayout === '4x') {
        return 'repeat(4, 1fr)';
      }

      if (gridLayout === '2x') {
        return 'repeat(2, 1fr)';
      }
      if (gridLayout === '1x') {
        return 'repeat(1, 1fr)';
      }
    }};
  `}
`;

export const ShowContainer = styled(FlexContainer)`
  margin-top: ${remHelper[16]};
  column-gap: ${remHelper[16]};
  display: flex;
  flex-direction: column;
  row-gap: ${remHelper[8]};

  input {
    margin: 0 4px;
  }

  label {
    cursor: pointer;
  }

  ${above.desktop`
    flex-direction: row;
  `}
`;

export const RadioContainer = styled(FlexContainer)`
  &:first-of-type {
    display: none;

    ${above.desktop`
      display: flex;;
    `}
  }
`;
