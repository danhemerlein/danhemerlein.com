import styled from 'styled-components';
import { above } from 'styles/utilities/breakpoints';
import { remHelper } from 'utils/remHelper';

export const FlexContainer = styled.div`
  display: flex;

  ${({ justify }) => {
    return justify && `justify-content: ${justify}`;
  }};

  ${({ items }) => {
    return items && `align-items: ${items}`;
  }};

  ${({ direction }) => {
    return direction && `flex-direction: ${direction}`;
  }};

  ${({ wrap }) => {
    return wrap && `flex-wrap: ${wrap}`;
  }};

  ${({ height }) => {
    return height && `height: ${height}`;
  }};

  ${({ width }) => {
    return width && `width: ${width}`;
  }};
`;

export const Grid = styled.div`
  display: grid;
  width: 100%;

  ${({ mobileColumns }) => {
    return mobileColumns
      ? `grid-template-columns: repeat(${mobileColumns}, 1fr);`
      : `grid-template-columns: repeat(2, 1fr);`;
  }};

  column-gap: ${remHelper[16]};
  row-gap: ${remHelper[16]};
  margin-bottom: ${remHelper[16]};

  ${above.desktop`

  ${({ desktopColumns }) => {
    return desktopColumns
      ? `grid-template-columns: repeat(${desktopColumns}, 1fr);`
      : ` grid-template-columns: repeat(4, 1fr);`;
  }};


  `}
`;
