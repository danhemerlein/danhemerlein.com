import styled from 'styled-components'
import { PageHero } from 'styles/elements/containers'
import { SlideWideRight } from 'styles/utilities/keyframes'
import { anchorColor } from 'styles/utilities/mixins'

const Hero = styled(PageHero)`
  font-family: 'lack_regular';

  background-color: ${({ theme }) => {
    return theme.yan.background
  }};
`

const StyledLink = styled.a`
  text-align: center;

  ${({ theme }) => {
    return anchorColor({
      color: theme.yan.foreground
    })
  }}
`

const HeadlineTwo = styled.h2`
  font-size: 2rem;
  animation: ${SlideWideRight} 2.5s;
`

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
  )
}

export default MusicHero
