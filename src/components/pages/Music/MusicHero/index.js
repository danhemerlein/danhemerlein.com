import styled from 'styled-components';
import { FlexContainer } from 'styles/elements';
import { SlideWideRight } from 'styles/utilities/keyframes';
import { anchorColor, fullBleed } from 'styles/utilities/mixins';
import { remHelper } from 'utils/remHelper';

const Hero = styled(FlexContainer)`
  font-family: 'lack_regular';
  height: 25vh;
  margin-top: ${remHelper[16]};

  ${fullBleed({ space: 1.6, right: true, left: true })};

  background-color: ${({ theme }) => {
    return theme.yan.background;
  }};
`;

const StyledLink = styled.a`
  text-align: center;

  ${({ theme }) => {
    return anchorColor({
      color: theme.yan.foreground
    });
  }}
`;

const HeadlineTwo = styled.h2`
  font-size: 2rem;
  animation: ${SlideWideRight} 2.5s;
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
      </StyledLink>
    </Hero>
  );
};

export default MusicHero;
