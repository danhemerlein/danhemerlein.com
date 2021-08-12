import { Link } from "react-router-dom";
import styled from "styled-components";
import { above } from "styles/utilities";
import { remHelper } from "utils";

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  height: 200px;
  border-color: ${({ theme }) => theme.foreground};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  padding: ${remHelper[16]};
  transition: background 0.25s ease-in-out, color 0.25s ease-in-out;

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.foreground};
    color: ${({ theme }) => theme.background};

    h2 {
      color: ${({ theme }) => theme.background};
    }
  }

  ${above.desktop`
    width: 50%;
    height: 50%;
  `}
`;

export const TopLeft = styled(StyledLink)`
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;

  ${above.desktop`
    border: 1px solid;
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
  align-items: flex-end;

  ${above.desktop`
    border-bottom: 1px solid;
    border-left: 1px solid;
    display: flex;
    align-items: flex-end;
  `}
`;

export const BottomRight = styled(StyledLink)`
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
  display: flex;
  align-items: flex-end;
  text-align: right;

  h2 {
    width: 100%;
  }

  ${above.desktop`
    border: 1px solid;
    border-left: 0;
    text-align: right;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  `}
`;
