import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FlexContainer, P } from "styles/elements";
import theme from "styles/theme";
import { above, anchorColor } from "styles/utilities";
import { remHelper } from "utils";

const Details = styled(FlexContainer)`
  margin-top: ${remHelper[16]};

  a {
    text-decoration: underline;
  }

  ${above.tablet`
    display: none;
  `}
`;

const StyledLink = styled(Link)`
  ${anchorColor({
    color: theme.light.foreground,
  })};
`;

export default function MobileDetails({ handle, title, artist }) {
  return (
    <Details items="center" justify="space-between">
      <div>
        <P>
          <StyledLink to={`/music/${handle}`}>{title}</StyledLink>
        </P>
        <P>
          <StyledLink to={`/music/${handle}`}>by {artist}</StyledLink>
        </P>
      </div>
    </Details>
  );
}
