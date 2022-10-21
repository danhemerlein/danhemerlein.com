import { Link } from 'react-router-dom';

import styled, { css } from 'styled-components';

import { anchorColor } from 'styles/utilities/mixins';
import { remHelper } from 'utils/remHelper';

export const ParagraphCSS = css`
  font-size: ${remHelper[16]};
  font-family: 'custom_serif';
  line-height: 1.3;
`;

export const ParagraphCSSPhantomGhost = css`
  font-size: ${remHelper[16]};
  font-family: 'phantom_ghost';
  line-height: 1.3;
`;

export const H1 = styled.h1`
  font-size: ${remHelper[32]};
  font-family: 'custom_serif';
  line-height: 1.3;

  ${({ textAlign }) => {
    return textAlign && `text-align: ${textAlign};`;
  }};
`;

export const H2 = styled.h2`
  font-size: ${remHelper[24]};
  font-family: 'custom_serif';
  line-height: 1.3;

  ${({ textAlign }) => {
    return textAlign && `text-align: ${textAlign};`;
  }};
`;

export const H3 = styled.h3`
  font-size: ${remHelper[16]};
  font-family: 'custom_serif';
  line-height: 1.3;

  ${({ textAlign }) => {
    return textAlign && `text-align: ${textAlign};`;
  }};

  ${({ bold }) => {
    return bold && 'font-weight: bold;';
  }};
`;

export const P = styled.p`
  ${ParagraphCSS}

  ${({ lowercase }) => {
    return lowercase && 'text-transform: lowercase;';
  }};

  ${({ bold }) => {
    return bold && 'font-weight: bold;';
  }};

  ${({ italic }) => {
    return italic && 'font-style: italic;';
  }};

  ${({ underline }) => {
    return underline && 'text-decoration: underline;';
  }};

  ${({ textAlign }) => {
    return textAlign && `text-align: ${textAlign};`;
  }};
`;

export const A = styled.a`
  font-size: ${remHelper[16]};
  font-family: 'custom_serif';
  line-height: 1.3;

  ${({ theme }) => {
    return anchorColor({
      color: theme.foreground,
      textDecoration: 'underline'
    });
  }}
`;

export const StyledLink = styled(Link)`
  font-size: ${remHelper[16]};
  font-family: 'custom_serif';
  line-height: 1.3;

  ${({ theme }) => {
    return anchorColor({
      color: theme.anchor
    });
  }}
`;
