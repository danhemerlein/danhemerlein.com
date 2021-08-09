import styled from "styled-components";
import { remHelper } from "utils";
import theme from "../theme";

export const H1 = styled.h1`
  font-size: ${remHelper[32]};
  font-family: "custom_serif";

  color: ${theme.light.foreground};
  ${({ textAlign }) => textAlign && `text-align: ${textAlign}`};
  ${({ black }) => black && `color: ${theme.light.foreground};`};
  ${({ yanRed }) => yanRed && `color: ${theme.light.yan.foreground};`};
`;

export const H2 = styled.h2`
  font-size: ${remHelper[24]};
  font-family: "custom_serif";

  color: ${theme.light.foreground};

  ${({ textAlign }) => textAlign && `text-align: ${textAlign}`};
  ${({ black }) => black && `color: ${theme.light.foreground};`};
  ${({ yanRed }) => yanRed && `color: ${theme.light.yan.foreground};`};
`;

export const P = styled.p`
  font-size: ${remHelper[16]};
  font-family: "custom_serif";
  color: ${theme.light.foreground};

  ${({ lowercase }) => lowercase && `text-transform: lowercase`};
  ${({ textAlign }) => textAlign && `text-align: ${textAlign}`};
  ${({ white }) => white && `color: ${theme.light.background};`};
  ${({ yanRed }) => yanRed && `color: ${theme.light.yan.foreground};`};
`;
