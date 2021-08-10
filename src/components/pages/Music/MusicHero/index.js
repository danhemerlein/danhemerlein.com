import { useThemeContext } from "context/ThemeContext";
import styled from "styled-components";
import { FlexContainer } from "styles/elements";
import { fullBleed, SlideWideLeft, SlideWideRight } from "styles/utilities";
import { remHelper } from "utils";

const Hero = styled(FlexContainer)`
  height: 25vh;
  margin-top: ${remHelper[16]};
  font-family: "lack_regular";
  background: ${({ theme, $mode }) => theme[$mode].background};
  color: ${({ theme, $mode }) => theme[$mode].foreground};
  ${fullBleed({ space: 1.6, right: true, left: true })};
`;

const StyledLink = styled.a`
  text-align: center;

  ${"" /* ${anchorColor({
    color: theme.light.yan.foreground,
  })}; */}
`;

const HeadlineTwo = styled.h2`
  font-size: 2rem;
  animation: ${SlideWideRight} 2.5s;
  color: ${({ theme, $mode }) => theme[$mode].yan.foreground};
`;

const HeadlineThree = styled.h3`
  font-size: 1.25rem;
  animation: ${SlideWideLeft} 2.5s;
  color: ${({ theme, $mode }) => theme[$mode].yan.foreground};
`;

const MusicHero = () => {
  const mode = useThemeContext();

  return (
    <Hero direction="column" justify="center" items="center" $mode={mode}>
      <StyledLink
        href="http://www.youngandnauseo.us"
        target="_blank"
        rel="noopener noreferrer"
      >
        <HeadlineTwo $mode={mode}>young and nauseous</HeadlineTwo>
        <HeadlineThree $mode={mode}>out now</HeadlineThree>
      </StyledLink>
    </Hero>
  );
};

export default MusicHero;
