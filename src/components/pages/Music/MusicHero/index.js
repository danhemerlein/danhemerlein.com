import styled from 'styled-components';
import { FlexContainer } from 'styles/elements/containers';
import { SlideWideLeft, SlideWideRight } from 'styles/utilities/keyframes';
import { anchorColor, fullBleed } from 'styles/utilities/mixins';
import { remHelper } from 'utils/remHelper';

const Hero = styled(FlexContainer)`
  height: 25vh;
  margin-top: ${remHelper[16]};
  font-family: 'lack_regular';
  ${fullBleed({ space: 1.6, right: true, left: true })};
  background-color: ${({ theme }) => theme.yan.background};
`;

const StyledLink = styled.a`
  text-align: center;

  ${({ theme }) => {
    return anchorColor({
      color: theme.yan.foreground,
    });
  }}
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
        <HeadlineTwo>young and nauseous</HeadlineTwo>
        <HeadlineThree>out now</HeadlineThree>
      </StyledLink>
    </Hero>
  );
};

export default MusicHero;
