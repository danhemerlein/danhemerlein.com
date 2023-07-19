import Overlay from 'components/navigation/Overlay'
import BackgroundImage from 'components/other/BackgroundImage'
import FullScreenHeight from 'components/other/FullScreenHeight'
import Loading from 'components/other/Loading'
import { contentfulRequest } from 'contentfulClient'
import { useEffect, useState } from 'react'
import { basePageTitle } from 'utils/constants/lib'
import * as styles from './About.styles'
import { getAboutPageContent } from './queries'
import ToolTip from './ToolTip'

const AboutPage = () => {
  const [toolTipOpen, setToolTipOpen] = useState(false)
  const [toolTipTrapActive, setToolTipTrapActive] = useState(false)
  const [heroImage, setHeroImage] = useState({})
  const [heroImagePrime, setHeroImagePrime] = useState({})
  const [resume, setResume] = useState({})

  useEffect(() => {
    document.title = `${basePageTitle} - about`

    const fetchData = async () => {
      const content = await contentfulRequest(getAboutPageContent)

      setHeroImage(content.aboutPage.aboutPageImage)
      setHeroImagePrime(content.aboutPage.aboutPageImagePrime)
      setResume(content.aboutPage.resume)
    }

    fetchData()
  }, [])

  const mountToolTipTrap = () => {
    setToolTipTrapActive(true)
  }

  const unmountToolTipTrap = () => {
    setToolTipOpen(false)
    setToolTipTrapActive(false)
  }

  const toggleToolTip = () => {
    setToolTipOpen(!toolTipOpen)
    mountToolTipTrap()
  }

  if (heroImage.url === undefined || heroImagePrime.url === undefined) {
    return <Loading />
  }

  return (
    <FullScreenHeight unsetBreakpoint="desktop">
      <Overlay
        navOpen={toolTipOpen}
        clickHandler={toggleToolTip}
        unmountTrap={unmountToolTipTrap}
      />

      <styles.ContentContainer>
        <styles.ImageContainer items="center">
          <BackgroundImage
            source={heroImage?.url}
            sourcePrime={heroImagePrime?.url}
          />
        </styles.ImageContainer>

        <styles.TextContainer
          justify="center"
          items="flex-start"
          direction="column"
        >
          <styles.TextContainerInner>
            <styles.StyledP>
              hey I'm dan (he/him),
              <styles.StyledButton type="button" onClick={toggleToolTip}>
                i
              </styles.StyledButton>
            </styles.StyledP>

            <ToolTip
              toolTipOpen={toolTipOpen}
              toggleToolTip={toggleToolTip}
              activeTrap={toolTipTrapActive}
            />

            <styles.StyledP>
              I'm a web engineer and music producer based in Brooklyn, New York.
            </styles.StyledP>

            <styles.StyledP>
              As a coder, I'm really into JavaScript, e-commerce, CSS, front-end
              accessibility, developer experience and learning something new
              every day. I find joy in the process of achieving technical goals.
            </styles.StyledP>

            <styles.StyledP>
              As a musician, my focus is writing and producing songs under the
              moniker young and nauseous. I also play bass guitar in a few indie
              bands around Brooklyn.
            </styles.StyledP>

            <styles.StyledP>
              In my non-code/non-music time, I journal, read, moodboard, jog in
              McCarren Park,{' '}
              <styles.StyledLink to="/notes">blog</styles.StyledLink> and
              aimlessly ride my bike around the city.
            </styles.StyledP>

            <styles.StyledP>
              I write code and make music because I can't not and it's super
              trill.
            </styles.StyledP>

            <styles.StyledP>
              For those interested, my resume can be found{' '}
              <styles.StyledA
                href={resume.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </styles.StyledA>
              .
            </styles.StyledP>
          </styles.TextContainerInner>
        </styles.TextContainer>
      </styles.ContentContainer>
    </FullScreenHeight>
  )
}

export default AboutPage
