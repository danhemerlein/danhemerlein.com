import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { anchorColor } from 'styles/utilities/mixins';
import { remHelper } from 'utils/remHelper';

export const H1 = styled.h1`
  font-size: ${remHelper[32]};
  font-family: 'custom_serif';
  ${({ textAlign }) => textAlign && `text-align: ${textAlign}`};
`;

export const H2 = styled.h2`
  font-size: ${remHelper[24]};
  font-family: 'custom_serif';

  ${({ textAlign }) => textAlign && `text-align: ${textAlign}`};
`;

export const P = styled.p`
  font-size: ${remHelper[16]};
  font-family: 'custom_serif';

  ${({ lowercase }) => lowercase && `text-transform: lowercase`};
  ${({ textAlign }) => textAlign && `text-align: ${textAlign}`};
`;

export const A = styled.a`
  font-size: ${remHelper[16]};
  font-family: 'custom_serif';

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
  ${({ theme }) => {
    return anchorColor({
      color: theme.anchor
    });
  }}
`;
