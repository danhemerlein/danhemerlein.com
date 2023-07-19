import FullScreenHeight from 'components/other/FullScreenHeight'
import Loading from 'components/other/Loading'
import { contentfulRequest } from 'contentfulClient'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FlexContainer } from 'styles/elements'
import { above } from 'styles/utilities/breakpoints'
import { getAboutPageContent } from '../About/queries'
import HomePageBanner from './HomePageBanner'
import HomePageLink from './HomePageLink'
import Info from './Info'

const RelavtiveDiv = styled(FlexContainer)`
  position: relative;
`

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  ${above.desktop`
    flex-wrap: wrap;
    flex-direction: row;
  `}
`

const HomePage = () => {
  const [heroImage, setHeroImage] = useState({})
  const [heroImagePrime, setHeroImagePrime] = useState({})

  const fetchData = async () => {
    const content = await contentfulRequest(getAboutPageContent)

    setHeroImage(content?.aboutPage?.heroImage)
    setHeroImagePrime(content?.aboutPage?.heroImagePrime)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (heroImage.url === undefined || heroImagePrime.url === undefined) {
    return <Loading />
  }

  return (
    <FullScreenHeight unsetBreakpoint="desktop">
      <RelavtiveDiv direction="column" height="100%" width="100%">
        <HomePageBanner
          desktop
          mobile={false}
          text="young and nauseous"
          href="/young-and-nauseous"
          fontFamily="lack"
        />

        <BoxContainer>
          <Info source={heroImage?.url} sourcePrime={heroImagePrime?.url} />

          <HomePageLink
            destination="/code"
            text="code"
            position={1}
            blurb="work experience // freelance clients // passion projects // open source"
          />

          <HomePageLink
            destination="/music"
            text="music"
            position={2}
            blurb="production // songwriting // performances"
          />

          <HomePageBanner
            mobile
            desktop={false}
            href="/young-and-nauseous"
            text="young and nauseous"
            fontFamily="lack"
          />

          <HomePageLink
            destination="/moodboard"
            text="mood"
            position={3}
            blurb="people // places // dreams // visions"
          />

          <HomePageLink
            destination="/about"
            text="more"
            position={4}
            blurb="more // more // more // more"
          />

          <HomePageBanner
            mobile
            targetBlank={false}
            desktop={false}
            href="/notes"
            text="notes"
          />
        </BoxContainer>
        <HomePageBanner
          desktop
          targetBlank={false}
          mobile={false}
          text="notes"
          href="/notes"
        />
      </RelavtiveDiv>
    </FullScreenHeight>
  )
}

export default HomePage
