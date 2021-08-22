import { css } from 'styled-components';

export const fullBleed = ({
  top = false,
  right = false,
  bottom = false,
  left = false,
  space,
} = {}) => css`
  ${top && `margin-top: -${space}rem`};
  ${right && `margin-right: -${space}rem`};
  ${bottom && `margin-bottom: -${space}rem`};
  ${left && `margin-left: -${space}rem`};
`;

export const anchorColor = ({
  color = '#FFF',
  textDecoration = 'none',
} = {}) => css`
  ${'' /* text-decoration: none; */}
  ${textDecoration && `text-decoration: ${textDecoration}`};
  text-decoration-color: ${color};
  color: ${color};

  &:visited {
    ${'' /* text-decoration: none; */}
    ${textDecoration && `text-decoration: ${textDecoration}`};
    color: ${color};
  }

  &:active {
    ${'' /* text-decoration: none; */}
    ${textDecoration && `text-decoration: ${textDecoration}`};
    color: ${color};
  }

  &:hover {
    text-decoration: underline;
    color: ${color};
  }
`;
