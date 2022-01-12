import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { above, globalTransition } from 'styles/utilities';
import { remHelper } from 'utils';

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  height: 200px;
  border-color: ${({ theme }) => theme.foreground};
  background: ${({ theme }) => theme.background};
  text-decoration: none;
  color: ${({ theme }) => theme.foreground};
  padding: ${remHelper[16]};
  transition: background ${globalTransition}, color ${globalTransition};

  h2 {
    text-decoration: underline;
  }

  h3 {
    text-decoration: none;
    margin-top: ${remHelper[8]};

    ${above.desktop`
      opacity: 0;
      transition: opacity ${globalTransition};
  `}
  }

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.foreground};
    color: ${({ theme }) => theme.background};

    h3 {
      ${above.desktop`
        opacity: 1;
      `}
    }
  }

  ${above.desktop`
    width: 50%;
    height: 50%;
  `}
`;

export const TopLeft = styled(StyledLink)`
  border: 1px solid;
  margin-top: ${remHelper[16]};

  ${above.desktop`
    margin-top: 0;
  `}
`;

export const TopRight = styled(StyledLink)`
  border-right: 1px solid;
  border-left: 1px solid;
  text-align: right;

  ${above.desktop`
    border-top: 1px solid;
    border-right: 1px solid;
    border-left: 0;
    text-align: right;
  `}
`;

export const BottomLeft = styled(StyledLink)`
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${above.desktop`
    justify-content: flex-end;
    border-bottom: 1px solid;
    border-left: 1px solid;
  `}
`;

export const BottomRight = styled(StyledLink)`
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
  display: flex;
  align-items: flex-end;
  text-align: right;
  flex-direction: column;

  h2 {
    width: 100%;
  }

  ${above.desktop`
    border: 1px solid;
    border-left: 0;
    text-align: right;
    justify-content: flex-end;
  `}
`;
