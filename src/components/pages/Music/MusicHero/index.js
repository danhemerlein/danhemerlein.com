import React from "react";
import styled from "styled-components";
import { FlexContainer } from "styles/elements";
import theme from "styles/theme";
import {
  anchorColor,
  fullBleed,
  SlideWideLeft,
  SlideWideRight,
} from "styles/utilities";
import { remHelper } from "utils";

const Hero = styled(FlexContainer)`
  height: 25vh;
  margin-top: ${remHelper[16]};
  font-family: "lack_regular";
  background: ${({ theme }) => theme.light.foreground};
  ${fullBleed({ space: 1.6, right: true, left: true })};
`;

const StyledLink = styled.a`
  text-align: center;

  ${anchorColor({
    color: theme.light.yan.foreground,
  })};
`;

const HeadlineTwo = styled.h2`
  font-size: 2rem;
  animation: ${SlideWideRight} 2.5s;
`;

const HeadlineThree = styled.h3`
  font-size: 1.25rem;
  animation: ${SlideWideLeft} 2.5s;
`;

const MusicHero = () => {
  return (
    <Hero direction="column" justify="center" items="center">
      <StyledLink
        href="http://www.youngandnauseo.us"
        target="_blank"
        rel="noopener noreferrer"
      >
        <HeadlineTwo yanRed>young and nauseous</HeadlineTwo>
        <HeadlineThree yanRed>out now</HeadlineThree>
      </StyledLink>
    </Hero>
  );
};

export default MusicHero;
