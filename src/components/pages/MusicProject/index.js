import GoHomeBack from 'components/base/GoHomeBack'
import FullScreenHeight from 'components/other/FullScreenHeight'
import Loading from 'components/other/Loading'
import { contentfulRequest } from 'contentfulClient'
import { useEffect, useState } from 'react'
import ReactContentfulImage from 'react-contentful-image'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { above } from 'styles/utilities/breakpoints'
import { basePageTitle } from 'utils/constants/lib'
import { altTextHelper, reactContentfulImageURLHelper } from 'utils/lib'
import { remHelper } from 'utils/remHelper'
import { getProjectByHandle } from '../Music/queries'

import ProjectContainer from './ProjectContainer'
import ProjectDetails from './ProjectDetails'
import ProjectLink from './ProjectLink'

const Inner = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1776px;

  ${above.tablet`
    grid-template-columns: repeat(2, 1fr);
    column-gap: ${remHelper[16]};
    width: 75%
  `} img {
    width: 100%;
  }
`

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const LinksContainer = styled.ul`
  margin-top: ${remHelper[16]};
`

const StyledGoHomeBack = styled(GoHomeBack)`
  ${above.tablet`
    position: absolute;
    bottom: ${remHelper[16]};
  `}
`

const MusicProject = () => {
  const [project, setProject] = useState({})

  const params = useParams()

  const fetchProject = async (handle) => {
    const proj = await contentfulRequest(getProjectByHandle(handle))

    const p = proj.musicProjectCollection.items[0]

    setProject(p)
  }

  useEffect(() => {
    const fetchData = () => {
      fetchProject(params.handle)
    }

    fetchData()

    document.title = `${basePageTitle} - ${project.title}`
  }, [params.handle, project.title])

  const { artwork } = project

  const linkKeys = [
    'spotify',
    'bandcamp',
    'apple',
    'tidal',
    'amazon',
    'deezer',
    'napster',
    'googlePlay',
    'soundcloud'
  ]

  const linkArray = []

  linkKeys.map((key) => {
    if (project[key] !== null) {
      linkArray.push({
        title: key,
        link: project[key]
      })
    }
  })

  if (!project || !artwork) return <Loading />

  const urlWash = reactContentfulImageURLHelper(artwork.url)

  const imageSizes = [
    {
      mediaQuery: 'xs',
      params: { w: 687 }
    },
    {
      mediaQuery: 'sm',
      params: { w: 364 }
    },
    {
      mediaQuery: 'md',
      params: { w: 483 }
    },
    {
      mediaQuery: 'lg',
      params: { w: 880 }
    }
  ]

  return (
    <FullScreenHeight unsetBreakpoint="none">
      <ProjectContainer url={artwork.url}>
        <Inner>
          <ReactContentfulImage
            src={urlWash.replace(window.location.origin, '')}
            alt={altTextHelper(artwork.title)}
            sizes={imageSizes}
          />

          <DetailsContainer>
            <ProjectDetails project={project} />

            <LinksContainer>
              {linkArray.map((link) => {
                return <ProjectLink key={link.link} link={link} />
              })}
            </LinksContainer>
          </DetailsContainer>
        </Inner>

        <StyledGoHomeBack
          destination="/music/"
          cta="go back"
          themeColor="white"
        />
      </ProjectContainer>
    </FullScreenHeight>
  )
}

export default MusicProject
