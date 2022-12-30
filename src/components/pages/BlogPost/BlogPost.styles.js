import styled from 'styled-components';
import { H1, H3, P } from 'styles/elements';
import { remHelper } from 'utils/remHelper';

export const Post = styled.article`
  padding: ${remHelper[16]} 0;
  max-width: 640px;
  margin: 0 auto;

  ul {
    list-style-type: square;
    margin-left: ${remHelper[24]};

    li::marker {
      font-size: ${remHelper[16]};
    }
  }

  img {
    width: 100%;
  }

  ${({ height }) => {
    return height && `height: ${height};`;
  }}
`;

export const Headline = styled(H1)`
  margin-bottom: ${remHelper[16]};
  font-weight: bold;
`;

export const SubHeadline = styled(H3)`
  margin-bottom: ${remHelper[16]};
  font-weight: bold;
`;

export const Published = styled(P)`
  margin-bottom: ${remHelper[16]};
  text-transform: lowercase;

  span {
    margin: 2px 0;
    display: inline-block;
  }
`;
