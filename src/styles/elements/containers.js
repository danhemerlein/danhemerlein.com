import styled from 'styled-components';
import { anchorColor } from 'styles/utilities';
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
  }};ƒ

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
  grid-template-columns: repeat(2, 1fr);
  column-gap: ${remHelper[16]};
  row-gap: ${remHelper[16]};
  margin-bottom: ${remHelper[16]};

  ${above.desktop`
    grid-template-columns: repeat(4, 1fr);
  `}
`;

export const ContentfulRichTextWrapper = styled.div`
  margin-top: ${remHelper[16]};

  p {
    font-family: 'custom_serif';
    font-size: ${remHelper[16]};
    line-height: 1.25;
    margin: 0 auto;
    text-align: justify;
  }

  ul {
    margin-top: ${remHelper[16]};
  }

  ul > li {
    margin-bottom: ${remHelper[16]};
  }

  a {
    ${({ theme }) => {
      return anchorColor({
        color: theme.foreground,
        textDecoration: 'underline'
      });
    }}
  }

  ${above.tablet`
    p {
      width: 75%;
    }
  `}
`;
